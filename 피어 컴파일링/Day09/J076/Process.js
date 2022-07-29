function Process(arr, id, type) {
  this.status = "ready";
  this.processName = arr[0];
  this.processId = id;
  this.timeToTerminate = arr[1];
  this.currentProgress = 0;
  this.waitingTime = 0;
  this.deadline = type === "deadline" ? arr[2] : null;
  this.timer = type === "deadline" ? arr[2] : null;
  this.priority = type === "priority" ? arr[2] : null;
  this.addCurrentProgress = () => this.currentProgress++;
  this.getReturnTime = () => this.waitingTime + this.timeToTerminate;
}

module.exports = Process;
