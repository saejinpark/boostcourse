import EventManager from "./eventmanager.js";
import Publisher from "./publisher.js";
import {Subscriber} from "./subscriber.js";

const m = new EventManager();
const a = new Subscriber('subscriberA');
const b = new Subscriber('subscriberB');
const c = new Subscriber('subscriberC');
const d = new Subscriber('subscriberD');
const p1 = new Publisher('albumModel');
const p2 = new Publisher('albumView');
const p3 = new Publisher('albumController');


// 기본 subscriber들 입력
m.add(a, 'ModelDataChanged', p1, (e) => {
    console.log('@subscriber' + ": " + e.eventName + " event from " + (e.sender ? e.sender.name : 'undefined') + " userData = " + JSON.stringify(e.userData))
});
    

m.add(b, '', p2, (e) => {
    console.log('@subscriber' + ": " + e.eventName + " event from " + (e.sender ? e.sender.name : 'undefined') + " userData = " + JSON.stringify(e.userData))
});
    

m.add(c, 'DidShakeMotion', p3, (e) => {
    console.log('@subscriber' + ": " + e.eventName + " event from " + (e.sender ? e.sender.name : 'undefined') + " userData = " + JSON.stringify(e.userData))
});
    

m.add(c, 'AllDataChanged', undefined, (e) => {
    console.log('@subscriber' + ": " + e.eventName + " event from " + (e.sender ? e.sender.name : 'undefined') + " userData = " + JSON.stringify(e.userData))
});
    

m.add(d, '', undefined, (e) => {
    console.log('@subscriber' + ": " + e.eventName + " event from " + (e.sender ? e.sender.name : 'undefined') + " userData = " + JSON.stringify(e.userData))
});
    



m.stringify();



m.postEvent("ModelDataChanged", p1, {"data" : "abc"}, 1000);


m.postEvent("ViewUpdated", p2, {"view" : "xxx"}, 1);

m.postEvent("DidShakeMotion", p3, {"from" : "blue"}, 0);

m.postEvent("AllDataChanged", undefined, {"type" : "delay"}, 500);

m.postEvent("AllDataChanged", undefined, {"type" : "async"}, 1);
