import EventManager from "./EventManager.js";

class Publisher {
  constructor(name) {
    this.name = name;
    this.events = new Set();
  }
  addEvent(event) {
    this.events.add(event);
  }
  publish(event, userData, queue) {
    if (this.events.has(event)) {
      const eventManager = new EventManager().sharedInstance();
      eventManager.postEventQueue(event, this, userData, queue);
    }
  }
  stringify() {
    console.log(`Publisher ${this.name}'s Event : ${this.events}\n`);
  }
}

export default Publisher;
