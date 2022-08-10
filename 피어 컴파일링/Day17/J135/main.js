import Chef from "./Chef.js";
import DashBoard from "./DashBoard.js";
import EventLooper from "./EventLooper.js";
import EventManager from "./EventManager.js";
import Manager from "./Manager.js";
import OrderQueue from "./OrderQueue.js";
import Pos from "./Pos.js";

const pos = new Pos();
const orderQueue = new OrderQueue();
const eventLooper = new EventLooper(pos, orderQueue);

const chef = new Chef();
const manager = new Manager(chef);
const dashboard = new DashBoard(orderQueue);

const eventManager = new EventManager(dashboard);

await pos.init();
pos.showMenu();
pos.receiveOrder();

eventLooper.run();
manager.run(orderQueue);
