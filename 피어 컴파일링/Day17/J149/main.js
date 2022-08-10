import POS from "./pos.js";
import Manager from "./manager.js";
import Dashboard from "./dashboard.js";

const p = new POS();
const m = new Manager();
const board = new Dashboard();
p.run();