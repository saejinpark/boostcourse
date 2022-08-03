import UNIX from "./UNIX.js";
import WINDOW from "./WINDOW.js";
import { checkRelative, unixPathTest, windowPathTest } from "./functions.js";
class Path {
  constructor(path) {
    this.path = path;
    this.style;
    this.components;
    this.root;
    this.base;
    this.ext;
    this.name;
    this.lastDirectory;
    this.pathComponents;
    this.checkPathStyle();
    this.makeComponents();
    this.setComponents();
  }
  get absoluteString() {
    return this._absoluteString;
  }
  get pathComponents() {
    return this._pathcomponents;
  }

  checkPathStyle() {
    if (this.path.match(/\//g)) {
      this.style = new UNIX(this.path);
      unixPathTest(this.path);
    } else if (this.path.match(/(\\)/g)) {
      this.style = new WINDOW(this.path);
      windowPathTest(this.path);
    } else {
      throw "올바르지 않은 경로표현입니다.";
    }
  }
  makeComponents() {
    this.components = this.style.makeComponents();
    this._pathcomponents = this.components; // pathcomponents를 위해 생성
    return this.components;
  }
  setComponents() {
    this.root = this.components[0];
    this.base = this.components[this.components.length - 1];
    this.ext = this.base.match(/[.]\w+/)[0];
    this.name = this.base.replace(this.ext, "");
    this.lastDirectory = this.components[this.components.length - 2];
    this._absoluteString = this.style.makeAbsoluteString(this.components);
  }
  appendComponent(component) {
    this._pathcomponents = this._pathcomponents
      .slice(0, this._pathcomponents.length - 1)
      .concat([component])
      .concat(this._pathcomponents[this._pathcomponents.length - 1]);
    this._absoluteString = this.style.makeAbsoluteString(this._pathcomponents);
  }
  deleteLastComponent() {
    this._pathcomponents = this._pathcomponents
      .slice(0, this._pathcomponents.length - 2)
      .concat(this._pathcomponents[this._pathcomponents.length - 1]);
    this._absoluteString = this._absoluteString = this.style.makeAbsoluteString(this._pathcomponents);
  }
  relative(to) {
    const tempPath = new Path(to);
    if (
      !(
        (this.style instanceof UNIX && tempPath.style instanceof UNIX) ||
        (this.style instanceof WINDOW && tempPath.style instanceof WINDOW)
      )
    ) {
      throw "두 링크의 OS가 동일 하지 않습니다.";
    }
    if (this.style instanceof UNIX) {
      return checkRelative(this.pathComponents, tempPath.pathComponents, "UNIX");
    } else if (this.style instanceof WINDOW) {
      return checkRelative(this.pathComponents, tempPath.pathComponents, "WINDOW");
    } else {
      throw "error : relative()";
    }
  }
}

export default Path;
