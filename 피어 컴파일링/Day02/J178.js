// 변수 및 배열 담기

// case 01
// let array = [[1, 5, 7, 2, 9, 13, 10], [2, 3, 9, 10, 4, 8, 11]];

// case 02
// let array = [[1, 4, 1, 3, 5, 6, 10], [9, 2, 3, 1, 3, 4, 10]];

// case 03

// let array = [[1, 1, 9, 4, 1, 3, 11], [2, 3, 3, 13, 12, 9, 9]];

// case 04

// let array = [[1, 4, 9, 4, 1, 10, 13], [11, 13, 9, 3, 1, 9, 1]];

// case 05

// let array = [[1, 3, 5, 4, 2, 10, 4], [11, 13, 11, 3, 11, 9, 1]];

// case 06

// let array = [[1, 1, 4, 4, 1, 1, 9], [1, 2, 11, 3, 11, 4, 5]];

let result = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
const dictPriority = {4: 0, 3: 2, 2: 3, 1: 4};

// pair를 체크하는 함수
// return 있으면 [중복 숫자, 숫자], 없으면 [1, 0]
function checkPair(arr){
    const result = {};
    let max = [1, 0];
    arr.forEach(element => {
        result[element] = (result[element] || 0) + 1;
        if(max[0] < result[element]) max = [result[element], element];
    });
    return max;
}

// 5개의 연속적인 숫자를 체크하는 함수
// return 있으면 [true, 가장 큰 숫자] 없으면 [false, 0]
function checkContinuity(arr){
    let result = new Set(arr);
    let _arr = [...result].sort((a, b) => a - b);

    for(let i = _arr.length, count = 1; i >= 0; i--){
        if (_arr[i-1] == _arr[i] - 1) count++;
        else count = 1;

        if(count == 5) return [true, _arr[i + 3]];
    }
    return [false, 0]
}

// 5개 연속적인 숫자 우선순위 매기기 함수
// return 없음
function checkPriorityContinuity(arr){
    let result_1 = checkContinuity(arr[0]);
    let result_2 = checkContinuity(arr[1]);
    if(result_1[0]) result[0][1] = result_1[1];
    if(result_2[0]) result[1][1] = result_2[1];
}

// 숫자 페어 우선순위 매기기 함수
// return 없음
function checkPriorityPair(arr){
    let result_1 = checkPair(arr[0]);
    let result_2 = checkPair(arr[1]);

    result[0][dictPriority[result_1[0]]] = result_1[1];
    result[1][dictPriority[result_2[0]]] = result_2[1];
}

// main 함수
function main(){
    checkPriorityContinuity(array);
    checkPriorityPair(array);
    let answer = 0;
    for(let i = 0; i < 5; i++){
        if(result[0][i] > result[1][i]) {answer = 1; break;}
        else if (result[0][i] < result[1][i]) {answer = 2; break;}
    }

    console.log(answer);
}

main()
return 0;