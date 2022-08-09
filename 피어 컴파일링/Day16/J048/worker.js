import { parentPort } from "worker_threads";

parentPort.on("message", (closure) => {
  parentPort.postMessage(closure);
  parentPort.close();
});
