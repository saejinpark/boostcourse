import { PathType } from './constants.js';

export default class Path {
  absoluteString;
  type;
  root;
  base;
  paths = [];
  ext;
  dir;
  name;
  lastDirectory;
  components;

  constructor(path) {
    Object.defineProperty(this, 'absoluteString', { writable: false });
    try {
      this.init(path);
    } catch (err) {
      console.error(err);
    }
  }

  init(path) {
    this.checkFileName(path);
    this.type = this.checkType(path);
    if (this.checkManyPaths(path)) {
      this.makeThisPaths(path);
    }

    this.setRoot(path);
    this.setComponents(path);
    this.makeAbsoluteStringWithComponents();
    this.setBase();
    this.setLastDirectory();
    this.setFile();
    this.setDir();
  }
  checkManyPaths(path) {
    if (this.type === PathType.UNIX) {
      if (path.split(':').length > 1) return true;
    } else if (this.type === PathType.WINDOW) {
      if (path.split(';').legnth > 1) return true;
    }
    return false;
  }
  makeAbsoluteStringWithComponents() {
    Object.defineProperty(this, 'absoluteString', { writable: true });
    this.absoluteString = '';
    if (this.type === PathType.UNIX) {
      this.components.forEach((item, idx) => {
        if (idx === 0 || idx === this.components.length - 1) {
          this.absoluteString += item;
        } else this.absoluteString += item + '/';
      });
    } else if (this.type === PathType.WINDOW) {
      this.components.forEach((item, idx) => {
        if (idx === 0) {
          this.absoluteString += item + '\\';
        } else if (idx === this.components.length - 1) this.absoluteString += item;
        else this.absoluteString += item + '\\\\';
      });
    }
    Object.defineProperty(this, 'absoluteString', { writable: false });
  }

  checkType(path) {
    if (path.split('/').length > 1) return PathType.UNIX;
    else if (path.split('\\').length > 1) return PathType.WINDOW;
  }

  makeThisPaths(path) {
    if (this.type === PathType.UNIX) {
      path.split(':').forEach((item) => {
        this.paths.push(item);
      });
    } else if (this.type === PathType.WINDOW) {
      path.split(';').forEach((item) => {
        this.paths.push(item);
      });
    }
    return this.paths;
  }

  checkFileName(path) {
    const dotSplitArr = path.match(/([^.])+/g);
    if (dotSplitArr.length < 2) throw '파일명의 확장자가 포함돼있지 않습니다.';
  }

  setRoot(path) {
    if (this.type === PathType.UNIX) {
      this.root = path.match(/([\/\s]+)/)[0];
    } else if (this.type === PathType.WINDOW) {
      this.root = path.match(/([^home\/\s]+)/)[0];
    }
  }

  setComponents(path) {
    this.components = path.match(/([ㄱ-ㅎ가-힣0-9a-z. ])+/g);
    if (this.components[0] !== this.root) this.components.unshift(this.root);
  }

  setDir() {
    const dirArr = [...this.components];
    dirArr.pop();
    if (this.type === PathType.UNIX) {
      this.dir = dirArr.join('/');
      this.dir = this.dir.slice(1);
    } else if (this.type === PathType.WINDOW) {
      dirArr[0] = dirArr[0].slice(0, -1);
      console.log(dirArr[0]);
      this.dir = dirArr.join('\\');
    }
  }

  setBase() {
    this.base = this.components[this.components.length - 1];
  }

  setFile() {
    this.name = this.base.split('.')[0];
    this.ext = this.base.split('.')[1];
  }

  setLastDirectory() {
    this.lastDirectory = this.components[this.components.length - 2];
  }

  stringify() {
    return {
      root: this.root,
      base: this.base,
      ext: this.ext,
      name: this.name,
      ld: this.lastDirectory,
      components: this.components,
    };
  }

  appendComponent(str) {
    const file = this.components.pop();
    this.components.push(str);
    this.components.push(file);
    this.makeAbsoluteStringWithComponents();
  }

  deleteLastComponent(str) {
    const file = this.components.pop();
    this.components.pop();
    this.components.push(file);
    this.makeAbsoluteStringWithComponents();
  }

  getAbsoluteString() {
    return this.absoluteString;
  }

  relative(newPath) {
    let ret = '';
    const newPathArr = newPath.split('/');
    newPathArr.shift();
    const newComps = [...this.components];
    newComps.shift();
    if (newComps.length === newPathArr.length) {
      newPathArr.forEach((item, idx) => {
        if (item === newComps[idx]) ret += '../';
        else ret += item + '/';
      });
      ret = ret.slice(0, -1);
    } else {
      newComps.forEach((item) => {
        ret += '../';
      });
      ret = ret.slice(0, -1);
      ret += newPath;
    }
    return ret;
  }
}
