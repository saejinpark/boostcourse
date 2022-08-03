class WINDOW {
  constructor(path) {
    this.path = path;
  }
  makeComponents() {
    const components = this.path.match(/.+:\\|\w+(?=\\)|(?<=\\).+[.].+/g);
    return components;
  }
  makeAbsoluteString(components) {
    const absoluteString = components.join("\\").replace("\\\\", "\\");
    return absoluteString;
  }
}

export default WINDOW;
