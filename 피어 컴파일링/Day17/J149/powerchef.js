import Chef from "./chef.js";

export default class PowerChef {
    name = '';
    threads = [];
    expert;
    constructor(name, exp) {
        this.threads.push(new Chef(name));
        this.threads.push(new Chef(name));
        if(name) this.name = name;
        if(exp) {
            this.expert = exp; // 전문 요리의 key값
        }
    }

    hasEmptyThread() {
        if(this.threads[0].displayStatus()[0] === 0) return true;
        if(this.threads[1].displayStatus()[0] === 0) return true;
        return false;
    }

    cook(e) {
        let idx = -1;
        if(this.threads[0].displayStatus()[0] === 0) {
            idx = 0;
        }else if(this.threads[1].displayStatus()[0] === 0) {
            idx = 1;
        }
        if(idx === -1) return -1;
        this.threads[idx].startJob(e);
    }
}