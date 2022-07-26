class XMLelement{
    constructor(tag){
        this.element=tag
        this.attributes=[]
        this.text=''
        this.children=[]
    }

}
module.exports = XMLelement;