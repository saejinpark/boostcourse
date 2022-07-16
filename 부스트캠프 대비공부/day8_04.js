const closure = (a) => {
    return num => num % a != 0; 
}

const closureTest = closure(2);

console.log(closureTest(16)); // false
console.log(closureTest(15)); // true