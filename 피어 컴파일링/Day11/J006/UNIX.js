class UNIX {
  constructor(path) {
    this.path = path;
  }
  makeComponents() {
    const components = this.path.match(/(?<=\/).+?(?=\/)|(?<=\/).+[.].+/g);
    components.unshift("/");
    return components;
  }
  makeAbsoluteString(components) {
    const absoluteString = components.join("/").slice(1);
    return absoluteString;
  }
}

export default UNIX;
