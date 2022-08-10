function MenuOrder(menuNum, count) {
  this.menuNum = menuNum;
  this.count = count;
}

class Order {
  constructor(orderNumber, customer) {
    this.orderNumber = orderNumber;
    this.customer = customer;
    this.orderedMenus = [];
  }
  pushMenus(menuOrderObj) {
    this.orderedMenus.push(menuOrderObj);
  }
}

export { MenuOrder, Order };
