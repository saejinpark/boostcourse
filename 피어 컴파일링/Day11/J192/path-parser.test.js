const { PathParser, WinReservedNameError, WinInvalidNameError, CannotParsePathError, PathParseResult } = require("./path-parser");

const testcases = [
    ["",                          CannotParsePathError],

    // windows
    ["C:",                        CannotParsePathError],
    ["C:/",                       CannotParsePathError],
    ["C:\\",                      CannotParsePathError],
    ["C:\\foo",                   [new PathParseResult(["C:", "foo"], "\\")]],
    ["C:\\foo\\bar",              [new PathParseResult(["C:", "foo", "bar"], "\\")]],
    ["C:\\foo\\bar\\",            CannotParsePathError],
    ["C:\\\\foo\\bar",            CannotParsePathError],
    ["C:\\foo\\\\bar",            CannotParsePathError],
    ["\\foo\\bar",                [new PathParseResult(["C:", "foo", "bar"], "\\")]],
    ["C:foo",                     CannotParsePathError],
    ["C:\\fo>o",                  WinInvalidNameError],
    ["C:\\fo<o",                  WinInvalidNameError],
    ["C:\\fo:o",                  WinInvalidNameError],
    ["C:\\fo\"o",                 WinInvalidNameError],
    ["C:\\fo/o",                  WinInvalidNameError],
    ["C:\\fo|o",                  WinInvalidNameError],
    ["C:\\fo?o",                  WinInvalidNameError],
    ["C:\\fo*o",                  WinInvalidNameError],
    ["C:\\fo o",                  [new PathParseResult(["C:", "fo o"], "\\")]],
    ["C:\\fo.o",                  [new PathParseResult(["C:", "fo.o"], "\\")]],
    ["C:\\foo ",                  WinInvalidNameError],
    ["C:\\foo.",                  WinInvalidNameError],
    ["C:\\fo>o\\bar",             WinInvalidNameError],
    ["C:\\fo<o\\bar",             WinInvalidNameError],
    ["C:\\fo:o\\bar",             WinInvalidNameError],
    ["C:\\fo\"o\\bar",            WinInvalidNameError],
    ["C:\\fo/o\\bar",             WinInvalidNameError],
    ["C:\\fo|o\\bar",             WinInvalidNameError],
    ["C:\\fo?o\\bar",             WinInvalidNameError],
    ["C:\\fo*o\\bar",             WinInvalidNameError],
    ["C:\\fo o\\bar",             [new PathParseResult(["C:", "fo o", "bar"], "\\")]],
    ["C:\\fo.o\\bar",             [new PathParseResult(["C:", "fo.o", "bar"], "\\")]],
    ["C:\\foo \\bar",             WinInvalidNameError],
    ["C:\\foo.\\bar",             WinInvalidNameError],
    ["C:\\foo.jpg",               [new PathParseResult(["C:", "foo.jpg"], "\\")]],
    ["C:\\foo\\bar.jpg",          [new PathParseResult(["C:", "foo", "bar.jpg"], "\\")]],
    ["C:\\CON",                   WinReservedNameError],
    ["C:\\PRN",                   WinReservedNameError],
    ["C:\\AUX",                   WinReservedNameError],
    ["C:\\NUL",                   WinReservedNameError],
    ["C:\\COM1",                  WinReservedNameError],
    ["C:\\COM2",                  WinReservedNameError],
    ["C:\\COM3",                  WinReservedNameError],
    ["C:\\COM4",                  WinReservedNameError],
    ["C:\\COM5",                  WinReservedNameError],
    ["C:\\COM6",                  WinReservedNameError],
    ["C:\\COM7",                  WinReservedNameError],
    ["C:\\COM8",                  WinReservedNameError],
    ["C:\\COM9",                  WinReservedNameError],
    ["C:\\LPT1",                  WinReservedNameError],
    ["C:\\LPT2",                  WinReservedNameError],
    ["C:\\LPT3",                  WinReservedNameError],
    ["C:\\LPT4",                  WinReservedNameError],
    ["C:\\LPT5",                  WinReservedNameError],
    ["C:\\LPT6",                  WinReservedNameError],
    ["C:\\LPT7",                  WinReservedNameError],
    ["C:\\LPT8",                  WinReservedNameError],
    ["C:\\LPT9",                  WinReservedNameError],
    ["C:\\CON.txt",               WinReservedNameError],
    ["C:\\PRN.txt",               WinReservedNameError],
    ["C:\\AUX.txt",               WinReservedNameError],
    ["C:\\NUL.txt",               WinReservedNameError],
    ["C:\\COM1.txt",              WinReservedNameError],
    ["C:\\COM2.txt",              WinReservedNameError],
    ["C:\\COM3.txt",              WinReservedNameError],
    ["C:\\COM4.txt",              WinReservedNameError],
    ["C:\\COM5.txt",              WinReservedNameError],
    ["C:\\COM6.txt",              WinReservedNameError],
    ["C:\\COM7.txt",              WinReservedNameError],
    ["C:\\COM8.txt",              WinReservedNameError],
    ["C:\\COM9.txt",              WinReservedNameError],
    ["C:\\LPT1.txt",              WinReservedNameError],
    ["C:\\LPT2.txt",              WinReservedNameError],
    ["C:\\LPT3.txt",              WinReservedNameError],
    ["C:\\LPT4.txt",              WinReservedNameError],
    ["C:\\LPT5.txt",              WinReservedNameError],
    ["C:\\LPT6.txt",              WinReservedNameError],
    ["C:\\LPT7.txt",              WinReservedNameError],
    ["C:\\LPT8.txt",              WinReservedNameError],
    ["C:\\LPT9.txt",              WinReservedNameError],
    ["C:\\.tmp",                  [new PathParseResult(["C:", ".tmp"], "\\")]],
    ["C:\\한글.hwp",               [new PathParseResult(["C:", "한글.hwp"], "\\")]],
    ["C:\\한.hwp",               [new PathParseResult(["C:", "한.hwp"], "\\")]],
    ["C:\\a\\b",                  [new PathParseResult(["C:", "a", "b"], "\\")]],
    ["C:\\한\\글.hwp",             [new PathParseResult(["C:", "한", "글.hwp"], "\\")]],

    ["C:\\foo;C:\\foo\\bar;C:\\foo\\bar\\baz",
        [new PathParseResult(["C:", "foo"], "\\"),
         new PathParseResult(["C:", "foo", "bar"], "\\"),
         new PathParseResult(["C:", "foo", "bar", "baz"], "\\")
        ]
    ],
    ["C:\\foo;C:\\foo\\bar;C:\\foo\\\\bar\\baz", CannotParsePathError],

    ["C:\\..\\C:",                [new PathParseResult(["C:"], "\\")]],
    ["C:\\..\\D:",                [new PathParseResult(["D:"], "\\")]],
    ["C:\\..\\..\\D:",            [new PathParseResult(["D:"], "\\")]],
    ["C:\\.\\.\\foo",             [new PathParseResult(["C:", "foo"], "\\")]],

    // unix
    ["root/",                     CannotParsePathError],
    ["root/bar",                  CannotParsePathError],
    ["/root",                     [new PathParseResult(["/", "root"], "/")]],
    ["/root/",                    CannotParsePathError],
    ["/root/foo",                 [new PathParseResult(["/", "root", "foo"], "/")]],
    ["/root//foo",                CannotParsePathError],
    ["/root/foo/bar",             [new PathParseResult(["/", "root", "foo", "bar"], "/")]],
    ["/root/foo.txt",             [new PathParseResult(["/", "root", "foo.txt"], "/")]],
    ["/.tmp",                     [new PathParseResult(["/", ".tmp"], "/")]],
    ["/f oo",                     [new PathParseResult(["/", "f oo"], "/")]],
    ["/f.oo",                     [new PathParseResult(["/", "f.oo"], "/")]],
    ["/a/b/c",                    [new PathParseResult(["/", "a", "b", "c"], "/")]],
    ["/가/나다/라마바",             [new PathParseResult(["/", "가", "나다", "라마바"], "/")]],

    ["/root:/usr:/usr/foo",
        [new PathParseResult(["/", "root"], "/"),
         new PathParseResult(["/", "usr"], "/"),
         new PathParseResult(["/", "usr", "foo"], "/")
        ]
    ],
    ["/root://usr:/usr/foo",      CannotParsePathError],

    ["/././././foo/./././bar",    [new PathParseResult(["/", "foo", "bar"], "/")]],
    ["/foo/../bar",               [new PathParseResult(["/", "bar"], "/")]],
    ["/foo/../../bar",            [new PathParseResult(["/", "bar"], "/")]], // confirmed using virtual machine linux
];

const pathParser = new PathParser();

test.each(testcases)("%s", (str, res) => {
    if (res === CannotParsePathError ||
        res === WinInvalidNameError ||
        res === WinReservedNameError) {
        expect(() => pathParser.parse(str)).toThrow(res);
    } else if (Array.isArray(res)) {
        expect(pathParser.parse(str)).toEqual(res);
    } else {
        throw new Error("Unexpected test case");
    }
});