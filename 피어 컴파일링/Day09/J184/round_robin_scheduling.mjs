import Basic_Scheduler from "./basic_scheduler.mjs";
const log = console.log;

// 선점 스케줄링 방식으로 FIFO처럼 순차적으로 실행하지만, CPU에서 제어하는 시간을 일정하게 나눠서 스케줄링하는 방식
// CPU 시간이 마무리될 때까지 작업이 끝나지 않으면 다음 프로세스로 넘어간다.

export default class RoundRobin extends Basic_Scheduler{
    work() {
        // 순차적으로 진행
        let now_work_index = 0;
        while(1) {
            // filter            
            let now_work = this.process_list[now_work_index];
            now_work.run();
            this.update_waittime()
            this.display()
            now_work.after_run(this.time);
            let next = now_work_index;
            let chk = false;
            for(let i=1;i<=this.process_list.length;++i) { // 다음 수행할 프로세스 찾기
                next = now_work_index + i;
                next%=this.process_list.length;
                if(this.process_list[next].state==="waiting" || this.process_list[next].state==="ready") {
                    chk = true;
                    break;
                }
            }
            if(!chk) break;
            now_work_index = next;
        }
        this.end()
    }
    end() {
        super.end("라운드 로빈 방식")
    }
}