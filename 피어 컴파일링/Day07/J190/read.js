const readline = require("readline");
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
});
function read(callback){
    let word = ""
    rl.on("line", (line)=>{
        word=line;
        if (word) {rl.pause();}
    })
    rl.on("resume", (line)=>{
        word=line;
        if (word) {rl.pause();}
    })
    rl.on('pause', () => {
        callback(word, rl)
        word = ""
    })
}
module.exports = {read}