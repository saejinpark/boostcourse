export class Chef {
    constructor(){
        this.cookMenu = null
        this.cookList = [];
        this.crrCook = null;
        this.completeList = [];
        this.menu = {
            1 : {
                name: '라면',
                time: 3
            },
            2 : {
                name: '떡볶이',
                time: 7
            },
            3 : {
                name: '닭볶음탕',
                time: 15
            },
            4 : {
                name: '갈비찜',
                time: 20 
            }
        }
        
    }

    getEvent(eventLooper){
        this.cookMenu = eventLooper.crrEvent;
        eventLooper.crrEvent = null;
    }

    setCookList(){
        const menu = this.cookMenu[0];
        const num = this.cookMenu[1];
        this.cookMenu = null;
        for(let i=0;i < num; i++){
            this.cookList.push(menu)
        }
    }

    setCrrCook(){
        if(this.cookList.length === 0){
            this.crrCook = null
            console.log(`더 이상 주문이 없습니다.`)
        }
        else{
            const num = this.cookList.shift();
            const crrMenu = this.menu[num];
            const name = crrMenu.name;
            const time = crrMenu.time - 1;
            this.crrCook = {
                name: name,
                time: time
            };
        }
    }

    cook(){
        if(this.crrCook === null){
            console.log(`> 주문할사람~~`)
            return false
        }
        else{
            if(this.crrCook.time === 0){
                console.log('> 조리 완료!!')
                this.completeList.push(this.crrCook.name)
                this.setCrrCook()
            }else if(this.crrCook !== 0){
                this.crrCook.time -= 1
                console.log(`> ${this.crrCook.name} 조리중... ${this.crrCook.time+1}분 남음`)
            }
        }
    }
    
}