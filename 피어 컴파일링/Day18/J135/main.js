import { getCmd } from "./io.js";
import dbmsCommands from "./commands.js";

while (true) {
  const cmd = await getCmd();
  dbmsCommands.run(cmd);
  await new Promise((r) => setTimeout(() => r(), 1000));
}

// CREATE TABLE billboard (singer String, year Numeric, song String)
// INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2020, "Dynamite")
// INSERT INTO billboard (singer, year, song) VALUES ("BTS", 2021, "Butter")
// DELETE FROM billboard WHERE id = 1
// UPDATE billboard SET song = "Butter" WHERE id = 1
// SELECT FROM billboard WHERE singer="BTS"
// DROP TABLE billboard

// REPORT TABLE billboard
// IMPORT FROM y2021song TO billboard
