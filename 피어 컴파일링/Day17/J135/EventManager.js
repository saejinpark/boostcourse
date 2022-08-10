class EventManager {
  static #instance;
  constructor(subscriber) {
    if (EventManager.#instance) return EventManager.#instance;
    this.subscriber = subscriber;
    EventManager.#instance = this;
  }
  postEvent(msg) {
    this.subscriber.printScreen(msg);
  }
}

export default EventManager;
