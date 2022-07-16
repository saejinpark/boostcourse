function Person() {}

let joon = new Person();
let jinsoo = new Person();

Person.prototype.getType = function () {
    return "닝겐";
};

console.log(joon.getType());
console.log(jinsoo.getType());

Person.prototype.getName = function () {
    return this.name;
};

function Korean(name) {
    this.name = name;
}
Korean.prototype = Person.prototype;

var kor1 = new Korean("지수");
console.log(kor1.getName());
