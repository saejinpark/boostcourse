import { parser } from "./compiler.js";

const tagTokenizer = (str) => {
    str = str.replace(/\s{2,}/g, " ");
    return str.match(/(<.*?>)|(\w+)/g);
};

export const XMLParser = (str) => {
    return new XmlParser(str);
};

class XmlParser {
    constructor(str) {
        this.str = str;
        try {
            this.parseXml = parser(tagTokenizer(this.str));
            this.elementArrMap = new Map();
            this.attributeArrMap = new Map();
            this.elementArrMap.set(this.parseXml.element, [this.parseXml]);
            let children = this.parseXml.children;
            if (this.parseXml.hasOwnProperty("attributes")) {
                this.parseXml.attributes.forEach((attribute) => {
                    this.attributeArrMap.set(attribute.name, [this.parseXml]);
                });
            }
            while (children.length !== 0) {
                let NextChildren = [];
                children.forEach((child) => {
                    if (this.elementArrMap.has(child.element))
                        this.elementArrMap.get(child.element).push(child);
                    else this.elementArrMap.set(child.element, [child]);
                    if (child.hasOwnProperty("children"))
                        NextChildren = NextChildren.concat(child.children);
                    if (child.hasOwnProperty("attributes")) {
                        child.attributes.forEach((attribute) => {
                            const attributeName = attribute.name;
                            if (this.attributeArrMap.has(attributeName))
                                this.attributeArrMap.get(attributeName);
                            else
                                this.attributeArrMap.set(attributeName, [
                                    child,
                                ]);
                        });
                    }
                });
                children = NextChildren;
            }
        } catch (e) {
            this.parseXml = e;
            this.elements = [];
        }
    }
    stringify() {
        return this.parseXml;
    }
    elementByAttribute(attribute, value) {
        const resultElements = [];
        this.attributeArrMap.get(attribute).forEach((element) => {
            element.attributes.forEach((oneOfAttribute) => {
                if (
                    oneOfAttribute.name === attribute &&
                    oneOfAttribute.value === value
                )
                    resultElements.push(element);
            });
        });
        return resultElements;
    }
    findXPath(path) {
        path = path
            .replace(/[/\[\]]/g, " ")
            .split(" ")
            .filter((v) => v != "");
        const pathMap = new Map();
        path.forEach((element, index) => {
            if (isNaN(element)) pathMap.set(element, 1);
            else pathMap.set(path[index - 1], parseInt(element));
        });
        let parantTag = null;
        let childTags = [this.parseXml];
        for (let tagName of pathMap.keys()) {
            for (let childTag of childTags) {
                if (childTag.element === tagName) {
                    pathMap.set(tagName, pathMap.get(tagName) - 1);
                    if (pathMap.get(tagName) === 0) {
                        parantTag = childTag;
                        childTags = parantTag.children.slice();
                        break;
                    }
                }
            }
            if (pathMap.get(tagName) !== 0) {
                parantTag = null;
                break;
            }
        }
        return parantTag;
    }
}
