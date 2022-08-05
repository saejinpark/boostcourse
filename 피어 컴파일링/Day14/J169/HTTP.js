import https from 'https';
import cheerio from 'cheerio';


let srcArr = [];
let domainArr = new Map();
let cnt = 0;
let imgCnt = 0;
let codeCnt = 0;
let redirectCnt = 0;
let totalSize = 0;
let totalLoadingTime = 0;

let foundSrc = 0;

let cacheFlag = false;

export const request = async function(url, urlStorage, depth, Cache){
    if(depth>1) return
    const start = new Date();
    const res = await new Promise(res => https.request(url, res).end());
    const end = new Date();
    const requestTime = end-start;
    return getData(url, urlStorage, res, depth, requestTime, end, Cache);
};

const getData = function(url, urlStorage, res, depth, requestTime, start, Cache){
    let body=[];
    res.on('data', (data)=>{
        body.push(data);
    }).on('end',async ()=>{
        const data = Buffer.concat(body);
        const end = new Date();
        const downloadTime = end-start;

        if((/^3/).test(res.statusCode)) redirectCnt++;

        if(Cache.has(url)){
            printCacheInfo(Cache.get(url));
        }else{
            const [fileName, domain, skim, path, ext, length] = printUrlInfo(url, data.length, requestTime, downloadTime);
            if(depth>0){Cache.set(url, {fileName:fileName, domain:domain, skim:skim, path:path, ext:ext, length:length});}
        }

        if(depth==0){
            const $ = cheerio.load(data);
            $('img[src], script[src]').each(function(idx, ele){
                srcArr.push($(ele).attr('src'));
                foundSrc++;
            });
        }

        if(depth==0){
            for(let src of srcArr){
                if((/^data/).test(src)) {
                    foundSrc--;
                    if(cnt==foundSrc+1) {
                        finalPrint();
                        if(cacheFlag) return
                        else {clear();request(urlStorage, urlStorage, 0, Cache);};
                    } 
                    continue
                }
                request(src, urlStorage, depth+1, Cache);
            }
        }else{
            // console.log(data);
            if(cnt==foundSrc+1) {
                finalPrint();
                if(cacheFlag) return
                else {clear();request(urlStorage, urlStorage, 0, Cache);};
            }
        }
    })
};

function printUrlInfo(url, length, requestTime, downloadTime){
    const skim = url.split(':')[0];
    url = url.split(':')[1].replace(/\/\//,"");
    const domain = url.match(/[^\/]*/)[0];
    let path = url.replace(/[^\/]*/,"");
    if(!path) path='/';
    let ext;
    try{
        let filename;
        if((/\?src=/).test(path)){
            filename = path.match(/%[^%]+\.[^%]+%/g).at(-1).slice(1,-1);
        }else{
            filename = path.replace(/\?.*/,"").match(/[^\/]*$/)[0];
        }
        ext = filename.match(/\.[^.]*$/)[0].slice(1);
        url = filename;
        
    }catch(e){ext='document';}
    
    console.log('\n\r>> ',url);
    console.log('도메인 ',domain);
    console.log('스킴 ',skim);
    console.log('경로 ',path);
    console.log('종류 ',ext);
    console.log('용량 ',length/1000, 'KB');
    console.log('대기 시간 ',requestTime,'ms');
    console.log('다운로드 시간 ',downloadTime,'ms');

    Count(domain, ext, length, requestTime, downloadTime);

    return [url, domain, skim, path, ext, length]
}

function Count(domain, ext, length, requestTime, downloadTime){
    cnt++;

    if(!domainArr.has(domain)){
        domainArr.set(domain,0);
    }else{
        domainArr.set(domain, domainArr.get(domain)+1);
    }

    if((/(png|gif|jpg|jpeg)/i).test(ext)){
        imgCnt++;
    }else if((/(css|js)/i).test(ext)){
        codeCnt++;
    }

    totalSize += length;
    totalLoadingTime += (requestTime+downloadTime);
}


function finalPrint(){
    console.log(`\n\r====\n\n\r도메인 개수 : ${domainArr.size}개\n\r요청 개수 : ${cnt}개\n\r이미지(png, gif, jpg) 개수 : ${imgCnt}개\n\r코드(css, js) 개수 : ${codeCnt}개\n\r전송 용량 : ${totalSize/1000000}MB\n\r리다이렉트 개수 : ${redirectCnt}개\n\r전체 로딩 시간 : ${totalLoadingTime}ms\n`);
}

function clear(){
    console.log('---------------------------------------캐시 메모리 가지고 다시 검색-----------------------------------------------');
    cacheFlag=true; 
    srcArr = [];
    domainArr = new Map();
    cnt = 0;
    imgCnt = 0;
    codeCnt = 0;
    redirectCnt = 0;
    totalSize = 0;
    totalLoadingTime = 0;
    foundSrc = 0;
}

function printCacheInfo(obj){
    console.log('\n\r>> ',obj.fileName);
    console.log('도메인 ',obj.domain);
    console.log('스킴 ',obj.skim);
    console.log('경로 ',obj.path);
    console.log('종류 ',obj.ext);
    console.log('용량 ',obj.length/1000, 'KB');
    console.log('>> 캐시됨');

    CacheCount(obj.domain, obj.ext, obj.length);
}

function CacheCount(domain, ext, length){
    cnt++;

    if(!domainArr.has(domain)){
        domainArr.set(domain,0);
    }else{
        domainArr.set(domain, domainArr.get(domain)+1);
    }

    if((/(png|gif|jpg|jpeg)/i).test(ext)){
        imgCnt++;
    }else if((/(css|js)/i).test(ext)){
        codeCnt++;
    }

    totalSize += length;
}

// printUrlInfo('https://mm.pstatic.net/nnow.phinf/20210625_265/1624585197077gb99s_PNG/336d9e.png?type=f152_152', 5, 10, 20);