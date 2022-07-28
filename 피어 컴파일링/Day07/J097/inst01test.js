const healthObj = {
  name : "달리기",
  lastTime : "PM10:12",
  showHealth() {
    console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
  }
}

healthObj.showHealth();