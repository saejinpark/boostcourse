import { Worker, MessageChannel, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const log = console.log;

export default function do_work(thread_num) {
    const threads = new Set();
    let all_work = 0;
    
    for(let i=0; i < this.thread_num; ++i) {  
        threads.add(new Worker('./worker_thread.mjs'));
    }
    // worker들이 다 될때까지 기다리는 방법?

    while(threads.size) {
        for(let worker of threads) {
            (async () => {
                console.log(await send(worker, 0));
                worker.terminate();
            })().catch(console.error); 
            worker.once('message', (value) => {
                log('워커로부터', value)
                all_work += value;
            })
            worker.once('exit', (value) => {
                threads.delete(worker); // set에서 쓰레드 삭제
                if(threads.size === 0) {
                    log('최종', all_work)
                    return all_work
                }
            })
        }
    }
}

async function send(worker, data) {
    worker.postMessage(0)
    return await res;
}