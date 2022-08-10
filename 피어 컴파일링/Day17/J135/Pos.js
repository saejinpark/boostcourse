import * as readline from "readline";
import menuArray from "./Menu.js";
import { MenuOrder, Order } from "./OrderObj.js";
import Count from "./Settings.js";

class Pos {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.queue = [];
    this.orderNumber = 1;
  }
  async init() {
    const questions = ["요리사가 몇 명 있나요? ", "배달 기사가 몇 명 있나요? "];
    const answers = [];
    for (let i = 0; i < questions.length; i++) {
      const res = await new Promise((resolve, reject) => {
        this.rl.question(questions[i], (answer) => {
          resolve(Number(answer));
        });
      });
      answers.push(res);
    }

    Count.CHEF = answers[0];
    Count.RIDER = answers[1];

    console.log(
      `현재 요리사는 ${Count.CHEF}명, 배달 기사는 ${Count.RIDER}명 입니다.`
    );
  }
  showMenu() {
    let string = "> 메뉴: ";
    for (let i = 0; i < menuArray.length; i++) {
      const { name, time } = menuArray[i];
      string += `${i + 1}. ${name}(${time}min)    `;
    }
    console.log(string);
    console.log(
      "> 고객별로 주문할 음식 개수를 입력하세요. 예) A 고객, 라면 2개, 떡볶이 1개 => A, 1:2, 2:1"
    );
  }
  receiveOrder() {
    this.rl.prompt("> ");
    this.rl.on("line", (line) => {
      this.checkAndReform(line);
    });
  }
  checkAndReform(input) {
    if (/(.)(\,(\s?[0-9]):[0-9]){1,}/g.test(input)) {
      const tmp = input
        .split(/(\,\s?)/g)
        .filter((string) => !string.includes(","));
      const name = tmp[0];
      const orderObj = new Order(this.orderNumber++, name);
      for (let i = 1; i < tmp.length; i++) {
        const [menuNum, count] = tmp[i].split(":").map((v) => Number(v));
        if (1 <= menuNum && menuNum < menuArray.length + 1) {
          orderObj.pushMenus(new MenuOrder(menuNum, count));
        }
      }
      this.queue.push(orderObj);
    }
  }
}

export default Pos;
