const cheerio = require("cheerio-httpcli");

/* 
    키워들 파라미터로 받아와 결과를 반환하는 함수
    return [[제목], [주소], [미리보기]]
*/
exports.crawling = function (keyword) {
    var baseUrl = "https://www.google.com/search";
    cheerio.fetch(baseUrl, { q: keyword }, function (err, $, res, body) {
        var titleList = [];
        var addressList = [];
        var previewList = [];
        for (var i = 0; i < 5; i++) {
            var body = $("div.g.Ww4FFb.tF2Cxc");
            var title = $(body[i]).find("h3.LC20lb.MBeuO.DKV0Md").text();
            var address = $(body[i]).find("a").attr("href");
            var span = $(body[i]).find("span");
            var preview = $(span[span.length - 1]).html();

            titleList.push(title);
            addressList.push(address);
            previewList.push(preview);
        }

        var result = new Array(3);
        for (var i = 0; i < 3; i++) {
            result[i] = new Array();
        }
        result[0].push(titleList);
        result[1].push(addressList);
        result[2].push(previewList);
        return result;
    });
};
