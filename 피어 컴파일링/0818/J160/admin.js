const { Server } = require("./server");

const server = new Server('192.168.1.2', '10001');

const [from, to, title, contents] = ['boostcamp@naver.com', 'jamjam1208@naver.com', 'welcome', 'welcome to membership!'];
server.sendData([from, to, title, contents], '192.168.1.9', '8080');
