import { Worker, isMainThread } from "worker_threads";

class Publisher {
  static instance;

  constructor(name) {
    this.name = name;
    this.events = new Map();
  }
  add(eventName, handler) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).push(handler);
    } else {
      this.events.set(eventName, [handler]);
    }
  }

  stringify(idx) {
    console.log(
      `Publisher#${idx} : publisher name = "${
        this.name
      }", events = [ ${Array.from(this.events.keys())} ]`
    );
  }

  callEvent(eventHandler, eventName, userData) {
    return eventHandler.postEvent(eventName, this, userData);
  }

  createWorker(closure) {
    if (isMainThread) {
      const worker = new Worker("./worker.js");
      worker.postMessage(closure());
      worker.on("message", (value) => {
        if (value) {
          value.forEach((ele) => console.log(ele));
        }
      });
      worker.on("error", (err) => {
        console.error(err);
      });
      worker.on("exit", () => console.log("exited!"));
    }
  }
}

export { Publisher };
