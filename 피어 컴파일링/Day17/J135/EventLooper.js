class EventLooper {
  constructor(from, to, time = 500) {
    this.from = from;
    this.to = to;
    this.time = time;
  }
  popAndPush() {
    if (this.from.queue.length !== 0) {
      const item = this.from.queue.shift();
      this.to.pushItem(item);
    }
  }
  run() {
    setInterval(() => {
      this.popAndPush();
    }, this.time);
  }
}

export default EventLooper;
