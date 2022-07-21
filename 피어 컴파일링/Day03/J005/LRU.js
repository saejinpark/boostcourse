class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.hit = 0;
        this.next = null;
        this.prev = null;
    }
}

class LRU {
    constructor(v) {
        this.size = v;
        this.map = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    put(key, val) {
        let node = new Node(key, val);
        this.map.set(key, node);
        this.insertFront(node);

        if (this.size < this.map.size) {
            this.removeLast();
        }
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        let node = this.map.get(key);
        this.breakAndLink(node);
        this.insertFront(node);
        return node.val;
    }

    breakAndLink(node) {
        let p = node.prev;
        let n = node.next;
        p.next = n;
        n.prev = p;
        node.next = null;
        node.prev = null;
    }

    insertFront(node) {
        let h2 = this.head.next;
        this.head.next = node;
        node.prev = this.head;
        h2.prev = node;
        node.next = h2;
        node.hit += 1;
    }

    removeLast() {
        let node = this.tail.prev;
        this.breakAndLink(node);
        this.map.delete(node.key);
    }

    allCache() {
        return this.map;
    }

    getHit(key) {
        let node = this.map.get(key);
        return node.hit;
    }
}

// 동작예시
// let testCache = new LRU(5);
// testCache.put("apple", [1, 2, 3, 4, 5]);
// console.log(testCache.get("apple"));
// testCache.put("banana", [3, 4, 5]);
// console.log(testCache.get("apple"));
// testCache.put("a", [4, 999]);
// testCache.put("b", [4, 999]);
// testCache.put("c", [4, 999]);
// testCache.put("d", [4, 999]);
// console.log(testCache.get("banana"));

// for (var i of testCache.allCache().keys()) {
//     console.log(i + "(" + testCache.getHit(i) + ")");
// }

let cache = new LRU(5);
module.exports = {
    cache: cache,
};
