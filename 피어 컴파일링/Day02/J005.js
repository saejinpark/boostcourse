const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function main() {
    let data = [];
    rl.on("line", (line1) => {
        data.push(line1.split(' ').map(el => parseInt(el))); // 숫자 배열로 변환해서 data에 push
    }).on('close', () => {
        console.log(solution(data[0], data[1]));
        process.exit()
    });
}

function solution(array1, array2) { //
    // console.log(array1, array2);
    let [ls1, pair1, count1] = checkCard(array1), [ls2, pair2, count2] = checkCard(array2);

    if (pair1.length == 0 && pair2.length == 0 && ls1 == -1 && ls2 == -1) return 0; // 양쪽 배열에 모두 페어나 규칙이 없으면
    else if (ls1 > 0 || ls2 > 0) return OneOrMoreStraight(ls1, ls2, pair1, pair2, count1, count2); // 하나 이상의 배열에 연속 규칙이 있는 경우
    else {  // 연속 규칙이 없는 경우
        return comparePair(pair1, pair2, count1, count2);
    }
}

function comparePair(pair1, pair2, count1, count2) {    // 연속 규칙이 없고 페어 정보가 하나 이상 있는 경우
    if (pair1.length == 0 || pair2.length == 0) return (pair1 > 0) ? 1 : 2; // 페어가 한쪽만 있는 경우

    let a = [pair1.pop(), count1.pop()], b = [pair2.pop(), count2.pop()];   // 제일 큰 숫자로 되어 있는 페어
    if (a[1] == b[1]) { // 페어의 수가 같은 경우
        return (a[0] == b[0]) ? 0 : ((a[0] > b[0]) ? 1 : 2); // 숫자도 같은 경우에는 0, 아니면 큰 수에 해당하는 배열 번호 반환
    } else {    // 페어의 수가 다른 경우
        return (a[1] > b[1]) ? 1 : 2;
    }
}


function OneOrMoreStraight(ls1, ls2, pair1, pair2, count1, count2) { // 하나 이상의 배열에 스트레이트가 있는 경우
    if (ls1 > 0 && ls2 > 0) return (ls1 == ls2) ? 0 : ((ls1 > 2) ? 1 : 2); // 둘 다 연속 규칙이 있다면
    else if (ls1 > 0) return (Math.max(...count2) == 4) ? 2 : 1; // array1만 연속 규칙이 있다면
    else return (Math.max(...count1) == 4) ? 1 : 2;   // array2만 연속 규칙이 있다면
}

function checkCard(arr) {  // 카드 카운팅 및 연속 규칙과 페어 확인
    let count = Array(14).fill(0);
    for (var i = 0; i <= 6; i++) // 계수정렬 활용
        count[arr[i]] += 1;
    return checkPairAndStraight(count);
}

function checkPairAndStraight(count) { // 연속 규칙과 페어 카드 관련 정보 리턴
    let lastStraight = -1, cnt = 0, pair = [], pair_cnt = [];
    for (var i = 1; i <= 13; i++) {
        if (count[i] >= 2) pair.push(i), pair_cnt.push(count[i]);// 페어인 경우
        if (count[i] != 0) { // 연속되는 숫자
            cnt += 1
            if (cnt >= 5) lastStraight = i // 연속된 숫자 중 마지막 수
        } else cnt = 0  // 연속 실패
    }
    return [lastStraight, pair, pair_cnt]
}


main(); // 프로그램 실행


// 동작예시
console.log("case1 : " + solution([1, 5, 7, 2, 9, 13, 10], [2, 3, 9, 10, 4, 8, 11]))    // 0
console.log("case2 : " + solution([1, 4, 1, 3, 5, 6, 10], [9, 2, 3, 1, 3, 4, 10]))  // 2
console.log("case3 : " + solution([1, 1, 9, 4, 1, 3, 11], [2, 3, 3, 13, 12, 9, 9])) // 1
console.log("case4 : " + solution([1, 4, 9, 4, 1, 10, 13], [11, 13, 9, 3, 1, 9, 1])) // 2
console.log("case5 : " + solution([1, 3, 5, 4, 2, 10, 4], [11, 13, 11, 3, 11, 9, 1])) // 1
console.log("case6 : " + solution([1, 1, 4, 4, 1, 1, 9], [1, 2, 11, 3, 11, 4, 5])) // 1