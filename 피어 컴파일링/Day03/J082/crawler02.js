import { launch } from "puppeteer";
import { load } from "cheerio";
import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

let keywordCacheLimit = 0;
let keywordCacheDataLimit = 0;

let keywordCacheDataArr = [];
let keywordCacheArr = [];
let keywordCacheIndexMap = new Map();

let keywordCacheHitMap = new Map();

const searchResultDataPrint = (searchResultData) => {
    console.log(
        `

    ${searchResultData["title"]}


    ${searchResultData["link"]}


    ${searchResultData["description"]}

        `
    );
};

const search = async (keyword, searchCount) => {
    try {
        const browser = await launch();
        const page = await browser.newPage();

        await page.goto(`https://www.google.com/search?q=${keyword}`, {
            waitUntil: "networkidle0",
        });

        const pageData = await page.evaluate(() => {
            return {
                html: document.documentElement.innerHTML,
            };
        });

        const $ = load(pageData.html);

        let searchResultDataArr = [];

        $(".jtfYYd").each((_, element) => {
            const searchResultData = {
                title: $(element).find("h3").text(),
                link: $(element).find("a").attr("href"),
                description: $(element).find(".VwiC3b").text(),
            };
            searchResultDataPrint(searchResultData);
            searchResultDataArr.push(searchResultData);
            searchCount--;
            if (searchCount === 0) return false;
        });

        await browser.close();

        return searchResultDataArr;
    } catch (err) {
        console.error(err);
    }
};

const keywordCacheCheck = async (keywordCache) => {
    if (keywordCacheIndexMap.has(keywordCache)) {
        console.log();
        console.log("   (본 검색 결과는 캐시에 저장된 내용을 표시합니다.)");
        console.log();
        let overlapkeywordCacheIndex = keywordCacheIndexMap.get(keywordCache);
        for (let i = 0; i < overlapkeywordCacheIndex; i++) {
            const leastkeywordCache = keywordCacheArr[i];
            const leastkeywordCacheIndex =
                keywordCacheIndexMap.get(leastkeywordCache);
            keywordCacheIndexMap.set(
                leastkeywordCache,
                leastkeywordCacheIndex + 1
            );
        }
        keywordCacheDataArr.unshift(
            keywordCacheDataArr.splice(overlapkeywordCacheIndex, 1)[0]
        );
        keywordCacheArr.unshift(
            keywordCacheArr.splice(overlapkeywordCacheIndex, 1)[0]
        );
        keywordCacheIndexMap.set(keywordCache, 0);
        keywordCacheHitMap.set(
            keywordCache,
            keywordCacheHitMap.get(keywordCache) + 1
        );
        keywordCacheDataArr[0].forEach((searchResultData) => {
            searchResultDataPrint(searchResultData);
        });
    } else {
        try {
            let keyword = keywordCache;
            let searchCount = keywordCacheDataLimit;
            if (!/^\w+$/.test(keyword)) {
                let [_, tempKeyword, tempSearchCount] =
                    keyword.match(/(\w+)(\(\d+\))/);
                tempSearchCount = parseInt(
                    tempSearchCount.substring(1, tempSearchCount.length - 1)
                );
                keyword = tempKeyword;
                if (tempSearchCount < keywordCacheDataLimit) {
                    searchCount = tempSearchCount;
                }
            }

            let searchResultDataArr = await search(keyword, searchCount);

            keywordCacheIndexMap.forEach((index, leastPage) => {
                keywordCacheIndexMap.set(leastPage, index + 1);
            });

            keywordCacheIndexMap.set(keywordCache, 0);
            keywordCacheArr.unshift(keywordCache);
            keywordCacheDataArr.unshift(searchResultDataArr);
            keywordCacheHitMap.set(keywordCache, 1);

            if (keywordCacheArr.length === keywordCacheLimit) {
                let leastRecentlyUsed = keywordCacheArr.pop();
                keywordCacheDataArr.pop();
                keywordCacheIndexMap.delete(leastRecentlyUsed);
                keywordCacheHitMap.delete(leastRecentlyUsed);
            }
        } catch {
            console.log();
            console.log("키워드가 올바르지 않습니다.");
            console.log();
        }
    }
};

let setkeywordCacheLimit = true;
let setkeywordCacheDataLimit = true;

const textPrint = () => {
    if (setkeywordCacheLimit) {
        console.log();
        process.stdout.write(
            "LRU 캐시 저장할 수 있는 키워드 개수를 입력해주세요. : "
        );
    } else if (setkeywordCacheDataLimit) {
        console.log();
        process.stdout.write("키워드별 데이터 개수를 정해주세요. : ");
    } else {
        console.log();
        process.stdout.write("키워드를 입력하세요> : ");
    }
};

textPrint();
rl.on("line", async (line) => {
    let data = line.trim();
    if (data === "$cache") {
        if (keywordCacheArr.length === 0) {
            console.log();
            console.log("저장된 키워드가 없습니다.");
        } else {
            let tempKeyword = [];
            keywordCacheArr.forEach((element) => {
                const hitCount = keywordCacheHitMap.get(element);
                tempKeyword.push(`${element}${"[" + hitCount + "]"}`);
            });
            console.log("키워드 : " + tempKeyword.join(", "));
            textPrint();
        }
    } else if (setkeywordCacheLimit) {
        setkeywordCacheLimit = false;
        keywordCacheLimit = parseInt(data) + 1;
        textPrint();
    } else if (setkeywordCacheDataLimit) {
        setkeywordCacheDataLimit = false;
        keywordCacheDataLimit = parseInt(data);
        textPrint();
    } else {
        await keywordCacheCheck(data);
        textPrint();
    }
});

rl.on("close", () => {
    process.exit();
});
