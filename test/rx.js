import fs from "fs";

export class Rx {
    constructor(fakeCpu) {
        ((fakeCpu) => {
            this.physical = (frameValue) => {
                console.log("수신 (Rx)".padEnd("-", 72));
                console.log();
                console.log("물리 계층 (Physical Layer)".padEnd("-", 72));
                console.log();
                console.log("요청", frameValue);
                const frame = frameValue.toString();
                console.log();
                console.log("처리", frame);
                console.log();
                console.log("데이터링크 계층 (Data Link Layer)으로 전달");
                console.log();
                console.log(" ↓ ".repeat(8));
                console.log();
                return this.dataLink(frame);
            };

            this.dataLink = (frame) => {
                console.log(
                    "데이터링크 계층 (Data Link Layer)".padEnd("-", 72)
                );
                console.log(">> 요청", frame);
                const [responseMacAddress, requestMacAddress, headerPacket] =
                    frame.match(/(\{(.|\n|\r)+\})|([^\s\(\),]+)/g);
                if (
                    responseMacAddress !== fakeCpu.getAddress().getMac() &&
                    requestMacAddress !== this.getAddress().getMac()
                ) {
                    console.log(
                        "수신 MAC 주소 (불일치) =>",
                        responseMacAddress
                    );
                    console.log("발신 MAC 주소 (불일치) =>", requestMacAddress);
                    console.log("패킷 무시");
                } else {
                    if (responseMacAddress === this.getAddress().getMac()) {
                        console.log(
                            "수신 MAC 주소 (일치) =>",
                            responseMacAddress
                        );
                    } else {
                        console.log("수신 MAC 주소 =>", responseMacAddress);
                    }
                    if (requestMacAddress === this.getAddress().getMac()) {
                        console.log(
                            "발신 MAC 주소 (일치) =>",
                            requestMacAddress
                        );
                    } else {
                        console.log("발신 MAC 주소 =>", requestMacAddress);
                    }
                    console.log("네트워크 계층 (Network Layer)으로 전달");
                    console.log();
                    console.log(" ↓ ".repeat(8));
                    console.log();
                    console.log(headerPacket);
                    return this.network(headerPacket);
                }
            };
        }).call(Rx.prototype, fakeCpu);
    }
    // physical(frameValue) {
    // }
    // dataLink(frame) {
    // }
    // network(headerPacket) {
    //     console.log("네트워크 계층 (Network Layer)".padEnd("-", 72));
    //     console.log(">> 요청", headerPacket);
    //     console.log(headerPacket);
    //     console.log(headerPacket.match(/([\d.]+)|(\[(.|\r|\n)+\])/g));
    //     const [responseIpAddress, requestIpAddress, packet] =
    //         headerPacket.match(/([\d.]+)|(\[(.|\r|\n)+\])/g);

    //     if (
    //         responseIpAddress !== this.getAddress().getIp() &&
    //         requestIpAddress !== this.getAddress().getIp()
    //     ) {
    //         console.log("수신 IP 주소 (불일치) =>", responseIpAddress);
    //         console.log("발신 IP 주소 (불일치) =>", requestIpAddress);
    //         console.log("패킷 무시");
    //     } else {
    //         if (responseIpAddress === this.getAddress().getIp()) {
    //             console.log("수신 IP 주소 (일치) =>", responseIpAddress);
    //         } else {
    //             console.log("수신 IP 주소 =>", responseIpAddress);
    //         }
    //         if (requestIpAddress === this.getAddress().getIp()) {
    //             console.log("발신 IP 주소 (일치) =>", requestIpAddress);
    //         } else {
    //             console.log("발신 IP 주소 =>", requestIpAddress);
    //         }
    //         console.log("전송 계층 (Transport Layer)으로 전달");
    //         console.log();
    //         console.log(" ↓ ".repeat(8));
    //         console.log();
    //         return this.transport(packet);
    //     }
    // }

    // transport(packet) {
    //     console.log("전송 계층 (Transport Layer)".padEnd("-", 72));
    //     console.log();
    //     const [packetType, ...data] = packet.match(/(\w[^,\]]+)/g);
    //     let dataObject = {};
    //     switch (packetType) {
    //         case "SYN": {
    //             console.log(">> Received Packet :", packet);
    //             const [
    //                 sourcePort,
    //                 destinationPort,
    //                 sequenceNumber,
    //                 ackNumber,
    //                 contentLength,
    //             ] = data;
    //             const tempDataObject = {
    //                 "Source Port": sourcePort,
    //                 "Destination Port": destinationPort,
    //                 "Sequence Number": sequenceNumber,
    //                 "Ack Number": ackNumber,
    //                 "Content-Length": contentLength,
    //             };
    //             console.log(JSON.stringify(tempDataObject, null, "  "));
    //             console.log();
    //             console.log(">> Sending Packet :", "SYN+ACK");
    //             dataObject = {
    //                 "Source Port": destinationPort,
    //                 "Destination Port": sourcePort,
    //                 "Sequence Number": 100,
    //                 "Ack Number": sequenceNumber + 1,
    //                 "Content-Length": 0,
    //             };
    //             console.log(JSON.stringify(dataObject, null, "  "));
    //             console.log(
    //                 `[SYN+ACK, ${destinationPort}, ${sourcePort}, 100, ${
    //                     parseInt(sequenceNumber) + 1
    //                 }, 0]`
    //             );
    //             return `[SYN+ACK, ${destinationPort}, ${sourcePort}, 100, ${
    //                 parseInt(sequenceNumber) + 1
    //             }, 0]`;
    //         }
    //         case "ACK":
    //             {
    //                 console.log(">> Received Packet :", packet);
    //                 const [
    //                     sourcePort,
    //                     destinationPort,
    //                     sequenceNumber,
    //                     ackNumber,
    //                     contentLength,
    //                 ] = data;
    //                 dataObject = {
    //                     "Source Port": sourcePort,
    //                     "Destination Port": destinationPort,
    //                     "Sequence Number": sequenceNumber,
    //                     "Ack Number": ackNumber,
    //                     "Content-Length": contentLength,
    //                 };
    //                 console.log(JSON.stringify(dataObject, null, "  "));
    //                 if (ackNumber === "101") {
    //                     this.contact = true;
    //                 }
    //                 return true;
    //             }
    //             break;
    //         case "DATA":
    //             if (this.contact === true) {
    //                 console.log(">> Received Packet :", packet);
    //                 const [
    //                     sourcePort,
    //                     destinationPort,
    //                     sequenceNumber,
    //                     segmentation,
    //                     contentLength,
    //                     content,
    //                 ] = data;
    //                 const tempDataObject = {
    //                     "Source Port": sourcePort,
    //                     "Destination Port": destinationPort,
    //                     "Sequence Number": sequenceNumber,
    //                     "Segmentation ": segmentation,
    //                     "Content-Length": contentLength,
    //                     Content: content,
    //                 };
    //                 console.log(JSON.stringify(tempDataObject, null, "  "));
    //                 console.log(content);
    //                 console.log();
    //                 this.segmentDatas.push(tempDataObject);

    //                 if (segmentation === "False") {
    //                     const tempSegmentDatas = this.segmentDatas;
    //                     this.segmentDatas = [];
    //                     console.log("세션 계층 (Session Layer)으로 전달");
    //                     console.log();
    //                     console.log(" ↓ ".repeat(8));
    //                     console.log();
    //                     return this.session(tempSegmentDatas);
    //                 }

    //                 const sendingPaket = [
    //                     "ACK",
    //                     destinationPort,
    //                     sourcePort,
    //                     sequenceNumber,
    //                     103,
    //                     0,
    //                 ];
    //                 dataObject = {
    //                     "Source Port": destinationPort,
    //                     "Destination Port": sourcePort,
    //                     "Sequence Number": sequenceNumber,
    //                     "Ack Number ": segmentation === "True" ? 103 : 104,
    //                     "Content-Length": contentLength,
    //                 };
    //                 console.log(">> Sending Packet :", sendingPaket);
    //                 console.log(JSON.stringify(dataObject, null, "  "));
    //             }
    //             break;
    //     }
    // }
    // session(datas) {
    //     console.log("세션 계층 (Session Layer)".padEnd("-", 72));
    //     let contents = "";
    //     let sessionId = "";
    //     let attachment = "";
    //     datas.forEach((data) => {
    //         console.log(data);
    //         const content = data.Content;
    //         if (sessionId === "") {
    //             if (content.substring(0, 10) === "Session-Id") {
    //                 const [tempSessionId, tempattachment] =
    //                     content.match(/[^\r\n]+/g);
    //                 sessionId = tempSessionId;
    //                 attachment = tempattachment;
    //             } else {
    //                 contents += content;
    //             }
    //         }
    //     });
    //     console.log();
    //     console.log(">> 수신 데이터");
    //     console.log();
    //     console.log(contents);
    //     console.log();
    //     console.log(sessionId);
    //     console.log();
    //     console.log("표현 계층 (Presentation Layer)으로 전달");
    //     console.log();
    //     console.log(" ↓ ".repeat(8));
    //     console.log();
    //     return this.presentation(contents, attachment);
    // }
    // presentation(contents, attachment) {
    //     console.log("표현 계층 (Presentation Layer)".padEnd("-", 72));
    //     console.log();
    //     console.log(">> 수신 데이터");
    //     console.log();
    //     console.log(contents);
    //     console.log();
    //     contents = contents.replace(attachment, "");
    //     attachment = Buffer.from(attachment, "base64").toString("utf8");
    //     console.log("디코딩 데이터 파일 : attachment.file");

    //     console.log();
    //     fs.writeFileSync("./attachment.file", attachment);
    //     console.log("응용 계층 (Application Layer)으로 전달");
    //     console.log();
    //     console.log(" ↓ ".repeat(8));
    //     console.log();

    //     this.application(contents, attachment);
    // }

    // application(contents, attachment) {
    //     console.log("응용 계층 (Application Layer)".padEnd("-", 72));
    //     console.log("=".repeat(72));
    //     console.log(contents + attachment);
    // }

    // getTx() {
    //     return this.tx;
    // }

    // setTx(tx) {
    //     this.tx = tx;
    // }

    // getAddress() {
    //     return this.address;
    // }
}
