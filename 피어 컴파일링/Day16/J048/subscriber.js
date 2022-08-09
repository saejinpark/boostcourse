class Subscriber {
  static instance;

  constructor(name) {
    this.name = name;
    // sender : [events] 구조
    this.senders = {};
  }

  addSenderAndEvent(eventName, sender, handler) {
    if (sender === undefined) {
      this.senders["all"] = new Map([[eventName, handler]]);
      return;
    }
    if (this.senders.hasOwnProperty(sender.name)) {
      this.senders[sender.name].set(eventName, handler);
    } else {
      this.senders[sender.name] = new Map([[eventName, handler]]);
    }
  }

  // handler를 실행시키지 않아서 실행시켜야 함!!
  eventHandling(event) {
    if (event.sender === undefined) event.sender = { name: "dummy" };
    if (event.userData === undefined) event.userData = {};
    // console.log(
    //   `${this.name}: ${event.name} event from ${
    //     event.sender.name
    //   } userData = ${JSON.stringify(event.userData)}`
    // );
    return `${this.name}: ${event.name} event from ${
      event.sender.name
    } userData = ${JSON.stringify(event.userData)}`;
  }
}

export { Subscriber };
