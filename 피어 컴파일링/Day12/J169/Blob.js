const zlib = require('zlib');
const Common = require("./Common");
const fs = require("fs");

class Blob{
    constructor(dir, hash, fileContent=''){
        this.dir = dir;
        this.hash = hash;
        this.fileContent = fileContent;
        if(this.fileContent) {this.zip(); this.generateFile();}
        else if(this.hash) {this.unzip();}
    }

    zip(){
        this.zipfile = zlib.deflateSync(this.fileContent);
        this.zipSize = this.zipfile.length;
    }

    generateFile(){
        const path = this.dir+'/.mit/objects/'+this.hash.slice(0,8);
        Common.mkdir(path);
        fs.writeFileSync(path+'/'+this.hash.slice(8), this.zipfile);
    }

    unzip(){
        const path = this.dir+'/.mit/objects/'+this.hash.slice(0,8)+'/'+this.hash.slice(8);
        this.zipfile = fs.readFileSync(path);
        this.fileContent = zlib.inflateSync(this.zipfile).toString('utf8');
        return this.fileContent
    }

}

module.exports=Blob;