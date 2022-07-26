const log = console.log
const str = "<!DOCTYPE html><HTML lang=\"ko\"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>";

const regex_g = new RegExp(/<[^>]+>/g) // g flag -> 일치하는 모든 것
const regex = new RegExp(/<[^>]+>/)

// log(str.match(regex))

let arr = str.match(regex_g)
let stack = [] // tag + 내용
let tag_stack = [] // tag만 쌓기
let str_tmp = str;
for(let i=0;i<arr.length;++i) {
    tag = str_tmp.match(regex)
    log("tag :", tag)
    //log("temp: ", temp[0])
    next_tag = str_tmp.replace(regex,"").match(regex)
    index = str_tmp.indexOf(next_tag)
    log("index : " ,index)
    log("tag[1] : ", tag.index) // tag[1]이 아닌 tag.index로 가져와야 함
    log("tag[0] : ", tag[0])
    
    tag_length = tag.length
    tag_str = tag[0].substring(1,tag[0].length-1) // <> 제거
    if(tag_str[tag_str.length-1] === '/') tag_str = tag_str.substring(0,tag_str.length-1)
    log("i : ", i, "tag_str : ", tag_str)
    strToArray = tag_str.split(" ");
    
    if(tag_str[0]==='/') {
        tag_str=tag_str.substring(1,tag_str.length) // '/'로 시작하면 제거
        log(tag_str)
        log(tag_stack[tag_stack.length-1])
        if(tag_stack.length > 0 && tag_str===tag_stack[tag_stack.length-1]) {
            tag_stack.pop()
        }
        else {
            log("올바른 XML 형식이 아닙니다.")
            break;
        }
    }
    else {
        if(index !== tag.index + tag[0].length) { // > 다음에 내용 있음 -> 추가
            tmp_content = str_tmp.substring(tag[0].length, index).split(" ");
            log("tmp_content : ",tmp_content)
            for(let j=0;j<tmp_content.length;++j) {
                strToArray.push(tmp_content[j]);
            }
        }
        if(strToArray[0][0]!=='!') {
            let obj = {}
            obj.element = strToArray[0]
            log("element : ", obj.element)
            obj.attributes=[]
            if(strToArray.length > 1) {
                if(strToArray[1].indexOf("=")===-1) obj.text = strToArray[1]
                else {
                    t_con = strToArray[1].split("=")
                    let name_value = {}
                    name_value.name = t_con[0]
                    name_value.value = t_con[1]
                    log(name_value)
                    obj.attributes.push(name_value)
                }
            }
            else if(strToArray.length > 2) {
                for(let j=1;j<strToArray.length;++j) { 
                    t_con = strToArray[j].split("=")
                    let name_value = {}
                    name_value.name = t_con[0]
                    name_value.value = t_con[1]
                    obj.attributes.push(name_value)
                }    
            }
            
            stack.push(obj)
            log(obj)
            if(obj.element !== "BR") { // BR 아니면 추가
                tag_stack.push(obj.element)
            }
        }
    }
    
    str_tmp = str_tmp.replace(regex,"") // 현재 tag 제거
    log("i : ", i, "str_tmp : ", str_tmp)
    
    stack.push()
}

for(let i=0;i<stack.length;++i) {
    log(stack[i])
}