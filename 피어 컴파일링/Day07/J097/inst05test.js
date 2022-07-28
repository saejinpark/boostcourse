const healthObj = {
  showHealth : function() {
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = Object.create(healthObj, {
   name: { value: "crong" },
   healthTime: { value: "12:22" } 
})

ho.showHealth();