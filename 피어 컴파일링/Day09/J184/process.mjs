import do_work from './thread.mjs'

const log = console.log;

// ready, waiting의 차이?


export default class Process {
    constructor(name, time, priority, deadline) {
        this.name = name;
        this.state = "ready" // 4가지(ready, terminated, waiting, running)
        this.max_time = time; // 종료되기 위한 시간
        this.work_time = 0; // 작동된 시간 - max_time과 비교
        this.finish_time = 0; // 반환 시간
        this.wait_time = 0;
        // static priority
        this.priority = priority
        // deadline
        this.deadline = deadline
        // thread
        this.thread_num = parseInt(time/2);
    }
    after_ready() {
        this.state = "waiting";
    }
    async run() {
        // let work = do_work(this.thread_num);
        // log("work", work)
        // this.work_time += work;
        
        this.work_time++; // 기존 process만 구현
        this.state = "running"
    }

    after_run(time) {
        /*
            1초동안 한 번에 하나에 프로세스만 실행 가능
            time : 현재 시간
        */
        if(this.work_time===this.max_time) {
            this.state = "terminated";
            this.finish_time = time - 1; // display에서 마지막에 한 개 더해준게 반영
        }
        else {
            this.state = "waiting"
        }
    }
}