import https from "https";
import { hrtime } from "process";
function getHtml(options, redirectionCount) {
  let waitingTime = [];
  let endTime;
  let fileSize = 0;
  //options에서 hostname이 http://로 시작한다면 https://로 바꿔준다.
  if (options.hostname.includes("//")) {
    options.hostname = options.hostname.split("//")[1].slice(0, -1);
    console.log(options.hostname);
    redirectionCount += 1;
  }

  return new Promise((response) => {
    let html = "";
    const req = https.request(options, (res) => {
      res.on("data", (d) => {
        waitingTime.push(hrtime.bigint());
        html += d.toString();
        fileSize += d.length;
      });
      res.on("end", () => {
        endTime = hrtime.bigint();
        response([html, waitingTime[0], endTime, fileSize, res.headers, redirectionCount]);
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });
    req.end();
  });
}
export default getHtml;
