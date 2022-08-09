import { Worker } from "worker_threads";
import Event from "./Event.js";

class EventManager {
  static #instance;

  constructor() {
    this.storage = new Array();
    this.handlerStorage = new Array();
  }

  sharedInstance() {
    if (!EventManager.#instance) {
      EventManager.#instance = this;
    }
    return EventManager.#instance;
  }
  add(subscriber, eventName, sender, handler) {
    this.handlerStorage.push(handler);
    const senderName = sender ? sender.name : undefined;
    const obj = {
      subscriber,
      eventName,
      sender: senderName,
      handlerIndex: this.handlerStorage.length - 1,
    };
    this.storage.push(obj);
  }
  remove(subscriber) {
    this.storage = this.storage.filter((v, i) => v.subscriber !== subscriber);
  }
  postEvent(eventName, publisher, userData) {
    const data = userData ? userData : {};
    const event = new Event(eventName, publisher, data);
    const worker = new Worker("./worker.js");

    worker.postMessage({ storage: this.storage, eventName, publisher });

    worker.on("message", (value) => {
      const { subscriber, eventName, sender: senderName, handlerIndex } = value;
      const handler = this.handlerStorage[handlerIndex];
      handler(subscriber, event);
    });
    worker.on("exit", () => worker.terminate());
  }
  async postEventQueue(eventName, publisher, userData, queue = "SyncQueue") {
    switch (queue) {
      case "SyncQueue":
        await new Promise((resolve, reject) => {
          this.postEvent(eventName, publisher, userData);
          resolve();
        });
        break;
      case "AsyncQueue":
        this.postEvent(eventName, publisher);
        break;

      case "DelayQueue":
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            this.postEvent(eventName, publisher, userData);
            resolve();
          }, 5000);
        });
        break;
    }
  }
  stringify() {
    this.storage.forEach((v, i) => {
      const sender = v.sender ? v.sender.name : undefined;
      console.table(
        `Subscriber${v.subscriber.name}: event name = "${v.eventName}", sender = ${sender}`
      );
    });
    console.log("\n");
  }
}

export default EventManager;
