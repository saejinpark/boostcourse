import https from "https";
import { hrtime } from "process";
async function getFromUrl(url) {
  let waitingTime = [];
  let endTime;
  try {
    const hostName = url.split("//")[1].match(/.+?\//)[0].slice(0, -1);
    const path = url.split("//")[1].replace(hostName, "");
    const options = {
      // hostname: "httpbin.org",
      hostname: hostName,
      // port: 443,
      path: path,
      method: "GET",
    };
    return new Promise((response) => {
      let fileSize = 0;

      const req = https.request(options, (res) => {
        res.on("data", (d) => {
          waitingTime.push(hrtime.bigint());
          fileSize += d.length;

          //청크단위로 받아오는 버퍼의 크기
        });
        res.on("end", () => {
          endTime = hrtime.bigint();
          response([fileSize, waitingTime[0], endTime]);
        });
      });

      req.on("error", (e) => {
        console.error(e);
      });
      req.end();
    });
  } catch {
    return new Promise((res) => {
      res([undefined, 0, 0]);
    });
  }
  // 링크가 아니면,fileSize를 undefined로 반환
}
export default getFromUrl;
