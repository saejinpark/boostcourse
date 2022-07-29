import {parentPort, isMainThread, workerData} from "worker_threads";
import {setTimeout} from 'timers/promises'

if (!isMainThread) {
  const data = workerData;
  let name = "";
  parentPort.on("message", async (msg) =>  {
    if (msg.includes("reg.")){
        parentPort.postMessage(`${name=msg.slice(4)} >>> 등록 완료`);
      }
    if (msg.includes("work.")) {
      parentPort.postMessage(`${name} >>> 작업 시작`);
      await setTimeout(data.threadTime);
      parentPort.postMessage(`${name} >>> 작업 완료`);
    }
    if (msg === "close.") {
      parentPort.postMessage(`${name} >>> 스레드 종료 요청`);
      parentPort.close();
    }
  })
}