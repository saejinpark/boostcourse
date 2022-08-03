const Path = require("./path");

const fieldsTest = [
    // Unix
    // sample example
    [
        "/home/user/boost/camp/challenge/day17/problem.md", // input path string
        "problem.md", "problem", ".md",                     // base, name, ext
        "/", "day17",                                       // root, lastDirectory
        ["/", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"], // components
        "/home/user/boost/camp/challenge/day17/problem.md", // absoluteString
    ],
    [
        "/foo",
        "foo", "foo", "",
        "/", "/",
        ["/", "foo"],
        "/foo"
    ],
    [
        "/foo/../bar.txt",
        "bar.txt", "bar", ".txt",
        "/", "/",
        ["/", "bar.txt"],
        "/bar.txt"
    ],
    [
        "/foo/../../bar.txt",
        "bar.txt", "bar", ".txt",
        "/", "/",
        ["/", "bar.txt"],
        "/bar.txt"
    ],
    [
        "/././././foo/././././bar.txt",
        "bar.txt", "bar", ".txt",
        "/", "foo",
        ["/", "foo", "bar.txt"],
        "/foo/bar.txt"
    ],
    [
        "/tmp/te\\st", // this works in linux, confirmed using virtual machine linux
        "te\\st", "te\\st", "",
        "/", "tmp",
        ["/", "tmp", "te\\st"],
        "/tmp/te\\st"
    ],
    [
        "/한/글.txt", // this works in linux, confirmed using virtual machine linux
        "글.txt", "글", ".txt",
        "/", "한",
        ["/", "한", "글.txt"],
        "/한/글.txt"
    ],

    // Windows
    // sample example
    [
        "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md",
        "problem.md", "problem", ".md",
        "C:", "day17",
        ["C:", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"],
        "C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md"
    ],
    [
        "C:\\foo",
        "foo", "foo", "",
        "C:", "C:",
        ["C:", "foo"],
        "C:\\foo"
    ],
    [
        "C:\\..\\D:\\foo",
        "foo", "foo", "",
        "D:", "D:",
        ["D:", "foo"],
        "D:\\foo"
    ],
    [
        "C:\\..\\D:\\..\\E:\\..\\F:\\foo",
        "foo", "foo", "",
        "F:", "F:",
        ["F:", "foo"],
        "F:\\foo"
    ],
    [
        "C:\\..\\..\\..\\D:\\foo.txt",
        "foo.txt", "foo", ".txt",
        "D:", "D:",
        ["D:", "foo.txt"],
        "D:\\foo.txt"
    ],
    [
        "C:\\.\\.\\.\\.\\foo\\.\\.\\.\\.\\bar.txt",
        "bar.txt", "bar", ".txt",
        "C:", "foo",
        ["C:", "foo", "bar.txt"],
        "C:\\foo\\bar.txt"
    ],
    [
        "C:\\한\\글.txt",
        "글.txt", "글", ".txt",
        "C:", "한",
        ["C:", "한", "글.txt"],
        "C:\\한\\글.txt"
    ],
];

test.each(fieldsTest)("(Fields) %s", (input, base, name, ext, root, lastDir, comp, absStr) => {
    const path = new Path(input);
    expect(path.root).toBe(root);
    expect(path.base).toBe(base);
    expect(path.ext).toBe(ext);
    expect(path.name).toBe(name);
    expect(path.lastDirectory).toBe(lastDir);
    expect(path.components).toEqual(comp);
    expect(path.absoluteString).toBe(absStr);
});

const multiplePathTest = [
    [
        "C:\\foo;D:\\bar;E:\\baz",
        ["C:\\foo", "D:\\bar", "E:\\baz"],
    ],
    [
        "/foo/bar:/bar/baz:/baz/qux",
        ["/foo/bar", "/bar/baz", "/baz/qux"],
    ],
]

test.each(multiplePathTest)("(MultiplePath) %s", (input, res) => {
    const paths = Path.getPaths(input);
    expect(paths.map(path => path.absoluteString)).toEqual(res);
});

const exceptionTest = [
    "C:\\foo/bar",
    "C:D:\\foo\\bar",
    "C:foo\\bar",
    "C:\\foo \\bar",
    "C:\\foo.\\bar",
    "root/foo",
    "/root//foo",
    "\\root/foo",
];

test.each(exceptionTest)("(Exception) %s", input => {
    expect(() => new Path(input)).toThrow();
});

const appendTest = [
    // input, component, result
    ["C:\\foo.txt", "bar", "C:\\bar\\foo.txt"],
    ["C:\\foo.txt", ".bar", "C:\\.bar\\foo.txt"],
    ["/foo/bar", "baz", "/foo/baz/bar"]
];

test.each(appendTest)("(appendComponent) %s %s -> %s", (input, component, result) => {
    const path = new Path(input);
    path.appendComponent(component);
    expect(path.absoluteString).toBe(result);
});

const appendFailTest = [
    // input, component
    ["C:\\foo.txt", "\\bar"],
    ["C:\\foo.txt", "bar "],
    ["C:\\foo.txt", "bar."],
    ["C:\\foo.txt", "CON"],
    ["C:\\foo.txt", "PRN"],
    ["C:\\foo.txt", "AUX"],
    ["C:\\foo.txt", "NUL"],
    ["C:\\foo.txt", "COM1"],
    ["C:\\foo.txt", "COM2"],
    ["C:\\foo.txt", "COM3"],
    ["C:\\foo.txt", "COM4"],
    ["C:\\foo.txt", "COM5"],
    ["C:\\foo.txt", "COM6"],
    ["C:\\foo.txt", "COM7"],
    ["C:\\foo.txt", "COM8"],
    ["C:\\foo.txt", "COM9"],
    ["C:\\foo.txt", "LPT1"],
    ["C:\\foo.txt", "LPT2"],
    ["C:\\foo.txt", "LPT3"],
    ["C:\\foo.txt", "LPT4"],
    ["C:\\foo.txt", "LPT5"],
    ["C:\\foo.txt", "LPT6"],
    ["C:\\foo.txt", "LPT7"],
    ["C:\\foo.txt", "LPT8"],
    ["C:\\foo.txt", "LPT9"],
]

test.each(appendFailTest)("(appendComponent) %s %s -> (Fail)", (input, component) => {
    const path = new Path(input);
    expect(() => path.appendComponent(component)).toThrow();
});

const deleteTest = [
    // input, result
    ["C:\\bar\\foo.txt", "C:\\foo.txt"],
    ["C:\\bar\\baz\\foo.txt", "C:\\bar\\foo.txt"],
    ["/bar/baz.bak", "/baz.bak"],
    ["/foo/bar/baz.bak", "/foo/baz.bak"],
];

test.each(deleteTest)("(deleteLastComponent) %s-> %s", (input, result) => {
    const path = new Path(input);
    path.deleteLastComponent();
    expect(path.absoluteString).toBe(result);
});

const deleteFailTest = [
    // input
    ["C:\\bar.txt"],
    ["/bar.txt"],
]

test.each(deleteFailTest)("(deleteLastComponent) %s -> (Fail)", (input) => {
    const path = new Path(input);
    expect(() => path.deleteLastComponent()).toThrow();
});

const relativeTest = [
    // sample example
    ["/first/second/last/param", "/first/second/most/jk", "../../most/jk"],
    ["/first/second/last/param", "/second/most/jk", "../../../../second/most/jk"],

    ["/foo/bar/baz", "/foo/qux/bar", "../../qux/bar"],
    ["/foo/bar", "/foo/qux/bar", "../qux/bar"],
    ["/foo", "/bar/baz/qux", "../bar/baz/qux"],
    ["/foo/bar", "/bar/baz/qux", "../../bar/baz/qux"],
    ["/foo/bar/baz", "/foo", "../.."],
    ["C:\\foo\\bar\\baz", "C:\\foo\\qux\\bar", "..\\..\\qux\\bar"],
    ["C:\\foo\\bar", "C:\\foo\\qux\\bar", "..\\qux\\bar"],
    ["C:\\foo", "C:\\bar\\baz\\qux", "..\\bar\\baz\\qux"],
    ["C:\\foo\\bar", "C:\\bar\\baz\\qux", "..\\..\\bar\\baz\\qux"],
    ["C:\\foo\\bar\\baz", "C:\\foo", "..\\.."],
]

test.each(relativeTest)("(relative) %s %s -> %s", (input1, input2, res) => {
    const path1 = new Path(input1);
    expect(path1.relative(input2)).toBe(res);
});

const relativeFailTest = [
    ["C:\\foo\\bar\\baz", "/foo/bar"],
    ["/foo/bar", "C:\\foo\\bar\\baz"],
]

test.each(relativeFailTest)("(relative) %s %s -> (Fail)", (input1, input2) => {
    const path1 = new Path(input1);
    expect(() => path1.relative(input2)).toThrow();
});