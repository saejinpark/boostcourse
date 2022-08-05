import fs from "fs";
import path from "path";

/**
 * 브라우저 캐시 클래스
 * 구현한 캐시 정책:
 * - 캐시 저장 시 브라우저로부터 받은 max-age를 저장. 없다면 기본값으로 진행
 * - 캐시된 데이터는 만료 시간이 남아있는 경우 최신 상태인 것으로 인정.
 * - 단, 구현은 캐시가 만료시간 지난 캐시가 무조건 유효성 검사를 통과했다고 가정함.
 */
export class Cache{
    static CacheStorage;
    static FilePath = path.join('.', 'cache.json');

    /**
     * 캐시 추가
     * @param {Object} data 
     */
    static addCache(data){
        let maxAge;
        if(data.header['cache-control'] === undefined) maxAge = 10000;
        else maxAge = Number(data.header['cache-control'].replace(/[^0-9]/g, ''));
        const date = new Date()
        if(Cache.CacheStorage === undefined) Cache.CacheStorage = {};
        Cache.CacheStorage[data.url] = {
            storagedTime : date,
            maxAge : maxAge,
            resource : data
        }
    }

    /**
     * 모은 캐시를 파일로 저장.
     */
    static storageCache(){
        fs.writeFileSync(Cache.FilePath, JSON.stringify(Cache.CacheStorage, null, 4), { flag: 'w+' });
    }

    /**
     * 파일로부터 캐시를 읽어옴
     */
    static storageToCache(){
        const buffer = fs.readFileSync(Cache.FilePath);
        const str = buffer.toString();
        Cache.CacheStorage = JSON.parse(str);
    }

    /**
     * 해당 url이 캐시에 있는지 확인
     * @param {string} url 
     * @returns 
     */
    static isCache(url){
        return Cache.isCacheValid(url) && (url in Cache.CacheStorage)
    }

    static getCache(url){
        return Cache.CacheStorage[url].resource;
    }

    /**
     * 캐시 유효성 검사 진행하는 함수
     * @param {string} url 
     * @returns 
     */
    static isCacheValid(url){
        // 현재는 유효하다고 바로 응답함
        return true;
    }
}