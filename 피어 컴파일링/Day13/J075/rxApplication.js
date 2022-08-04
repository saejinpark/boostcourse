/**
 * 응용 계층
 * 최종적으로 from 주소, to 주소, title 제목과 첨부 파일 이름을 출력
 * @param {*} data 
 */
export function rxApplication(data){
    console.log("=========== Application Layer ===========");
    console.log(data.join('\\r\\n\n'))
}