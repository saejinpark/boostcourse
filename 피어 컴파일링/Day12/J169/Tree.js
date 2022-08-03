const Common = require("./Common");
const fs = require("fs");
const crypto = require('crypto');

class Tree{
    constructor(dir, hash=null, content=''){
        this.dir = dir;
        this.content = content;
        this.hash = hash;
        this.map = new Map();
        if(this.content) {this.fillMapByContent(); this.getHash();}
        else if(this.hash) {this.getContent(); this.fillMapByContent();}
    }

    set(key, value){
        this.map.set(key, value);
    }

    get(key){
        return this.map.get(key);
    }

    has(key){
        return this.map.has(key);
    }

    keys(){
        return this.map.keys()
    }

    values(){
        return this.map.values();
    }

    fillMapByContent(){
        const blobArr = this.content.split('\n');
        blobArr.forEach(element => {
            const blobAttribute = element.split(', ');
            this.set(blobAttribute[2], {hash: blobAttribute[0], zipSize: blobAttribute[1]});
        })
        this.size = this.map.size;
    }

    generateFile(){
        this.getHash();

        const path = this.dir+'/.mit/objects/'+this.hash.slice(0,8);
        Common.mkdir(path);
        fs.writeFileSync(path+'/'+this.hash.slice(8), this.content);
    }

    getHash(){
        for(let [filename, attributes] of this.map){
            this.content += `${attributes.hash}, ${attributes.zipSize}, ${filename}\n`;
        }
        this.content = this.content.slice(0,-1);

        this.hash = crypto.createHash('sha256').update(this.content, 'utf8').digest('hex');
    }

    getContent(){
        const path = this.dir+'/.mit/objects/'+this.hash.slice(0,8)+'/'+this.hash.slice(8);
        this.content = fs.readFileSync(path, {encoding:'utf8', 'flag':'r'});
    }
}

module.exports = Tree;