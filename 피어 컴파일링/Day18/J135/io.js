import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getCmd = async () => {
  return await new Promise((resolve, reject) => {
    rl.question("(exit: q) > ", (line) => {
      if (line === "q") {
        rl.close();
      } else {
        resolve(line);
      }
    });
    rl.on("close", () => {
      process.exit();
    });
  });
};

export { getCmd };
