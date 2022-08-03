import Path from "./Path.js";

const unixPath = new Path("/home/user/boost/camp/challenge/day17/problem.md");
const windowPath = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");

// console.log(windowPath.pathComponents);
// console.log(windowPath.absoluteString);
// windowPath.appendComponent("base");
// windowPath.appendComponent("camp");
// console.log(windowPath.pathComponents);
// console.log(windowPath.absoluteString);

// windowPath.deleteLastComponent();
// console.log(windowPath.pathComponents);
// console.log(windowPath.absoluteString);

// console.log(unixPath.pathComponents);
// console.log(unixPath.absoluteString);
// unixPath.appendComponent("base");
// unixPath.appendComponent("camp");
// console.log(unixPath.pathComponents);
// console.log(unixPath.absoluteString);

// unixPath.deleteLastComponent();
// console.log(unixPath.pathComponents);
// console.log(unixPath.absoluteString);

// const path1 = new Path("/first/second/last/param.md");
// console.log(path1.relative("/first/second/most/jk.md"));

// const path2 = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
// console.log(path2.relative("C:\\home\\user\\boost\\jaemin\\challenge\\day17\\problem.md"));
