const readline = require("readline");
const Browser = require("./browser");

/*
 * configuration
 */

Browser.CACHE_TIME = 5000; // milliseconds (default: 5000)

/*
 * readline
 */

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));
rl.on("close", () => process.exist(0));

/*
 * main i/o
 */

(async() => {
    const browser = new Browser();
    browser.on("https", res => {
        printRow(res.host, res.path, res.type, res.statusCode, res.resTime, res.dlTime, res.size, res.cached);
    });
    browser.on("stats", stats => {
        printStats(stats);
    })

    while (true) {
        const input = await prompt("Host: ");
        printHeader();

        await browser.request(input);
        console.log();
    }
})();

/*
 * output functions
 */

function printHeader() {
    console.log("Domain               Path                                               Type  Status Response Download       Size Cached");
    console.log("-------------------- -------------------------------------------------- ----- ------ -------- -------- ---------- ------")
}

function printRow(host, path, type, statusCode, resTime, dlTime, size, cached) {
    if (host.length > 20) {
        host = host.slice(0, 12) + "..." + path.slice(-5);
    } else {
        host = host.padEnd(20);
    }
    if (path.length > 50) {
        path = path.slice(0, 37) + "..." + path.slice(-10);
    } else {
        path = path.padEnd(50);
    }
    type = type.padEnd(5);
    statusCode = statusCode.toString().padStart(6);
    resTime = resTime.toString().padStart(5);
    dlTime = dlTime.toString().padStart(5);
    size = getHumanReadableBytes(size).padStart(10);
    cached = cached ? "Yes".padStart(6) : "";

    console.log(`${host} ${path} ${type} ${statusCode} ${resTime} ms ${dlTime} ms ${size} ${cached}`);
}

function printStats(stats) {
    const timeSum = stats.map(stat => stat.time).reduce((a, b) => a + b);
    const sizeSum = stats.map(stat => stat.size).reduce((a, b) => a + b);
    const reqs = stats.length;
    const cssReqs = stats.filter(stat => stat.type === "css").length;
    const jsReqs = stats.filter(stat => stat.type === "js").length;
    const imgReqs = stats.filter(stat => stat.type === "image").length;
    const domainsNum = new Set(stats.map(stat => stat.domain));

    console.log(`Domains: ${domainsNum.size}`);
    console.log(`Total loading time: ${timeSum} ms`);
    console.log(`Total size: ${getHumanReadableBytes(sizeSum)}`);
    console.log(`Total requests: ${reqs}`);
    console.log(`- CSS requests: ${cssReqs}`);
    console.log(`- JS requests: ${jsReqs}`);
    console.log(`- image requests: ${imgReqs}`);
}

// return bytes with readable unit
function getHumanReadableBytes(bytes) {
    const units = ["B", "KiB", "MiB", "GiB"];
    let i = 0;

    for (let i = 0; i < units.length; ++i) {
        if (bytes < 1024) {
            const b = Math.round(bytes * 10) / 10; // round to first decimal
            return `${b} ${units[i]}`;
        }
        bytes /= 1024;
    }

    const b = Math.round(bytes * 10) / 10;
    return `${b} ${units.pop()}`;
}