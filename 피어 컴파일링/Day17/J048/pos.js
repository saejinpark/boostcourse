import * as readline from "readline";

class POS {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  getOrder(manager) {
    this.rl.on("line", (order) => {
      try {
        let [menuIdx, orderCnt] = this.#checkOrderFormat(order);
        // 할 행동 - 매니저한테 보내기!!
        manager.addOrderToWaiting(menuIdx, orderCnt);
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  getDeliveryOrder(manager) {
    this.rl.on("line", (order) => {
      try {
        let [customerName, orders] = this.#checkDeliveryOrderFormat(order);
        manager.addOrderToWaiting(customerName, orders);
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  #checkOrderFormat(order) {
    const format = /^([0-9]):([0-9]+)/;
    // 형식 검사하고 싶은데 못하겠음ㅜㅡㅜ
    if (!format.test(order)) {
      throw new Error("잘못된 입력 형식입니다.");
    } else {
      let formatted = order.match(format);
      return [formatted[1], formatted[2]];
    }
  }

  #checkDeliveryOrderFormat(order) {
    const format = /^([A-Z]),(?: ([0-9]:[0-9]),*)+/;
    if (!format.test(order)) {
      throw new Error("잘못된 입력 형식입니다.");
    } else {
      let splitted = order.split(",");
      let orders = [];
      order
        .split(", ")
        .splice(1)
        .forEach((ele) => {
          orders.push(ele.split(":"));
        });
      return [splitted[0], orders];
    }
  }
  close() {
    this.rl.close();
  }
}

export { POS };
