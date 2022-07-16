const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const LIMIT = 5;
let cacheIndexMap = new Map();
let cache = [];

rl.on("line", (line) => {
    let page = line.trim();

    if (cacheIndexMap.has(page)) {
        let overlapPageIndex = cacheIndexMap.get(page);

        for (let i = 0; i < overlapPageIndex; i++) {
            const leastPage = cache[i];
            const leastPageIndex = cacheIndexMap.get(leastPage);
            cacheIndexMap.set(leastPage, leastPageIndex + 1);
        }
        cache.splice(overlapPageIndex, 1);
    } else {
        cacheIndexMap.forEach((index, leastPage) => {
            cacheIndexMap.set(leastPage, index + 1);
        });
    }

    cacheIndexMap.set(page, 0);
    cache.unshift(page);

    if (cache.length === LIMIT) {
        let LRU = cache.pop();
        cacheIndexMap.delete(LRU);
        console.log("deleted page", LRU);
    }

    console.log(cacheIndexMap);
    console.log(cache);
});

rl.on("close", () => {
    console.log("Done.");
    process.exit();
});
