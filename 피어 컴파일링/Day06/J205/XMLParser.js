const { NOT_NEED_END_TAG, AUTO_END_TAG } = require("./constants");

class XmlNode {
  constructor({ element, attributes, text }) {
    this.element = element;
    if (attributes) this.attributes = attributes;
    if (text) this.text = text;
  }

  addChild(node) {
    if (!this.children) this.children = [];
    this.children.push(node);
  }

  get info() {
    const info = {
      element: this.element,
    };
    if (this.attributes) info.attributes = this.attributes;
    if (this.children) info.children = this.children;
    if (this.text) info.text = this.text;
    return info;
  }
}

function XmlParser(xml) {
  const tagsNodeStack = [];

  const parse = (xml) => {
    const tokens = tokenizer(xml);

    let currentNode = new XmlNode({ element: "ROOT" });

    for (let token of tokens) {
      const { tag } = token;

      if (tag[0] === "<") {
        // closing tag
        if (tag[1] === "/") {
          const tagName = tag.split(" ")[0].replaceAll(/[<|>|/]/g, "");
          if (
            currentNode.element !== tagName &&
            !NOT_NEED_END_TAG.find(
              (v) => v === currentNode.element.toLowerCase()
            )
          ) {
            throw new Error("유효하지 않은 xml입니다.");
          } else {
            const poped = tagsNodeStack.pop();

            if (poped.element === "ROOT") return currentNode.info;

            poped.addChild(currentNode.info);
            currentNode = poped;
          }
        } else if (tag.lastIndexOf("/") === tag.length - 2) {
          // self closing tag
          currentNode.addChild(lexer(token));
        } else {
          // opening tag
          tagsNodeStack.push(currentNode);
          currentNode = new XmlNode(lexer(token));
        }
      }
    }
  };

  const tokenizer = (xml) => {
    const mached = [...xml.matchAll(/(<([^>]+)>)/g)];
    const tokens = [];

    for (let i = 0; i < mached.length; i++) {
      if (mached[i][0].match(/<(!|[?])/)) continue;

      const token = {
        tag: mached[i][0],
        index: mached[i].index,
      };
      if (
        tokens.length > 0 &&
        tokens.at(-1).index + tokens.at(-1).tag.length !== token.index
      ) {
        const popped = tokens.pop();
        const text = xml
          .slice(popped.index + popped.tag.length, token.index)
          .trim();
        if (text.length > 0) {
          popped.text = text;
        }
        tokens.push(popped);
      }
      tokens.push(token);
    }

    return tokens;
  };

  const lexer = (token) => {
    const { tag, text } = token;
    const splited = tag.split(" ");
    const tagName = splited[0];
    const attributesArr = tag.match(/[\w:]+=\"([^"]*)\"/g);

    const result = {};

    let element;
    let attributes = [];

    if (tagName[0] === "<") {
      if (tagName[1] !== "/") {
        element = tagName.replaceAll(/[<|>|/]/g, "").trim();
      }
    }

    result.element = element;

    if (attributesArr?.length > 0) {
      for (let i = 0; i < attributesArr.length; i++) {
        const trimmed = attributesArr[i].replaceAll(/[<|>|/]/g, "");
        const name = trimmed.split("=")[0];
        const value = trimmed.match(/".+"/)[0].slice(1, -1);
        attributes.push({ name, value });
      }
      result.attributes = attributes;
    }

    if (text?.trim()) {
      result.text = text;
    }

    return result;
  };

  const parsed = parse(xml);

  const stringfy = () => {
    return parsed;
  };

  const elementByAttribute = (name, value, obj = parsed) => {
    if ("attributes" in obj) {
      const { attributes } = obj;
      if (
        attributes.filter((v) => v.name === name && v.value === value).length >
        0
      ) {
        return obj;
      }
    }

    if ("children" in obj) {
      const { children } = obj;
      for (let i = 0; i < children.length; i++) {
        const result = elementByAttribute(name, value, children[i]);
        if (result !== null) return result;
      }
    }

    return null;
  };

  const elementsByTag = (tagName, obj = parsed) => {
    const result = [];
    if (obj.element.toUpperCase() === tagName.toUpperCase()) {
      result.push(obj);
    }

    if ("children" in obj) {
      const { children } = obj;
      for (let i = 0; i < children.length; i++) {
        result.push(...elementsByTag(tagName, children[i]));
      }
    }
    return result;
  };

  const findXPath = (path, obj = parsed) => {
    const tags = path.split("/").slice(1);
    let flag = 0;
    for (let t of tags) {
      if (t.match(/[[0-9]+]$/)) {
        const path = t.replace(/[[0-9]+]$/, "");
        const index = t.match(/[[0-9]+]$/)[0].slice(1, -1) - 1;
        const searched = elementsByTag(path, obj);
        if (searched.length > index) {
          obj = searched[index];
          flag = 1;
        }
      } else {
        const searched = elementsByTag(path, obj);
        if (searched.length > 0) {
          obj = searched[0];

          flag = 1;
        }
      }
    }

    return flag === 1 ? obj : "ERROR: 찾으려는 경로가 없습니다.";
  };

  return { stringfy, elementByAttribute, elementsByTag, findXPath };
}

module.exports = XmlParser;
