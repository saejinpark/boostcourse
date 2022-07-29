import { parentPort, workerData } from 'worker_threads';
const log = console.log;


parentPort.once('message', (value) => {
    const data = value;
    log("data", data);
    parentPort.postMessage(data + 2); // 스레드 하나당 2초 감소
    parentPort.close()
} )

