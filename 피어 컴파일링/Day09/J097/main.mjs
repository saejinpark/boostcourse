import { Scheduler, POLICY } from "./scheduler.mjs";
import { Process } from "./process.mjs";

let testCondition = [
  ["비선점 기한부 스케줄링", POLICY.DEADLINE, false],
  ["비선점 고정 우선순위 스케줄링", POLICY.SPRIORITY, false],
  ["선점 라운드 로빈 스케줄링", POLICY.RROBIN, true]
]

for (const test of testCondition) {

  console.log(test[0], "테스트 시작")

  let scheduler = new Scheduler(test[1], test[2], true, 500, 100);
  let procList = [];
  let selectNumb = 3;

  procList.push(new Process("A", 5, () => console.log("난 A야"), 10, 1));
  procList.push(new Process("B", 7, () => console.log("B 안녕하세융"), 10, 4));
  procList.push(new Process("C", 12, () => console.log("안녕하C세옴"), 3, 6));
  procList.push(new Process("D", 2, () => console.log("으악D"), 3, 7));
  procList.push(new Process("E", 1, () => console.log("커피E?"), 23, 7));
  procList.push(new Process("F", 7, () => console.log("에F"), 60, 3));

  procList = procList.sort(()=>Math.random() - 0.5).slice(0, selectNumb);

  for (let proc of procList)
    scheduler.push(proc);

  await scheduler.simulate();

  console.log(test[0], "테스트 종료")
}