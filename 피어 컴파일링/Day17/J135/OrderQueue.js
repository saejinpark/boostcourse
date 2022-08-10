class OrderQueue {
  constructor() {
    this.queue = [];
  }
  pushItem(orderObj) {
    const { orderNumber, customer, orderedMenus } = orderObj;
    for (let menuOrder of orderedMenus) {
      const { menuNum, count } = menuOrder;
      for (let i = 0; i < count; i++) {
        this.queue.push({
          orderNumber,
          customer,
          menuNum,
        });
      }
    }
  }
}

export default OrderQueue;
