const httpsRequest = require("./https-request");
const HtmlParser = require("./html-parser");
const EventEmitter = require("events");

class Browser {
    #cache;
    #emitter;

    /*
     * interfaces
     */
    static CACHE_TIME = 5000; // milliseconds

    constructor() {
        this.#emitter = new EventEmitter();
        this.#cache = new Map();
    }

    async request(input) {
        let stats = [];

        // request root
        const res = await this.#getResponse(input);
        this.#emit("https", HttpsLog.from(res, "doc"));

        // update stats
        stats.push(new Stat(res.resTime + res.dlTime, res.size, res.host, res.input, "doc"))

        // get resources urls
        const parser = new HtmlParser(res.text, res.host);
        const cssUrls = parser.getCssUrls();
        const jsUrls = parser.getJsUrls();
        const imgUrls = parser.getImgUrls();

        // request resources and update stats
        let substats = await this.#getResources(cssUrls, "css");
        stats = stats.concat(substats);
        substats = await this.#getResources(jsUrls, "js");
        stats = stats.concat(substats);
        substats = await this.#getResources(imgUrls, "image");
        stats = stats.concat(substats);

        this.#emit("stats", stats);
    }

    on(event, callback) {
        this.#emitter.on(event, callback);
    }

    /*
     * private methods
     */

    async #getResources(urls, type) {
        let stats = [];

        for (let i = 0; i < urls.length; ++i) { // for each url
            const url = urls[i];

            if (this.#isCacheValidFor(url)) {
                const res = this.#cache.get(url);

                // no time since cached
                res.resTime = 0;
                res.dlTime = 0;

                // update stats
                stats.push(new Stat(0, res.size, res.host, url, type));

                this.#emit("https", HttpsLog.from(res, type, true));
            } else {
                const res = await this.#getResponse(url);

                // set cache
                res.timestamp = Date.now();
                this.#cache.set(url, res);

                // update stats
                stats.push(new Stat(res.resTime + res.dlTime, res.size, res.host, url, type));

                this.#emit("https", HttpsLog.from(res, type));
            }
        }

        return stats;
    }

    async #getResponse(url) {
        const { host, path } = this.#parseUrl(url);

        const { statusCode, resTime, dlTime, text, size } = await httpsRequest(host, { path });

        return new Response(host, path, statusCode, resTime, dlTime, text, size);
    }

    #parseUrl(url) {
        // drop protocol
        if (url.startsWith("https://")) {
            url = url.slice("https://".length);
        }

        const i = url.indexOf("/"); // === -1, when not found
        if (i === -1) {
            const host = url;
            const path = "/";
            return { host, path };
        } else {
            const host = url.slice(0, i);
            const path = url.slice(i);
            return { host, path };
        }
    }

    #isCacheValidFor(url) {
        return this.#cache.has(url) && this.#cache.get(url).timestamp + Browser.CACHE_TIME > Date.now();
    }

    #emit(event, ...args) {
        this.#emitter.emit(event, ...args);
    }
}

class Response {
    constructor(host, path, statusCode, resTime, dlTime, text, size) {
        this.host = host;
        this.path = path;
        this.statusCode = statusCode;
        this.resTime = resTime;
        this.dlTime = dlTime;
        this.text = text;
        this.size = size;
    }
}

class HttpsLog {
    static from(res, type, cached = false) {
        if (res instanceof Response) {
            return new HttpsLog(res.host, res.path, type, res.statusCode, res.resTime, res.dlTime, res.size, cached);
        }

        throw new Error("expected Response object");
    }

    constructor(host, path, type, statusCode, resTime, dlTime, size, cached) {
        this.host = host;
        this.path = path;
        this.type = type;
        this.statusCode = statusCode;
        this.resTime = resTime;
        this.dlTime = dlTime;
        this.size = size;
        this.cached = cached;
    }
}

class Stat {
    constructor(time, size, domain, url, type) {
        this.time = time;
        this.size = size;
        this.domain = domain;
        this.url = url;
        this.type = type;
    }
}

module.exports = Browser;