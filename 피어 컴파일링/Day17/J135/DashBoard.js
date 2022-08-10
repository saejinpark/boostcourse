import menuArray from "./Menu.js";

class DashBoard {
  constructor(orderQueue) {
    this.orderQueue = orderQueue;
  }
  getWaiting() {
    const currQueue = [];
    for (let obj of this.orderQueue.queue) {
      const { orderNumber, customer, menuNum } = obj;
      const { name, time } = menuArray[menuNum - 1];
      currQueue.push(`${customer}${orderNumber}${name}`);
    }
    return `/${currQueue.join(",")}/`;
  }
  printScreen(msg) {
    const { type, content } = msg;
    const currQueue = this.getWaiting();
    switch (type) {
      case "default":
        console.log(content);
        break;

      case "start":
        console.log(`\n${content} 시작`);
        break;

      case "progress":
        console.log(`${content} ${currQueue}`);
        break;

      case "end":
        console.log(`${content} 완성`);
    }
  }
}

export default DashBoard;
