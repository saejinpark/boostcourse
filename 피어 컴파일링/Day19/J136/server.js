const net = require('net');

const server = net.createServer((client)=>{ 
    console.log('클라이언트 접속!');
    const clientInfo = client.address()
    
    // 클라이언트 정보
    console.log(`IP: ${clientInfo.address}\nPort: ${clientInfo.port}`)

    // 클라이언트 연결됐을 때
    // client.on('connect', ()=>{
    //     crrCamper = null
    // })
    // 클라이언트에서 데이터 받았을 때
    client.on('data', (data)=>{
        console.log(`클라이언트에서 보낸 데이터: ${data.toString()}`);
        // client.write(`서버에서 받은 데이터: ${data.toString()}`)
        // checkin 받았을 때
        if(data.toString().startsWith('checkin')){
            client.write(checkIn(data.toString()))
        }
        // checkout 받았을 때
        if(data.toString().startsWith('checkout')){
            client.write(checkOut(client,data.toString()))
        }
        // mission 받았을 때
        if(data.toString().startsWith('day')){
            client.write(missoin(data.toString()))
        }
    });

    // 클라이언트 접속해제 시
    client.on('end', ()=>{ console.log('클라이언트 접속해제!'); }); 
});

server.listen(2022, ()=>{ console.log('서버 열기!!'); });

const checkInList = [];
const bigGroup = [];
let smallGroup = [];
// let crrCamper = null;

const missoinObj = {
    1: 'IDE, node',
    2: 'Linux, Shell',
    3: 'Crawling,LRU',
    4: 'Heap, Stack',
    6: 'XML, XPath',
    7: 'Object, Class',
    8: 'CountSet, Closure',
    9: 'Process, Thread',
    11: 'Path, UnitTest',
    12: 'Git, Objects',
    13: 'OSI, TCP/IP',
    14: 'HTTP, Request',
    16: 'Event, Async',
    17: 'Food, Delivery',
    18: 'SQL, Report',
    19: 'Network, Server'
}

function checkIn(data){
    const num = Number(data.split(' ')[1].replaceAll('J', ''))
    
    // if(crrCamper !== null){
    //     return '이미 체크인 했습니다.'
    // }
    if(checkInList.includes(num)){
        return '이미 체크인한 캠프아이디 입니다.'
    }
    if(num > 0 && num < 385){
        crrCamper = num
        checkInList.push(num)
        if(smallGroup.length === 4){
            bigGroup.push(smallGroup)
            smallGroup = []
            smallGroup.push(num)
        }else{
            smallGroup.push(num)
        }
        return `체크인 되었습니다.\n그룹번호: ${bigGroup.length+1}`
    }else{
        return `없는 캠프아이디 입니다.\n범위: J001 ~ J384`
    }
}

function checkOut(client,data){
    const num = Number(data.split(' ')[1].replaceAll('J', ''))
    if(!checkInList.includes(num)){
        return `${data.split(' ')[1]} 은 체크인을 하지 않았습니다.`
    }
    const idx = checkInList.indexOf(num)
    checkInList.splice(idx,1)
    if(smallGroup.includes(num)){
        smallGroup.splice(smallGroup.indexOf(num),1)
        if(smallGroup.length > 0){
            client.write(`${data.split(' ')[1]} 님이 퇴장하였습니다.`)
        }
    }else{
        let x = null
        let y = null
        for(let i=0;i < bigGroup.length; i++){
            for(let j=0; j<bigGroup[i].length; j++){
                if(bigGroup[i][j] === num){
                    x = i
                    y = j
                    break
                }
            }
        }
        bigGroup[x].splice(y,1)
        if(bigGroup[x].length > 0){
            client.write(`${data.split(' ')[1]} 님이 퇴장하였습니다.`)
        }
    }
    return '체크아웃 되었습니다.'
}

function missoin(data){
    const num = Number(data.toString().replace('day',''))
    return missoinObj[num]
}