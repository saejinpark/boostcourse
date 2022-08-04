const ApplicationLayer = require("./application-layer");

describe("Application layer encoding", () => {
    const appLayer = new ApplicationLayer();
    const cases = [
        [
            "jk@boostcamp.connect.or.kr", // from
            "camper@boostcamp.connect.or.kr", // to
            "Hello World", // title
            "Hello BoostCamper,\r\n\tThis message written by JK.", // attachment
            "From: jk@boostcamp.connect.or.kr\r\nTo: camper@boostcamp.connect.or.kr\r\nTitle: Hello World\r\n\r\nHello BoostCamper,\r\n\tThis message written by JK."
        ],
        [
            "foo@bar.com",
            "baz@bar.com",
            "qux",
            "Test string here.\r\n!@#$%^&*()[]{}<>'\";:/?,.`~0123456789-_=+\\|",
            "From: foo@bar.com\r\nTo: baz@bar.com\r\nTitle: qux\r\n\r\nTest string here.\r\n!@#$%^&*()[]{}<>'\";:/?,.`~0123456789-_=+\\|"
        ],
        // [
        //     "Hangul string (가나다..)",
        //     "foo@bar.com",
        //     "baz@bar.com",
        //     "안녕하세요.",
        //     "테스트입니다. 가나다라마바사아자차카타파하",
        //     "From: foo@bar.com\r\nTo: baz@bar.com\r\nTitle: 안녕하세요.\r\n\r\n테스트입니다. 가나다라마바사아자차카타파하"
        // ],
        // [
        //     "Unicode string (\u{1F4CC}, \u{23F1})",
        //     "foo@bar.com",
        //     "baz@bar.com",
        //     "\u{1F4CC} 공지사항",
        //     "\u{23F1} 일정 변경: 14시에서 15시.",
        //     "From: foo@bar.com\r\nTo: baz@bar.com\r\nTitle: \u{1F4CC} 공지사항\r\n\r\n\u{23F1} 일정 변경: 14시에서 15시."
        // ],
        // TODO: binary attachment (use Buffer)
    ]

    test.each(cases)("case %#", (from, to, title, attach, expected) => {
        expect(appLayer.encode(from, to, title, attach)).toBe(expected);
    });
});