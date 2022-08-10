class EventLooper {
  constructor() {}

  addOrder(order, waitingQueue) {
    let [menuIdx, menuCnt] = this.formatOrder(order);
    for (let i = 1; i <= menuCnt; i++) {
      waitingQueue.push(menuIdx);
    }
  }
  startCooking(waitingQueue, cook) {
    cook.startCooking(waitingQueue.shift());
  }

  formatOrder(order) {
    const format = /^([0-9]):([0-9]+)/;
    console.log(order);
    let groups = order.match(format);
    return [groups[1], groups[2]];
  }
}

export { EventLooper };
