const chalk = require('chalk');

function peersession(maxCount, hostId, groupId, groupMember, camper, peer) {
    groupMember.reduce((prev, cur) => {
        const client = camper[cur][0];
        const response = {
            'header' : `HTTP/1.1 200 OK`,
            'data' : {"message": "message from server, 피어세션이 시작되었습니다."}
        }
        client.write(JSON.stringify(response));
    }, '');
    peer[groupId] = [hostId, maxCount, 0];
    console.log(chalk.green(`>>(success) message to group#${groupId + 1} => "피어세션이 시작되었습니다", from="server"`));
}

module.exports = {
    peersession
}