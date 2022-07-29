import * as WT from 'worker_threads';

const PROCSTATUS = {
  READY: "Ready",
  RUNNING: "Running",
  WAITING: "Waiting",
  TERMINATED: "Terminated"
}

// https://stackoverflow.com/questions/6902334/how-to-let-javascript-wait-until-certain-event-happens
function getPromiseFromEvent(item, event) {
  return new Promise((resolve) => {
    const listener = (msg) => {
      console.log(msg);
      resolve();
    }
    item.once(event, listener);
  })
}

class Process {
  constructor(procName, maxRuntime, work, deadline, priority){
    this.procName = procName;
    this.maxRuntime = maxRuntime;
    this.currentRuntime = 0;
    this.waittime = 0;
    this.workcb = work;
    this.status = PROCSTATUS.READY;
    this.deadline = deadline;
    this.priority = priority;
    this.lastRuntime = 0;
    this.terminatedtime = 0;
    this.threadlist = [];
  }
  
  formatstring(str1, str2, size, pad=" "){
    if (typeof str1 !== String)
      str1 = String(str1);
    if (typeof str2 !== String)
      str2 = String(str2);
    size -= str1.length;
    if (size < 0) size = 0;
    return str1 + str2.padStart(size, pad);
  }

  monitor(){
    let str = "";
    let colorcode = {Ready:'\u001b[90m', Running:'\u001b[32m', Waiting:'\u001b[36m', Terminated:'\u001b[91m', Normal:'\u001b[0m'};
    
    str += this.formatstring("", this.procName+"("+this.threadlist.length+")", 12) + "||";
    str += this.formatstring("C.Run", this.currentRuntime, 10)+" | ";
    str += this.formatstring("T.run", this.maxRuntime, 10)+" | ";
    str += this.formatstring("Wait.", this.waittime, 10)+"\n";

    str += colorcode[this.status] + this.formatstring("", this.status, 12) + colorcode["Normal"] + "||";
    str += this.formatstring("DeadL", this.deadline, 10)+" | "
    str += this.formatstring("Prior", this.priority, 10)+" | "
    str += this.formatstring("LastR", this.lastRuntime, 10) + "\n";

    str += "-".repeat(50);

    return str;
  }
  async ready(threadtime){
    let promlist = [];
    for (let i=0; i<Math.trunc(this.maxRuntime/2); i++){
      this.threadlist.push(new WT.Worker(`./thread.mjs`, {
        workerData: { threadTime : threadtime} ,
      }));
      this.threadlist[i].postMessage(`reg.${this.procName} 프로세스의 ${i+1}번 쓰레드`);
      promlist.push(getPromiseFromEvent(this.threadlist[i], "message" ));
      this.threadlist[i].on("exit", () => console.log(`${this.procName} 프로세스의 ${i+1}번 쓰레드 종료됨`));
    }
    await Promise.all(promlist);
  }
  async terminate(){
    let promlist = [];
    for (let thread of this.threadlist){
      thread.postMessage("close.");
      promlist.push(getPromiseFromEvent(thread, "message" ));
    }
    await Promise.all(promlist);
    this.threadlist.length = 0;
  }
  async work(){
    this.workcb();
    this.status = PROCSTATUS.RUNNING;
    if (this.threadlist.length === 0)
      this.currentRuntime++;
    let promlist = [];
    for (let thread of this.threadlist){
      thread.postMessage("work.");
      promlist.push(getPromiseFromEvent(thread, "message" ));
    }
    await Promise.all(promlist);
    promlist.length = 0;
    for (let thread of this.threadlist){
      this.currentRuntime+=2;
      promlist.push(getPromiseFromEvent(thread, "message" ));
    }
    await Promise.all(promlist);

  }
}

export { Process, PROCSTATUS };