import { accessPage } from "./request-processer.js";
import readlineSync from "readline-sync";
import { Cache } from "./cache.js";

/**
 * !!!! 테스트 시 시나리오 !!!!
 * 아직 예외처리가 완벽하게 구현되지 않아 오류가 발생할 수 있습니다. 또한 http는 지원하지 않습니다.
 * 캐시 동작 여부는 변수를 통해 직접 설정해 주셔야 합니다.
 * 넥슨이 리다이렉트도 되고, src개수도 적어서 테스트하실 때 보기 편하실 것 같습니다.
 * 1. useCache = false, url: https://www.nexon.com --> 파일을 메모리에 캐싱해 저장(cache.json)
 * 2. useCache = true, url: https://www.nexon.com --> 캐싱 데이터 가져와 표시
 */

// 캐시를 저장할 건지(false) 쓸건지(true) 설정해주셔야합니다. false -> true 순
let useCache = false;

async function main() {
    let url;
    while (true) {
        url = readlineSync.question("접속할 페이지 URL>> ");
        if (!url.startsWith("https")) console.log("올바른 URL을 입력해주세요");
        else {
            if (url.slice(-1) == "/") url = url.slice(0, -1);
            break;
        }
    }
    if (useCache) {
        // 캐시 사용 시
        Cache.storageToCache(); // 캐시 저장파일을 불러옴
        await accessPage(url, useCache);
    } else {
        // 캐시 저장 시
        await accessPage(url, useCache);
    }
}
main();
// https://m.naver.com/
// https://www.nexon.com
