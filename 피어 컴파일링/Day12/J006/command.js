import readline from "readline";
import { checkValidCommand, executeCommand } from "./functions.js";

function command() {
  let mitDir = "";
  let prevTree = null;
  const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r.setPrompt("> ");
  r.prompt();
  r.on("line", async function (line) {
    if (line == "exit" || line == "q" || line == "Q") {
      r.close();
    }
    //유효성 검사
    const commands = checkValidCommand(line);

    //명령어 실행
    if (commands[1] === "init") mitDir = commands[2];
    if (commands[1] === "commit") {
      prevTree = await executeCommand(commands, mitDir, prevTree);
    } else {
      executeCommand(commands, mitDir);
    }

    r.prompt();
  });
  r.on("close", function () {
    process.exit();
  });
}
export default command;
