const Process = require("./process.js");
const print = console.log
class WaitingQueue{
    constructor(callback){
        this.data = []
        this.setRule(callback)
    }
    setRule(callback){
        this.rule = callback
    }
    push(input){
        this.data.push(input)
    }
    pop(){
        let idx = Array(this.data.length).fill().map((x,i)=>i).reduce((pre,cur)=>{
            return this.rule(pre,cur)
        },[this.data,undefined])[1]
        return this.data.splice(idx,1)
    }
}

class OS{
    constructor(select){
        this.name = ['A','B','C','D','E','F']
        this.selection = select
        this.policyname = ['라운드 로빈', '고정 우선순위', '기한부 스케쥴링'].at(select)
        this.policy = [(pre, cur)=>[0,0],
            (pre,cur)=>{
                let idx = pre.pop()
                if(idx == undefined){
                    if(pre[0][cur].getState()!=='terminated')return [...pre,cur]
                    else return [...pre,idx]
                }
                if(pre[0][cur].priority<=pre[0][idx].priority&&pre[0][cur].getState()!=='terminated'){
                    idx = cur
                }
                return [...pre,idx]
            },
            (pre,cur)=>{
                let idx = pre.pop()
                if(idx == undefined){
                    if(pre[0][cur].getState()!=='terminated')return [...pre,cur]
                    else return [...pre,idx]
                }
                if(pre[0][cur].deadline<=pre[0][idx].deadline&&pre[0][cur].getState()!=='terminated'){
                    idx = cur
                }
                return [...pre,idx]
            }
        ]
        this.procs = new WaitingQueue(this.policy[select])
        this.#init()
    }
    #init = ()=>{
        let opTimes = this.getRandomOpTimes()
        let procNo = this.getRandomProcess()
        let priority = this.getRandomPriority()
        let deadline = this.getRandomDeadline()
        for(let x in procNo){
            this.procs.push(new Process(this.name[procNo[x]],opTimes[x],priority[x],deadline[x]))
        }
    }
    getRandomOpTimes(){
        let min = Math.ceil(1);
        let max = Math.floor(20);
        let opTimes = []
        while(opTimes.length<3){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
            opTimes.includes(randomNum)
            if(!opTimes.includes(randomNum)){
                opTimes.push(randomNum)
            }
        }
        return opTimes
    }
    getRandomProcess(){
        let min = Math.ceil(0);
        let max = Math.floor(5);
        let procNo = []
        while(procNo.length<3){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
            if(!procNo.includes(randomNum)){
                procNo.push(randomNum)
            }
        }
        return procNo
    }
    getRandomPriority(){
        let min = Math.ceil(0);
        let max = Math.floor(6);
        let procNo = []
        while(procNo.length<3){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
            procNo.push(randomNum)
        }
        return procNo
    }
    getRandomDeadline(){
        let min = Math.ceil(1);
        let max = Math.floor(60);
        let procNo = []
        while(procNo.length<3){
            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
            if(!procNo.includes(randomNum)){
                procNo.push(randomNum)
            }
        }
        return procNo
    }
    start(){
        //출력
        while(1){
            let remain = Array(this.procs.data.length).fill().map((x,i)=>i).reduce((pre,idx)=>{
                return pre||this.procs.data[idx].readyForRun()
            },false)
            if(!remain)break
            let work = this.procs.pop()[0]
            if(!work.run()){
                this.procs.push(work)
                continue
            }
            for(let task of work.threads){
                task()
            }
            // work.operate()
            Array(this.procs.data.length).fill().map((x,i)=>i).forEach((idx)=>{this.procs.data[idx].operate()})
            //출력
            let printData = [work.getData()]
            Array(this.procs.data.length).fill().map((x,i)=>i).forEach((idx)=>{
                printData.push(this.procs.data[idx].getData())
            })
            printData.sort((a,b)=>{
                if(a < b) return -1;
                if(a > b) return 1;
                if(a === b) return 0;
                else return -1;
            })
            Array(printData.length).fill().map((x,i)=>i).forEach((idx)=>{
                print(`${printData[idx][0]}(${printData[idx][1]}), ${printData[idx][2]} / ${printData[idx][3]}sec, waiting ${printData[idx][4]} sec ${this.selection?"priority/deadline":""} ${this.selection?printData[idx][4+this.selection]:""}`)
            })
            work.switchState()
            this.procs.push(work)
            sleep(1000)
            print('.')
        }
        let printData = []
        Array(this.procs.data.length).fill().map((x,i)=>i).forEach((idx)=>{
            printData.push(this.procs.data[idx].getData())
        })
        Array(printData.length).fill().map((x,i)=>i).forEach((idx)=>{
            print(`${printData[idx][0]}(${printData[idx][1]}), ${printData[idx][2]} / ${printData[idx][3]}sec, waiting ${printData[idx][4]} sec ${this.selection?"priority/deadline":""} ${this.selection?printData[idx][4+this.selection]:""}`)
        })
        print(`${this.policyname} 방식 스케줄링이 종료되었습니다.`)

    }
}
function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

// module.exports = OS
let os = new OS(0)
os.start()