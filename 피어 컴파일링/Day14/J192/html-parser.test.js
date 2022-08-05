const HtmlParser = require("./html-parser");

const host = "foo.com";

describe("HtmlParser getCssUrls()", () => {
    const testcases = [
        // [text, expected]
        ['<link href="foo.css">', ['https://foo.com/foo.css']],
        ['<link href="bar.css"><link href="baz.css">', ['https://foo.com/bar.css', 'https://foo.com/baz.css']],
        ['', []],
        ['<link href="favicon.ico">', ['https://foo.com/favicon.ico']],
        ['<link href="">', []],
    ];

    test.each(testcases)("case %#", async (text, expected) => {
        const parser = new HtmlParser(text, host);
        
        expect(parser.getCssUrls()).toEqual(expected);
    });
});

describe("HtmlParser getJsUrls()", () => {
    const testcases = [
        // [text, expected]
        ['<script src="foo.js"></script>', ['https://foo.com/foo.js']],
        ['<script src="bar.js"></script><script src="baz.js"></script>', ['https://foo.com/bar.js', 'https://foo.com/baz.js']],
        ['', []],
        ['<script src="non-js-file.foo"></script>', ['https://foo.com/non-js-file.foo']],
        ['<script src=""></script>', []],
    ];

    test.each(testcases)("case %#", async (text, expected) => {
        const parser = new HtmlParser(text, host);
        
        expect(parser.getJsUrls()).toEqual(expected);
    });
});

describe("HtmlParser getImgUrls()", () => {
    const testcases = [
        // [text, expected]
        ['<img src="foo.jpg">', ['https://foo.com/foo.jpg']],
        ['<img src="bar.jpg"><img src="baz.jpg">', ['https://foo.com/bar.jpg', 'https://foo.com/baz.jpg']],
        ['', []],
        ['<img src="foo.js">', ['https://foo.com/foo.js']],
        ['<img src="data:image/png;base64,LONGSTRINGOFASCIICHARACTERS>', []],
        ['<img src="">', []],
    ];

    test.each(testcases)("case %#", async (text, expected) => {
        const parser = new HtmlParser(text, host);
        
        expect(parser.getImgUrls()).toEqual(expected);
    });
});