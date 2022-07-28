import Interface from './interface.mjs';
import * as readline from "readline";

let int = new Interface();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
  console.log("-------------------");
  console.log(int.display());
  rl.question("명령을 입력하세요: ", (str) => {
    try {
      if (int.command(str)) //true? -> command의 결과로 인터페이스에서 출력할 알림이 있음을 알림
        console.log(int.notification()); //그 알림을 출력함
    }
    catch (e) {
      console.log(e);
    }
    finally{
      main();
    }
  });
}

main();