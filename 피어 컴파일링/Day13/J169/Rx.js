const Input = require("./Input");
const Base64 = require("./Base64");
const uuid4 = require("uuid4");
const AddressTable = require("./Address");


class Rx{
    constructor(name, sourcePort, sourceAddressIdx){
        this.name = name;
        this.sourcePort = sourcePort;
        this.sourceAddressIdx = sourceAddressIdx;
        this.state='closed';
    }

    async receive(){

        const [from, to, title, file, fileSize] = await Input.getInput();
        this.applicationData = await this.applicationLayer(from, to, title, file, fileSize);
        this.presentationData = await this.presentationLayer(from, to, title, file, fileSize);
        this.sessionData = await this.sessionLayer(this.presentationData);
        return this.sessionData
        // this.transportData = await this.TransportLayer(sourceport, destport, sessionData);

    }

    async applicationLayer(from, to, title, file, fileSize){
        return `\nFrom: ${from}\r\nTo: ${to}\r\nTitle: ${title}\r\n\r\n(File Size : ${fileSize})\r\n${file}`;
    }

    async presentationLayer(from, to, title, file, fileSize){
        const encodedFile = await Base64.encoding(file);
        return `\nFrom: ${from}\r\nTo: ${to}\r\nTitle: ${title}\r\n\r\n${encodedFile}`;
    }

    async sessionLayer(data){
        const UUID = uuid4();
        data = data.replace(/\r\n\r\n/s,`\r\nSession-ID: ${UUID}\r\n\r\n`);
        return data
    }

    async establishConnection(){
        if(this.state=='closed'){
            this.seqNum = Math.random();
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'SYN', null, null, null);
            this.networkLayer(packet.get());
            this.state = 'SYN-SENT';
        }else if(this.state=='SYN-RECEIVED'){
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'SYN+ACK', null, null, null);
            this.networkLayer(packet.get());
        }else if(this.state=='SYN-SENT'){
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'ACK', null, null, null);
            this.networkLayer(packet.get());
        }
    }

    async transportLayer(data){
        while(this.state!='established'){
            await this.establishConnection();
            return
        }

        for(let i=0;i<data.length;i+=100){
            const slicedData = data.slice(i,i+100);
            if(i==parseInt((data.length-1)/100)){
                const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'DATA', False, slicedData.length, slicedData);
                this.networkLayer(packet.get());
            }else{
                const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'DATA', true, slicedData.length, slicedData);
                this.networkLayer(packet.get());
            }
        }
        
    }

    async networkLayer(data){
        const destIP = data.match(/\b[\w\.]+\b/g)[1];
        if(destIP!=AddressTable[this.sourceAddressIdx].IP) {console.log(`The IP address of the packet is incorrect : input - ${destIP} | real - ${AddressTable[this.sourceAddressIdx].IP}`);return}
        const res = data.match(/[.+]/)[0];
        this.dataLinkLayer(res);
    }

    async dataLinkLayer(data){
        const destMAC = data.match(/\b[\w:]+\b/)[0];
        if(destMAC!=AddressTable[this.sourceAddressIdx].MAC) return
        const res = data.match(/{.+}/)[0];
        console.log('\nRx 데이터링크 계층 : ',res);
        this.networkLayer(res);
    }

    async physicalLayer(frame){
        let res = '';
        for(let i=0;i<frame.length;i+=2){
            const dec = parseInt(frame.slice(i,i+2),16);
            res += String.fromCharCode(dec);
        }
        console.log("\nRx 물리 계층 : ",res);
        this.dataLinkLayer(res);
    }

}

class tcpPacket{
    constructor(sourcePort, destPort, seqNum, ackNum, packetType, dataSegmentFlag, contentLength, data){
        this.header = {sourcePort:sourcePort, destPort:destPort, seqNum:seqNum, ackNum:ackNum, packetType:packetType, dataSegmentFlag:dataSegmentFlag, contentLength:contentLength};
        this.data = data;
    }

    get(){
        if(this.header.packetType=='DATA'){
            return [this.header.packetType, this.header.sourcePort, this.header.destPort, this.header.seqNum, this.header.dataSegmentFlag, this.header.contentLength, this.data];
        }else{
            return [this.header.packetType, this.header.sourcePort, this.header.destPort, this.header.seqNum, this.header.ackNum, this.header.contentLength];
        }
    }

    printHeaderPacket(){
        console.log(`>> Sending Packet : ${this.header.packetType}\nSource Port : ${this.header.sourcePort},\nDestintation Port : ${this.header.destPort},\n \
        Sequence Number : ${this.header.seqNum},\nAck Number : ${this.header.ackNum},\nContent-Length : ${this.header.contentLength}\n \
        [${this.header.packetType}, ${this.header.sourcePort}, ${this.header.destPort}, ${this.header.seqNum}, ${this.header.ackNum}, ${this.header.contentLength}]`);
    }

    printDataPacket(){
        console.log(`>> Sending Packet : ${this.header.packetType}\nSource Port : ${this.header.sourcePort},\nDestintation Port : ${this.header.destPort},\n \
        Sequence Number : ${this.header.seqNum},\nSegmentation : ${this.header.dataSegmentFlag},\nContent-Length : ${this.header.contentLength}\n${this.data} \
        [${this.header.packetType}, ${this.header.sourcePort}, ${this.header.destPort}, ${this.header.seqNum}, ${this.header.dataSegmentFlag}, ${this.header.contentLength}, ${this.data}]`);
    }
}

module.exports=Rx;