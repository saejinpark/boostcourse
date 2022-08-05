const cheerio = require("cheerio");

/*
 * html-parser.js:
 *   wrapper parser module of cheerio
 */

class HtmlParser {
    #$;
    #host;

    constructor(text, host) {
        this.#$ = cheerio.load(text);
        this.#host = host;
    }

    getCssUrls() {
        const urls = this.#getTagAttrs("link", "href");
        return this.#commonPostProcess(urls);
    }

    getJsUrls() {
        const urls = this.#getTagAttrs("script", "src");
        return this.#commonPostProcess(urls);
    }

    getImgUrls() {
        const urls = this.#getTagAttrs("img", "src")
            .filter(url => !url.startsWith("data:image"));
        return this.#commonPostProcess(urls);
    }

    #getTagAttrs(tag, attr) {
        const attrs = this.#$(tag).map((i, elem) => this.#$(elem).attr(attr)).toArray();
        return attrs;
    }

    #commonPostProcess(urls) {
        return urls.filter(url => url !== "")
            .map(url => encodeURI(url))
            .map(url => {
                // prepend protocol and host
                if (!url.startsWith("https://")) {
                    url = "https://" + this.#host + (url.startsWith("/") ? "" : "/") + url;
                }

                return url;
            });
    }
}

module.exports = HtmlParser;