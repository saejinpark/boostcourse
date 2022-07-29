const log = console.log;

export default class Basic_Scheduler {
    constructor(processes) {
        this.time = 0; // 시간 경과
        this.process_list = processes
        for(let i=0;i<this.process_list.length;++i) {
            let str = this.process_list[i].name + "(" + this.process_list[i].state + "), " + this.process_list[i].work_time + " / " + this.process_list[i].max_time + "sec"
            log(str)
            this.process_list[i].after_ready()
        }
        log("time : ", this.time++) // 시간 경과
    }
    display() {
        for(let i=0;i<this.process_list.length;++i) {
            let str = this.process_list[i].name + "(" + this.process_list[i].state + "), " + 
            this.process_list[i].work_time + " / " + this.process_list[i].max_time + "sec , waiting " + this.process_list[i].wait_time + " sec"
            log(str)
        }
        log("time : ", this.time++) // 시간 경과
    }
    update_waittime() {
        // 실행중인 프로세스 말고 모두 wait time 증가(ready, waiting)
        for(let i=0;i<this.process_list.length;++i) {
            if(this.process_list[i].state === "ready" || this.process_list[i].state === "waiting") {
                this.process_list[i].wait_time++;
            }
        }
    }
    avg_wait_time() {
        let str = "평균 대기 시간 = ("
        str += this.process_list[0].wait_time
        let sum = this.process_list[0].wait_time;
        for(let i=1;i<this.process_list.length;++i) {
            sum +=this.process_list[i].wait_time;
            str += " + "
            str += this.process_list[i].wait_time;
        }
        sum/=this.process_list.length
        str += ") / " + this.process_list.length + " = " + sum + "sec"
        log(str)
    }
    avg_return_time() {
        let str = "평균 반환 시간 = ("
        str += this.process_list[0].finish_time
        let sum = this.process_list[0].finish_time;
        for(let i=1;i<this.process_list.length;++i) {
            sum +=this.process_list[i].finish_time;
            str += " + "
            str += this.process_list[i].finish_time;
        }
        sum/=this.process_list.length
        str += ") / " + this.process_list.length + " = " + sum + "sec"
        log(str)
    }
    work() {
        // 각 Scheduler 별 상세 구현
    }
    end(str) {
        let log_str = str + " 스케줄링이 종료되었습니다."
        log(log_str)
        this.avg_wait_time()
        this.avg_return_time()
    }
}