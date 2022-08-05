function getCount(FileSizesFromUrls, redirectionCount) {
  let countData = "=====\n\n";

  const domainCount = {};
  let imageCount = 0;
  let codeCount = 0;
  let totalDuration = 0;
  let totalFileSize = 0;
  let maxFileSize = [0];
  let maxWaitDuration = [0];
  let maxdownDuration = [0];
  let cacheCount = 0;
  for (let i in FileSizesFromUrls) {
    //1. 캐시메모리가 아닐때
    if (FileSizesFromUrls[i].length === 7) {
      //도메인 개수 체크
      if (!(FileSizesFromUrls[i][0] in domainCount)) {
        domainCount[FileSizesFromUrls[i][0]] = 1;
      }
      //이미지 개수 체크
      if (["jpg", "png", "git"].includes(FileSizesFromUrls[i][3])) {
        imageCount += 1;
      } // 코드 개수 체크
      else if (["css", "js"].includes(FileSizesFromUrls[i][3])) {
        codeCount += 1;
      }
      //전송 용량
      totalFileSize += FileSizesFromUrls[i][4];
      //전체 로딩시간
      totalDuration += FileSizesFromUrls[i][5] + FileSizesFromUrls[i][6];
      //최대용량
      if (FileSizesFromUrls[i][4] > maxFileSize[0]) {
        maxFileSize = [FileSizesFromUrls[i][4], i, "notcached"];
      }
      //최대 오랜 대기시간
      if (FileSizesFromUrls[i][5] > maxWaitDuration[0]) {
        maxWaitDuration = [FileSizesFromUrls[i][5], i];
      }
      //최대 오랜 다운로드 시간
      if (FileSizesFromUrls[i][6] > maxdownDuration[0]) {
        maxdownDuration = [FileSizesFromUrls[i][6], i];
      }
      //2. 캐시메모리일 때
    } else {
      //캐시 데이터 개수 추가
      cacheCount += 1;
      //도메인 개수 체크
      if (!(FileSizesFromUrls[i][0] in domainCount)) {
        domainCount[FileSizesFromUrls[i][0]] = 1;
      }
      //이미지 개수 체크
      if (["jpg", "png", "git"].includes(FileSizesFromUrls[i][3])) {
        imageCount += 1;
      } // 코드 개수 체크
      else if (["css", "js"].includes(FileSizesFromUrls[i][3])) {
        codeCount += 1;
      }
      //최대용량
      if (FileSizesFromUrls[i][4] > maxFileSize[0]) {
        maxFileSize = [FileSizesFromUrls[i][4], i, "cached"];
      }
    }
  }
  countData += `도메인 개수 : ${Object.keys(domainCount).length}개\n`;
  countData += `요청 개수 : ${Object.keys(FileSizesFromUrls).length}개\n`;
  countData += `이미지(png, gif, jpg) 개수 : ${imageCount}개\n`;
  countData += `코드(css, js) 개수 : ${codeCount}개\n`;
  countData += `전송 용량 : ${totalFileSize / 1000}MB\n`;
  countData += `리다이렉트 개수 : ${redirectionCount}개\n`;
  if (cacheCount) {
    countData += `캐시 데이터 개수 : ${cacheCount}개\n`;
  }
  countData += `전체 로딩 시간 : ${totalDuration}ms\n\n`;
  if (maxFileSize[2] === "cached") {
    countData += `가장 큰 용량 : ${maxFileSize[1]} ${maxFileSize[0] / 1000}MB (캐시됨)\n`;
  } else countData += `가장 큰 용량 : ${maxFileSize[1]} ${maxFileSize[0] / 1000}MB\n`;
  countData += `가장 오랜 대기 시간 : ${maxWaitDuration[1]} ${maxWaitDuration[0]}ms\n`;
  countData += `가장 오랜 다운로드 시간 : ${maxdownDuration[1]} ${maxdownDuration[0]}ms\n`;
  console.log(countData);
}
export default getCount;
