const ENTER = /\n/g

class Tokenizer{
    constructor(str){
        this.xml = str
        this.token = /\<?>$/
    }
    tokenize(){
        let texts = this.xml.replace(/\n/g, "")
        return texts.split('<')
    }
}
module.exports = Tokenizer;