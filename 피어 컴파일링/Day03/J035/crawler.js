const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async (keyword) => {
	if(keyword.length>0) {
		return await axios.get(`https://search.naver.com/search.naver?where=news&ie=utf8&sm=nws_hty&query=${keyword}`);
	}else {
		throw new Error('reject');
	}
};

const getData = async (keyword) => {
	let newsList = [];
	await getHTML(keyword).then(html => {
		const $ = cheerio.load(html.data);
	
		const contentList = $("#main_pack section.sc_new.sp_nnews._prs_nws div div.group_news ul li");
		let cnt = 0
		contentList.each((i, elem) => {
			const findTitleLink = $(elem).find(`div.news_wrap.api_ani_send div a.news_tit`);
	
			if(findTitleLink.length!==0 && cnt<10) {
				newsList.push({
					title: findTitleLink.text().trim(),
					link: findTitleLink.attr('href'),
					summary: $(elem).find(`div.news_wrap.api_ani_send div div.news_dsc div a`).text()
				});
				cnt++;
			}
		});
	});

	return newsList;
}

module.exports = { getHTML, getData };
