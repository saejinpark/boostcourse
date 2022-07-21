import { launch } from "puppeteer";
import { load } from "cheerio";

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
    } catch {
        console.error("검색에 실패했습니다.");
    }
};

export { search, searchResultDataPrint };
