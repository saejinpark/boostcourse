class Queue {
  constructor() {
    this.queue = [];
    this.waiting = [];
    this.done = [];
  }
  addMenu(menu) {
    this.queue.push(menu);
  }
  removeMenu() {
    return this.queue.shift();
  }
  isEmpty() {
    return Array.isArray(this.queue) && this.queue.length === 0;
  }
  addWaiting(menu) {
    this.waiting.push(menu);
  }
  removeWaiting() {
    return this.waiting.shift();
  }
  addDone(menu) {
    this.done.push(menu);
  }
  removeDone() {
    return this.done.shift();
  }
  isDoneEmpty() {
    return Array.isArray(this.done) && this.done.length === 0;
  }
  isWaitingEmpty() {
    return Array.isArray(this.waiting) && this.waiting.length === 0;
  }
}
export { Queue };
