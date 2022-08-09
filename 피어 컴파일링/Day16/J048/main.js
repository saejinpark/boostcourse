// 이벤트 이름과 발행 객체 조건을 모두 확인할 수 있도록 실행하는 프로그램
import { Subscriber } from "./subscriber.js";
import { Publisher } from "./publisher.js";
import { EventManager } from "./eventManager.js";

const main = () => {
  const eventManager = new EventManager();

  const subscriberA = new Subscriber("subscriberA");
  const subscriberB = new Subscriber("subscriberB");
  const subscriberC = new Subscriber("subscriberC");
  const subscriberD = new Subscriber("subscriberD");

  const albumModel = new Publisher("albumModel");
  const albumView = new Publisher("albumView");
  const albumController = new Publisher("albumController");
  const albumImage = new Publisher("albumImage");
  const allPublisher = new Publisher(undefined);

  albumModel.add("ModelDataChanged", (param) => param);
  albumView.add("AllDataChanged", (param) => param);
  albumView.add("SectionDataChanged", (param) => param);
  albumController.add("DidShakeMotion", (param) => param);
  albumController.add("AllDataChanged", (param) => param);
  albumImage.add("ImageDataChanged", (param) => param);

  eventManager.add(
    subscriberA,
    "ModelDataChanged",
    albumModel,
    albumModel.events.get("ModelDataChanged")
  );
  eventManager.add(subscriberB, "", albumView, "");
  eventManager.add(
    subscriberC,
    "DidShakeMotion",
    albumController,
    albumController.events.get("DidShakeMotion")
  );
  eventManager.add(subscriberC, "AllDataChanged", undefined, (param) => param);
  eventManager.add(subscriberD, "", undefined, "");

  albumModel
    .callEvent(eventManager, "ModelDataChanged", { data: "abc" })
    .forEach((ele) => console.log(ele));
  albumView
    .callEvent(eventManager, "ViewUpdated", { view: "xxx" })
    .forEach((ele) => console.log(ele));
  albumController
    .callEvent(eventManager, "DidShakeMotion", { from: "blue" })
    .forEach((ele) => console.log(ele));
  allPublisher
    .callEvent(eventManager, "AllDataChanged", undefined)
    .forEach((ele) => console.log(ele));
  eventManager.remove(subscriberD);
  allPublisher
    .callEvent(eventManager, "AllDataChanged", undefined)
    .forEach((ele) => console.log(ele));

  // albumController.createWorker(() => {
  //   return albumController.callEvent(eventManager, "DidShakeMotion", {
  //     from: "blue",
  //   });
  // });
  // createWorker(() => {
  //   return albumModel.callEvent(eventManager, "ModelDataChanged", {
  //     data: "abc",
  //   });
  // });
  // createWorker(() => {
  //   return albumView.callEvent(eventManager, "ViewUpdated", { view: "xxx" });
  // });
  // createWorker(() => {
  //   return albumController.callEvent(eventManager, "DidShakeMotion", {
  //     from: "blue",
  //   });
  // });
  // createWorker(() => {
  //   return allPublisher.callEvent(eventManager, "AllDataChanged", undefined);
  // });
  // createWorker(() => {
  //   return eventManager.remove(subscriberD);
  // });
  // createWorker(() => {
  //   return allPublisher.callEvent(eventManager, "AllDataChanged", undefined);
  // });
};

main();
