import { POS } from "./pos.js";
import { Queue } from "./queue.js";
import { Dashboard } from "./dashboard.js";
import { DeliveryManager } from "./deliveryManager.js";
import { Chef } from "./chef.js";
import { DeliveryDriver } from "./deliveryDriver.js";
// 대시보드에서는 뭘 관리하나요~?ㅜㅜ
class DeliveryRestaurant {
  constructor(menu, chefNum, deliveryNum) {
    this.menu = menu;
    this.chefNum = chefNum;
    this.deliveryNum = deliveryNum;
    // this.dashboard = new Dashboard();
    this.pos = new POS();
    this.chefs = [];
    this.deliveryDrivers = [];
    this.orders = new Queue();
    this.customers = {};
    this.manager = [];
    this.init();
  }
  init() {
    for (let i = 0; i < this.chefNum; i++) this.chefs.push(new Chef());
    for (let i = 0; i < this.deliveryNum; i++) {
      this.deliveryDrivers.push(new DeliveryDriver());
    }
    this.manager = new DeliveryManager(
      this.chefs,
      this.deliveryDrivers,
      this.orders,
      this.customers,
      this.pos
    );
  }

  async open() {
    console.log(
      `현재 요리사는 ${this.chefNum}명, 배달 기사는 ${this.deliveryNum}명입니다.`
    );
    console.log(
      "메뉴 = 1. 라면(3분) 2. 떡볶이(7분) 3. 닭볶음탕(15분) 4. 갈비찜(20분)"
    );
    console.log(
      "주문할 음식을 입력하세요.예) A고객, 라면 2개, 떡볶이 1개 => A, 1:2, 2:1"
    );
    this.pos.getDeliveryOrder(this.manager);
  }
}

export { DeliveryRestaurant };
