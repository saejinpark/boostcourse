import { parentPort } from "worker_threads";

parentPort.on("message", ({ storage, eventName, publisher }) => {
  const condition1 = (v) =>
    v.eventName === eventName && v.sender === publisher.name;
  const condition2 = (v) => v.eventName === eventName && v.sender === undefined;
  const condition3 = (v) => v.eventName === "" && v.sender === publisher.name;
  const condition4 = (v) => v.eventName === "" && v.sender === undefined;

  storage.forEach((v) => {
    if (condition1(v) || condition2(v) || condition3(v) || condition4(v)) {
      parentPort.postMessage(v);
    }
  });

  parentPort.close();
});
