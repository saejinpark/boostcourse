const net = require('net');
const readline = require("readline");
const { exit } = require('process');
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.connect({
	port: 2022,
	host: "localhost"
});

// setting encoding
client.setEncoding('utf8');

// 연결 후 입력
client.on('connect', function () {
	console.log('서버 연결!');
    rl.on("line", (line)=> {        
        client.write(line) 
    })
});


let checkInTime;
let checkOutTime
// 서버에서 데이터 받았을 때
client.on('data', function (data) {
	console.log(data.toString());
    if(data.toString().startsWith('체크인')){
        checkInTime = new Date()
    }
    if(data.toString().startsWith('체크아웃')){
        checkOutTime = new Date()
        console.log(`활동시간: ${(checkOutTime - checkInTime)/1000}초`)
        client.end()
        exit(0)
    }
});

// 서버 닫았을 때
client.on('close', function () {
	console.log('서버 연결 해제!');
});

client.on('error', function (err) {
	console.log('on error: ', err.code);
});


