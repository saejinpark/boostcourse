import EventManager from "./EventManager.js";
import menuArray from "./Menu.js";

class Chef {
  constructor() {
    this.status = 0; // idle
  }
  async cook(obj) {
    this.status = 1;
    const { orderNumber, customer, menuNum } = obj;
    const { name, time } = menuArray[menuNum - 1];
    const eventManager = new EventManager();

    const displayName = `${customer}${orderNumber}${name}`;

    eventManager.postEvent({ type: "start", content: displayName });

    await this.onProgress(eventManager, displayName, time);

    eventManager.postEvent({ type: "end", content: displayName });
    this.status = 0;
  }
  async onProgress(eventManager, displayName, time) {
    await new Promise((resolve, reject) => {
      let i = 0;
      const timer = setInterval(() => {
        i++;
        eventManager.postEvent({
          type: "progress",
          content: `:${displayName}(${i})`,
        });
        if (i >= time) {
          resolve();
          clearInterval(timer);
        }
      }, 1000);
    });
  }
}

export default Chef;
