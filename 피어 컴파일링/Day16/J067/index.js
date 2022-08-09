const { subscriber } = require('./subscriber');
const { publisher } = require('./publisher');
const { EventManager } = require('./eventManager');
const { Worker, isMainThread } = require('worker_threads');
const Emitter = require('events');

async function main() {
    const subA = new subscriber('subA');
    const subB = new subscriber('subB');
    const subC = new subscriber('subC');
    const subD = new subscriber('subD');

    const eventManager = new EventManager();

    const albumModel = new publisher('albumModel');
    const albumView = new publisher('albumView');
    const albumController = new publisher('albumController');

    const print = function (sub, event, send, data) {
        let completedFlag = false;
        console.log(`endTime: ${Date.now()}`);
        console.log(`${sub}: ${event} event from ${send} userData = ${JSON.stringify(data)}`);
    }

    const emitterA = new Emitter();
    const emitterB = new Emitter();
    const emitterC = new Emitter();
    emitterA.on('event', (cb) => {
        console.log('startTime:', Date.now());
        console.log('emitterA 입니다.');
        cb;
    })
    emitterB.on('event', (cb) => {
        console.log('startTime:', Date.now());
        console.log('emitterB 입니다.');
        cb;
    })
    emitterC.on('event', (cb) => {
        console.log('startTime:', Date.now());
        console.log('emitterC 입니다.');
        cb;
    })

    eventManager.add(subA, 'modelDataChanged', albumModel, print, emitterA);
    eventManager.add(subB, '', albumView, print, emitterB);
    eventManager.add(subC, 'DidShakeMotion', albumController, print, emitterC);
    eventManager.add(subC, 'AllDataChanged', undefined, print, emitterC);
    eventManager.add(subD, '', undefined, print, emitterA);

    console.log(eventManager.stringify());
    albumModel.post('modelDataChanged', {'data': 1}, eventManager);
    console.log('---');
    // const worker1 = new Worker('./publisher.js');
    albumView.asyncPost('ViewUpdated', undefined, eventManager);
    console.log('---');
    albumController.asyncPost('DidShakeMotion', undefined, eventManager);
    console.log('---');
    new publisher().delayPost('AllDataChanged', undefined, eventManager);
    console.log('---');
    eventManager.remove(subD);
    new publisher().delayPost('AllDataChanged', undefined, eventManager);
    // eventManager.postEvent('modelDataChanged', albumModel, undefined);
    // console.log('---');
    // eventManager.postEvent('ViewUpdated', albumView, undefined);
    // await sleep(5000);
    // console.log('---');
    // eventManager.postEvent('DidShakeMotion', albumController, undefined);
    // console.log('---');
    // eventManager.postEvent('AllDataChanged', 'dummy', undefined);
    // console.log('---');
    // eventManager.remove(subD);
    // eventManager.postEvent('AllDataChanged', 'dummy', undefined);
}

main();

function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}