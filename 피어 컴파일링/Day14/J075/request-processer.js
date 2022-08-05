import https from "https";
import cheerio from "cheerio";
import { NetworkManager } from "./network-manager.js";
import {Cache} from './cache.js';

/**
 * 웹 브라우저에 요청을 보내고, HTML을 분석하는 관련 모듈을 모아둠.
 */

// element와 attr 매핑
const SRCMapping = [
    ['script', 'src'],
    ['img', 'src'],
    ['img', 'data-src'],
    ['link', 'href']
]

/**
 * 사용자가 url에 접근하고자 할때(url 입력 시 동작)
 * html 분석까지 전체 흐름이 담겨있음
 * @param {string} url 
 * @param {boolean} cache 
 */
export async function accessPage(url, cache){   
    NetworkManager.loadingTime = new Date(); 
    const result = await getPage(url, cache);
    NetworkManager.addNetworkInfo(cache, result);

    getSRC(result.html, cache).then(()=>{
        NetworkManager.loadingTime = new Date() - NetworkManager.loadingTime;
        NetworkManager.printNetworkManager(cache);
        Cache.storageCache();
    })
}

/**
 * getHTTPs 함수로 넘어가기 위한 중간함수
 * @param {string} url 
 * @param {boolean} cache 
 * @returns 
 */
function getPage(url, cache){
    return new Promise((resolve)=> getHTTPs(url, cache, resolve))
};

/**
 * get 요청을 보내고 응답을 받음
 * 캐시를 쓴다고 하면, 캐시부터 확인한다. 
 * @param {string} url 
 * @param {boolean} cache 
 * @param {Object} resolve 
 */
async function getHTTPs(url, cache, resolve){
    if(cache && Cache.isCache(url)){
        const result = Cache.getCache(url)
        resolve({html:result.html, header:result.header, time:result.time, url:result.url, cache:true});
    }
    const time = {};
    time.waitingTime = new Date();
    let html, header, state;
    https.get(url, res => {
        time.waitingTime = new Date()-time.waitingTime
        time.downloadTime = new Date();
        header = res.headers;
        state = res.statusCode;
        if(res.statusCode === 301 || res.statusCode === 302) {
            NetworkManager.numOfRedirects+=1
            if(!res.headers.location.startsWith('http')) {
                console.log(`(${url} ==> ${url+res.headers.location} 리다이렉트)`)
                url = url+res.headers.location
            }else url = res.headers.location;
            return getHTTPs(url, cache, resolve)
        }
        res.on('error', (err) => {console.log(err)})
        res.on('data', chunk => { html += chunk }) 
        res.on('end', () => {
            time.downloadTime = new Date()-time.downloadTime;
            resolve({html:html, header:header, time:time, url:url, cache:false});
        })
    }) 
}

/**
 * script 태그의 src 속성, img 태그의 src 속성을 찾고, 요청을 다시 보내는 함수 호출
 * @param {string} html 
 * @param {boolean} cache 
 */
async function getSRC(html, cache){
    const $ = cheerio.load(html);
    for(let value of Object.entries(SRCMapping)){
        const $elem = $(`${value[1][0]}`);
        for(let data of $elem){
            let source = $(data).attr(`${value[1][1]}`)
            if(source!==undefined && source!==''){
                if(source.startsWith('http')) await resourceDownload(source, cache);
            }
        }
    }
}

/**
 * 찾은 src 속성을 모아 요청을 다시 보낸다. 
 * @param {string} url 
 * @param {boolean} cache 
 */
async function resourceDownload(url, cache){
    const result = await getPage(url, cache);
    NetworkManager.addNetworkInfo(cache, result);
}