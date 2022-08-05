/*
command.js로 실행시켜야 작동합니다!!!!! 
*/

import readline from "readline";
import main from "./main.js";
let cacheMemory = [];
function command() {
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r.setPrompt("> ");
  r.prompt();
  r.on("line", async function (line) {
    if (line == "exit") {
      r.close();
    }
    cacheMemory = await main(line, cacheMemory);
    r.prompt();
  });
  r.on("close", function () {
    process.exit();
  });
}
command();
