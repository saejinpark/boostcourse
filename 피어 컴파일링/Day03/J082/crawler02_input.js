import { createInterface } from "readline";
import { keywordCacheCheck } from "./crawler02_cache.js";

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
        [
            keywordCacheLimit,
            keywordCacheDataLimit,
            keywordCacheDataArr,
            keywordCacheArr,
            keywordCacheIndexMap,
            keywordCacheHitMap,
        ];
        await keywordCacheCheck(
            keywordCacheLimit,
            keywordCacheDataLimit,
            keywordCacheDataArr,
            keywordCacheArr,
            keywordCacheIndexMap,
            keywordCacheHitMap,
            data
        );
        textPrint();
    }
});

rl.on("close", () => {
    process.exit();
});
