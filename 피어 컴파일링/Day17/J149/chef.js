import Emitter from "./emitter.js";
import { timePerMinute } from "./global.js";

function wait(ms) { return new Promise((r) => setTimeout(r, ms))}

export default class Chef {
    name = 'Chef';
    status = 0; // wati(0), making(key of menu)
    goal = 0;
    progress = 0;

    menu;
    menuName = '';
    
    emitter;

    constructor(name) {
        this.emitter = new Emitter();
        if(name) this.name = name;
    }
    
    startJob(e) {
        // eventName, sender, data
        // data { menu {key, name, time}}
        if(this.status !== 0) {
            return -1;
        }
        this.menu = e.menu;
        this.goal = this.menu.time;
        this.menuName = this.menu.name;
        console.log(this.name + "가 다음 요리를 시작했습니다 ... " + e.menu.name);
        this.doJob(e);
        return 0;
    }

    async doJob(e) {
        this.status = e.menu.key;
        while(this.goal > this.progress) {
            await wait(timePerMinute);
            this.progress++;
        }
        this.endJob(e);
    }

    displayStatus() {
        // depreacated; this.status를 참조하는 용도로밖에 안씀
        return [this.status, this.menuName, this.progress, this.goal];
    }

    endJob(e) {
        this.progress = 0;
        this.emitter.emit('chefFinished', this, {menu : this.menu});
        this.finishJob();
    }

    finishJob() {
        this.status = 0;
        this.progress = 0;
        this.goal = 0;
        this.menuName = '';
        let ret = this.menu;
        this.menu = undefined;
        this.emitter.emit('chefDone', this, {menu : ret});
    }
}