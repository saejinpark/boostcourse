const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
}

Health.prototype.showHealth = function() {
  console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
}

const ho = new Health("crong", "12:12");
ho.showHealth();