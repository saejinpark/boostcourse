import { search, searchResultDataPrint } from "./crawler02_search.js";
const keywordCacheCheck = async (
    keywordCacheLimit,
    keywordCacheDataLimit,
    keywordCacheDataArr,
    keywordCacheArr,
    keywordCacheIndexMap,
    keywordCacheHitMap,
    keywordCache
) => {
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

export { keywordCacheCheck };
