const sayHello = function () {
    return function () {
        console.log("Hello!");
    };
};
const myFunc = sayHello();
myFunc();

