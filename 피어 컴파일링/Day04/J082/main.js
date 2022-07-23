import { Memory } from "./memory.js";
import { Scenario } from "./scenario.js";

const main = () => {
    const memory = new Memory();
    const scenario = new Scenario(memory);
    scenario.one();
};

main();
