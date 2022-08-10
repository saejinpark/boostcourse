import Emitter from "./emitter.js";
import { timePerMinute } from "./global.js";

function wait(ms) { return new Promise((r) => setTimeout(r, ms))}

export default class Delivery {
    name = 'Delivery';
    status = 0; // wait(0), working(1)
    goal = 10;
    progress = 0;

    event;
    customerName = '';
    
    emitter;

    constructor(name) {
        this.emitter = new Emitter();
        if(name) this.name = name;
    }
    
    startJob(e) {
        // eventName, sender, data
        if(this.status !== 0) {
            return -1;
        }
        this.event = e;
        this.customerName = e.data.name;
        console.log(this.name + "가 다음 손님에게 배달을 시작합니다... " + e.data.name);
        this.emitter.emit('startDelivery', this, {name : e.data.name})
        this.doJob(e);
        return 0;
    }

    async doJob(e) {
        this.status = 1;
        while(this.goal > this.progress) {
            await wait(timePerMinute);
            this.progress++;
        }
        this.finishJob(e);
    }

    displayStatus() {
        // depreacated; this.status를 참조하는 용도로밖에 안씀
        return [this.status, this.customerName, this.progress, this.goal];
    }

    finishJob() {
        this.status = 0;
        this.progress = 0;
        this.customerName = '';
        let ret = this.event;
        this.event = undefined;
        //console.log(ret.data);
        this.emitter.emit('DeliveryDone', this, {name : ret.data.name});
    }
}