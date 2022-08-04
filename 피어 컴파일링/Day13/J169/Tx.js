const Input = require("./Input");
const Base64 = require("./Base64");
const uuid4 = require("uuid4");
const AddressTable = require("./Address");

class Tx{
    constructor(name, sourcePort, sourceAddressIdx){
        this.name = name;
        this.sourcePort = sourcePort;
        this.sourceAddressIdx = sourceAddressIdx;
        this.state='closed';
    }

    async init(dest){
        this.dest = dest;
        this.destPort = dest.port;
        this.destAddressIdx = dest.addressIdx;

        const [from, to, title, file, fileSize] = await Input.getInput();
        await this.applicationLayer(from, to, title, file, fileSize);
        // this.presentationLayer(from, to, title, file);
        // this.sessionData = await this.sessionLayer(this.presentationData);
        // return this.sessionData
        // this.transportData = await this.TransportLayer(sourceport, destport, sessionData);

    }

    async applicationLayer(from, to, title, file, fileSize){
        const data = `From: ${from}\r\nTo: ${to}\r\nTitle: ${title}\r\n\r\n${file}`;
        console.log(`From: ${from}\r\nTo: ${to}\r\nTitle: ${title}\r\n\r\n(File Size : ${fileSize})\r\n${file}`);
        this.presentationLayer(data);
    }

    async presentationLayer(data){
        console.log(data.match(/\r\n\r\n.+/s)[0]);
        const file = data.match(/\r\n\r\n.+/s)[0].slice(4);
        const encodedFile = await Base64.encoding(file);
        data = data.replace(/\r\n\r\n.+/s, `\r\n\r\n${encodedFile}`);
        console.log('\n표현 계층 : ',JSON.stringify(data));
        this.sessionLayer(data);
    }

    async sessionLayer(data){
        const UUID = uuid4();
        data = data.replace(/\r\n\r\n/s,`\r\nSession-ID: ${UUID}\r\n\r\n`);
        console.log('\n세션 계층 : ',JSON.stringify(data));
        this.transportLayer(data)
    }

    async establishConnection(){
        if(this.state=='closed'&&this.name=='client'){
            this.seqNum = 10;
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'SYN', null, null, null);
            this.state = 'SYN-SENT';
            console.log('>> Sending Packet : ',packet.header.packetType);
            packet.printHeader();
            this.networkLayer(packet.get());
        }else if(this.state=='closed'&&this.name=='server'){
            this.ackNum=this.dest.seqNum+1;
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'SYN+ACK', null, null, null);
            this.state = 'SYN-RECEIVED';
            console.log('>> Received Packet : ',packet.header.packetType);
            packet.printHeader();
            this.networkLayer(packet.get());
        }else if(this.state=='SYN-SENT'){
            this.seqNum = dest.ackNum;
            this.ackNum = this.ackNum+1;
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'ACK', null, null, null);
            console.log('>> Sending Packet : ',packet.header.packetType);
            packet.printHeader();
            this.networkLayer(packet.get());
        }
    }

    async transportLayer(data){
        console.log("전송 계층 : ");
        if(this.state!='established'){
            this.establishConnection();
            return
        }

        if(this.name=='client'){
            for(let i=0;i<data.length;i+=100){
                const slicedData = data.slice(i,i+100);
                if(i==parseInt((data.length-1)/100)){
                    this.seqNum = this.seqNum+slicedData.length;
                    const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'DATA', False, slicedData.length, slicedData);
                    console.log('>> Sending Packet : ',packet.header.packetType);
                    packet.printData();
                    this.networkLayer(packet.get());
                }else{
                    this.seqNum = this.seqNum+100;
                    const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'DATA', true, slicedData.length, slicedData);
                    console.log('>> Sending Packet : ',packet.header.packetType);
                    packet.printData();
                    this.networkLayer(packet.get());
                }
            }
        }else{
            this.seqNum = this.dest.seqNum;
            this.ackNum = this.dest.ackNum+1;
            const packet = new tcpPacket(this.sourcePort, this.destPort, this.seqNum, this.ackNum, 'ACK', null, null, null);
            console.log('>> Received Packet : ',packet.header.packetType);
            packet.printHeader();
            this.networkLayer(packet.get());
        }
        
        
    }

    async networkLayer(data){
        const res = `{ ${AddressTable[this.sourceAddressIdx].IP}, ${AddressTable[this.destAddressIdx].IP}, ${JSON.stringify(data).replace(/null/,'undefined')}}`;
        console.log('\n네트워크 계층 : ',res);
        this.dataLinkLayer(res);
    }

    async dataLinkLayer(data){
        const res = `( ${AddressTable[this.destAddressIdx].MAC}, ${AddressTable[this.sourceAddressIdx].MAC}, ${data})`;
        console.log('\n데이터링크 계층 : ',res);
        this.physicalLayer(res);
    }

    async physicalLayer(frame){
        let res = '';
        for(let i=0;i<frame.length;i++){
            res+=frame.charCodeAt(i).toString(16);
        }
        console.log('\n물리 계층 : ',res);
        this.dest.Rx.physicalLayer(res);
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
            return [this.header.packetType, this.header.sourcePort, this.header.destPort, this.header.seqNum, undefined, 0];
        }
    }

    printHeader(){
        console.log(`Source Port : ${this.header.sourcePort},\nDestintation Port : ${this.header.destPort},\nSequence Number : ${this.header.seqNum},\nAck Number : ${this.header.ackNum},\nContent-Length : 0\n[${this.header.packetType}, ${this.header.sourcePort}, ${this.header.destPort}, ${this.header.seqNum}, ${this.header.ackNum}, 0]`);
    }

    printData(){
        console.log(`Source Port : ${this.header.sourcePort},\nDestintation Port : ${this.header.destPort},\nSequence Number : ${this.header.seqNum},\nSegmentation : ${this.header.dataSegmentFlag},\nContent-Length : ${this.header.contentLength}\n${this.data}\n[${this.header.packetType}, ${this.header.sourcePort}, ${this.header.destPort}, ${this.header.seqNum}, ${this.header.dataSegmentFlag}, ${this.header.contentLength}, ${this.data}]`);
    }
}

// Base64.encoding('\r\n');

module.exports=Tx;