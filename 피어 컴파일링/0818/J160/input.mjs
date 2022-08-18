import * as readline from 'node:readline';

export default function getUserInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, response => {
    rl.close();
    resolve(response);
  }));
}