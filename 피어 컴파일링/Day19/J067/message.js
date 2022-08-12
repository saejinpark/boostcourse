const chalk = require('chalk');

function message(clientId, text, camper, groupMember, groupId, sessionId) {
    groupMember.reduce((prev, cur) => {
        if (cur !== clientId) {
            const client = camper[cur][0];
            const response = {
                'header' : `HTTP/1.1 200 OK`,
                'data' : {"message": `message from ${clientId}, ${text}`}
            }
            client.write(JSON.stringify(response));
        }
    }, '');

    console.log(chalk.green(`>>(success) message from session#${sessionId} => ${text}`));
    console.log(chalk.green(`>>(success) message to group#${groupId + 1} => ${text}, from="${clientId}"`));
}

module.exports = {
    message
}