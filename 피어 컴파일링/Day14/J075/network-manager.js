import { NetworkInfo } from "./network-info.js";
import {Cache} from './cache.js'

/**
 * f12 > 네트워크 탭과 비슷. 관련 정보 저장하고 출력해주는 클래스
 */

export class NetworkManager{
    static domainSet = new Set();
    static numOfDomains = 0; // 도메인 개수
    static numOfRequests = 0; // 요청 개수
    static numOfImages = 0; // 이미지(png, gif, jpg) 개수
    static numOfCodes = 0; // 코드(css, js) 개수
    static transferredSize = 0; // 전송 용량
    static numOfRedirects = 0; // 리다이렉트 개수 
    static numOfcaches = 0; // 캐시 데이터 개수 
    static loadingTime; // 전체 로딩 시간
    static largestSize = {size:0, source:undefined}; // 가장 큰 용량
    static longestWaiting = { time:0, source:undefined}; // 가장 오랜 대기 기간
    static longestDownload = {  time:0, source:undefined}; // 가장 오랜 다운로드 시간
    static numOfCacheData = 0;

    /**
     * 네트워크 매니저에 신규 네트워크 정보 추가
     * @param {boolean} cache 
     * @param {Object} result 
     */
    static async addNetworkInfo(cache, result){
        const url = result.url;
        const header = result.header;
        const time = result.time;
        const networkInfo = new NetworkInfo(url, header, time, result.cache);
        if(!NetworkManager.domainSet.has(networkInfo.domain)){
            NetworkManager.domainSet.add(networkInfo.domain)
            NetworkManager.numOfDomains+=1;
        }
        NetworkManager.numOfRequests+=1;
        if((/png|gif|jpg/i).test(networkInfo.type)) NetworkManager.numOfImages+=1;
        else if((/css|js|javascript/i).test(networkInfo.type)) NetworkManager.numOfCodes+=1;
        NetworkManager.transferredSize+=networkInfo.size;
        if(NetworkManager.largestSize.size < networkInfo.size){
            NetworkManager.largestSize.size = networkInfo.size;
            NetworkManager.largestSize.source = url;
        }
        if(NetworkManager.longestWaiting.time < networkInfo.waitingTime){
            NetworkManager.longestWaiting.time = networkInfo.waitingTime;
            NetworkManager.longestWaiting.source = url;
        }
        if(NetworkManager.longestDownload.time < networkInfo.downloadTime){
            NetworkManager.longestDownload.time = networkInfo.downloadTime;
            NetworkManager.longestDownload.source = url;
        }
        if(cache && (/png|gif|jpg|js|javascript|css/i).test(networkInfo.type)) NetworkManager.numOfCacheData +=1;
        if(cache == false && (/png|gif|jpg|js|javascript|css/i).test(networkInfo.type)){
            // console.log((/png|gif|jpg|js|javascript|css/i).test(networkInfo.type))
            Cache.addCache(result);
        }
        // this.printNetworkManager()
    }

    /**
     * 네트워크 정보 출력
     * @param {boolean} cache 
     */
    static printNetworkManager(cache){
        let isCache = ''
        if(cache && Cache.isCache(NetworkManager.largestSize.source)) isCache = "(캐시됨)"
        console.log(`========== 분석 결과 ==========\n` +
            `도메인 개수 : ${NetworkManager.numOfDomains}\n` +
            `요청 개수 : ${NetworkManager.numOfRequests}\n`+
            `이미지(png, gif, jpg) 개수 : ${NetworkManager.numOfImages}\n`+
            `코드(css, js) 개수 : ${NetworkManager.numOfCodes}\n`+
            `전송 용량 : ${NetworkManager.transferredSize} KB\n` +
            `리다이렉트 개수 : ${NetworkManager.numOfRedirects}\n`+
            `전체 로딩 시간 : ${NetworkManager.loadingTime} ms\n\n`+
            `가장 큰 용량 : ${NetworkManager.largestSize.source} ${NetworkManager.largestSize.size} KB ${isCache}\n` +
            `가장 오랜 대기 시간 : ${NetworkManager.longestWaiting.source} ${NetworkManager.longestWaiting.time} ms\n`+
            `가장 오랜 다운로드 시간 : ${NetworkManager.longestDownload.source} ${NetworkManager.longestDownload.time} ms`)
        if(cache) console.log(`캐시 데이터 개수 : ${NetworkManager.numOfCacheData} 개`)
    }
}