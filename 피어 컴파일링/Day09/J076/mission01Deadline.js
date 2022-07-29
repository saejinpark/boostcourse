const ProcessQueueDeadline = require("./ProcessQueueDeadline");

function mission01Deadline() {
  const processArray = [
    ["A", 3, 20],
    ["B", 5, 20],
    ["C", 7, 20],
    ["D", 10, 30],
    ["E", 15, 30],
    ["F", 21, 30],
  ];
  const selectRandomProcesses = [];

  while (selectRandomProcesses.length < 3) {
    const processRandomIdx = Math.floor(Math.random() * processArray.length);
    selectRandomProcesses.push(...processArray.splice(processRandomIdx, 1));
  }

  const myProcessQueue = new ProcessQueueDeadline(selectRandomProcesses);

  console.log("\n이 프로그램은 6개의 프로세스(A, B, C, D, E, F) 중 랜덤으로\n");
  selectRandomProcesses.forEach((el, idx) =>
    console.log(
      `${idx + 1}. 프로세스${el[0]}(${`${el[1]}초`}, 기한: ${el[2]}초)`
    )
  );
  console.log(`\n3개를 선택하고 Deadline 방식으로 실행합니다.\n`);

  myProcessQueue.init();

  while (myProcessQueue.RunningProcessArray.length) {
    myProcessQueue.executeProgress();
    myProcessQueue.printProgress();
  }

  console.log("\nDeadline 방식 스케줄링이 종료되었습니다.");
  console.log(`평균 대기시간 = ${myProcessQueue.printAverageWaitingTime()}`);
  console.log(`평균 반환시간 = ${myProcessQueue.printAverageReturnTime()}`);
}

mission01Deadline();
