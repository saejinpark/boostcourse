function crawling(word, max_data) {
    var client = require('cheerio-httpcli');

    var datas = []; 
    return new Promise(function(resolve, reject) {
        client.fetch('http://www.google.com/search', { q: word }, function (err, $, res, body) {
            if(err){
                console.log(err);
                return;
            }
            
            $('div div div div div div div div div div ').each( function (idx) {
                var url =  $(this).find('> div > div > a:nth-child(1)').attr('href');
    
                if(typeof url != "undefined" && url.includes('http')) {
                    var title =  $(this).find('> div > div > a:nth-child(1) h3').text();
                    if (title == "") title =  $(this).find('> div> div > a:nth-child(1) div:nth-child(2)').text();
                    
                    var subtitle = $(this).find('> div > div:nth-child(2)').text();
                    if (subtitle == "") subtitle =  $(this).find(' > div:nth-child(2)').text();
                    
                    if(title != "" && subtitle != "") {
                        if(datas.length < max_data) datas.push([url, title, subtitle]);//new data(url, title, subtitle)
                    }
                }
            });

            if(res) resolve(datas);
        });
        
    });

}

module.exports = {crawling};
