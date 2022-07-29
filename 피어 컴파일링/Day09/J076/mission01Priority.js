const ProcessQueuePriority = require("./ProcessQueuePriority");

// 우선순위의 경우
// 1초마다 프로세스를 바꿀 때 -> 남아있는 프로세스들 중 가장 우선순위가 높은 것을 선택!

function mission01Priority() {
  const processArray = [
    ["A", 3, 5],
    ["B", 5, 3],
    ["C", 7, 6],
    ["D", 10, 1],
    ["E", 15, 4],
    ["F", 21, 2],
  ];
  const selectRandomProcess = [];

  while (selectRandomProcess.length < 3) {
    const processRandomIdx = Math.floor(Math.random() * processArray.length);
    selectRandomProcess.push(...processArray.splice(processRandomIdx, 1));
  }

  const sortSelectedProcess = selectRandomProcess.sort((a, b) => a[2] - b[2]);
  console.log(sortSelectedProcess);

  const myProcessQueue = new ProcessQueuePriority(selectRandomProcess);

  console.log("\n이 프로그램은 6개의 프로세스(A, B, C, D, E, F) 중 랜덤으로\n");
  selectRandomProcess.forEach((el, idx) =>
    console.log(
      `${idx + 1}. 프로세스${el[0]}(${`${el[1]}초`}, 우선순위: ${el[2]}위)`
    )
  );
  console.log(`\n3개를 선택하고 Priority 방식으로 실행합니다.\n`);

  myProcessQueue.init();

  while (!myProcessQueue.isDone) {
    myProcessQueue.executeProgress();
    myProcessQueue.printProgress();
  }

  console.log("\nPriority 방식 스케줄링이 종료되었습니다.");
  console.log(`평균 대기시간 = ${myProcessQueue.printAverageWaitingTime()}`);
  console.log(`평균 반환시간 = ${myProcessQueue.printAverageReturnTime()}`);
}

mission01Priority();
