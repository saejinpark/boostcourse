import Client from "./client.js";
import Settings from "./settings.js";

const c = new Client(Settings.HOST, Settings.PORT);
await c.run();
