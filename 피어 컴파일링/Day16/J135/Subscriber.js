import EventManager from "./EventManager.js";

class Subscriber {
  constructor(name) {
    this.name = name;
  }
  subscribe(eventName, publisher, handler) {
    const eventManager = new EventManager().sharedInstance();
    eventManager.add(this, eventName, publisher, handler);
  }
}

export default Subscriber;
