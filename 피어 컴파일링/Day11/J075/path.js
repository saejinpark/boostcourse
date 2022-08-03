/**
 * 파일과 디렉토리 경로 Path를 처리하는 클래스
 */
export default class Path{
    #inputPath; // 입력받은 path string
    #pathType; // UNIX or Window
    #pathSeperator; // : UNIX, ; Window
    #dirSeperator; // / UNIX, \\ Window
    #rootFinder; // root 찾는 정규식
    /**
     * 생성자
     * @param {String} path 
     */
    constructor(path){
        this.#inputPath = path;
        this.root;
        this.base;
        this.name;
        this.ext;
        this.lastDirectory;
        this.components;
        this.__absoluteString;

        if(!this.#checkError()) throw "잘못된 path 형식입니다.";

        this.#setPrivateValue();

        const paths = this.#inputPath.split(this.#pathSeperator);

        if(paths.length > 1){
            const parseArray = [];
            for (let path of paths){
                const components = this.#getcomponets(path);
                const newPath = new Path(path);
                newPath.#setElement(components);
                parseArray.push(newPath)
            }
            return parseArray
        }

        const components = this.#getcomponets(path);
        this.#setElement(components);
    }

    /**
     * absoluteString read only
     */
    get absoluteString(){
        return this._absoluteString;
    }

    /**
     * 파일 형식에 맞는지 체크
     * @returns boolean
     */
     #checkError(){
        if(/^(\/?[a-zA-Zㄱ-힣0-9 ._-]?)(\/[a-zA-Zㄱ-힣0-9 ._-]+:?)*$/.test(this.#inputPath)) { // 유닉스 에러 처리
            this.#pathType = "UNIX";
            return true;
        }else if(/[>"\/?*]/.test(this.#inputPath)){ // 윈도우 (파일, 디렉토리에 허용하지 않는 문자열)
            return false;
        }else if(/^([A-Z][:])*?([\\])?([\\][a-zA-Zㄱ-힣0-9 ._-]+;?)*$/.test(this.#inputPath)){ // 윈도우 에러 처리
            this.#pathType = "Window";
            return true;
        }
        return false;
    }

    /**
     * private 프로퍼티 설정
     */
    #setPrivateValue(){
        if(this.#pathType == "UNIX"){
            this.#pathSeperator = ":";
            this.#dirSeperator = "/"
            this.#rootFinder = /^[\/]/;
        }else{
            this.#pathSeperator = ";";
            this.#dirSeperator = "\\"
            this.#rootFinder = /^([A-Z][:])*?([\\])/;
        }
    }

    /**
     * dir 구분자로 path를 나눔
     * @param {String} path 
     * @returns path array
     */
    #getcomponets(path){
        const components = path.split(this.#dirSeperator)
        if(this.#rootFinder.test(path)){
            if(this.#pathType === "UNIX") components[0] = '/'+components[0];
            else components[0] = components[0] + '\\';
        }
        return components;
    }

    /**
     * 파일인지 디렉토리인지 구분해 속성 설정
     * @param {*} components 
     */
    #setElement(components){
        this.root = components[0];
        if(components.slice(-1)[0].includes('.')){
            this.base = components.slice(-1)[0];
            this.name = [...this.base.split(/[.]/)].slice(0, -1).join(".");
            this.ext = '.'+this.base.split(/([.])/).pop();
            this.lastDirectory = components.slice(-2)[0];
        }else{
            this.base = components.slice(-1)[0];
            this.lastDirectory = components.slice(-2)[0];
        }
        this.components = components;
        if(this.#pathType=="UNIX") this._absoluteString = [...this.components].join('/').replace("//", "/");
        else this._absoluteString = [...this.components].join('\\').replace("\\\\", "\\");
    }

    /**
     * path 분석 출력
     * @returns
     */
    stringify(){
        let dir;
        if(this.ext){
            dir = this.components.slice(0, 1)[0] + this.components.slice(1, -1).join(this.#dirSeperator);
        }else {
            dir = this.components.slice(0, 1)[0] + this.components.slice(1).join(this.#dirSeperator);
        }
        return {
            root: this.root,
            dir: dir,
            base: this.base,
            ext: this.ext,
            name: this.name
        }
    }


    /**
     * 경로에 요소를 추가
     * @param {String} element 
     */
    appendComponent(element){
        const newComponents = [...this.components.slice(0, -1), element, this.components.pop()];
        this.lastDirectory = newComponents.slice(-2)[0];
        this.components = newComponents;
        if(this.#pathType=="UNIX") this._absoluteString = [...this.components].join('/').replace("//", "/");
        else this._absoluteString = [...this.components].join('\\').replace("\\\\", "\\");
        
    }

    /**
     * base를 제외한 마지막 경로 제거
     */
    deleteLastComponent(){
        const newComponents = [...this.components.slice(0, -2)];
        this.lastDirectory = newComponents.slice(-1)[0];
        this.components = [...newComponents, this.base];
        if(this.#pathType=="UNIX") this._absoluteString = [...this.components].join('/').replace("//", "/");
        else this._absoluteString = [...this.components].join('\\').replace("\\\\", "\\");
    }

    /**
     * 현재 Path에서 to까지 이동한다고 가정했을 때 상대 경로를 문자열로 생성
     * @param {String} targetPath 
     * @returns 
     */
    relative(targetPath){
        targetPath = new Path(targetPath)
        let toDir = [...targetPath.components];
        let fromDir = [...this.components];
        while(fromDir[0] === toDir[0]){
            fromDir.shift();
            toDir.shift();
        }
        let result = [];
        for(let dir of fromDir){
            result.push("..");
        }
        result = [...result, ...toDir]
        if(this.#pathType === "UNIX") return result.join('/')
        return result.join('\\')
    }
}