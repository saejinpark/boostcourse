const { PROCESS_STATUS } = require("./enums");

const { Worker, isMainThread, parentPort } = require("worker_threads");

class Process {
  constructor(name, totalTime, options) {
    this.name = name;
    this.totalTime = totalTime;
    this.status = PROCESS_STATUS.READY;
    this.proceededTime = 0;
    this.waitingTime = 0;
    this.threadCount = 1;
    this.capacity = 1;

    if (options?.deadline) {
      this.deadline = options.deadline;
    }
    if (options?.priority) {
      this.priority = options.priority;
    }
    if (options?.hasThread) {
      this.threadCount = Math.max(1, parseInt(totalTime / 2));
      this.capacity = 2;
    }
  }

  reset() {
    this.status = PROCESS_STATUS.WAITING;
    this.proceededTime = 0;
    this.waitingTime = 0;
  }

  async proceedService() {
    let promises = [];
    for (let i = 0; i < this.threadCount; i++) {
      promises.push(
        new Promise((resolve) => {
          let worker = new Worker("./worker.js", {
            workerData: { capacity: this.capacity },
          });
          
          worker.on("message", (value) => {
            resolve(value);
          });

        })
      );
    }
    const tasks = await Promise.all(promises);
    this.proceed(tasks.reduce((a, b) => a + b, 0));
  }

  proceed(i) {
    if (this.status === PROCESS_STATUS.TERMINATED) return;
    if (this.proceededTime >= this.totalTime) {
      this.terminate();
      return;
    }
    this.status = PROCESS_STATUS.RUNNING;
    this.proceededTime = Math.min(this.proceededTime + i, this.totalTime);
  }

  wait() {
    if (this.status === PROCESS_STATUS.TERMINATED) return;
    this.status = PROCESS_STATUS.WAITING;
    this.waitingTime++;
  }

  terminate() {
    this.status = PROCESS_STATUS.TERMINATED;
  }

  getInfo() {
    let str = `${this.name} `;
    const statusStr = String("(" + this.status + ")").padStart(13, " ");
    str += statusStr + " : ";

    let gauge = "";

    for (let i = 1; i <= this.proceededTime; i++) {
      gauge += "🌝";
    }
    for (let i = 1; i <= this.totalTime - this.proceededTime; i++) {
      gauge += "🌚";
    }
    str += gauge.padEnd(42, " ");

    str += ` ${String(this.proceededTime).padStart(2, " ")} / ${String(
      this.totalTime
    ).padStart(2, " ")} sec`;

    str += ` , waiting ${String(this.waitingTime).padStart(2, " ")} sec`;
    if (this.deadline)
      str += ` , deadline ${String(this.deadline).padStart(2, " ")} sec`;
    if (this.priority) str += ` , priority ${this.priority}`;
    return str;
  }

  switchFromRunning() {
    if (this.proceededTime == this.totalTime) {
      this.terminate();
    } else {
      this.status = PROCESS_STATUS.WAITING;
    }
  }

  getReturnTime() {
    return this.proceededTime + this.waitingTime;
  }

  getWaitingTime() {
    return this.waitingTime;
  }
}

module.exports = Process;
