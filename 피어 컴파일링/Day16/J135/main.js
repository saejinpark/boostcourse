import EventManager from "./EventManager.js";
import Publisher from "./Publisher.js";
import Subscriber from "./Subscriber.js";

const eventManager = new EventManager().sharedInstance();

const subscriberA = new Subscriber("A");
const subscriberB = new Subscriber("B");
const subscriberC = new Subscriber("C");
const subscriberD = new Subscriber("D");

const albumModel = new Publisher("albumModel");
const albumView = new Publisher("albumView");
const albumController = new Publisher("albumController");
const dummy = new Publisher("dummy");

albumModel.addEvent("ModelDataChanged");
albumView.addEvent("ViewUpdated");
albumController.addEvent("DidShakeMotion");
dummy.addEvent("AllDataChanged");

const printEvent = (subscriber, event) =>
  console.log(
    `Subscriber${subscriber.name}: ${event.eventName} event from ${
      event.publisher.name
    } userData = ${JSON.stringify(event.userData)}\n`
  );

subscriberA.subscribe("ModelDataChanged", albumModel, printEvent);
subscriberB.subscribe("", albumView, printEvent);
subscriberC.subscribe("DidShakeMotion", albumController, printEvent);
subscriberC.subscribe("AllDataChanged", undefined, printEvent);
subscriberD.subscribe("", undefined, printEvent);

eventManager.stringify();

albumModel.publish("ModelDataChanged", { data: "abc" });
albumView.publish("ViewUpdated", { view: "xxx" });
albumController.publish("DidShakeMotion", { from: "blue" });
dummy.publish("AllDataChanged", undefined);

eventManager.remove(subscriberD);

eventManager.postEvent("AllDataChanged", dummy, undefined);
