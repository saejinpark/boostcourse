// cache memory
let cache = new Map();
const cache_max = 5;

// input setting
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// input start
let data;
rl.on("line", (line) => {
    data = line;

    if (!data) {
        rl.close();
    } else {
        // cache hit
        if (cache.has(data)) {
            console.log("HIT!!!");

            let hit_ref = cache.get(data);
            cache.set(data, 0);

            if (1 < hit_ref && hit_ref < cache_max) {
                for (let [k, v] of cache.entries()) {
                    if (v <= hit_ref) {
                        cache.set(k, v + 1);
                    }
                }
            } else if (hit_ref == cache_max) {
                for (let [k, v] of cache.entries()) {
                    cache.set(k, v + 1);
                }
            } else {
                cache.set(data, 1);
            }
        }

        // cache miss
        else {
            console.log("MISS!!!");

            // LRU algorithm
            if (cache.size == cache_max) {
                for (let [k, v] of cache.entries()) {
                    if (v == cache_max) {
                        cache.delete(k);
                    }
                }
                cache.set(data, 0);
                for (let [k, v] of cache.entries()) {
                    cache.set(k, v + 1);
                }
            } else {
                cache.set(data, 0);
                for (let [k, v] of cache.entries()) {
                    cache.set(k, v + 1);
                }
            }
        }

        for (let [k, v] of cache.entries()) {
            console.log(k + ": " + v);
        }
        console.log("\n");
    }
});

rl.on("close", () => {
    console.log("Done.");
    process.exit();
});
