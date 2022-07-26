const Stack = require("./stack.js");
const XMLelement = require("./XMLelement.js");


const DOCTYPE = /^\W/
const NOTEXT = />$/
const GETTAG = /[^/^>]+/g
const GETVALUE = /[^"^'^/$]+/g
const ENDTAG = /^\//
const DIRECTEND = /\/$/


class Lexer{
    
    constructor(tokens){
        this.tokens = tokens
        this.stack = new Stack()
        this.xml = this.lexer(this.tokens)[0]
    }

    isEmpty(str){
        return str == ''
    }

    passingToken(str){
        return this.isEmpty(str)||(!ENDTAG.test(str)&&(DOCTYPE.test(str)))
    }

    getXML(){
        return this.xml
    }

    prerprocessing(token){
        let trimed = token.trim()
        let splitText = trimed.split('>')
        splitText[0] = splitText[0].split(' ')
        splitText[0] = splitText[0].filter(function(item){return item!==''&&item!==""})
        return splitText
    }

    checkTagEnd(task){
        return ENDTAG.test(task[0])
    }

    checkDirectTagEnd(task){
        return DIRECTEND.test(task[task.length-1])
    }

    hasAttr(task){
        return (task.length-1)>0
    }

    hasText(text){
        return text!=''
    }

    devideAttr(attrX){
        let kv = attrX.split('=')
        kv[1] = kv[1].match(GETVALUE)[0]
        return kv
    }

    getAttr(attr){
        let kv = this.devideAttr(attr)
        return {'name':kv[0], 'value':kv[1]}
    }

    pushAttr(element, attr){
        for(let x of attr){
            element.attributes.push(this.getAttr(x))
        }
    }

    setComponent(element,task,text){
        let attr = task.slice(1,task.length)
        this.pushAttr(element,attr)
        element.text = text
    }

    delComponent(element, attrState, textState){
        if(!attrState)delete element.attributes
        if(!textState)delete element.text
    }

    createDXML(task, text, attrState){
        let tag = task[0].match(GETTAG)[0]
        this.stack.push(tag)
        let element = new XMLelement(tag)
        this.setComponent(element,task,text)
        this.delComponent(element,attrState,this.hasText(text))
        delete element.children
        this.stack.pop(tag)
        return element
    }

    getTag(task){
        return task[0].match(GETTAG)[0]
    }

    popStack(tag){
        if(this.stack.read() == tag){
            this.stack.pop()
        }else{
            throw '올바른 XML 형식이 아닙니다.'
        }
    }

    hasChild(children){
        return children[0].length>0
    }

    createXML(task, text, attrState, children){
        let tag = task[0].match(GETTAG)[0] 
        let element = new XMLelement(tag)
        this.setComponent(element,task,text)
        this.delComponent(element,attrState,this.hasText(text))
        if(this.hasChild(children)){
            element.children = children[0]
        }else{
            delete element.children
        }
        return element
    }

    lexer(tokens){
        if(tokens.length==0){
            return [[],[,[]]]
        }
        // console.log(tokens)
        let target = this.prerprocessing(tokens[0])
        // console.log(target)

        if(target[0].length==0||this.passingToken(target[0][0])){
            // console.log('pass')
            return this.lexer(tokens.slice(1,tokens.length))
        }
        let task = target[0], text = target[1]
        let endState = this.checkTagEnd(task), dendState = this.checkDirectTagEnd(task)
        let attrState = this.hasAttr(task)
        if(endState){
            let tag =this.getTag(task)
            try{
                this.popStack(tag)
            }catch(e){
                console.error(e)
                // process.exit()
            }
            return [[],[tag,tokens]]
        }
        else if(dendState){
            let XML = this.createDXML(task, text, attrState)
            let recall = this.lexer(tokens.slice(1,tokens.length))
            
            return this.stack.readChild()?[[XML,...recall[0]],recall[1]]:[[...recall[0],XML],recall[1]]
        }
        else{
            this.stack.push(this.getTag(task))
            let children = this.lexer(tokens.slice(1,tokens.length))
            let XML = this.createXML(task, text, attrState, children)
            let recall = this.lexer(children[1][1].slice(1,children[1][1].length))
            return this.stack.readChild()?[[XML,...recall[0]],recall[1]]:[[...recall[0],XML],recall[1]]
        }
        // console.log(target)
        // return 0
    }
}
module.exports = Lexer;

