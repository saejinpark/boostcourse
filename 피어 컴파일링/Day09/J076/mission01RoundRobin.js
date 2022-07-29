const ProcessQueue = require("./ProcessQueue");

function mission01RoundRobin() {
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

  const myProcessQueue = new ProcessQueue(selectRandomProcesses);

  console.log("\n이 프로그램은 6개의 프로세스(A, B, C, D, E, F) 중 랜덤으로\n");
  selectRandomProcesses.forEach((el, idx) =>
    console.log(`${idx + 1}. 프로세스${el[0]}(${`${el[1]}초`})`)
  );
  console.log(`\n3개를 선택하고 라운드로빈 방식으로 실행합니다.\n`);

  myProcessQueue.init();

  while (myProcessQueue.RunningProcessArray.length) {
    myProcessQueue.executeProgress();
    myProcessQueue.printProgress();
  }

  console.log("\n라운드로빈 방식 스케줄링이 종료되었습니다.");
  console.log(`평균 대기시간 = ${myProcessQueue.printAverageWaitingTime()}`);
  console.log(`평균 반환시간 = ${myProcessQueue.printAverageReturnTime()}`);
}

mission01RoundRobin();
