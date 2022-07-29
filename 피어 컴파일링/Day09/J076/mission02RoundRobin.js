const myWorkerQueue = require("./ProcessQueueWorker");
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

function mission02RoundRobin() {
  const processArray = [
    ["A", 3],
    ["B", 5],
    ["C", 7],
    ["D", 10],
    ["E", 15],
    ["F", 21],
  ];
  const selectRandomProcesses = [];

  while (selectRandomProcesses.length < 3) {
    const processRandomIdx = Math.floor(Math.random() * processArray.length);
    selectRandomProcesses.push(...processArray.splice(processRandomIdx, 1));
  }

  const myProcessQueue = new myWorkerQueue(selectRandomProcesses);

  if (isMainThread) {
    let totalThreads = 0;

    console.log("\n이 프로그램은");
    selectRandomProcesses.forEach((el, idx) => {
      console.log(
        `${idx + 1}. 프로세스${el[0]} - 스레드 ${Math.floor(el[1] / 2)}개`
      );
      totalThreads += Math.floor(el[1] / 2);
    });
    console.log(`총 스레드는 ${totalThreads}개입니다.\n`);
  }

  while (myProcessQueue.RunningProcessArray.length) {
    if (isMainThread) {
      (async () => {
        await myProcessQueue.executeProgress();
      })();
      myProcessQueue.printProgress();
    }
  }

  // console.log("\n라운드로빈 방식 스케줄링이 종료되었습니다.");
  // console.log(`평균 대기시간 = ${myProcessQueue.printAverageWaitingTime()}`);
  // console.log(`평균 반환시간 = ${myProcessQueue.printAverageReturnTime()}`);
}

mission02RoundRobin();
