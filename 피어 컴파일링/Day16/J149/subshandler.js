import {parentPort, workerData, isMainThread, getEnvironmentData} from "worker_threads";
import EventManager from "./eventmanager.js";

if(!isMainThread) {
    const subscribers = getEnvironmentData('subs');
    //console.log(subscribers);
    const e = workerData;
    
    subscribers.map(el => {
        let fStr = el[3];
        fStr = fStr.replace("'@subscriber'", "'" + el[0].name + "'");
        //console.log(fStr);
        
        const f = (new Function('', 'return ' + fStr))(e);
        
        if((el[1] === (e.eventName ?? '') || el[1] === '') && (el[2] === (e.sender?? undefined) || !el[2])) {
            f(e);
            return;
        }
    })
    
}

/*

import {parentPort, workerData, isMainThread, getEnvironmentData} from "worker_threads";

async function broadcast() {
    console.log("broadcast start");
    const subscribers = getEnvironmentData('subs');
    //console.log(subscribers);
    const e = workerData;
    
    subscribers.map(el => {
        let fStr = el[3];
        fStr = fStr.replace("'@subscriber'", "'" + el[0].name + "'");
        //console.log(fStr);
        
        const f = (new Function('', 'return ' + fStr))(e);
        
        if((el[1] === (e.eventName ?? '') || el[1] === '') && (el[2] === (e.sender?? undefined) || !el[2])) {
            const flag = el[4];
            console.log("flag");
            if(flag == 0) {
                f(e);
                return;
            }
            if(flag == 1) {
                return await handleListener(flag, () => f(e));
            }
        }
    })
}

async function handleListener(flag, listenerFunction) {
    console.log("dddddd")
    let completed = false;
    if(flag == 1) {
        return new Promise((resolve) => {
            listenerFunction();
            completed = true;
            resolve(completed);
        })
    }
    if(flag > 2) {
        await wait(flag);
        return new Promise((resolve) => {
            listenerFunction();
            completed = true;
            resolve(completed);
        })
    }
    completed = true;
    return completed;
}

function wait(ms) { return new Promise ((r) => setTimeout(r, ms)) }

console.log("ddddddddddddddddd");
if(!isMainThread) broadcast();
*/