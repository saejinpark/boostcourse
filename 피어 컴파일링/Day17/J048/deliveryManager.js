import { Queue } from "./queue.js";
class DeliveryManager {
  constructor(chefs, deliveryDrivers, orders, customers, pos) {
    this.chefs = chefs;
    this.deliveryDrivers = deliveryDrivers;
    this.orders = orders;
    this.customers = customers;
    this.pos = pos;
    // this.dashboard = dashboard;
  }

  async addOrderToWaiting(customerName, orders) {
    // [메뉴명, 갯수]
    orders.forEach(([menuIdx, menuCnt]) => {
      for (let i = 0; i < menuCnt; i++) {
        this.orders.addWaiting(menuIdx);
        if (!this.customers.hasOwnProperty(customerName)) {
          this.customers[customerName] = new Queue();
        }
        this.customers[customerName].addWaiting(menuIdx);
      }
    });
    if (this.chefs.every((chef) => chef.now.isEmpty())) {
      await this.checkWaiting();
      this.pos.close();
    }
  }

  async checkWaiting() {}

  async makeChefCook() {
    // 요리할 메뉴
    let menu = this.orders.waiting.removeWaiting();
    // 셰프 찾기
    // this.dashboard.display();
    // await this.chef.startCooking(menu);
  }

  moveCookingToDone() {
    this.done.addMenu(this.cooking.removeMenu());
  }
}
export { DeliveryManager };
