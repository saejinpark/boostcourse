import Basic_Scheduler from "./basic_scheduler.mjs";
const log = console.log;

// 프로세스 실행 중에 우선순위가 높은 프로세스를 먼저 실행하는 방식. 낮은 우선순위가 계속 밀릴 수 있음.
// 우선순위가 동적으로 바뀔 수 있지만, 구현은 고정적인 경우에 대해서임.

export default class Static_Priority extends Basic_Scheduler {
    work() {
        // 우선순위가 낮은거 부터 수행
        let compare = (a, b) => {
            return a.priority - b.priority; // ascend
        }
        while(1) {
            let tmp_arr = this.process_list.slice() // 원본 바뀌기 방지
            // filter
            let sorted_process_list = tmp_arr.sort(compare).reduce((pre, val) => {
                if(val.state === "ready" || val.state ==="waiting") {
                    pre.push(val)
                }
                return pre;
            }, [])
            if(sorted_process_list.length===0) {
                // this.display();
                break;
            }
            let now_work = sorted_process_list[0];
            now_work.run();
            this.update_waittime()
            this.display()
            now_work.after_run(this.time);
        }
        this.end()
    }
    end() {
        super.end("고정 우선순위 방식")
    }
}