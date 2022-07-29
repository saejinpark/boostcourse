import { Action } from "./action.js";

const main = async () => {
    const action = new Action();
    action.RoundRobin();
    // action.deadline();
    // action.priority([1, 3, 2]);
};

main();
