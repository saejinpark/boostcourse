import EventManager from "./EventManager.js";

class Manager {
  constructor(chef, time = 5000) {
    this.chef = chef;
    this.time = time;
  }
  run(orderQueue) {
    setInterval(() => {
      this.checkAndCook(orderQueue);
    }, this.time);
  }
  checkAndCook(orderQueue) {
    if (this.chef.status === 0 && orderQueue.queue.length !== 0) {
      const obj = orderQueue.queue.shift();
      this.chef.cook(obj);
    }
  }
}

export default Manager;
