export class EventLooper {
    constructor(){
        this.crrEvent = null;
    }
    // 매니저의 주문을 받아오기
    getEvent(manager){
        this.crrEvent = manager.crrOrder;
        manager.crrOrder = null;
    }
    sendEvent(){
        return 1
    }
}