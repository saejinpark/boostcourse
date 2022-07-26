const log = console.log
const regex_g = new RegExp(/<[^>]+>/g) // g flag -> 일치하는 모든 것
const regex = new RegExp(/<[^>]+>/)

export default class XMLParser {    
    constructor() {

        this.stack = [] // tag + 내용
        this.tag_stack = [] // tag만 쌓기
        this.chk = true
    }
    init(str) {
        this.str = str; // 원본 - 변경 x
        // log("str : ", str)
        this.str_tmp = str; // 임시 - 변경
        this.arr = str.match(regex_g)
    }
    tokenizer() { // 의미있는 요소들을 토큰으로 쪼개기
        for(let i=0;i<this.arr.length;++i) {
            let tag = this.str_tmp.match(regex)
            let next_tag = this.str_tmp.replace(regex,"").match(regex)
            let index = this.str_tmp.indexOf(next_tag)
            
            let tag_length = tag.length
            let tag_str = tag[0].substring(1,tag[0].length-1) // <> 제거
            if(tag_str[tag_str.length-1] === '/') tag_str = tag_str.substring(0,tag_str.length-1)
            let strToArray = tag_str.split(" ");
            
            // this.lexer(tag_str,inde,xtag,strToArray)
            if(this.parser(tag_str, index, tag, strToArray) === -1) break;
            this.str_tmp = this.str_tmp.replace(regex,"") // 현재 tag 제거
        }    
        
    }
    lexer() { // 토큰 의미 분석
        // 어떤 내용을 통해 의미를 파악해야 하는건지 모르겠음.
    }
    parser (tag_str, index, tag, strToArray) { // 토큰화된 데이터를 통해 구조적으로 나타내기(+데이터 검증)
        if(tag_str[0]==='/') {
            tag_str = tag_str.substring(1,tag_str.length) // '/'로 시작하면 제거
            if(this.tag_stack.length > 0 && tag_str===this.tag_stack[this.tag_stack.length-1]) {
                this.tag_stack.pop()
                return 0;
            }
            else {
                log("올바른 XML 형식이 아닙니다.")
                this.chk=false;
                return -1;
            }
        }
        else {
            if(index !== tag.index + tag[0].length) { // > 다음에 내용 있음 -> 추가
                let tmp_content = this.str_tmp.substring(tag[0].length, index).split(" ");
                for(let j=0;j<tmp_content.length;++j) {
                    strToArray.push(tmp_content[j]);
                }
            }
            if(strToArray[0][0]!=='!') {
                let obj = {}
                obj.element = strToArray[0]
                obj.attributes=[]
                if(strToArray.length > 1) {
                    if(strToArray[1].indexOf("=")===-1) obj.text = strToArray[1]
                    else {
                        let t_con = strToArray[1].split("=")
                        let name_value = {}
                        name_value.name = t_con[0]
                        name_value.value = t_con[1]
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
                
                this.stack.push(obj)
                if(obj.element !== "BR") { // BR 아니면 추가
                    this.tag_stack.push(obj.element)
                }
            }
            return 0;
        }
    }
    stringfy() {
        if(this.chk) {
            for(let i=0;i<this.stack.length;++i) {
                log(this.stack[i])
            }
        }
        else {
            log("올바른 XML 형식이 아닙니다.")
        }
    }
}