function Menu(name, time) {
  this.name = name;
  this.time = time;
}

const menuArray = [
  new Menu("라면", 3),
  new Menu("떡볶이", 7),
  new Menu("닭볶음탕", 15),
  new Menu("갈비찜", 20),
];

export default menuArray;
