import net from "net";
import * as readline from "readline-sync";
import { EventEmitter } from "events";

class Client {
  constructor() {
    this.ip = "";
    this.port = "";
    this.client = new net.Socket();
    this.campId = "";
    this.groupId = "";
    this.eventEmitter = new EventEmitter();
  }

  connect(ip, port) {
    this.ip = ip;
    this.port = port;
    this.client.connect({ host: ip, port: port }, () => {
      this.eventEmitter.on("checkin", () => {
        let id = readline.question("id: ");
        this.campId = id;
        this.client.write(
          JSON.stringify({
            header: { userAgent: `${ip}:${port}`, date: Date.now() },
            command: "CHECKIN",
            body: { id: `${id}` },
          })
        );
      });

      this.client.on("data", (res) => {
        res = JSON.parse(res);
        switch (res.command) {
          case "CHECKIN":
            this.#checkin(res);
            this.eventEmitter.emit("getInput");
            break;
          case "CHECKOUT":
            this.#checkout(res);
            this.client.destroy();
            break;
          case "MISSION":
            this.#mission(res);
            this.eventEmitter.emit("getInput");
            break;
          case "PEER":
            this.#peer(res);
            this.eventEmitter.emit("getInput");
            break;
        }
      });
      this.#checkoutHandler();
      this.#getInputHandler();
      this.#missionHandler();
      this.#peerSessionHandler();

      this.client.on("end", () => {
        this.client.write(
          JSON.stringify({
            header: { userAgent: `${this.ip}:${this.port}`, date: Date.now() },
            command: "CHECKOUT",
            body: { campId: `${this.campId}` },
          })
        );
      });
      this.eventEmitter.emit("checkin");
    });
  }

  #checkin(res) {
    if (res.statusCode === 200) {
      this.groupId = res.body.groupId;
      console.log("checkin Success");
    } else {
      console.log(res.statusText);
      this.eventEmitter.emit("checkin");
    }
  }
  #checkout(res) {
    console.log(`checkout - 활동 시간:${res.body.activityTime}`);
  }
  #checkoutHandler() {
    this.eventEmitter.on("checkout", () => {
      this.client.write(
        JSON.stringify({
          header: { userAgent: `${this.ip}:${this.port}`, date: Date.now() },
          command: "CHECKOUT",
          body: { campId: `${this.campId}` },
        })
      );
    });
  }
  #missionHandler() {
    this.eventEmitter.on("mission", (day) => {
      this.client.write(
        JSON.stringify({
          header: { userAgent: `${this.ip}:${this.port}`, date: Date.now() },
          command: "MISSION",
          body: { day: day, campId: `${this.campId}` },
        })
      );
    });
  }
  #peerSessionHandler() {
    this.eventEmitter.on("peersession", (maxCnt) => {
      this.client.write(
        JSON.stringify({
          header: { userAgent: `${this.ip}:${this.port}`, date: Date.now() },
          command: "PEER",
          body: {
            maxCnt: parseInt(maxCnt.split("=")[1]),
            campId: `${this.campId}`,
          },
        })
      );
    });
  }
  #getInputHandler() {
    this.eventEmitter.on("getInput", () => {
      let input = readline.question(">");
      let command = input.split(" ")[0];
      switch (command) {
        case "checkout":
          this.eventEmitter.emit("checkout");
          break;
        case "mission":
          this.eventEmitter.emit("mission", input.split(" ")[1]);
          break;
        case "peersession":
          this.eventEmitter.emit("peersession", input.split(" ")[1]);
          break;
      }
    });
  }
  #mission(res) {
    console.log(`keywords are "${res.body.keywords}"`);
  }
  #peer(res) {
    console.log(res.body.message);
  }
}

export { Client };
