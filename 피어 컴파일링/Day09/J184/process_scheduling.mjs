import Process from "./process.mjs";
import Deadline from "./deadline_scheduling.mjs";
import Static_Priority from "./static_priority_scheduling.mjs";
import RoundRobin from "./round_robin_scheduling.mjs";

const log = console.log;

// 프로세스A : 3초, 프로세스B : 5초, 프로세스C : 7초, 프로세스D : 10초, 프로세스E : 15초, 프로세스F : 21초
// 생성자 - name, time(동작 시간), priority, deadline 순
// 필요하다면 만들어 쓰기.
const A = new Process("A", 3, 1, 0);
const B = new Process("B", 5, 1, 0);
const C = new Process("C", 7, 1, 0);
const D = new Process("D", 10, 1, 0);
const E = new Process("E", 15, 1, 0);
const F = new Process("F", 21, 1, 0);

// Deadline Scheduling
// name, time, priority, deadline
const DL_P1 = new Process("P1", 50, 0, 60);
const DL_P2 = new Process("P2", 25, 0, 90);
const DL_P3 = new Process("P3", 7, 0, 20);
// const dl = new Deadline([DL_P1,DL_P2,DL_P3])
// dl.work()

// Static Priority Scheduling
// name, time, priority, deadline
const SP_P1 = new Process("P1", 7, 3, 0);
const SP_P2 = new Process("P2", 25, 1, 0);
const SP_P3 = new Process("P3", 50, 2, 0);
// const sp = new Static_Priority([SP_P1,SP_P2,SP_P3]);
// sp.work()

// Round Robin Scheduling
// name, time. priority, deadline
const RR_P1 = new Process("P1", 50, 0, 0);
const RR_P2 = new Process("P2", 25, 0, 0);
const RR_P3 = new Process("P3", 7, 0, 0);
// const rr = new RoundRobin([RR_P1,RR_P2,RR_P3]);
// rr.work()

const rr2 = new RoundRobin([A,B,C]);
rr2.work()