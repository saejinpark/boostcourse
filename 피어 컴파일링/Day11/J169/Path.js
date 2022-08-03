const Configuration = require("./Configurations");

class Path{

    /**
     * 
     * @param {String} path 
     */
    constructor(path){
        this.pathSource = path;
        this.style = Configuration.WINDOWS;
        if((/\//).test(path)) this.style = Configuration.UNIX;

        const pathArr = this.getPathArray();
        if(pathArr){return pathArr};

        this.getComponents();
    }

    getPathArray(){
        const pathArr = this.pathSource.split(this.style.splitDelimiter);

        if(pathArr.length>1){
            this.pathSource.match(this.style.splitDelimiter).forEach((Element,idx) => {
                const splitedElements = Element.split(this.style.delimiter);
                pathArr[idx]+=splitedElements[0];
                if(splitedElements[1]){
                    pathArr[idx+1]=splitedElements[1]+pathArr[idx+1];
                }
            });
            
            return pathArr.map(x => {
                try{
                    return new Path(x)
                }catch(e){console.log(e)}
            });

        }else return
    }

    stringify(){
        const dir = this.components[0]+this.components.slice(1,-1).join(this.style.sep);
        return {root : this.root, dir : dir, base : this.base, ext : this.ext, name : this.name};
    }

    getComponents(){
        const components = this.pathSource.match(this.style.componentReg);
        components.slice(1).map(x=>{
            const trimmedX = x.trim();
            if((this.style.error).test(trimmedX)) throw new Error(`해당 Path는 규칙에 맞지 않는 이름을 포함하고 있습니다 : ${trimmedX}`);
            else return trimmedX
        });
        this.components = components;
    }

    get root(){
        return this.components[0];
    }

    set root(root){
        this._root = root
    }

    get base(){
        return this.components.at(-1);
    }

    set base(base){
        this._base = base
    }

    get name(){
        return this.base.split('.')[0];
    }

    set name(name){
        this._name = name;
    }

    get ext(){
        return this.base.split('.')[1];
    }

    set ext(ext){
        this._ext = ext;
    }

    get lastDirectory(){
        return this.components.at(-2);
    }

    get absoluteString(){
        return this.components.at(0)+this.components.slice(1).join(this.style.sep);
    }

    appendComponent(component){
        this.components.splice(-1,0,component);
    }

    deleteLastComponent(){
        this.components.splice(-2,1);
    }

    relative(to){
        let relativePath = '';
        const toComponents = to.match(this.style.componentReg);
        for(let i=this.components.length-1;i>=0;i--){
            if(toComponents[i]!=this.components[i]){
                relativePath +="../";
            }else{
                relativePath += toComponents.slice(i+1).join(this.style.sep);
                break
            }
        }
        return relativePath
    }

}

module.exports = Path;