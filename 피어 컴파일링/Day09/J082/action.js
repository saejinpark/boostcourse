import { FakeProcess } from "./fakeProcess.js";
import { makeWorkerDir, rmWorkerDir } from "./fakeThread.js";

export class Action {
    constructor() {
        this.queue = [new FakeProcess(), new FakeProcess(), new FakeProcess()];
        this.nowTurn = 0;
        this.nowIndex = 0;
        this.queue.forEach((fakeProcess) => {
            console.log(fakeProcess.getData());
        });
        (async () => {
            await makeWorkerDir();
        })();
        ((queue) => {
            this.move = () =>
                new Promise((resolve) => {
                    queue.forEach(async (fakeProcess, index) => {
                        if (this.getNowIndex() === index)
                            await fakeProcess.run();
                        else if (!fakeProcess.getTerminated())
                            await fakeProcess.wait();
                        setTimeout(() => {
                            console.log(fakeProcess.getData());
                        }, 300);
                    });
                    setTimeout(async () => {
                        console.log("=".repeat(60));
                        resolve();
                    }, 1000);
                });
            this.RoundRobin = () => {
                console.log("=".repeat(60));
                setTimeout(async () => {
                    while (!this.endTest()) {
                        let baseLine = this.getNowIndex();
                        while (queue[baseLine].getTerminated() === true) {
                            this.addNowIndex();
                            baseLine = this.getNowIndex();
                            if (this.endTest()) break;
                        }
                        await this.move();
                        this.addNowIndex();
                    }
                    console.log("┌" + "-".repeat(59));
                    console.log("| 라운드로빈 방식 스케쥴링이 종료되었습니다.");
                    this.getTimeData();
                    console.log("└" + "-".repeat(59));
                    await rmWorkerDir();
                }, 100);
            };

            this.deadline = async () => {
                console.log("=".repeat(60));
                setTimeout(async () => {
                    while (!this.endTest()) {
                        let baseLine = this.getNowIndex();
                        await this.move();
                        if (queue[baseLine].getTerminated() === true) {
                            this.addNowIndex();
                        }
                    }
                    console.log("┌" + "-".repeat(59));
                    console.log("| 기한부 방식 스케쥴링이 종료되었습니다.");
                    this.getTimeData();
                    console.log("└" + "-".repeat(59));
                    await rmWorkerDir();
                }, 100);
            };
            this.priority = async (priorityQueue) => {
                console.log("=".repeat(60));
                setTimeout(async () => {
                    let baseLine = priorityQueue.shift() - 1;
                    while (!this.endTest()) {
                        this.setNowIndex(baseLine);
                        await this.move();
                        if (queue[baseLine].getTerminated() === true) {
                            baseLine = priorityQueue.shift() - 1;
                            this.setNowIndex(baseLine);
                        }
                    }
                    console.log("┌" + "-".repeat(59));
                    console.log("| 우선순위 방식 스케쥴링이 종료되었습니다.");
                    this.getTimeData();
                    console.log("└" + "-".repeat(59));
                    await rmWorkerDir();
                }, 100);
            };
        }).call(Action.prototype, this.queue);
    }

    getTimeData() {
        const waitingTimeQueue = this.queue.map((fakeProcess) =>
            fakeProcess.getOperatingTime()
        );
        const returnTimeQueue = this.queue.map(
            (fakeProcess, index) =>
                waitingTimeQueue[index] + fakeProcess.getWaitingTime()
        );

        console.log(`├${"-".repeat(
            59
        )}\n| 평균 대기시간\t:(${waitingTimeQueue.join(" + ")}) / ${
            this.queue.length
        } = ${(
            waitingTimeQueue.reduce((acc, cur) => acc + cur, 0) /
            this.queue.length
        ).toFixed(1)}
| 평균 반환시간\t:(${returnTimeQueue.join(" + ")}) / ${this.queue.length} = ${(
            returnTimeQueue.reduce((acc, cur) => acc + cur, 0) /
            this.queue.length
        ).toFixed(1)}`);
    }

    getNowIndex() {
        return this.nowIndex;
    }

    setNowIndex(index) {
        this.nowIndex = index;
    }

    addNowIndex() {
        this.nowIndex = (this.getNowIndex() + 1) % this.queue.length;
    }

    getNowTurn() {
        return this.nowTurn;
    }

    addNowTurn() {
        this.nowturn = (this.getNowTurn() + 1) % this.queue.length;
    }

    endTest() {
        for (let fakeProcess of this.queue) {
            if (!fakeProcess.getTerminated()) {
                return false;
            }
        }
        return true;
    }
}
