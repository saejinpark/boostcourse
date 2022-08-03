import readline from 'readline';
import validate from './validate.js';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = async () => {
  for await (const line of rl) {
    switch (line) {
      case 'quit':
        return rl.close();
      default:
        validate(line);
    }
  }
};

export default input;
