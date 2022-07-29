const { Worker, parentPort } = require("worker_threads");

function runService(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./service.js", { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error("Worker stopped with exit code ${code}"));
    });
  });
}

function makeThreadPool(threadsNo) {
  const threadPool = [];
  for (let i = 0; i < threadsNo; i++) {
    threadPool.push(runService(i));
  }
  return threadPool;
}

async function returnFromThreads(threads) {
  let final = await Promise.all(makeThreadPool(threads)).then(
    (values) => values.length
  );
  return final;
}
(async () => {
  let my = await returnFromThreads(4);
  console.log(my);
})();

exports.returnFromThreads = returnFromThreads;
