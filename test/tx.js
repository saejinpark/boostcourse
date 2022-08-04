import { createInterface } from "readline";
export class Tx {
    application() {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log("응용 계층 (Application Layer)".padEnd("-", 72));
        console.log();

        let email = "";
        process.stdout.write("From: ");
        let count = 0;
        rl.on("line", (line) => {
            switch (count) {
                case 0:
                    email += `From: ${line.trim()}\r\n`;
                    process.stdout.write("To: ");
                    break;
                case 1:
                    email += `To: ${line.trim()}\r\n`;
                    process.stdout.write("Title: ");
                    break;
                case 2:
                    email += `Title: ${line.trim()}\r\n`;
                    process.stdout.write("Attachment: \n");
                    break;
                case 3:
                    email += `\r\n${line.trim()}`;
                    break;
                default:
                    break;
            }
            count++;
            if (count === 4) {
                console.log("=".repeat(32));
                console.log(email);
                console.log("=".repeat(32));
                console.log(">> 수신 데이터");
                console.log();
                console.log(email);
                this.presentation(email);
                Promise.all;
                rl.close();
            }
        });
        rl.on("close", () => {
            process.exit();
        });
    }

    presentation(email) {
        console.log(email);
        // this.transport(contents, attachment);
    }

    transport(data) {
        console.log("전송 계층 (Transport Layer)".padEnd("-", 72));
        console.log(">> 요청", data);
        console.log();
        console.log(">> Sending Packet : SYN");
        console.log("Source Port : 10001,");
        console.log("Destination Port : 8080,");
        console.log("Sequence Number : 10,");
        console.log("Ack Number : undefined,");
        console.log("Content-Length : 0");

        const synAddAck = this.getRx().transport(
            "[SYN, 10001, 8080, 10, undefined, 0]"
        );
        const [packetType, ...packetData] = synAddAck.match(/(\w[^,\]]+)/g);
        console.log();
        console.log("<< Received Packet : SYN+ACK");
        console.log("Source Port : 8080, ");
        console.log("Destination Port : 10001, ");
        console.log("Sequence Number : 100,");
        console.log("Ack Number : 11,");
        console.log("Content-Length : 0");
        const [
            sourcePort,
            destinationPort,
            sequenceNumber,
            ackNumber,
            contentLength,
        ] = packetData;
        if (ackNumber === "11") {
            console.log();
            console.log(">> Sending Packet : ACK");
            console.log("Source Port : 10001, ");
            console.log("Destination Port : 8080, ");
            console.log("Sequence Number : 11,");
            console.log("Ack Number : 101,");
            console.log("Content-Length : 0");
            console.log("[ACK, 10001, 8080, 11, 101, 0]");
            const contact = this.getRx().transport(
                "[ACK, 10001, 8080, 11, 101, 0]"
            );
            if (contact) {
                this.contact = true;
            }
            if (this.contact) {
                console.log();
                console.log(">> Sending Packet : DATA");
                console.log("Source Port : 10001, ");
                console.log("Destination Port : 8080, ");
                console.log("Sequence Number : 112,");
                console.log("Segmentation : True,");
                console.log("Content-Length : 100");
                console.log(
                    "From: jk@boostcamp.connect.or.kr\r\nTo: camper@boostcamp.connect.or.kr\r\nTitle: Hello World\r\n"
                );
                console.log(
                    "[DATA, 10001, 8080, 112, True, 100, From: jk@boostcamp.connect.or.kr\r\nTo: camper@boostcamp.connect.or.kr\r\nTitle: Hello World\r\n]"
                );
                this.network(
                    "[DATA, 10001, 8080, 112, True, 100, From: jk@boostcamp.connect.or.kr\r\nTo: camper@boostcamp.connect.or.kr\r\nTitle: Hello World\r\n]"
                );
                console.log();
                console.log(">> Received Packet : ACK");
                console.log("Source Port : 8080, ");
                console.log("Destination Port : 10001, ");
                console.log("Sequence Number : 112,");
                console.log("Ack Number : 102,");
                console.log("Content-Length : 0");
                console.log("[ACK, 10001, 8080, 112, 102, 0]");
                this.network("[ACK, 10001, 8080, 112, 102, 0]");
                console.log();
                console.log(">> Sending Packet : DATA");
                console.log("Source Port : 10001, ");
                console.log("Destination Port : 8080, ");
                console.log("Sequence Number : 212,");
                console.log("Segmentation : True,");
                console.log("Content-Length : 100");
                console.log(
                    "Session-Id: 408c87ac-248b-419b-a85a-d0e050f503cc\r\n\r\nSGVsbG8gQm9vc3RDYW1wZXIsCglUaGlzIG1lc3NhZ2Ugd3JpdHRlbiBieSBKSy4K"
                );
                console.log(
                    "[DATA, 10001, 8080, 212, True, 100, Session-Id: 408c87ac-248b-419b-a85a-d0e050f503cc\r\n\r\nSGVsbG8gQm9vc3RDYW1wZXIsCglUaGlzIG1lc3NhZ2Ugd3JpdHRlbiBieSBKSy4K]"
                );
                this.network(
                    "[DATA, 10001, 8080, 212, True, 100, Session-Id: 408c87ac-248b-419b-a85a-d0e050f503cc\r\n\r\nSGVsbG8gQm9vc3RDYW1wZXIsCglUaGlzIG1lc3NhZ2Ugd3JpdHRlbiBieSBKSy4K]"
                );
                console.log();
                console.log(">> Received Packet : ACK");
                console.log("Source Port : 8080, ");
                console.log("Destination Port : 10001, ");
                console.log("Sequence Number : 212,");
                console.log("Ack Number : 103,");
                console.log("Content-Length : 0");
                console.log("[ACK, 10001, 8080, 212, 103, 0]");
                this.network("[ACK, 10001, 8080, 212, 103, 0]");
                console.log();
                console.log(">> Sending Packet : DATA");
                console.log("Source Port : 10001, ");
                console.log("Destination Port : 8080, ");
                console.log("Sequence Number : 226,");
                console.log("Segmentation : False,");
                console.log("Content-Length : 12");
                console.log("Ugd3JpdHRlbiBieSBKSy4K");
                console.log(
                    "[DATA, 10001, 8080, 226, False, 12, Ugd3JpdHRlbiBieSBKSy4K]"
                );
                this.network(
                    "[DATA, 10001, 8080, 226, False, 12, Ugd3JpdHRlbiBieSBKSy4K]"
                );
                console.log();
            }
        }
    }

    network(packet) {
        console.log("네트워크 계층 (Network Layer)".padEnd("-", 72));
        console.log(">> 요청", packet);
        const headerPacket = `{ ${this.getRx()
            .getAddress()
            .getIp()}, ${this.getAddress().getIp()}, ${packet} }`;
        console.log();
        console.log("처리", headerPacket);
        console.log();
        console.log("데이터링크 계층 (Data Link Layer)으로 전달");
        console.log();
        console.log(" ↓ ".repeat(8));
        console.log();
        return this.dataLink(headerPacket);
    }

    dataLink(headerPacket) {
        console.log("데이터링크 계층 (Data Link Layer)".padEnd("-", 72));
        console.log(">> 요청", headerPacket);
        const frame = `( ${this.getAddress().getMac()}, ${this.getRx()
            .getAddress()
            .getMac()}, ${headerPacket} )`;
        console.log();
        console.log("처리", frame);
        console.log();
        console.log("물리 계층 (Physical Layer)으로 전달");
        console.log();
        console.log(" ↓ ".repeat(8));
        console.log();
        return this.physical(frame);
    }

    physical(request) {
        console.log("물리 계층 (Physical Layer)".padEnd("-", 72));
        console.log();
        console.log("요청", request);
        const buffer = Buffer.from(request, "utf-8");
        console.log(new Uint16Array(buffer).map((num) => num.toString(16)));
        console.log();
        console.log("Rx.physical()로 전달");
        console.log();
        console.log(" ↓ ".repeat(8));
        console.log();
        return this.getRx().physical(buffer);
    }

    session(datas) {
        console.log("세션 계층 (Session Layer)".padEnd("-", 72));
        let contents = "";
        let sessionId = "";
        let attachment = "";
        datas.forEach((data) => {
            const content = data.Content;
            if (sessionId === "") {
                if (content.substring(0, 10) === "Session-Id") {
                    const [tempSessionId, tempattachment] =
                        content.match(/[^\r\n]+/g);
                    sessionId = tempSessionId;
                    attachment = tempattachment;
                } else {
                    contents += content;
                }
            }
        });
        console.log();
        console.log(">> 수신 데이터");
        console.log();
        console.log(contents);
        console.log();
        console.log(sessionId);
        console.log();
        console.log("표현 계층 (Presentation Layer)으로 전달");
        console.log();
        console.log(" ↓ ".repeat(8));
        console.log();
        return this.presentation(contents, attachment);
    }
}
