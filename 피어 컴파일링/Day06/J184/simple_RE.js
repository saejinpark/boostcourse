// https://curryyou.tistory.com/234
const log = console.log;

const regex = new RegExp(/\d{3}-\d{4}-\d{4}/)
// or const regex = /\d{3}-\d{4}-\d{4}/;
// 형식 : /패턴/플래그 

const text = "안녕하세요 제 번호는 010-1111-2222 입니다. 전화주세요."
log("text : ", text)

// 1. RE에 매칭되는 항목들을 배열로 반환
log("1 : ")
log("match", text.match(regex)) // or 직접 regex 표현 넣기
log("번호 : ", text.match(regex)[0]) // 해당하는 부분만 뽑기
log()

// 2. RE에 매칭되는 항목을 대체문자열로 변환
log("2 : ")
log("replace", text.replace(regex, "010-1234-5678")) // 원본이 바뀌진 x
log("2(원본) : ", text)
log()

// 3. RE에 매칭되는 항목으로 쪼개어 배열로 반환
log("3 : ")
log("split", text.split(regex)) // 해당하는 부분을 끊음.
// 끊으면서 문자열이 사라지는 듯?
log("3(원본) : ", text) // 원본이 바뀌진 x
log()

// 4. RE에 매칭되면 true, 아니면 false
log("4 : ")
log(text, " -> ", regex.test(text))
log('01-11-22', " -> ", regex.test('01-11-22')) // false
log()

// 5. match와 유사(단, 무조건 첫 번째 매칭 결과만 반환)
log("5 : ")
log("exec", regex.exec(text))
log()
