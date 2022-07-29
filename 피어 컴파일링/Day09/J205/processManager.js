const { PROCESS_STATUS, SCHEDULING_TYPE } = require("./enums");
class ProcessManager {
  constructor(processes, schedulingType) {
    this.processes = processes;
    this.schedulingType = schedulingType;

    switch (schedulingType) {
      case SCHEDULING_TYPE.DEADLINE:
        this.switchContext = this.deadline;
        break;
      case SCHEDULING_TYPE.PRIORITY:
        this.switchContext = this.priority;
        break;
      case SCHEDULING_TYPE.ROUND_ROBIN:
        this.switchContext = this.roundRobin;
        break;
      default:
        throw new Error("유효하지 않은 타입입니다.");
    }
  }

  start() {
    this.switchContext();
  }

  async priority() {
    const readyQueue = this.processes
      .map((v, i) => [v, i])
      .sort((a, b) => a[0].priority - b[0].priority)
      .map((v) => v[1]);

    const queue = [readyQueue.shift(), readyQueue.shift()];
    this.display();

    while (queue.length > 0) {
      const poppedIndex = queue.shift();
      await this.processes[poppedIndex].proceedService();
      [...readyQueue, ...queue].map((i) => this.processes[i].wait());
      this.display();
      this.processes[poppedIndex].switchFromRunning();
      if (this.processes[poppedIndex].status !== PROCESS_STATUS.TERMINATED) {
        queue.push(poppedIndex);
      } else {
        if (readyQueue.length > 0) queue.push(readyQueue.shift());
      }
    }
    await this.sleep(200);
    this.display();
    this.end();
  }

  async deadline() {
    const readyQueue = this.processes
      .map((v, i) => [v, i])
      .sort((a, b) => a[0].deadline - b[0].deadline)
      .map((v) => v[1]);

    const queue = [readyQueue.shift(), readyQueue.shift()];

    this.display();

    while (queue.length > 0) {
      const poppedIndex = queue.shift();
      await this.processes[poppedIndex].proceedService();
      [...readyQueue, ...queue].map((i) => this.processes[i].wait());
      this.display();
      this.processes[poppedIndex].switchFromRunning();

      this.processes.forEach((process, i) => {
        if (process.waitingTime + process.proceededTime > process.deadline) {
          process.reset();
        }
      });

      if (this.processes[poppedIndex].status !== PROCESS_STATUS.TERMINATED) {
        queue.push(poppedIndex);
      } else {
        if (readyQueue.length > 0) queue.push(readyQueue.shift());
      }

      this.processes.forEach((process, i) => {
        if (process.waitingTime + process.proceededTime > process.deadline) {
          process.reset();
        }
      });
    }
    await this.sleep(200);
    this.display();
    this.end();
  }

  async roundRobin() {
    const queue = this.processes.map((_, i) => i);
    this.display();

    while (queue.length > 0) {
      const poppedIndex = queue.shift();
      await this.processes[poppedIndex].proceedService();
      queue.map((i) => this.processes[i].wait());
      this.display();
      this.processes[poppedIndex].switchFromRunning();
      if (this.processes[poppedIndex].status !== PROCESS_STATUS.TERMINATED) {
        queue.push(poppedIndex);
      }
    }
    await this.sleep(200);
    this.display();
    this.end();
  }

  end() {
    let str;
    switch (this.schedulingType) {
      case SCHEDULING_TYPE.DEADLINE:
        str = "기한부 ";
        break;
      case SCHEDULING_TYPE.PRIORITY:
        str = "고정 우선순위 ";
        break;
      case SCHEDULING_TYPE.ROUND_ROBIN:
        str = "라운드 로빈 ";
        break;
    }
    str += "방식 스케줄링이 종료되었습니다.\n";

    const waitingTimes = this.processes
      .filter((process) => process.totalTime === process.proceededTime)
      .map((process) => process.getWaitingTime());

    str += `평균 대기시간 = (${waitingTimes.join(" + ")}) / ${
      waitingTimes.length
    } = ${Number(
      waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length
    ).toFixed(1)}sec\n`;

    const returnTime = this.processes
      .filter((process) => process.totalTime === process.proceededTime)
      .map((process) => process.getReturnTime());

    str += `평균 반환시간 = (${returnTime.join(" + ")}) / ${
      returnTime.length
    } = ${Number(
      returnTime.reduce((a, b) => a + b, 0) / returnTime.length
    ).toFixed(1)}sec\n`;

    console.log(str);
  }

  getStatus() {
    const str = this.processes.reduce(
      (prev, curr) => prev + curr.getInfo() + "\n",
      ""
    );
    return str;
  }

  display() {
    console.log("\n" + this.getStatus());
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

module.exports = ProcessManager;
