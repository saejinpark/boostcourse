const net = require('net');
const chalk = require('chalk');
const { checkIn } = require('./checkIn');
const { mission } = require('./mission');
const { direct } = require('./direct');
const { peersession } = require('./peersession');
const { message } = require('./message');
const { complete } = require('./complete');
const { checkout } = require('./checkOut');

const group = [];
const camper = {};
const session = {}
const peer = {};
let sessionNum = 1;

class Server {
    connect(port) {
        const server = net.createServer((client) => {
            client.setEncoding('utf8');
            client.on('data', (req) => {
                const request = JSON.parse(req);

                let obj;
                let response;

                const path = request.header.match(/\/[a-zA-Z]+/g)[0];
                if (path === '/checkin') {
                    const camperId = request.data.camperId;
                    if (1 <= Number(camperId.slice(1,)) && Number(camperId.slice(1,)) <= 384) {
                        const res = checkIn(camperId, group, camper, sessionNum, session, client);
                        sessionNum = res[0];
                        response = res[1];
                    } else {
                        obj = {'error' : '캠퍼 아이디를 다시 입력해주세요.'}
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : obj
                        }
                        console.log(chalk.red(`>>(failed) checkin => Not valid CamperId`));
                    }
                    client.write(JSON.stringify(response));
                } else if (path === '/mission') {
                    const missionNum = request.data.day;
                    // 미션 날짜가 아닌 경우
                    if (missionNum === 0 || missionNum > 20) {
                        obj = {'error' : '날짜를 다시 입력해주세요.'}
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : obj
                        }
                        console.log(chalk.red(`>>(failed) mission => Not valid Date`));
                    } else {
                        obj = {'keyword' : mission[missionNum]}
                        response = {
                            'header' : `HTTP/1.1 200 OK`,
                            'data' : obj
                        }
                        console.log(chalk.green(`>>(success) mission from session#${session[client.remotePort][1]}(${session[client.remotePort][0]}) : day${String(missionNum)} => ${mission[missionNum]}`));
                    }
                    client.write(JSON.stringify(response));
                } else if (path === '/direct') {
                    const toCamperId = request.data.to;
                    const text = request.data.text;
                    const fromCamperId = session[client.remotePort][0];
                    if (toCamperId in camper) {
                        const toClient = camper[toCamperId][0];
                        response = direct(toCamperId, text, fromCamperId, toClient);
                        console.log(chalk.green(`>>(success) direct from session#${session[client.remotePort][1]}(${fromCamperId}) => to="${toCamperId}", text=${text}`));
                        console.log(chalk.green(`>>(success) message to session#${session[toClient.remotePort][1]}(${toCamperId}) => text=${text}`));
                    } else {
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : {'error' : '수신자가 아직 체크인하지 않았습니다.'}
                        }
                        console.log(chalk.red(`>>(failed) direct from session#${session[client.remotePort][1]}(${fromCamperId}) => receiver not exist`));
                    }
                    client.write(JSON.stringify(response));
                } else if (path === '/peersession') {
                    const maxCount = request.data.maxCount;
                    const hostId = session[client.remotePort][0];
                    const groupId = camper[hostId][1];
                    const groupMember = group[groupId];
                    if (!(groupId in peer)) {
                        peersession(maxCount, hostId, groupId, groupMember, camper, peer);
                    } else {
                        console.log(chalk.red(`>>(failed) peersession from session#${session[client.remotePort][1]}(${hostId}) => Already in progress`));
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : {'error' : '이미 진행된 피어세션입니다.'}
                        }
                        client.write(JSON.stringify(response));
                    }
                } else if (path === '/message') {
                    const text = request.data.text;
                    const clientId = session[client.remotePort][0];
                    const sessionId = session[client.remotePort][1];
                    const groupId = camper[clientId][1];
                    if (groupId in peer) {
                        const groupMember = group[groupId];
                        peer[groupId][2] += 1;
                        if (peer[groupId][1] < peer[groupId][2]) {
                            console.log(chalk.red(`>>(failed) message from session#${sessionId}(${clientId}) => Max count Over`));
                            response = {
                                'header' : `HTTP/1.1 400 Bad Request`,
                                'message' : {'error' : '최대 메세지 개수를 초과했습니다.'}
                            }
                            client.write(JSON.stringify(response));
                        } else {
                            message(clientId, text, camper, groupMember, groupId, sessionId);

                        }
                    }
                } else if (path === '/complete') {
                    const clientId = session[client.remotePort][0];
                    const sessionId = session[client.remotePort][1];
                    const groupId = camper[clientId][1];
                    // 요청한 캠퍼와 다를 경우
                    if (peer[groupId][0] !== clientId) {
                        console.log(chalk.red(`>>(failed) complete from session#${sessionId}(${clientId}) => Not a host`));
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : {'error' : 'host만 종료할 수 있습니다.'}
                        }
                        client.write(JSON.stringify(response));
                    } else {
                        const groupMember = group[groupId];
                        delete peer[groupId];
                        complete(groupMember, camper);
                        console.log(chalk.green(`>>(success) complete from session#${sessionId}(${clientId})`));
                        console.log(chalk.green(`>>(success) message to group#${groupId + 1} => "피어세션이 종료되었습니다", from="server"`));
                    }
                } else if (path === '/checkout') {
                    const clientId = session[client.remotePort][0];
                    const sessionId = session[client.remotePort][1];
                    const groupId = camper[clientId][1];
                    if (!(clientId in camper)) {
                        console.log(chalk.red(`>>(failed) checkout from session#${sessionId}(${clientId})`));
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : {'error' : 'Checkin이 안된 ID입니다.'}
                        }
                        client.write(JSON.stringify(response));
                    } else if (groupId in peer) {
                        console.log(chalk.red(`>>(failed) checkout from session#${sessionId}(${clientId}) => Peersession in progress`));
                        response = {
                            'header' : `HTTP/1.1 400 Bad Request`,
                            'message' : {'error' : '피어세션이 진행중입니다. 종료 후 체크아웃해주세요.'}
                        }
                        client.write(JSON.stringify(response));
                    } else {
                        const groupMember = group[groupId];
                        checkout(clientId, groupId, groupMember, peer, sessionId, camper);
                        delete session[client.remotePort];
                        delete group[groupId][group[groupId].indexOf(clientId)];
                        group[groupId] = group[groupId].filter(Boolean);
                        delete camper[clientId];
                    }
                } 
            });
            
            client.on('end', () => {
                if (client.remotePort in session) {
                    const clientId = session[client.remotePort][0];
                    const sessionId = session[client.remotePort][1];
                    const groupId = camper[clientId][1];
                    const groupMember = group[groupId];
                    checkout(clientId, groupId, groupMember, peer, sessionId, camper);
                    delete session[client.remotePort];
                    delete group[groupId][group[groupId].indexOf(clientId)];
                    group[groupId] = group[groupId].filter(Boolean);
                    delete camper[clientId];
                }
                console.log(chalk.cyan('End Connetion :', client.remoteAddress, client.remotePort));
            });
            
            client.on('error', (err) => {
                console.log('Socket Error: ', JSON.stringify(err));
            });
            
            client.on('timeout', () => {
                console.log('Socket Timed out');
            });
        
        });
         
        server.listen(port, () => {
            console.log('TCP Server listening on : ' + JSON.stringify(server.address()));
            server.on('close', () => {
                console.log('Server Terminated');
            });
            server.on('error', (err) => {
                console.log('Server Error: ', JSON.stringify(err));
            });
        });
    }
}

const server = new Server().connect(2022);