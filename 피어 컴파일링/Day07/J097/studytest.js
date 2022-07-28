
// class proto 디버깅용
// class Cat{
//   constructor(name){
//     this.name = name;
//   }

//   meow(){
//     console.log(this.name+"meow");
//   }
// }

// let cat = new Cat('a');

// cat.meow();

//---------------------------------------------------
//protected 접근 가능한지 확인
// class CoffeeMachine {
//   _waterAmount = 0;

//   set waterAmount(value) {
//     if (value < 0) console.log("물의 양은 음수가 될 수 없습니다.");
//     this._waterAmount = value;
//   }

//   get waterAmount() {
//     return this._waterAmount;
//   }

//   constructor(power) {
//     this._power = power;
//   }

// }

// // 커피 머신 생성
// let coffeeMachine = new CoffeeMachine(100);

// // 물 추가
// coffeeMachine.waterAmount = -10; 
// coffeeMachine._waterAmount = -40;

// console.log(coffeeMachine);


//---------------------------------------------------
//this, super 테스트해보기

// class Animal {
//   constructor(name) {
//     this.speed = 0;
//     this.name = name;
//     this.callSign = "Animal "+name;
//   }

//   run(speed) {
//     this.speed = speed;
//     console.log(`${this.name}가 속도 ${this.speed}로 달립니다.`);
//   }

//   stop() {
//     this.speed = 0;
//     console.log(`${this.name}가 멈췄습니다.`);
//   }

//   call() {
//     console.log(this.callSign);
//   }

// }

// class Rabbit extends Animal {
//   constructor(name){
//     super(name);
//     this.callSign = "Rabbit "+name;
//   }
  
//   hide() {
//     console.log(`${this.name}가 숨었습니다!`);
//   }

//   stop() {
//     super.stop(); // 부모 클래스의 stop을 호출해 멈추고,
//     this.hide(); // 숨습니다.
//   }

//   call() {
//     console.log(this.callSign, super.callSign);
//     super.call();
//   }
// }

// let rabbit = new Rabbit("흰 토끼");
// rabbit.call();
// console.log(rabbit.callSign);

// rabbit.run(5);
// rabbit.stop();

//---------------------------------------------------
//const test

// const po = {
//   s1: 1, s2: 2, s3: 3, s4: 4, s5: 5, s6: 6, s7: 7, s8: 8,
//   sA: 1, sB: 2, sC: 3, sD: 4, sE: 5, sF: 6, sG: 7, sH: 8
// };

// console.log(pos.A);

//--------------------
//static test

// class a {
//   constructor(name){
//     this.name = name;
//   }
//   static check(){
//     console.log("CHECK A");
//   }
//   check(){
//     console.log(this.name, this.constructor.oh);
//   }
//   static oh = 1;
// }

// a.check();
// let b = new a("s");
// b.check();
// console.log(a.oh, b.oh);

//result
//CHECK A
//s 1
//1 undefined

//--------------------
// char code test

// class Position {
//   constructor(file, rank){
//     this.file = file;
//     this.rank = rank;
//   }

//   toString(){
//     //65 : A
//     //49 : 1
//     return String.fromCharCode(64+this.file, 48+this.rank);
//   }
// }

// s = new Position(4, 2);
// console.log(s.toString());

//---------------------
// proto change test

// class Cat {
//   constructor(name){
//     this.name = name;
//   }
//   meow(){
//     console.log(this.name + " meow");
//   }
//   change(){
//     this.__proto__ = Dog.prototype;
//   }
// }

// class Dog {
//   constructor(name){
//     this.name = name;
//   }
//   bark(){
//     console.log(this.name + " bark");
//   }
// }

// let cat = new Cat("cot");
// cat.meow();
// cat.change();
// cat.bark();

// //result
// /*
// cot meow
// cot bark
// */

//---------------------
// 원시 타입 프로퍼티 변경 여부 테스트

// class Cat {
//   constructor(name, age){
//     this.name = name;
//     this.age = age;
//   }
//   plusAge(age){
//     age += 1;
//     console.log(this.age, age);
//   }
//   plusName(name){
//     name += "m";
//     console.log(this.name, name);
//   }
// }

// let cat = new Cat("Go", 10);
// cat.plusAge(cat.age);
// cat.plusName(cat.name);
// console.log(cat.age, cat.name);

// //result
// /*
// 10 11
// Go Gom
// 10 Go
// */

//--------------------------
// 생성자에서 다른 함수를 불러와도 프로퍼티가 제대로 생성되는지?

// class Cat {
//   constructor(name){
//     this.init(name);
//   }
//   init(name){
//     this.name = name;
//   }
// }

// let cat = new Cat("tom");
// console.log(cat.name);

//잘 생성됨


//-------------------------
// Board 초기화 테스트

// let Board=[];

// for (let i=0; i<8; i++){
//   Board.push([]);
//   for (let j=0; j<8; j++)
//     Board[i].push(null);
// }

// console.log(Board);
// console.log(Board[0]);
// console.log(Board[0][2]);

// 잘 초기화 됨


//--------------------------
// class 를 인자처럼 쓰고 생성도 가능?

// class Cat {
//   constructor(name){
//     this.init(name);
//   }
//   init(name){
//     this.name = name;
//   }
// }

// function make(type, name){
//   return new type(name);
// }

// console.log(make(Cat, "oe"));

// Cat { name: 'oe' } 된다!

//------------------------------
//배열 중간의 원소 하나 어떻게 제거?

// let a = [1, 2, 3, 4]
// const idx = a.indexOf(3)
// if (idx > -1) a.splice(idx, 1)
// 출처: https://dgkim5360.tistory.com/entry/deleting-an-item-in-array-javascript [개발새발로그:티스토리]

//------------------------
// multiline bit operator?

// let a = true &&
//         true &&
//         true;
// let b = true &&
//         false;
// console.log(a, b);

// //true false

//----------------------------
// 체스말 크기 얼마나 됨?

console.log("♟ ♟ ♟ ♟ ♟ ");
console.log(" A B C D E ");