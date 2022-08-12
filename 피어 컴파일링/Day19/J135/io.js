import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// rl.setPrompt("> ");

const getInput = async () => {
  return await new Promise((resolve, reject) => {
    // rl.prompt();
    rl.on("line", (line) => {
      resolve(line);
    });
  });
};

export { getInput };
