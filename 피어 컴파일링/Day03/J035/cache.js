class Cache {
    constructor(keywordSize = 5, newsSize = 10) {
        this.keywords = new Map(); //['keyword', 'hitCnt']
        this.keywordSize = keywordSize;
        this.newsSize = newsSize;
    }

    // 해당 키워드가 없을 때
    set(keyword, data) {
        // 순서가 보장되어 있으니, 앞에 하나만 삭제
        if (this.keywords.size === this.keywordSize) {
            for (let k of this.keywords.keys()) {
                this.keywords.delete(k);
                break;
            }
        }
        // keyword 추가
        this.keywords.set(keyword, [1, [...data]]);

        // console
        return this.consoleSetGet(data);
    }

    // 해당 키워드가 있을 때
    get(keyword, data) {
        // news에 저장된 keyword 뉴스 표시
        console.log("( 본 검색 결과는 캐시에 저장된 내용을 표시합니다. )");
        console.log("");
        console.log("");

        const result = this.consoleSetGet(this.keywords.get(keyword)[1]);

        // hitCnt 증가 & 뉴스 업데이트
        const hitCnt = this.keywords.get(keyword)[0] + 1;
        this.keywords.delete(keyword);
        this.keywords.set(keyword, [hitCnt, [...data]]);

        return result;
    }

    hasKeyword(keyword) {
        if (this.keywords.has(keyword)) return true;
        else return false;
    }

    // $cache를 입력했을 때
    consoleCache() {
        let result = [];
        for (let k of this.keywords.keys()) {
            result.push(`${encodeURI(k)}(${this.keywords.get(k)[0]})`);
        }

        if (result.length === 0) return "저장된 키워드가 없습니다.";
        else return result.join("\n");
    }

    // SET과 GET에 대한 출력
    consoleSetGet(data) {
        let result = [];
        for (let i = 0; i < this.newsSize; i++) {
            for (let info in data[i]) {
                result.push(`${info}  :  ${data[i][info]}`);
            }
            result.push("----------------------------------------------");
            result.push("----------------------------------------------");
        }

        return result.join("\n");
    }
}

export default Cache;
