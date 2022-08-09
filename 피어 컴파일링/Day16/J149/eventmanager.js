let instance;
import Event from "./event.js";
import Publisher from "./publisher.js";
import {Subscriber} from "./subscriber.js";
import { Worker, setEnvironmentData, isMainThread } from "worker_threads";


export default class EventManager {
    constructor() {
        if(instance) return instance;
        this.subscribers = [];
        //this.eventListeners = []; // [Subscriber, eventName, Publisher, callback()]
        instance = this;
    }
    
    sharedInstance() { return instance; }
    
    add(subscriber, eventName, sender, handler, emitter = 0) {
        // subscriber : instance of class Subscriber
        // eventName : String, ""
        // sender : instance of class Publisher
        // handler : function(event) { ... }
        // emitter : Sync(0, default) Async(1) Delay(over 1, ~ms)


        //테스트용 기본 closure
        if(!handler) handler = (e) => {
            let completed = false;
            console.log('@subscriber' + ": " + e.eventName + " event from " + e.sender.name ?? '' + " userData = " + JSON.stringify(e.userData));
            completed = true;
            return completed;
        }
        //if(!handler) handler = (e) => console.log(e);
        
        let row = [subscriber, eventName, sender, handler.toString(), emitter]; // [Subscriber, eventName, Publisher, callback(eventName)]
        //subscriber.addEvent(eventName, handler);


        this.subscribers.push(row);
    }
    
    remove(subscriber) {
        if(typeof(subscriber) === String) {
            for(var i=0; i<this.subscribers.length; i++) {
                if(this.subscribers[i][0].name === subscriber.name) {
                    //this.subscribers[i][0].delEvent(this.subscribers[i][1]);
                    this.subscribers.splice(i, 1);
                }
            }
        } else {
            for(var i=0; i<this.subscribers.length; i++) {
                if(this.subscribers[i][0].name === subscriber.name) {
                    //this.subscribers[i][0].delEvent(this.subscribers[i][1]);
                    this.subscribers.splice(i, 1);
                }
            }
        }
    }

    async postEvent(eventName, sender, userData, flag = 0, completed = false) {
        const e = new Event(eventName, sender, userData);
        // flag : Sync(0, default) Async(1) Delay(over 1, ~ms)
        
        setEnvironmentData('subs', this.subscribers);

        if(flag == 0) {
            completed = true;
            const w = new Worker('./subshandler.js', {workerData : e});
            console.log(eventName + ' post completed.');
            return completed;
        }
        return new Promise(async (resolve) => {
            if(flag > 1) {
                await this.wait(flag);
                const w = new Worker('./subshandler.js', {workerData : e});
                w.on("exit", () => resolve(this.handleThreadExit(eventName)))
            } else {
                const w = new Worker('./subshandler.js', {workerData : e});
                if(flag == 1) w.on("exit", () => resolve(this.handleThreadExit(eventName)))
            }
        })    
    }
    
    handleThreadExit(eventName) {
        let completed = true;
        console.log(eventName + ' post completed.');
        return completed;
    }

    wait(ms) { return new Promise ((r) => setTimeout(r, ms)) }

    stringify() {
        const table = [];
        this.subscribers.forEach(el => {
            table.push({'Subscriber': el[0], 'Event Name':el[1], 'Sender': el[2]});
        })
        console.table(table);
        
    }
}