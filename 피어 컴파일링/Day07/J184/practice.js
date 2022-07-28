// 4. prototype pattern
// constructor 패턴과 유사하나, 메서드를 prototype 객체에 보관해서
// constructor pattern 보다는 메모리 효율 상에서 매우 유리함.

// function을 new 키워드로 호출하면 그 함수는 constructor가 됨
const Health = function(name, healthTime) {
    this.name = name;
    this.healthTime = healthTime;
}

Health.prototype.showHealth = function() {
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
}
  
const ho = new Health("crong", "12:12");
const oh = new Health("AAA", "14:29");

ho.showHealth();
oh.showHealth();

// 이렇게 비교하는 것이 맞나? - true라는 결과가 나옴!
console.log(ho.showHealth===oh.showHealth)

/*
prototype은 효과적으로 동작.
생성된 객체(인스턴스)들이 여러개 있어도, prototype에 연결된 객체들은 동일한
메모리 공간에서 효율적으로 재사용됨. - 즉 두 객체의 prototype은 같음.

prototype객체는 최상의 object까지 연결되어 있음.
prototype연결고리를 만들어서 객체간의 상속관계를 만들 수 있음
 */

console.log(ho.__proto__ === oh.__proto__)
// __proto__ 객체는 자바스크립트 내부에서만 사용되는 속성


// 추가 예시

//VM 모듈 - class로 변경될 수 있다고 메시지가 뜨긴 뜬다.
var VM = function(elBase) {
    this.elBase = elBase;
      this.init();
 }
 
 VM.prototype = {
   init : function() {
       this.elBase.addEventListener("click", this.clickListener);
     this.xxx.addEventListener("click", this.xxxxListener);
   }
 }
 
 //Wallet 모듈
 var Wallet = function(elBase) {
    this.elBase = elBase;
      this.init();
 }
 
 Wallet.prototype = {
   init : function() {
       this.elBase.addEventListener("click", this.clickListener);
     this.xxx.addEventListener("click", this.xxxxListener);
   },
     run : function() {
     //blah....
   }
 }

// 체스 모양 출력
var unicode = '\u265F';
console.log(unicode)