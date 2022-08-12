const chalk = require('chalk');

function checkIn(camperId, group, camper, sessionNum, session, client) {
    let groupId;
    let message;
    let response;
    // 이미 체크인 한 캠퍼인지 확인
    if (camperId in camper) {
        groupId = camper[camperId][2];
        message = '이미 체크인했습니다.';
        console.log(chalk.red(`>>(failed) checkin ${camperId} from ${client.remoteAddress}:${client.remotePort} => Already exist`));
        obj = {
            'message' : message,
            'groupId' : groupId + 1
        };
        response = {
            'header' : `HTTP/1.1 200 OK`,
            'data' : obj
        }
    } else {
        let flag = 0;
        // 앞에서부터 그룹훑으면서 4명아닌 곳 있으면 바로 넣기
        for (let i = 0; i < group.length; i++ ){
            if (group[i].length !== 4) { 
                group[i].push(camperId);
                groupId = i;
                flag = 1;
            }
        }
        // 그룹이 4명으로 다 차있을 경우 새 그룹 생성
        if (flag === 0) {
            group.push([camperId]);
            groupId = group.length - 1;
        }
        camper[camperId] = [client, groupId];
        console.log(chalk.green(`>>(success) checkin ${camperId} from ${client.remoteAddress}:${client.remotePort} => session#${sessionNum}, group#${groupId + 1}`));
        message = '체크인되었습니다.';
        sessionNum += 1;
        session[client.remotePort] = [camperId, sessionNum];
        obj = {
            'message' : message,
            'groupId' : groupId + 1
        };
        response = {
            'header' : `HTTP/1.1 200 OK`,
            'data' : obj,
            'type' : 'checkin'
        }
    }

    return [sessionNum,response];
}

module.exports = {
    checkIn
}