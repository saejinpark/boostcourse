/**
 * network-manager가 network-info를 관리하는 느낌으로 만듦
 * 네트워크 각각의 정보를 저장함.
 */

export class NetworkInfo{
    // 생성자
    constructor(url, header, time, cache){
        this.domain;
        this.skim;
        this.path;
        this.type;
        this.size;
        this.waitingTime;
        this.downloadTime;
        this.cache;
        this.setNetworkInfo(url, header, time, cache);
    }

    /**
     * get 요청으로 받아온 정보들을 가공해 저장한다. 
     * @param {string} url 
     * @param {Object} header 
     * @param {Date} time 
     * @param {boolean} cache 
     */
    async setNetworkInfo(url, header, time, cache){
        this.domain = url.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/)[0];
        this.skim = header['x-protocol'] ?? url.match(/^(https|http)/)[0];
        this.path = url.slice(this.domain.length+this.skim.length+3);
        this.type = header['content-type'] ?? 'unknown';
        this.size = header['content-length'] ?? 0;
        this.size = Number(this.size)/1000
        this.waitingTime = time.waitingTime;
        this.downloadTime = time.downloadTime;
        this.cache = cache;
        this.printNetworkInfo(url)
    }

    /**
     * 출력 담당
     * @param {string} url 
     */
    printNetworkInfo(url){
        if(this.cache){
            console.log(`>> ${url}\n` +
            `도메인 ${this.domain}\n` +
            `스킴 ${this.skim}\n`+
            `경로 ${this.path}\n`+
            `종류 ${this.type}\n`+
            `용량 ${this.size / 1000} KB\n`+
            `>> 캐시됨\n`);
        }else{
            console.log(`>> ${url}\n` +
            `도메인 ${this.domain}\n` +
            `스킴 ${this.skim}\n`+
            `경로 ${this.path}\n`+
            `종류 ${this.type}\n`+
            `용량 ${this.size / 1000} KB\n` +
            `대기 시간 ${this.waitingTime} ms\n`+
            `다운로드 시간 ${this.downloadTime} ms\n`);
        }
    }
}