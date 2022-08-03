const Path = require("./Path");

console.log('------------------------------------- UNIX -------------------------------------');

const [pathUNIX1, pathUNIX2] = new Path("/home/user/boost/camp/challenge/day17/problem.md:/home/user/boost camp/challenge/day17/problem.md");

if(pathUNIX1){

    console.log("AbsoluteString : ",pathUNIX1.absoulteString);
    console.log("Stringify() : ",pathUNIX1.stringify());
    console.log("Root : ",pathUNIX1.root);
    console.log("Base : ",pathUNIX1.base);
    console.log("Name : ",pathUNIX1.name);
    console.log("Ext : ",pathUNIX1.ext);
    console.log("LastDirectory : ",pathUNIX1.lastDirectory);
    console.log(pathUNIX1.components);
}

if(pathUNIX2){
    console.log("AbsoluteString : ",pathUNIX2.absoulteString);
    console.log("Stringify() : ",pathUNIX2.stringify());
    console.log("Root : ",pathUNIX2.root);
    console.log("Base : ",pathUNIX2.base);
    console.log("Name : ",pathUNIX2.name);
    console.log("Ext : ",pathUNIX2.ext);
    console.log("LastDirectory : ",pathUNIX2.lastDirectory);
}



console.log('\n----------------------------------- Windows -----------------------------------');
const [pathWINDOWS1, pathWINDOWS2] = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17.\\problem.md;C:\\home\\user\\bo$ost camp\\chall.enge\\day17\\problem.md");


if(pathWINDOWS1){
        
    console.log("AbsoluteString : ",pathWINDOWS1.absoulteString);
    console.log("Stringify() : ",pathWINDOWS1.stringify());
    console.log("Root : ",pathWINDOWS1.root);
    console.log("Base : ",pathWINDOWS1.base);
    console.log("Name : ",pathWINDOWS1.name);
    console.log("Ext : ",pathWINDOWS1.ext);
    console.log("LastDirectory : ",pathWINDOWS1.lastDirectory);
}

if(pathWINDOWS2){
    console.log("AbsoluteString : ",pathWINDOWS2.absoluteString);
    console.log("Stringify() : ",pathWINDOWS2.stringify());
    console.log("Root : ",pathWINDOWS2.root);
    console.log("Base : ",pathWINDOWS2.base);
    console.log("Name : ",pathWINDOWS2.name);
    console.log("Ext : ",pathWINDOWS2.ext);
    console.log("LastDirectory : ",pathWINDOWS2.lastDirectory);

    console.log("\nAppend 'peer'!");
    pathWINDOWS2.appendComponent('peer');
    console.log("LastDirectory : ",pathWINDOWS2.lastDirectory);
    console.log("AbsoluteString : ",pathWINDOWS2.absoluteString);

    console.log("\nDelete last component!");
    pathWINDOWS2.deleteLastComponent();
    console.log("LastDirectory : ",pathWINDOWS2.lastDirectory);
    console.log("AbsoluteString : ",pathWINDOWS2.absoluteString);

    try{ //absoluteString은 read-only
        pathWINDOWS2.absoluteString="C:\\";
        console.log(pathWINDOWS2.absoluteString)
    }catch(e) {console.log(e);}
}
console.log();
const path1 = new Path("/first/second/last/param");
console.log(path1.relative("/first/second/most/jk"));
console.log(path1.relative("/second/most/jk"));

console.log('\n-------------------------path test---------------------------');
var path = new Path("/home/user/boost/camp/challenge/day12/problem.md");
console.log(path.lastDirectory);