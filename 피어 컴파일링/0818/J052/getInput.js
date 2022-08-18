import * as readline from 'node:readline';

const getInput = question => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // console.log 로 고쳐보기
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            return resolve(answer);
        });
    });
};

/* const key = await getInput("input : ");
console.log(key); */
export { getInput };