import Path from "./path.js"

describe('Path 분석 테스트 (미션 1번)', ()=> {
    // Path 분석 Test(Unix)
    describe(' - Path 분석 Test(Unix)', ()=>{
        test("동작 예시 코드 테스트", () => {
            expect(new Path("/home/user/boost/camp/challenge/day17/problem.md")).toEqual({
                root: '/',
                base: 'problem.md',
                name: 'problem',
                ext: '.md',
                lastDirectory: 'day17',
                components: [
                  '/',     'home',
                  'user',  'boost',
                  'camp',  'challenge',
                  'day17', 'problem.md'
                ],
                _absoluteString: '/home/user/boost/camp/challenge/day17/problem.md'
              });
        });
        test("Path 생성 안되는 경우 예외에 대한 테스트", () => {
            expect(() => {
                let path = new Path("/home/user/boost/camp/chall!enge/#day12/problem.md");
            }).toThrow("잘못된 path 형식입니다.") 
        });
        test("한글 포함하는 경우 테스트", () =>{
            expect(new Path('/home/user/부스트/camp.txt')).toEqual({
                root: '/',
                base: 'camp.txt',
                name: 'camp',
                ext: '.txt',
                lastDirectory: '부스트',
                components: [ '/', 'home', 'user', '부스트', 'camp.txt' ],
                _absoluteString: '/home/user/부스트/camp.txt'
            });
        });
        test("공백 포함하는 경우 테스트", () =>{
            expect(new Path('/home/user/부스트 캠프/camp.txt')).toEqual({
                root: '/',
                base: 'camp.txt',
                name: 'camp',
                ext: '.txt',
                lastDirectory: '부스트 캠프',
                components: [ '/', 'home', 'user', '부스트 캠프', 'camp.txt' ],
                _absoluteString: '/home/user/부스트 캠프/camp.txt'
            });
        });
        test("여러 Path를 포함하는 경우 테스트", () =>{
            expect(new Path('/usr/bin:/usr/local/bin/test.txt')).toEqual([
                {
                  root: '/',
                  base: 'bin',
                  lastDirectory: 'usr',
                  components: [ '/', 'usr', 'bin' ],
                  _absoluteString: '/usr/bin'
                },
                {
                  root: '/',
                  base: 'test.txt',
                  name: 'test',
                  ext: '.txt',
                  lastDirectory: 'bin',
                  components: [ '/', 'usr', 'local', 'bin', 'test.txt' ],
                  _absoluteString: '/usr/local/bin/test.txt'
                }
              ]);
        });
        test("폴더만 있는 경우 테스트", () =>{
            expect(new Path('/first/second/last/param')).toEqual({
                root: '/',
                base: 'param',
                lastDirectory: 'last',
                components: [ '/', 'first', 'second', 'last', 'param' ],
                _absoluteString: '/first/second/last/param'
              });
        });
    })

    // Path 분석 Test(Window)
    describe(' - Path 분석 Test(Window)', ()=>{
        test("동작 예시 코드 테스트", () => {
            expect(new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md")).toEqual({
                root: 'C:\\',
                base: 'problem.md',
                name: 'problem',
                ext: '.md',
                lastDirectory: 'day17',
                components: [
                  'C:\\',
                  'home',
                  'user',
                  'boost',
                  'camp',
                  'challenge',
                  'day17',
                  'problem.md'
                ],
                _absoluteString: 'C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md'
            });
        });
        test("Path 생성 안되는 경우 예외에 대한 테스트", () => {
            expect(() => {
                let path = new Path("C:\\home\\user\\?boost\\problem.md");
            }).toThrow("잘못된 path 형식입니다.") 
        });
        test("한글 포함하는 경우 테스트", () =>{
            expect(new Path('C:\\home\\user\\부스트\\problem.md')).toEqual({
                root: 'C:\\',
                base: 'problem.md',
                name: 'problem',
                ext: '.md',
                lastDirectory: '부스트',
                components: [ 'C:\\', 'home', 'user', '부스트', 'problem.md' ],
                _absoluteString: 'C:\\home\\user\\부스트\\problem.md'
            });
        });
        test("공백 포함하는 경우 테스트", () =>{
            expect(new Path('C:\\home\\user\\부스트 캠프\\problem.md')).toEqual({
                root: 'C:\\',
                base: 'problem.md',
                name: 'problem',
                ext: '.md',
                lastDirectory: '부스트 캠프',
                components: [ 'C:\\', 'home', 'user', '부스트 캠프', 'problem.md' ],
                _absoluteString: 'C:\\home\\user\\부스트 캠프\\problem.md'
            });
        });
        test("여러 Path를 포함하는 경우 테스트", () =>{
            expect(new Path('C:\\home\\user\\부스트 캠프;\\home2\\user2\\boost.exe')).toEqual([
                {
                  root: 'C:\\',
                  base: '부스트 캠프',
                  lastDirectory: 'user',
                  components: [ 'C:\\', 'home', 'user', '부스트 캠프' ],
                  _absoluteString: 'C:\\home\\user\\부스트 캠프'
                },
                {
                  root: '\\',
                  base: 'boost.exe',
                  name: 'boost',
                  ext: '.exe',
                  lastDirectory: 'user2',
                  components: [ '\\', 'home2', 'user2', 'boost.exe' ],
                  _absoluteString: '\\home2\\user2\\boost.exe'
                }
              ]);
        });
        test("폴더만 있는 경우 테스트", () =>{
            expect(new Path('C:\\home\\user\\부스트 캠프')).toEqual({
                root: 'C:\\',
                base: '부스트 캠프',
                lastDirectory: 'user',
                components: [ 'C:\\', 'home', 'user', '부스트 캠프' ],
                _absoluteString: 'C:\\home\\user\\부스트 캠프'
            });
        });
    })
})

describe('Path 추가 함수 테스트 (미션 2번)', ()=> {
    // Path Components 테스트
    describe(' - Path Components 테스트', ()=>{
        test("appendComponent() 테스트 - unix", () => {
            const path = new Path("/home/user/boost/camp/challenge/day12/problem.md");
            path.appendComponent("base")
            expect(path.absoluteString).toEqual('/home/user/boost/camp/challenge/day12/base/problem.md');
        });
        test("deleteLastComponent() 테스트 - unix", () => {
            const path = new Path("/home/user/boost/camp/challenge/day12/problem.md");
            path.deleteLastComponent();
            expect(path.absoluteString).toEqual('/home/user/boost/camp/challenge/problem.md');
        });
        test("appendComponent() 테스트 - window", () => {
            const path = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
            path.appendComponent("base")
            expect(path.absoluteString).toEqual('C:\\home\\user\\boost\\camp\\challenge\\day17\\base\\problem.md');
        });
        test("deleteLastComponent() 테스트 - window", () => {
            const path = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
            path.deleteLastComponent();
            expect(path.absoluteString).toEqual('C:\\\home\\user\\boost\\camp\\challenge\\problem.md');
        });
    })

    // Path relative 테스트
    describe(' - Path relative 테스트', ()=>{
        test("root 폴더만 겹칠 때 - unix", () => {
            const path = new Path("/first/second/last/param");
            expect(path.relative("/second/most/jk")).toEqual("../../../../second/most/jk");
        });
        test("root 폴더 이하로 더 겹칠 때 - unix", () => {
            const path = new Path("/first/second/last/param");
            expect(path.relative("/first/second/most/jk")).toEqual("../../most/jk");
        });
        test("root 폴더만 겹칠 때 - window", () => {
            const path = new Path("C:\\first\\second\\last\\param");
            expect(path.relative("C:\\second\\most\\jk")).toEqual("..\\..\\..\\..\\second\\most\\jk");
        });
        test("root 폴더 이하로 더 겹칠 때 - window", () => {
            const path = new Path("C:\\first\\second\\last\\param");
            expect(path.relative("C:\\first\\second\\most\\jk")).toEqual("..\\..\\most\\jk");
        });
    })
})