import { Publisher } from "./publisher.js";
class EventManager {
  static instance;

  constructor() {
    this.subscribers = new Map();
    this.dataStructure = [];
    if (EventManager.instance) return EventManager.instance;
    return (EventManager.instance = this);
  }

  add(subscriber, eventName, sender, handler) {
    sender = this.checkUndefinedSender(sender);

    subscriber.addSenderAndEvent(eventName, sender, handler);
    if (!this.subscribers.has(subscriber.name)) {
      this.subscribers.set(subscriber.name, subscriber);
    }

    this.dataStructure.push([sender, eventName, subscriber]);
    this.sortDataStructure();
  }

  remove(subscriber) {
    this.subscribers.delete(subscriber.name);
    this.dataStructure = this.dataStructure.filter(
      ([, , compareSubscriber]) => compareSubscriber.name !== subscriber.name
    );
  }

  // 구조를 못 잡겠다...ㅜㅜㅜ
  postEvent(eventName, sender, userData) {
    let returns = [];
    sender = this.checkUndefinedSender(sender);

    let event = { name: eventName, sender: sender, userData: userData };

    this.dataStructure.forEach(([compareSender, compareEvent, subscriber]) => {
      if (
        compareSender.name === sender.name &&
        (compareEvent === eventName || compareEvent === "")
      ) {
        returns.push(subscriber.eventHandling(event));
      } else if (compareSender.name === "" && compareEvent === "") {
        returns.push(subscriber.eventHandling(event));
      }
    });
    return returns;
  }

  stringify() {
    let idx = 1;
    this.subscribers.forEach((subscriber) => {
      for (let key in subscriber.senders) {
        console.log(
          `Subscriber#${idx++} : event name = "${
            [...subscriber.senders[key]][0][0]
          }", sender = ${key === "all" ? undefined : key}`
        );
      }
    });
  }

  sortDataStructure() {
    this.dataStructure.sort((a, b) =>
      a[0].name < b[0].name ? 1 : a[0].name > b[0].name ? -1 : 0
    );
  }

  addDataStructure() {
    this.dataStructure.push([sender, eventName, subscriber]);
    this.sortDataStructure();
  }

  checkUndefinedSender(sender) {
    sender = sender === undefined ? new Publisher(undefined) : sender;
    if (sender.name === undefined) sender.name = "";
    return sender;
  }
}

export { EventManager };
