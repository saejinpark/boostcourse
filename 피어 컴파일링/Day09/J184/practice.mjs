// 따라해보기
// https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-iframe-%ED%86%B5%EC%8B%A0-MessageChannel-API
// iframe : https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-iframe-%ED%86%B5%EC%8B%A0-MessageChannel-API

// __filename이 뭐지? -> __filename 은 현재 실행 중인 파일 경로
// https://sukth09.tistory.com/30

// __filename is not defined in ES module scope 해결 방법
// https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope

import { Worker, isMainThread, parentPort } from 'worker_threads';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const log = console.log;

if(isMainThread) { // 메인 스레드
    const worker = new Worker(__filename); // 같은 dir 폴더에 워커를 생성
    // const worker = new Worker('./worker.mjs'); // 같은 dir 폴더에 워커를 생성 -> 따로 파일 만들어서도 가능하다!
    

    worker.on('message', (value) => { // paretPort.postMessage로부터 
        log('워커로부터', value)
    })

    worker.on('exit', (value) => { // parentPort.close()가 일어나면 이벤트 발생
        console.log('워커 끝 ~');
    })

    worker.postMessage('ping'); // 워커스레드에게 메세지를 보냄.
}
else { // 워커 스레드
    // 위에서 생성한 worker는 여기서 동작
    parentPort.on('message', (value) => { // worker.postMessage로부터
        log("부모로부터", value)
        parentPort.postMessage('pong');
        parentPort.close(); // '워커스레드 종료'라고 메인 스레드에게 알려야 exit 이벤트 발생
    })

}