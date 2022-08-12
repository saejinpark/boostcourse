import hellos from "./hello.js";

const missions = new Map([
    [1, "IDE, node"],
    [2, "Linux, Shell"],
    [3, "Crawling, LRU"],
    [4, "Heap, Stack"],
    [6, "XML, XPath"],
    [7, "Object, Class"],
    [8, "CountSet, Closure"],
    [9, "Process, Thread"],
    [11, "Path, UnitTest"],
    [12, "Git, Objects"],
    [13, "OSI, TCP/IP"],
    [14, "HTTP, Request"],
    [16, "Event, Async"],
    [17, "Food, Delivery"],
    [18, "SQL, Report"],
    [19, "Network, Server"],
]);

function getMission(args) {
    const reg = /(?:day)? ?(?<idx>[\d]+)/i;
    if(!args.match(reg)) {
        return;
    }
    const {groups : {idx}} = args.match(reg);
    const ret = missions.get(parseInt(idx));
    return ret;
}

function parseCommand(str) {
    const reg = /(?<command>[A-z]+)(?: (?<args>[\S ]+))*/;
    const {groups:{command, args}} = str.match(reg);
    return [command, args];
}

function hello() {
    const ret = hellos[Math.floor(Math.random() * hellos.length)];
    return ret;
}

export { getMission, parseCommand, hello };