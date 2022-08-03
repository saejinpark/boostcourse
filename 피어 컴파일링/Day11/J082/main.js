import { Path } from "./path.js";

const main = () => {
    // const windowPath = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
    // const unixPath = new Path("/home/user/boost/camp/challenge/day12/problem.md");
    const path1 = new Path("/first/second/last/param");
    console.log(path1.relative("/first/second/most/jk"));
    console.log(path1.relative("/second/most/jk"));
};
main();
