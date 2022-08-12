import { getInput } from "./io.js";
import { Packet } from "./objects.js";
import TYPE from "./type.js";

const regexArray = [
  new RegExp("checkin\\s[\\w]+", "g"), // checkin
  new RegExp("checkout", "g"), // checkout
  new RegExp("mission\\s[Dd]ay\\s?[\\d]{1,2}", "g"), // mission
  new RegExp("peersession\\smaxCount\\s?\\=\\s?[\\d]+", "g"), // peersession
  new RegExp("complete", "g"), // complete
  new RegExp('message\\,?\\s\\"(.+)\\"', "g"), // message
  new RegExp('direct\\sto\\s[\\w]+\\,?\\s\\"(.+)\\"', "g"), // direct
];

const createPacket = async () => {
  const input = await getInput();

  for (let idx = 0; idx < regexArray.length; idx++) {
    if (regexArray[idx].test(input)) {
      switch (idx) {
        case 0: // checkin
          return new Packet({
            type: TYPE.In,
            receiver: "server",
            msg: input.replace(/checkin\s/g, ""), //campId,
          });

        case 1: // checkout
          return new Packet({
            type: TYPE.Out,
            receiver: "server",
            msg: "",
          });

        case 2: // mission
          return new Packet({
            type: TYPE.Mission,
            receiver: "server",
            msg: input
              .replace(/mission\s|\s/g, "")
              .toLowerCase()
              .padStart(2, "0"), // day00
          });

        case 3: // peersession
          return new Packet({
            type: TYPE.Peer,
            receiver: "server",
            msg: input.replace(/peersession\smaxCount\s?\=\s?/g, ""), // maxCount
          });

        case 4: // complete
          return new Packet({
            type: TYPE.Complete,
            receiver: "server",
            msg: "",
          });

        case 5: // message
          return new Packet({
            type: TYPE.Msg,
            receiver: "server",
            msg: input.replace(/message\s/g, ""), // message
          });

        case 6: // direct
          return new Packet({
            type: TYPE.Direct,
            receiver: input.replace(/direct\sto\s|\,.*/g, ""), // target
            msg: input.replace(/.*\s(?=\")/g, ""), // message
          });
      }
    }
  }

  return null;
};

export default createPacket;
