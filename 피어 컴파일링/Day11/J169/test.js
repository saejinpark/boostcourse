const { exportAllDeclaration } = require("@babel/types");
const Path = require("./Path");

var path = new Path("/home/user/boost/camp/challenge/day12/problem.md");

test("UNIX path.root Test", () =>{
    expect(path.root).toBe('/');
})

test("UNIX path.base Test", () =>{
    expect(path.base).toBe('problem.md');
})

test("UNIX path.ext Test", () =>{
    expect(path.ext).toBe('md');
})

test("UNIX path.name Test", () =>{
    expect(path.name).toBe('problem');
})

test("UNIX path.lastDirectory Test", () =>{
    expect(path.lastDirectory).toBe('day12');
})

test("UNIX path.components Test", () =>{
    expect(path.components).toEqual(["/", "home", "user", "boost", "camp", "challenge", "day12", "problem.md"]);
})

test("UNIX path.absoluteString Test", () =>{
    expect(path.absoluteString).toBe("/home/user/boost/camp/challenge/day12/problem.md");
})

test("UNIX path.appendComponent() Test", () =>{
    path.appendComponent("base");
    path.appendComponent("camp");
    expect(path.absoluteString).toBe("/home/user/boost/camp/challenge/day12/base/camp/problem.md");
})

test("UNIX path.deleteLastComponent() Test", () =>{
    path.deleteLastComponent();
    expect(path.absoluteString).toBe("/home/user/boost/camp/challenge/day12/base/problem.md");
})

var _path = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");

test("Windows path.root Test", () =>{
    expect(_path.root).toBe('C:\\');
})

test("Windows path.base Test", () =>{
    expect(_path.base).toBe('problem.md');
})

test("Windows path.ext Test", () =>{
    expect(_path.ext).toBe('md');
})

test("Windows path.name Test", () =>{
    expect(_path.name).toBe('problem');
})

test("Windows path.lastDirectory Test", () =>{
    expect(_path.lastDirectory).toBe('day17');
})

test("Windows path.components Test", () =>{
    expect(_path.components).toEqual(["C:\\", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"]);
})

test("Windows path.absoluteString Test", () =>{
    expect(_path.absoluteString).toBe("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
})

const path1 = new Path("/first/second/last/param");

test("path.relative() Test1", () =>{
    expect(path1.relative("/first/second/most/jk")).toBe("../../most/jk");
})

test("path.relative() Test2", () =>{
    expect(path1.relative("/second/most/jk")).toBe("../../../../second/most/jk");
})

const pathArr = new Path("/home/user/boost/camp/challenge/day17/problem.md:/home/user/boost/camp/challenge/day11/problem.md");

test("복수 Path 요소 지원 생성자 Test", () =>{
    expect(pathArr).toHaveLength(2);
})

test("복수 Path 요소 지원 생성자 Test - components1", () =>{
    expect(pathArr[0].components).toEqual([
        '/',     'home',
        'user',  'boost',
        'camp',  'challenge',
        'day17', 'problem.md'
      ]);
})

test("복수 Path 요소 지원 생성자 Test - components2", () =>{
    expect(pathArr[1].components).toEqual([
        '/',     'home',
        'user',  'boost',
        'camp',  'challenge',
        'day11', 'problem.md'
      ]);
})

test("Path 생성 안되는 경우 예외처리 Test", ()=>{
    expect(() => new Path("/home/user/boost/camp/challenge/day17/problem<>.md")).toThrow();
})