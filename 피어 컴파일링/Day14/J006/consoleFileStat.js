function consoleFileStat(FileSizesFromUrls) {
  let statData = "\n\n";
  for (let i in FileSizesFromUrls) {
    if (FileSizesFromUrls[i].length === 7) {
      statData += `>> ${FileSizesFromUrls[i][0]}\n`;
      statData += `도메인 ${FileSizesFromUrls[i][0]}\n`;
      statData += `스킴 ${FileSizesFromUrls[i][1]}\n`;
      statData += `경로 ${FileSizesFromUrls[i][2]}\n`;
      statData += `종류 ${FileSizesFromUrls[i][3]}\n`;
      statData += `용량 ${FileSizesFromUrls[i][4]}KB\n`;
      statData += `대기 시간 ${FileSizesFromUrls[i][5]}ms\n`;
      statData += `다운로드 시간 ${FileSizesFromUrls[i][6]}ms\n\n`;
    } else {
      statData += `>> ${FileSizesFromUrls[i][0]}\n`;
      statData += `도메인 ${FileSizesFromUrls[i][0]}\n`;
      statData += `스킴 ${FileSizesFromUrls[i][1]}\n`;
      statData += `경로 ${FileSizesFromUrls[i][2]}\n`;
      statData += `종류 ${FileSizesFromUrls[i][3]}\n`;
      statData += `용량 ${FileSizesFromUrls[i][4]}KB\n`;
      statData += `>> 캐시됨 \n\n`;
    }
  }
  console.log(statData);
}

export default consoleFileStat;
