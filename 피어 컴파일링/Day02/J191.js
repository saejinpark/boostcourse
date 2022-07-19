var array1 = [];
var array2 = [];

function main(){
    var check_arr1 = count_num(array1);
    var check_arr2 = count_num(array2);

    var res;
    res = first_step(check_arr1, check_arr2);
    if(res) return;

    res = second_step(check_arr1, check_arr2);
    if(res) return;

    res = third_step(check_arr1, check_arr2);
    if(!res) console.log(0);
}


function input(){
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin, output: process.stdout,
    });
    
    let input = [];
    rl.on("line", function (line) {
        input.push(line)
    }).on("close", function () {
        array1 = input[0].split(' ').map((el) => parseInt(el));
        array2 = input[1].split(' ').map((el) => parseInt(el));
    
        main();
        process.exit();
    });
}


function count_num(arr){
    var check_num = [];
    for(var i = 0; i < 14; i++){
        check_num.push(0);
    }
    for (var value of arr) {
        check_num[value]++;
    }
    return check_num;
}
function find_idx(num, check_arr){
    var idx_arr = 0;
    for(var i = 13; i > 0; i--){
        if(check_arr[i] == num) {
            idx_arr = i;
            break;
        }
    }
    return idx_arr;
}
function compare_pair(num, check_arr1, check_arr2){
    var idx_arr1 = find_idx(num, check_arr1);
    var idx_arr2 = find_idx(num, check_arr2);
    if (idx_arr1 == idx_arr2) {
        return 0;
    }
    else {
        return idx_arr1 > idx_arr2 ? 1 : 2;
    }
}
function find_num(arr, num){
    for (var value of arr){
        if (value == num) return true;
    }
    return false;
}
function find_sequence(arr){
    for(var i = 1; i < 10; i++){
        var cur;
        for(cur = i; cur < i + 5; cur++) {
            if(!find_num(arr, cur)) break; 
        }
        if(cur == i+5) return cur;
    }
    return 0;
}


function first_step(check_arr1, check_arr2){
    var res = compare_pair(4, check_arr1, check_arr2);
    if(res != 0) {
        console.log(res);
        return true;
    }
    return false;
}
function second_step(){
    var res_arr1 = find_sequence(array1);
    var res_arr2 = find_sequence(array2);
    if (res_arr1 == res_arr2) return false;
    else {
        var res = res_arr1 > res_arr2 ? 1 : 2;
        console.log(res);
        return true;
    }
}
function third_step(check_arr1, check_arr2){
    for(var i = 3; i >= 2; i--){
        var res = compare_pair(i, check_arr1, check_arr2);
        if(res != 0) {
            console.log(res);
            return true;
        }
    }
    return false;
}

input();

// case #1 
// 1 5 7 2 9 13 10
// 2 3 9 10 4 8 11

// case #2 
// 1 4 1 3 5 6 10
// 9 2 3 1 3 4 10

// case #3
// 1 1 9 4 1 3 11
// 2 3 3 13 12 9 9

// case #4
// 1 4 9 4 1 10 13
// 11 13 9 3 1 9 1

// case #5
// 1 3 5 4 2 10 4
// 11 13 11 3 11 9 1

// case #6
// 1 1 4 4 1 1 9
// 1 2 11 3 11 4 5