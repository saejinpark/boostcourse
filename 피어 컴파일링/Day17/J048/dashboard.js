import { timeStamp } from "console";

class Dashboard {
  constructor(waiting, done, cooking) {
    this.waiting = waiting;
    this.done = done;
    this.cooking = cooking;
  }

  // 입력 넣을때마다 & 3초 마다?
  display() {
    let waitingStr =
      this.waiting.queue.length > 1
        ? this.waiting.queue.reduce((acc, curr) => {
            return `${acc}, ${curr}`;
          })
        : this.waiting.queue[0] ?? "";

    let str = `:${this.cooking.queue[0] ?? ""} /${waitingStr}/`;
    console.log(str);
  }
}

export { Dashboard };
