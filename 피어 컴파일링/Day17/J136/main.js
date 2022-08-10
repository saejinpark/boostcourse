import { Pos } from './pos.js'
import { Manager } from './manager.js'
import { EventLooper } from './eventLooper.js'
import { Chef } from './chef.js' 
import { DashBoard } from './dashBoard.js'
import readline from 'readline'
import { exit } from 'process'

async function main(){
    const pos = new Pos();
    const manager = new Manager();
    const eventLooper = new EventLooper();
    const chef = new Chef();
    const dashBoard = new DashBoard;
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    rl.setPrompt(`> 메뉴  =  1. 라면(3분)    2. 떡볶이(7분)    3. 닭볶음탕(15분)    4. 갈비찜(20분)\n> 주문할 음식을 입력하세요. 예) 라면 2개 => 1:2\n> 입력: `)
    rl.prompt()
    rl.on("line", (line) => {
        const order = line.split(':').map(Number)
        // 포스가 주문 받기
        pos.addMenu(order);
    });

    const managerCheck = setInterval(()=> {
        if(cnt >= 3){
            clearInterval(managerCheck)
        }
        // 매니저가 2초마다 포스에서 주문 확인하기
        let checkQ = manager.getOrder(pos);
        console.log(`\n> 매니저가 2초에 한번씩 주문 확인하는중~~~\n`)
        // 포스에 주문이 있으면 매니저가 주문 이벤트루퍼에 주기
        // 이벤트루퍼가 요리사한테 전달
        if(checkQ){
            eventLooper.getEvent(manager)
            chef.getEvent(eventLooper)
            chef.setCookList()
            chef.setCrrCook()
        }
    },2000)

    // 3초당 1분 요리하기
    let cnt = 0
    const cookLoop = setInterval(() => {
        let check = chef.cook()
        if(check === false){
            cnt += 1
        }
        // 9초 동안 주문 없으면 영업종료
        if(cnt >= 3){
            console.log(`> 영업끝!!`)
            clearInterval(cookLoop)
            exit(0)
        }
    }, 3000);


    // 10초에 한번 주문현황 표시하기
    const display = setInterval(()=> {
        if(cnt === 0){
            dashBoard.getStatus(chef)
        }
    },10000)
}


main()