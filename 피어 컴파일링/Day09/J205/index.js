const Process = require("./process");
const ProcessManager = require("./processManager");
const { SCHEDULING_TYPE } = require("./enums");

/* 첫번째 미션 */

// const A = new Process("A", 3, { priority: 3 });
// const B = new Process("B", 5, { priority: 4 });
// const C = new Process("C", 7, { priority: 1 });
// const D = new Process("D", 10, { priority: 2 });
// const E = new Process("E", 15, { priority: 6 });
// const F = new Process("F", 21, { priority: 5 });
// const processManager1 = new ProcessManager(
//   [A, B, C, D, E, F],
//   SCHEDULING_TYPE.PRIORITY
// );
// processManager1.start();

// const A = new Process("A", 3, { deadline: 40 });
// const B = new Process("B", 5, { deadline: 10 });
// const C = new Process("C", 7, { deadline: 14 });
// const D = new Process("D", 10, { deadline: 20 });
// const E = new Process("E", 15, { deadline: 30 });
// const F = new Process("F", 21, { deadline: 30 });
// const processManager2 = new ProcessManager(
//   [A, B, C, D, E, F],
//   SCHEDULING_TYPE.DEADLINE
// );
// processManager2.start();

// const A = new Process("A", 3);
// const B = new Process("B", 5);
// const C = new Process("C", 7);
// const D = new Process("D", 10);
// const E = new Process("E", 15);
// const F = new Process("F", 21);
// const processManager3 = new ProcessManager(
//   [A, B, C, D, E, F],
//   SCHEDULING_TYPE.ROUND_ROBIN
// );
// processManager3.start();

/* 두번째 미션 */
const processes = [];
for (let i = 0; i < 3; i++) {
  processes.push(
    new Process(`P${i}`, Math.ceil(Math.random() * 10), {
      hasThread: true,
    })
  );
}
const processManager4 = new ProcessManager(
  processes,
  SCHEDULING_TYPE.ROUND_ROBIN
);
processManager4.start();
