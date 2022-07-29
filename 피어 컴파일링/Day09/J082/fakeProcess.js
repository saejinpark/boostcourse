import { Worker } from "worker_threads";
import { generateWorker } from "./fakeThread.js";

const STATUS = ["ready", "running", "waiting", "terminate"];
const FAKE_FAKE_PROCESS_TYPES = ["A", "B", "C", "D", "E", "F"];
export class FakeProcess {
    constructor() {
        this.terminated = false;
        this.operatingTime = 0;
        this.waitingTime = 0;
        this.state = 0;
        this.respon = "";
        this.threadMap = new Map();
        let randomNumber = Math.floor(Math.random() * 6);
        if (randomNumber === 6) randomNumber--;
        this.type = FAKE_FAKE_PROCESS_TYPES[randomNumber];
        switch (randomNumber) {
            case 0:
                this.maximumOperatingTime = 3;
                this.threadCount = parseInt(this.getMaximumOperatingTime() / 2);
                break;
            case 1:
                this.maximumOperatingTime = 5;
                this.threadCount = parseInt(this.getMaximumOperatingTime() / 2);
                break;
            case 2:
                this.maximumOperatingTime = 7;
                this.threadCount = parseInt(this.getMaximumOperatingTime() / 2);
                break;
            case 3:
                this.maximumOperatingTime = 10;
                this.threadCount = parseInt(this.getMaximumOperatingTime() / 2);
                break;
            case 4:
                this.maximumOperatingTime = 15;
                this.threadCount = parseInt(this.getMaximumOperatingTime() / 2);
                break;
            case 5:
                this.maximumOperatingTime = 21;
                this.threadCount = parseInt(this.getMaximumOperatingTime() / 2);
                break;
        }
        (async () => {
            for (let i = 0; i < this.getThreadCount(); i++) {
                await this.addThread();
            }
        }).call(FakeProcess.prototype);
    }

    getRespon() {
        return this.respon;
    }

    setRespon(respon) {
        this.respon = respon;
    }

    checkRespon() {
        return this.respon !== "";
    }

    clearRespon() {
        this.setRespon("");
    }

    getType() {
        return this.type;
    }

    getState() {
        return this.state;
    }

    getTerminated() {
        return this.terminated;
    }

    setTerminated(boolean) {
        this.terminated = boolean;
    }

    getOperatingTime() {
        return this.operatingTime;
    }

    addOperatingTime() {
        return new Promise(async (resolve) => {
            for (let [name, thread] of this.getThreadMap().entries()) {
                thread.postMessage(`--> (${name}) thread 작업시작`);
                while (!this.checkRespon()) {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                        }, 10);
                    });
                }
                console.log(this.getRespon());
                this.clearRespon();
                this.operatingTime++;
                if (
                    this.getOperatingTime() === this.getMaximumOperatingTime()
                ) {
                    this.terminate();
                    break;
                }
            }
            resolve();
        });
    }

    getWaitingTime() {
        return this.waitingTime;
    }

    addWaitingTime() {
        return new Promise((resolve) => {
            this.waitingTime++;
            resolve();
        });
    }

    getMaximumOperatingTime() {
        return this.maximumOperatingTime;
    }

    getStateData() {
        return STATUS[this.state];
    }

    async run() {
        if ([0, 2].includes(this.state)) {
            this.state = 1;
        }
        await this.addOperatingTime();
    }

    wait() {
        return new Promise(async (resolve) => {
            if (this.getState() !== 3) {
                this.state = 2;
                await this.addWaitingTime();
            }
            resolve();
        });
    }

    terminate() {
        this.state = 3;
        this.setTerminated(true);
    }

    getThreadMap() {
        return this.threadMap;
    }

    addThread() {
        return new Promise((resolve) => {
            setTimeout(async () => {
                const name = new Date().getTime().toString(36);
                await generateWorker(name);
                const worker = new Worker(`./workers/${name}.js`);
                worker.on("message", (message) => {
                    this.setRespon(message);
                });
                this.threadMap.set(name, worker);
                resolve();
            }, 10);
        });
    }

    getThreadCount() {
        return this.threadCount;
    }

    getData() {
        let data = `${
            "┌" + "-".repeat(59)
        }\n| Process:${this.getType()}(${this.getStateData()})\t| Thread Count:\t${this.getThreadCount()}\n${
            "├" + "-".repeat(59)
        }\n| ${this.getOperatingTime()}\t/${this.getMaximumOperatingTime()}\t(sec)`;
        if (this.getState() !== 0) {
            data += ` | waiting : ${this.getWaitingTime()}\t(sec)`;
        }
        data += "\n└" + "-".repeat(59);
        return data;
    }
}
