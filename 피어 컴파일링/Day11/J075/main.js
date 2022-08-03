import Path from "./path.js"
/**
 * main 함수
 */
function main(){
    try{
        // let path = new Path("/home/user/boost/camp/challenge/day17/problem.md");
        // let path = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
        const path = new Path("/home/user/boost/camp/challenge/day12/problem.md")
        console.log(`Path 분석결과) \n${JSON.stringify(path.stringify(), null, 2)}`)
        console.log(`\n> path.appendComponent("base")`);
        path.appendComponent("base");
        console.log(path.absoluteString);

        console.log(`\n> path.appendComponent("camp")`);
        path.appendComponent("camp");
        console.log(path.absoluteString);

        console.log(`\n> path.deleteLastComponent()`);
        path.deleteLastComponent();
        console.log(path.absoluteString);

        console.log(`\n> path.deleteLastComponent()`);
        path.deleteLastComponent();
        console.log(path.absoluteString);

        const path1 = new Path("/first/second/last/param");
        console.log('\n> path1.relative("/first/second/most/jk")');
        console.log(path1.relative("/first/second/most/jk"));

        console.log('\n> path1.relative("/second/most/jk")');
        console.log(path1.relative("/second/most/jk"));
        
    }catch(error){
        console.log(error)
    }
}

main();