var crawling = require("./crawling.js")

class NODE {
    constructor(key, data) {
        this.key = key;
        this.data = data;  
        this.prev = null;
        this.next = null;
        this.hitCount = 1;
    }
}
class LRU {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.maxSize = 5;
        this.cache = {};
    }    
}

function printInfo(data){
    for(var value of data){
        console.log(value[0]+"\n");
        console.log(value[1]+"\n");
        console.log(value[2]+"\n");
        console.log("\n");
    }
}

function set(lru, key, setNode){
    if(lru.cache[key]) {
        let curNode = lru.cache[key];
        if (curNode == lru.head) return;
        else if (curNode == lru.tail){
            lru.tail = curNode.prev;
            curNode.prev.next = null;
        }
        else {
            curNode.prev.next = curNode.next;
            curNode.next.prev = curNode.prev;
        }
        lru.head.prev = curNode;
        curNode.next = lru.head;
        curNode.prev = null;
        lru.head = curNode;
        return;
    }

    if(lru.size == 0) {
        lru.head = setNode;
        lru.tail = setNode;
        lru.size++;
        lru.cache[key] = setNode;
    }
    if (lru.size == lru.maxSize) {
        delete lru.cache[lru.tail.key]
        lru.tail = lru.tail.prev;
        lru.tail.next = null;
        lru.size--;
    }
    lru.head.prev = setNode;
    setNode.next = lru.head;
    lru.head = setNode;
    lru.size++;

    lru.cache[key] = setNode; 
}


async function get(lru, key) {
    let getNode;
    if(lru.cache[key]) {
        getNode = lru.cache[key];
        getNode.hitCount++;
        console.log("(본 검색 결과는 캐시에 저장된 내용을 표시합니다.)\n");
        printInfo(getNode.data);
        set(lru, key, getNode);
    }
    else{
        let datas;
        await crawling.crawling(key, 10).then(function(res){
            datas = res;
            getNode = new NODE(key, datas);
            printInfo(getNode.data);
            set(lru, key, getNode);
        });
    }
}

module.exports = {NODE, LRU, set, get, printInfo};