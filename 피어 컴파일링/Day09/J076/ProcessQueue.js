const Process = require("./Process");
const PriorityQueue = require("./PriorityQueue");

function ProcessQueue(processListArr) {
  this.firstProcess = new Process(processListArr[0], 0);
  this.secondProcess = new Process(processListArr[1], 1);
  this.thirdProcess = new Process(processListArr[2], 2);
  this.isDone = false;

  this.AllProcessArray = [
    this.firstProcess,
    this.secondProcess,
    this.thirdProcess,
  ];

  this.RunningProcessArray = [
    this.firstProcess,
    this.secondProcess,
    this.thirdProcess,
  ];

  this.targetPointer = 0;

  // init: 초기화 함수
  this.init = function () {
    this.RunningProcessArray.forEach((process) => {
      console.log(
        `${process.processName}(${process.status}), ${process.currentProgress} / ${process.timeToTerminate}sec`
      );
    });
    console.log(".");
  };

  // executeProgress: 진행될 때마다 실행되는 함수
  this.executeProgress = function () {
    for (let idx = 0; idx < this.RunningProcessArray.length; idx++) {
      const process = this.RunningProcessArray[idx];

      // 현재 진행상황이 끝날 때까지의 시간과 같은 경우 -> terminate
      if (process.currentProgress === process.timeToTerminate) {
        process.status = "terminated";
        this.RunningProcessArray.splice(idx, 1);
        idx--;
      }

      // terminated 상태가 아니고, 타겟 프로세스인 경우 -> running
      if (
        process.status !== "terminated" &&
        this.RunningProcessArray[idx] ===
          this.AllProcessArray[this.targetPointer]
      ) {
        process.status = "running";
        process.currentProgress++;
      }

      // terminated 상태가 아니고, 타겟 프로세스가 아닌 경우 -> waiting
      if (
        this.RunningProcessArray[idx] !==
          this.AllProcessArray[this.targetPointer] &&
        process.status !== "terminated"
      ) {
        process.status = "waiting";
        process.waitingTime++;
      }
    }

    // targetPointer를 이동시킴
    do {
      this.targetPointer++;
      if (this.targetPointer > this.AllProcessArray.length - 1) {
        this.targetPointer = 0;
      }
    } while (
      this.AllProcessArray[this.targetPointer].status === "terminated" &&
      this.RunningProcessArray.length
    );

    // 종료해야 될 경우 isDone을 true로 변경
    if (!this.RunningProcessArray.length) this.isDone = true;
    return;
  };

  // 현재 상황 진행 중인 경우 출력
  this.printProgress = function () {
    this.AllProcessArray.forEach((process) =>
      console.log(
        `${process.processName}(${process.status}), ${process.currentProgress} / ${process.timeToTerminate}sec , waiting ${process.waitingTime} sec`
      )
    );
    console.log(".");
  };

  // 평균 대기시간 리턴
  this.printAverageWaitingTime = () =>
    `(${this.firstProcess.waitingTime} + ${this.secondProcess.waitingTime} + ${
      this.thirdProcess.waitingTime
    }) / 3 = ${(
      (this.firstProcess.waitingTime +
        this.secondProcess.waitingTime +
        this.thirdProcess.waitingTime) /
      3
    ).toFixed(1)}sec`;

  this.printAverageReturnTime = function () {
    const firstProcessReturnTime =
      this.firstProcess.waitingTime + this.firstProcess.timeToTerminate;
    const secondProcessReturnTime =
      this.secondProcess.waitingTime + this.secondProcess.timeToTerminate;
    const thirdProcessReturnTime =
      this.thirdProcess.waitingTime + this.thirdProcess.timeToTerminate;
    const averageProcessReturnTime = (
      (firstProcessReturnTime +
        secondProcessReturnTime +
        thirdProcessReturnTime) /
      3
    ).toFixed(1);

    return `(${firstProcessReturnTime} + ${secondProcessReturnTime} + ${thirdProcessReturnTime}) / 3 = ${averageProcessReturnTime}sec`;
  };
}

module.exports = ProcessQueue;
