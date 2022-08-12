import net from "net";
import createPacket from "./createPacket.js";

class Client {
  constructor(host, port) {
    this.client = null;
    this.host = host;
    this.port = port;
    this.checkinTime = null;
    this.checkoutTime = null;
  }
  createClient() {
    this.client = net.connect({ host: this.host, port: this.port }, () => {
      this.client.setEncoding("utf-8");

      console.log("Connected to Server");

      this.client.on("data", (str) => {
        const data = str.trim();
        if (data === "checkin") {
          this.checkinTime = new Date();
          console.log(`Check In: ${this.checkinTime.toLocaleString()}`);
        } else if (data === "checkout") {
          this.checkoutTime = new Date();
          const totalTime = (this.checkoutTime - this.checkinTime) / 1000;
          console.log(`Check Out: ${this.checkoutTime.toLocaleString()}`);
          console.log(`전체 활동 시간: ${totalTime.toFixed(2)}sec`);
        } else {
          console.log(data);
        }
      });

      this.client.on("error", (error) => {
        console.error(`Client Error: ${error}`);
      });

      this.client.on("close", () => {
        console.log("Client Closed");
        process.exit();
      });
    });
  }

  async run() {
    this.createClient();
    while (true) {
      const packet = await createPacket();
      if (packet !== null) {
        this.client.write(JSON.stringify(packet));
      }
    }
  }
}

export default Client;
