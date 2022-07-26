const SELF_CLOSING_TAGS = [
    "area", "base", "br", "col", "command",
    "embed", "hr", "img", "input", "keygen",
    "link", "menuitem", "meta", "param",
    "source", "track", "wbr",
];

const CLOSING_TAG_CAN_BE_OMITTED_TAGS = [
    "li", "dt", "dd", "p", "rt", "rp",
    "optgroup", "optioni", "thead",
    "tfoot", "tr", "td", "th",
];

const tokenizer = (str) => {
    const tokenizedStr = str.match(/(<)|(>)|(\/)|([^<>\"=\s\/]+)|(\".*?\")/g);
    if (tokenizedStr[0] === "<") {
        if (tokenizedStr[1] !== "/")
            tokenizedStr[1] = tokenizedStr[1].toLowerCase();
        else tokenizedStr[2] = tokenizedStr[2].toLowerCase();
        if (
            SELF_CLOSING_TAGS.includes(tokenizedStr[1]) &&
            tokenizedStr[tokenizedStr.length - 2] !== "/"
        )
            tokenizedStr.splice(tokenizedStr.length - 1, 0, "/");
    }
    return tokenizedStr;
};

const lexer = (token) => {
    const LexicalAnalyzedToken = {};
    if (token[token.length - 1] === "/") token.pop();
    token.forEach((element, index) => {
        if (index === 0) LexicalAnalyzedToken.element = element;
        else {
            if (!LexicalAnalyzedToken.hasOwnProperty("attributes"))
                LexicalAnalyzedToken.attributes = [{ name: element }];
            else {
                const attributeArr = LexicalAnalyzedToken.attributes;
                if (/\".*\"/.test(element))
                    attributeArr[attributeArr.length - 1].value =
                        element.substring(1, element.length - 1);
                else attributeArr.push({ name: element });
            }
        }
    });
    return LexicalAnalyzedToken;
};

export const parser = (tagTokenizedStrArr) => {
    const openingTagStack = [];
    while (tagTokenizedStrArr.length !== 0) {
        const token = tokenizer(tagTokenizedStrArr.shift());
        if (["!doctype", "?xml"].includes(token[1])) continue;
        else {
            if (token[0] !== "<") {
                if (openingTagStack[0].hasOwnProperty("text"))
                    openingTagStack[0].text += " " + token[0];
                else openingTagStack[0].text = token[0];
            } else {
                if (token[1] !== "/") {
                    token.pop();
                    token.shift();
                    if (token[token.length - 1] === "/") {
                        if (!openingTagStack[0].hasOwnProperty("children"))
                            openingTagStack[0].children = [lexer(token)];
                        else openingTagStack[0].children.push(lexer(token));
                    } else openingTagStack.unshift(lexer(token));
                } else {
                    const openingTag = openingTagStack.shift();
                    if (openingTagStack.length === 0) return openingTag;
                    let closingTagCanBeOmitted =
                        CLOSING_TAG_CAN_BE_OMITTED_TAGS.includes(
                            openingTag.element
                        );
                    if (
                        openingTag.element === token[2] ||
                        closingTagCanBeOmitted
                    ) {
                        if (!openingTagStack[0].hasOwnProperty("children"))
                            openingTagStack[0].children = [openingTag];
                        else openingTagStack[0].children.push(openingTag);
                        if (openingTag.element !== token[2] && closingTagCanBeOmitted)
                            tagTokenizedStrArr.unshift(token.join(" "));
                    } else throw new Error("올바른 XML 형식이 아닙니다.");
                }
            }
        }
    }
};
