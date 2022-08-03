import { equal } from "assert";
import { Path } from "./path.js";

describe("Path", function () {
    describe("Window", function () {
        const path = new Path("C:\\home\\user\\boost\\camp\\challenge\\day17\\problem.md");
        describe("#getRoot()", function () {
            it('should return "C:\\" when the value is not present', function () {
                equal(path.getRoot(), "C:\\");
            });
        });
        describe("#getBase()", function () {
            it('should return "problem.md" when the value is not present', function () {
                equal(path.getBase(), "problem.md");
            });
        });
        describe("#getExt()", function () {
            it('should return ".md" when the value is not present', function () {
                equal(path.getExt(), ".md");
            });
        });
        describe("#getName()", function () {
            it('should return "problem" when the value is not present', function () {
                equal(path.getName(), "problem");
            });
        });
        describe("#getLastDirectory()", function () {
            it('should return "day17" when the value is not present', function () {
                equal(path.getLastDirectory(), "day17");
            });
        });
        describe("#getComponents()", function () {
            it('should return "C:\\" when the value is not present', function () {
                equal(
                    path.getComponentsByIndex(0),
                    ["C:\\", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"][0]
                );
            });
        });
    });

    describe("UNIX", function () {
        const path = new Path("/home/user/boost/camp/challenge/day17/problem.md");
        describe("#getRoot()", function () {
            it('should return "/" when the value is not present', function () {
                equal(path.getRoot(), "/");
            });
        });
        describe("#getBase()", function () {
            it('should return "problem.md" when the value is not present', function () {
                equal(path.getBase(), "problem.md");
            });
        });
        describe("#getExt()", function () {
            it('should return ".md" when the value is not present', function () {
                equal(path.getExt(), ".md");
            });
        });
        describe("#getName()", function () {
            it('should return "problem" when the value is not present', function () {
                equal(path.getName(), "problem");
            });
        });
        describe("#getLastDirectory()", function () {
            it('should return "day17" when the value is not present', function () {
                equal(path.getLastDirectory(), "day17");
            });
        });
        describe("#getComponents()", function () {
            it('should return "C:\\" when the value is not present', function () {
                equal(
                    path.getComponentsByIndex(0),
                    ["/", "home", "user", "boost", "camp", "challenge", "day17", "problem.md"][0]
                );
            });
        });
    });
    describe("#appendComponent()", function () {
        const path = new Path("/home/user/boost/camp/challenge/day12/problem.md");
        const before = path.getAbsoluteString();
        path.appendComponent("base");
        path.appendComponent("camp");
        const after = path.getAbsoluteString();
        describe("#before", function () {
            it('should return \n\t\t"/home/user/boost/camp/challenge/day12/problem.md"\n\t\twhen the value is not present', function () {
                equal(before, "/home/user/boost/camp/challenge/day12/problem.md");
            });
        });
        describe("#after", function () {
            it('should return \n\t\t"/home/user/boost/camp/challenge/day12/base/camp/problem.md"\n\t\twhen the value is not present', function () {
                equal(after, "/home/user/boost/camp/challenge/day12/base/camp/problem.md");
            });
        });
    });

    describe("#deleteLastComponent()", function () {
        const path = new Path("/home/user/boost/camp/challenge/day12/base/camp/problem.md");
        const before = path.getAbsoluteString();
        path.deleteLastComponent();
        const after = path.getAbsoluteString();
        describe("#before", function () {
            it('should return \n\t\t"/home/user/boost/camp/challenge/day12/base/camp/problem.md"\n\t\twhen the value is not present', function () {
                equal(before, "/home/user/boost/camp/challenge/day12/base/camp/problem.md");
            });
        });
        describe("#after", function () {
            it('should return \n\t\t"/home/user/boost/camp/challenge/day12/base/problem.md"\n\t\twhen the value is not present', function () {
                equal(after, "/home/user/boost/camp/challenge/day12/base/problem.md");
            });
        });
    });

    describe("#relative()", function () {
        const path = new Path("/first/second/last/param");

        it(
            'path = new Path("/first/second/last/param");' +
                '\n\t\tpath.relative("/first/second/most/jk");' +
                "\n\t\tshould return" +
                '\n\t\t"/home/user/boost/camp/challenge/day12/base/camp/problem.md"' +
                "\n\t\twhen the value is not present",
            function () {
                equal(path.relative("/first/second/most/jk"), "../../most/jk");
            }
        );
        it(
            'path = new Path("/first/second/last/param");' +
                '\n\t\tpath.relative("/second/most/jk");' +
                "\n\t\tshould return" +
                '\n\t\t"/home/user/boost/camp/challenge/day12/base/camp/problem.md"' +
                "\n\t\twhen the value is not present",
            function () {
                equal(path.relative("/second/most/jk"), "../../../../second/most/jk");
            }
        );
    });
});
