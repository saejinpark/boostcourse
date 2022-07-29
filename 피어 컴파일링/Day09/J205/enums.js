const PROCESS_STATUS = Object.freeze({
  READY: "ready",
  RUNNING: "running",
  WAITING: "waiting",
  TERMINATED: "terminated",
});

const SCHEDULING_TYPE = Object.freeze({
  DEADLINE: Symbol("Deadline"),
  PRIORITY: Symbol("Priority"),
  ROUND_ROBIN: Symbol("Round_Robin"),
});

module.exports = { PROCESS_STATUS, SCHEDULING_TYPE };
