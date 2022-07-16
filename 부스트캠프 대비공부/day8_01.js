const someName = "Boost";

function helloPrint() {
    console.log(`Hello, ${someName}`);
}

function hello(name) {
    return `Hello, ${name}.`;
}
helloPrint()
console.log(hello(someName))