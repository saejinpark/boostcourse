const Common = require("./Common");
const fs = require("fs");
const crypto = require('crypto');

class Commit{
    constructor(dir, hash=null, content=''){
        this.dir = dir;
        this.content = content;
        this.hash = hash;
        if(this.content) {this.fillAttribute(); this.getHash();}
        else if(this.hash) {this.getContent(); this.fillAttribute();}
    }

    setDate(){
        const date = new Date();
        const dateArr = date.toString().split(' ');
        this.date = dateArr[0]+" "+dateArr[1]+" "+dateArr[2]+" "+dateArr[4]+" "+dateArr[3]+" +"+dateArr[5].split('+')[1];
    }

    fillAttribute(){
        const StringArr = this.content.split('\n');
        const TreeArr = StringArr[0].split(', ');
        this.prevTree = TreeArr[0];
        this.curTree = TreeArr[1];
        this.date = StringArr[1];
    }

    generateFile(){
        const path = this.dir+'/.mit/objects/'+this.hash.slice(0,8);
        Common.mkdir(path);
        fs.writeFileSync(path+'/'+this.hash.slice(8), this.content);
    }

    setContent(prevTree, curTree){
        this.prevTree = prevTree;
        this.curTree = curTree;
        this.setDate();
        this.content = `${this.prevTree}, ${this.curTree}\n${this.date}`;

        this.getHash();
    }

    getHash(){
        this.hash = crypto.createHash('sha256').update(this.content, 'utf8').digest('hex');
    }

    getContent(){
        const path = this.dir+'/.mit/objects/'+this.hash.slice(0,8)+'/'+this.hash.slice(8);
        this.content = fs.readFileSync(path, {encoding:'utf8', 'flag':'r'});
    }

}

module.exports=Commit;