export class DashBoard {
    getStatus(chef){
        const wait = chef.cookList.length !== 0 ? chef.cookList.reduce((ac,v)=> [...ac,chef.menu[v].name],[]) : '없음!'
        const crr = chef.crrCook ? chef.crrCook.name : '없음!'
        const complete = chef.completeList.length !== 0 ? chef.completeList : '없음!'
        console.log(`================현재 주문상황================`)
        console.log(`대기 : ${wait}`)
        console.log(`조리 : ${crr}`)
        console.log(`완료 : ${complete}`)
        console.log(`=============================================`)

    }
}
