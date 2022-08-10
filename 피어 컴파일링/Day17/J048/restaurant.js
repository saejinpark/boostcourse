import { POS } from "./pos.js";
import { Queue } from "./queue.js";
import { Dashboard } from "./dashboard.js";
import { Manager } from "./manager.js";
import { Chef } from "./chef.js";
// 대시보드에서는 뭘 관리하나요~?ㅜㅜ
class Restaurant {
  constructor(menu) {
    this.menu = menu;
    this.pos = new POS();
    this.waitingQueue = new Queue();
    this.doneQueue = new Queue();
    this.cooking = new Queue();
    this.dashboard = new Dashboard(
      this.waitingQueue,
      this.doneQueue,
      this.cooking
    );
    this.chef = new Chef(menu);
    this.manager = new Manager(
      this.waitingQueue,
      this.doneQueue,
      this.cooking,
      this.chef,
      this.pos,
      this.dashboard
    );
  }

  async open() {
    console.log(
      "메뉴 = 1. 라면(3분) 2. 떡볶이(7분) 3. 닭볶음탕(15분) 4. 갈비찜(20분)"
    );
    console.log("주문할 음식을 입력하세요. 예) 라면 2개 => 1:2");
    this.pos.getOrder(this.manager);
    setInterval(() => this.dashboard.display(), 5000);
  }
}

export { Restaurant };
