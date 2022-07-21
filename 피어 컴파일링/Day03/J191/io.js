var cache = require("./cache.js")

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

var word;
let lru = new cache.LRU();

process.stdout.write("키워드를 입력하세요> ");
rl.on("line", function (line) {
    word = line;
    program(word);
}).on("close", function () {

});  

async function program(key){
    if (key == "$cache"){
        if (lru.size == 0) console.log('\n저장된 키워드가 없습니다.\n');
        else{
            process.stdout.write("\n키워드 : ");
            let node = lru.head;
            while(true){
                process.stdout.write(node.key+"("+node.hitCount+") ");
                if (node == lru.tail) break;
                node = node.next;
            }
            console.log("\n");
        }
    }
    else await cache.get(lru, key);
    process.stdout.write("키워드를 입력하세요> ");
}