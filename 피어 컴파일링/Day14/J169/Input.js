import readline from 'readline';

export const getInput = async function(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const input = await new Promise(line => rl.question("요청할 URL을 입력해주십시오.(미입력시 www.naver.com)\n", line));
    rl.close();

    if(input=='') return 'https://www.naver.com'

    return 'https://'+input
}