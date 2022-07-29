const { workerData, parentPort } = require("worker_threads");

const data = workerData;
setTimeout(() => parentPort.postMessage(data.capacity), 200);
