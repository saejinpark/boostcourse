import { PROCSTATUS } from "./process.mjs"
import PriorityQueue from "./pq.mjs"
import {setTimeout} from 'timers/promises'


const POLICY = {
  DEADLINE: 1,
  SPRIORITY : 2,
  RROBIN : 3
};

class Scheduler {
  constructor(policy, preemptive, thread, interval, threadTime) {
    this.Schedule = null;
    this.preemptive = preemptive;
    this.waitingQueue = null;
    this.processList = [];
    this.runningProcess = null;
    this.init(policy);
    this.runningTime = 0;
    this.processJail = null;
    this.thread = thread;
    this.interval = interval;
    this.threadTime = threadTime;
  }

  init(policy){
    let compare = () => (1);
    switch(policy){

      case POLICY.DEADLINE:
        this.Schedule = this.deadline;
        compare = (a, b) => (a.deadline < b.deadline);
        break;

      case POLICY.SPRIORITY:
        this.Schedule = this.spriority;
        compare = (a, b) => (a.priority < b.priority);
        break;

      case POLICY.RROBIN:
        this.Schedule = this.rrobin;
        compare = (a, b) => (a.lastRuntime > b.lastRuntime);
        break;

      default:
        throw "정의되지 않은 정책입니다."
    }
    this.waitingQueue = new PriorityQueue(compare);
  }

  push(process){
    this.processList.push(process);
  }

  async simulate(){
    this.monitorProcess();
    await this.start();
    while(!(this.runningProcess === null && this.waitingQueue.empty())) {
      await this.next();
      if (this.interval !== null) await setTimeout(this.interval);
    }

    console.log("시뮬레이션 종료.");

    let wTime = [];
    let tTime = [];

    for (const process of this.processList){
      wTime.push(process.waittime);
      tTime.push(process.terminatedtime);
    }
    
    console.log(`평균 대기시간 = ${wTime} / ${wTime.length} = ${wTime.reduce((pre, val)=>pre+val,0)/wTime.length}`);
    console.log(`평균 반환시간 = ${tTime} / ${tTime.length} = ${tTime.reduce((pre, val)=>pre+val,0)/tTime.length}`);
  }

  async start(){
    for (let process of this.processList) {
      if (this.thread)
        await process.ready(this.threadTime);
      process.status = PROCSTATUS.WAITING;
      this.waitingQueue.push(process);
    }
  }
  
  async next(){
    console.log("-start-------");
    await this.processKickBack();
    await this.Schedule();
    await this.doJob();
    this.releaseJail();
    this.timeIncrement();
    this.monitorProcess();
    console.log(`                                      -------end-${this.runningTime}`);
  }

  async processKickBack(){
    if (this.processJail !== null)
      throw "죄수 프로세스가 석방을 거부하였음";
    if (this.runningProcess !== null) {
      if (this.thread) await this.runningProcess.terminate(); //스레드는 1회용
      if (this.runningProcess.maxRuntime <= this.runningProcess.currentRuntime) {
        this.runningProcess.status = PROCSTATUS.TERMINATED;
        this.runningProcess.terminatedtime = this.runningTime;
        this.runningProcess = null;
      }
      else {
        if (this.preemptive) {
          if (!this.waitingQueue.empty()) 
            this.processJail = this.runningProcess;
          else 
            this.waitingQueue.push(this.runningProcess);
          this.runningProcess.status = PROCSTATUS.WAITING;
          this.runningProcess = null;
        }
      }
    }
  }

  async doJob(){
    if (this.runningProcess === null)
      return;
    this.runningProcess.lastRuntime = this.runningTime;
    await this.runningProcess.work();
  }

  releaseJail(){
    if (this.processJail !== null) {
      this.waitingQueue.push(this.processJail);
      this.processJail = null;
    }
  }

  timeIncrement(){
    this.runningTime++;
    for (let process of this.processList){
      if (process.status === PROCSTATUS.WAITING)
        process.waittime++;
    }
    //실행중인 프로세스의 러닝 타임은 프로세스에서 증가시킴
  }

  monitorProcess(){
    for (const process of this.processList)
      console.log(process.monitor());
  }

  async deadline(){
    if (this.runningProcess === null)
    while(!this.waitingQueue.empty() &&
          (this.runningProcess = this.waitingQueue.pop()).deadline < this.runningTime + this.runningProcess.maxRuntime - this.runningProcess.currentRuntime - this.runningProcess.threadlist.length*2) {
      //이 일은 기한 내에 할 수 없는 일임. terminate.
      console.log(`스케줄러 : ${this.runningProcess.procName}는 기한을 엄수할 수 없으므로 종료됩니다.`)
      this.runningProcess.status = PROCSTATUS.TERMINATED;
      if (this.thread)
        await this.runningProcess.terminate();
      this.runningProcess.terminatedtime = this.runningTime;
      this.runningProcess = null;
    }
  }

  spriority(){
    if (this.runningProcess === null) {
      this.runningProcess = this.waitingQueue.pop();
    }
  }

  rrobin(){
    if (this.runningProcess === null) {
      this.runningProcess = this.waitingQueue.pop();
    }
  }
}

export { POLICY, Scheduler }