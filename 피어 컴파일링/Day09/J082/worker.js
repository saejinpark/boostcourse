import { parentPort } from "worker_threads";

parentPort.on("message", (value) => {
    console.log(value);
    parentPort.postMessage(`<-- ${value.match(/\(.*\)/g)[0]} 작업 끝`);
});
