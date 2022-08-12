import { IpInfo, Group } from "./objects.js";

const handleCheckIn = (parameters) => {
  const { packet, client, clientAddress, clientPool, camperPool, groups } =
    parameters;

  const campId = packet.msg;
  const number = Number(campId.slice(1));

  if (!/[Jj][\d]{1,3}/g.test(campId)) {
    return;
  }

  if (!(1 <= number && number <= 384)) {
    client.write(
      `[Server] 캠퍼ID의 범위는 J001~J384 입니다. (CheckIn Failure)`
    );
    console.log(`[CheckIn] Fail: ${campId}(${clientAddress})`);
    return;
  }

  if (campId in camperPool) {
    client.write(`[Server] 이미 체크인 하셨습니다.`);
    console.log(`[CheckIn] Aready Checked In: ${campId}(${clientAddress})`);
    return;
  }

  const groupNumber = findGroup(groups);
  groups[groupNumber].members.push(campId);

  clientPool[clientAddress] = new IpInfo({
    socket: client,
    campId,
    groupNumber,
  });
  camperPool[campId] = clientAddress;

  const {
    [groupNumber]: { members },
  } = groups;

  client.write("checkin");
  console.log(
    `[CheckIn] ${campId}(${clientAddress}) Group#${groupNumber}(${members.length}/4)`
  );

  for (let memberId of members) {
    const memberAddress = camperPool[memberId];
    const {
      [memberAddress]: { socket },
    } = clientPool;
    socket.write(
      `[Server] ${campId} 님이 Group#${groupNumber}(${members.length}/4)에 입장하셨습니다.`
    );
  }
};

const findGroup = (groups) => {
  const groupNumbers = Object.keys(groups).sort();
  for (let number of groupNumbers) {
    if (groups[number].members.length < 4) {
      return number;
    }
  }
  for (let i = 1; i < 100; i++) {
    if (!groupNumbers.includes(i)) {
      groups[i] = new Group();
      return i;
    }
  }
};

export default handleCheckIn;
