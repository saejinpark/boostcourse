class Process{
    #state = undefined
    constructor(name, maxOpTime, priority, deadline){
        this.name = name
        this.maxOpTime = maxOpTime
        this.waitTime = 0
        this.opTime = 0
        this.#state = 'ready'
        this.threads = new Set
        this.priority = priority
        this.deadline = deadline
        this.threadNo = Math.floor(maxOpTime/2)?Math.floor(maxOpTime/2):1
        this.endedThread = 0
        this.mkThread()
    }
    mkThread(){
        for(let i=0;i<this.threadNo;i++){
            let callback = ()=>{
                this.operate()
                this.operate()
                let restWork = 2*(this.threadNo-i-1)
                if(this.opTime==this.maxOpTime||restWork>=(this.maxOpTime-this.opTime)){
                    this.endedThread+=1
                }
            }
            this.threads.add(callback)
        }
    }
    getState=()=>{
        return this.#state
    }
    #setState = (state)=>{
        this.#state = state
    }
    readyForRun(){
        return this.#state==='ready'||this.#state==='waiting'
    }
    run=()=>{
        if(this.readyForRun()){
            this.#setState('running')
            return true
        }
        return false
    }
    #exit = ()=>{
        this.#setState('terminated')
    }
    #wait = ()=>{
        this.#setState('waiting')
    }
    operate=()=>{
        if(this.readyForRun()){
            this.waitTime++
        }
        else if(this.getState()==='running'&&this.opTime<this.maxOpTime){
            this.opTime++
        }
    }
    switchState=()=>{
        if(this.getState()==='running'){
            this.#wait()
        }
        if(this.threadNo <= this.endedThread){
            this.#exit()
        }
        if(this.opTime>=this.maxOpTime){
            this.#exit()
        }
    }
    getData=()=>{
        return [this.name,this.getState(),this.opTime,this.maxOpTime,this.waitTime,this.priority,this.deadline]
    }
}
module.exports = Process