/*
  command.js 로 실행시켜야 작동합니다!!!!!
*/

import domparse from "./domParser.js";
import getFromUrl from "./getFromUrl.js";
import getHtml from "./getHtml.js";
import { hrtime } from "process";
import getCount from "./getCount.js";
import consoleFileStat from "./consoleFileStat.js";
import getCachedMemory from "./getCachedMemory.js";

const NS_PER_SEC = 1e6; //ms로 변환
async function main(command, cacheMemory) {
  let html = "";
  const startTime = hrtime.bigint();
  const memory = {}; //response로 받은 data를 저장해놓을 메모리객체
  const urlInput = command; //찾을 주소 입력받음
  const options = {
    hostname: urlInput,
    // port: 443,
    path: "/",
    method: "GET",
  };
  let redirectionCount = 0;
  //전체 html가져옴
  let waitingTime = 0;
  let endTime = 0;
  let htmlSize = 0;
  let header = {};
  [html, waitingTime, endTime, htmlSize, header, redirectionCount] = await getHtml(options, redirectionCount);
  while (header.location) {
    redirectionCount += 1;
    if (header.location[0] === "/") {
      options.path = header.location;
    } else {
      options.hostname = header.location;
    }
    [html, waitingTime, endTime, htmlSize, header, redirectionCount] = await getHtml(options, redirectionCount);
  }
  const waitDuration = Number(waitingTime - startTime) / 1e6; //나노초를 ms로 전환
  const endDuration = Number(endTime - waitingTime) / 1e6; //나노초를 ms로 전환
  memory[options.hostname] = [
    options.hostname,
    "https",
    options.path,
    "document",
    htmlSize / 1000,
    waitDuration,
    endDuration,
  ];

  //--------------------html내 url 불러오기-------------------
  //파싱 후 src속성에있는 링크들
  const urls = domparse(html);
  // url들을 https 로 다시 로딩
  for (let i = 0; i < urls.length; i++) {
    let fileName = urls[i].split("?")[0].split("/");
    fileName = fileName[fileName.length - 1];

    const alreadExistMemory = cacheMemory.filter((cache) => {
      const temp = cache[2].split("?")[0].split("/");
      return temp[temp.length - 1] === fileName;
    });
    //캐시메모리 내에 파일이름이 존재한다면
    if (alreadExistMemory.length) {
      memory[fileName] = alreadExistMemory[0].slice(0, 5);
    } else {
      const urlStartTime = hrtime.bigint();
      const [fileSize, urlWaitTime, urlEndTime] = await getFromUrl(urls[i]);
      if (fileSize) {
        //fileSize가 존재하지 않으면 == 링크가 아니면/ 추가하지 않음
        const urlWaitDuration = Number(urlWaitTime - urlStartTime) / 1e6; //나노초를 ms로 전환
        const urlEndDuration = Number(urlEndTime - urlWaitTime) / 1e6; //나노초를 ms로 전환
        const domain = urls[i].match(/(?<=\/\/).+?(?=\/)/)[0];
        const path = urls[i].replace(`${urls[i].match(/.+?\/\//)[0]}${domain}`, "");
        const skim = urls[i].split("//")[0].slice(0, -1);

        let fileType = fileName.split(".");
        fileType = fileType[fileType.length - 1];

        memory[fileName] = [domain, skim, path, fileType, fileSize, urlWaitDuration, urlEndDuration];
      }
    }
  }
  //FIFO방식으로 캐시 메모리 구현
  cacheMemory = getCachedMemory(memory, cacheMemory);

  //출력부분
  consoleFileStat(memory);
  getCount(memory, redirectionCount);

  return cacheMemory;
}
export default main;
