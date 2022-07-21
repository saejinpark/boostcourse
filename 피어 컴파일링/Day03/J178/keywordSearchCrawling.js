const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const cheerio = require('cheerio-httpcli');

/*
검색사이트 : google.com
keyword : 검색어
*/
let baseUrl = "https://www.google.com/search";
var keyword = null;
/*
원하는 검색어를 입력할 수 있게 설계
*/ 
rl.question("keyword를 입력해주세요: ", (line) => {
    keyword = line
    rl.close();
});
rl.on('close', () => {
    searchPrint();
});
/*
크롤링 구현 및 출력 기능 구현
*/
function searchPrint (){
    cheerio.fetch(baseUrl, {q: keyword}, function(err, $, res, body){
        var titleList = [];
        var addressList = [];
        var previewList = [];
        for(var i = 0; i < 5; i++){
            var body = $("div.g.Ww4FFb.tF2Cxc");
            var title = $(body[i]).find("h3.LC20lb.MBeuO.DKV0Md").text();
            var address = $(body[i]).find("a").attr("href");
            var span = $(body[i]).find("span");
            var preview = $(span[span.length-1]).html();

            titleList.push(title);
            addressList.push(address);
            previewList.push(preview);
        }

        for(var i = 0; i < 5; i++){
            console.log("********")
            console.log("제목 : " + titleList[i]);
            console.log("주소 : " + addressList[i]);
            console.log("미리보기 : " + previewList[i]);
            console.log("********")
        }
     });
}