function curry(f) {
    // 커링 변환을 하는 curry(f) 함수
    return function (a) {
        return function (b) {
            return f(a, b);
        };
    };
}

// usage
function sum(a, b) {
    return a + b;
}

let curriedSum = curry(sum);

alert(curriedSum(1)(2)); // 3
