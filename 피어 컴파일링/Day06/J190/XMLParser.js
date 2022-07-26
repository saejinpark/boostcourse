const Tokenizer = require("./tokenizer.js");
const Lexer = require("./lexer.js");
const print = console.log

const INDEX = /\[[0-9]+\]$/
const INDEXING = /[^\]]/
class XMLParser{
    constructor(str){
        this.Tokenizer = new Tokenizer(str)
        // console.log(this.Tokenizer.tokenize())
        this.Lexer = new Lexer(this.Tokenizer.tokenize())
    }

    searchXmlText(xml, tabs){
        let text = `${tabs}{\n`
        tabs+='\t'
        text+=`${tabs}element: ${xml.element},`
        if (xml.attributes){
            text += `\n${tabs}attributes: [\n`
            tabs+='\t'
            for(let x of xml.attributes){
                text += `${tabs}{name : ${x.name}, value : ${x.value}},\n`
            }
            tabs = tabs.slice(0,-1)
            text += `${tabs}],`
        }
        if(xml.text){
            text += `\n${tabs}text: ${xml.text},\n`
        }
        if(xml.children){
            text += `\n${tabs}children: [\n`
            tabs+='\t'
            for(let x of xml.children){
                text += `${this.searchXmlText(x, tabs)},\n`
            }
            tabs = tabs.slice(0,-1)
            text += `${tabs}]\n`
        }
        tabs = tabs.slice(0,-1)
        text+=`\n${tabs}}`
        return text
    }


    searchAttr(xml, name, value){
        let attr = []
        if(xml.attributes){
            for(let x of xml.attributes){
                if(x.name == name&&x.value == value){
                    attr.push(x)
                }
            }
        }
        if(xml.children){
            for(let x of xml.children){
                attr = [...attr,...this.searchAttr(x, name, value)]
            }
        }
        return attr
    }

    searchTag(xml, tag){
        let xmls = []
        if(xml.element==tag){
            xmls.push(xml)
        }
        if(xml.children){
            for(let x of xml.children){
                xmls = [...xmls,...this.searchTag(x, tag)]
            }
        }
        return xmls
    }

    elementByAttribute(name, value){
        let xml = this.Lexer.getXML()[0]
        return this.searchAttr(xml, name, value)
    }
    elementByTag(tag){
        let xml = this.Lexer.getXML()[0]
        return this.searchTag(xml,tag)
    }

    getPath(xpath){
        return xpath.split('/')
    }

    findPath(xml, path){
        let xmls = []
        let target = path[0]
        if(INDEX.test(target)){
            let selected = target.split('[')
            selected[1] = selected[1].match(INDEXING)[0]-1
            for(let x of xml){
                let xmlList = []
                for(let y of x.children){
                    if(y.element==selected[0]){
                        xmlList.push(y)
                    }
                }
                xmls.push(xmlList[selected[1]])
            }
        }
        else{
            for(let x of xml){
                for(let y of x.children){
                    if(y.element==target){
                        xmls.push(y)
                    }
                }
            }
        }
        if(path.length==1){
            return xmls
        }else{
            return this.findPath(xmls, path.slice(1,path.length))
        }
    }

    findXPath(xpath){
        let xml = this.Lexer.getXML()[0]
        let path = this.getPath(xpath)
        path = path.filter(function(item){return item!==''&&item!==""})
        if(path.length&&!INDEX.test(path[0])){
            xml = this.elementByTag(path[0])
        }
        path = path.slice(1,path.length)
        return this.findPath(xml, path)
    }
    stringify(){
        let tabs = ''
        let xml = this.Lexer.getXML()[0]
        return this.searchXmlText(xml, tabs)
    }
}
module.exports = XMLParser;