const crawl = require("./crawling.js");
const lru = require("./LRU.js");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function printResult(data) {
    for (var i of data) {
        console.log("제목 : " + i.title + "\n링크 : " + i.link + "\n미리보기 : " + i.content + "\n");
    }
}
async function main() {
    while (true) {
        let keyword = await new Promise((resolve) => {
            rl.question(">>>>> 검색할 키워드 : ", resolve);
        });
        keyword = keyword.trim();
        if (keyword == "$cache") {
            for (var i of lru.cache.allCache().keys()) {
                console.log(i + "(" + lru.cache.getHit(i) + ")");
            }
        } else if (keyword === "q" || keyword === "quit") break;
        else if (keyword == "") console.log("공백은 입력할 수 없습니다.\n");
        else {
            let cacheData = lru.cache.get(keyword);
            if (cacheData == -1) {
                // 캐시에 없을 경우
                let crawlData = await crawl.crawling(keyword);
                if (crawlData.length == 0) {
                    console.log("입력하신 키워드에 대한 결과가 없습니다.\n");
                    continue;
                }
                printResult(crawlData);
                lru.cache.put(keyword, crawlData);
            } else {
                // 캐시에 있을 경우
                printResult(cacheData);
            }
        }
        console.log("\n");
    }
    process.exit(0);
}

main();
