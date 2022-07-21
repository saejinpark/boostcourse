import { GoogleSearch } from "google-search-results-nodejs";

const search = new GoogleSearch(
    "97892a5c76d4da2183690d5a1e0589f4f012c3b9ab6957c6325e7e26d1b7d817"
);

const setParams = (keyword) => {
    const params = {
        engine: "google",
        q: keyword,
        gl: "kr",
        num: 8,
    };
    return params;
};

const callback = function (data) {
    const organicResults = data["organic_results"].splice(0, 3);
    organicResults.forEach((element, index) => {
        console.log("========================================================");
        console.log(`결과${index + 1}. 제목: ${element.title}`);
        console.log();
        console.log(`결과${index + 1}. 링크: ${element.link}`);
        console.log();
        console.log(`결과${index + 1}. 미리보기: ${element.snippet}`);
        console.log("========================================================");
    });
};

const keywordSearch = (keyword) => {
    const params = setParams(keyword);
    search.json(params, callback);
};

const searchWaitClose = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
            rl.close();
        }, 5000);
    });
};

import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.log("키워드를 입력해주세요.");
rl.on("line", async (line) => {
    const keyword = line.trim();
    keywordSearch(keyword);
    await searchWaitClose();
});

rl.on("close", () => {
    process.exit();
});
