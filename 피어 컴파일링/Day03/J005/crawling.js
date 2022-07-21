const cheerio = require("cheerio");
const axios = require("axios");
// const iconv = require("iconv-lite");

const defaultUrl = "https://search.naver.com/search.naver?sm=tab_jum&query=";

// 해당 url에 대한 html을 반환하는 함수
const getHTML = async (url) => {
    try {
        return await axios.get(url);
    } catch (err) {
        console.log(err);
        return;
    }
};

// 크롤링하는 제일 상위 함수
const crawling = async (search) => {
    // console.log(defaultUrl + encodeURIComponent(search));
    let result = []; // 검색 결과

    try {
        const html = await getHTML(defaultUrl + encodeURIComponent(search));
        const $ = cheerio.load(html.data); // cheerio를 사용해서 html을 파싱
        // 뉴스 정보
        $(".list_news .bx").each(function (post) {
            let title = $(this).find(".news_tit").attr("title"); // 제목
            let link = $(this).find(".news_tit").attr("href"); // 링크
            let content = $(this).find(".api_txt_lines.dsc_txt_wrap").text(); // 미리보기
            if (title.length != 0 && link.length != 0 && content.length != 0) result.push({ title, link, content });
        });

        // View 정보
        $(".bx._svp_item").each(function (post) {
            let title = $(this).find(".api_txt_lines.total_tit._cross_trigger").text(); // 제목
            let link = $(this).find(".api_txt_lines.total_tit._cross_trigger").attr("href"); // 링크
            let content = $(this).find(".api_txt_lines.dsc_txt").text(); // 미리보기
            if (title.length != 0 && link.length != 0 && content.length != 0) result.push({ title, link, content });
        });
    } catch (e) {
        console.log(e.text);
    }

    // 주석해제하면 크롤링한 데이터 출력
    // console.log("============ <" + search + "> 키워드 검색 결과 : " + result.length + "건============");
    // for (var i of result) {
    //     console.log("제목 : " + i.title + "\n링크 : " + i.link + "\n미리보기 : " + i.content + "\n\n");
    // }
    // 위에 부분 혹은 아래 부분
    // console.log(result);
    return result; // 검색 결과를 반환
};

// 동작 예시
// crawling("네이버 부캠");
// crawling("아이유");

module.exports = {
    crawling: crawling,
};
