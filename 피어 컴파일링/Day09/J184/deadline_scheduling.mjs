import Basic_Scheduler from "./basic_scheduler.mjs";
const log = console.log;

// 작업들을 동작 시간을 주어진 마감 시간까지 완성하도록 계획한 스케줄링
// https://jackpot53.tistory.com/104
// https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=babobigi&logNo=220497780134
// profit에 대한 고려가 없음.
// 새로운 작업이 추가되는 경우 필요하다면 push()를 만들 수 있을 것 같음.
// profit에 대해서도 추가로 구현 가능

export default class Deadline extends Basic_Scheduler {
    work() {
        // deadline 기준 먼저 오는 것 부터 수행.
        let compare = (a, b) => {
            return a.deadline - b.deadline; // ascend
        }
        while(1) {
            let tmp_arr = this.process_list.slice()
            // filter
            let sorted_process_list = tmp_arr.sort(compare).reduce((pre, val) => {
                if(val.state === "ready" || val.state ==="waiting") {
                    pre.push(val)
                }
                return pre;
            }, [])
            // log("sort", sorted_process_list)
            if(sorted_process_list.length===0) {
                //this.display();
                break;
            }
            let now_work = sorted_process_list[0];
            // log("now_work", now_work)
            now_work.run();
            this.update_waittime()
            this.display()
            now_work.after_run(this.time);
        }
        this.end()
    }
    end() {
        super.end("기한부 방식")
    }
}