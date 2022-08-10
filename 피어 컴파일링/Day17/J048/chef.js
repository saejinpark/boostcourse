import { Queue } from "./queue.js";

class Chef {
  constructor(menu) {
    this.menu = menu;
    this.now = new Queue();
  }

  async startCooking(menuIdx) {
    let [menuName, cookTime] = Object.entries(this.menu[menuIdx])[0];
    console.log(`${menuName} 시작`);
    return this.#cooking(cookTime, menuName);
  }

  #cooking(sec, menu) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`${menu} 완성`);
        resolve();
      }, sec * 1000);
    });
  }
}

export { Chef };
