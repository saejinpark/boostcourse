// 따라해보기
// https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-iframe-%ED%86%B5%EC%8B%A0-MessageChannel-API

import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const log = console.log

// workerData : startup 데이터를 전달하기 위해 사용됨.
// 워커 생성자에게 전달된 데이터의 복제본이 포함된 임의의 js값임.
// postMessage()를 사용하는 것처럼 데이터가 복사됨

if(isMainThread) { // 메인 스레드
    const threads = new Set(); // 자료형 set

    // Worker 객체를 생성하고 workerData 객체를 주어 초기 데이터를 전송
    threads.add(new Worker(__filename, { 
        workerData : {start: 1} // 초기 데이터
    }));
    threads.add(new Worker(__filename, { 
        workerData : {start: 2} // 초기 데이터
    }));

    // Worker가 들어있는 set을 순회하여 각 Worker에 이벤트를 등록
    for(let worker of threads) {
        worker.on('message', (value) => {
            log('워커로부터', value)
        })

        worker.on('exit', (value) => {
            threads.delete(worker); // set에서 쓰레드 삭제
            if(threads.size === 0) { // set이 모두 비워졌을 경우 -> 워커 스레드가 모두 끝난 것.
                console.log('워커 끝!~')
            }
        })
    }
}
else { // 워커 스레드
    const data = workerData;
    parentPort.postMessage(data.start + 100);
    parentPort.close();
}