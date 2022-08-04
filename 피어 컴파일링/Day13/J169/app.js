const Computer = require("./Computer");

async function run(){
    const C1 = new Computer('client', 10001, 3);
    const C2 = new Computer('server', 8080, 7);

    C1.send(C2);
    
    // const SYN = C1.Tx.transportationLayer(8080,7)->C1.Tx.networkLayer->C1.dataLinkLayer()->C1.physicalLayer()
    // //Tx.transportaion(8080,7)을 호출하면 8080,7로 데이터 전송 시도, 하지만 연결이 closed 면 establishConnection을 호출해 syn 패킷을 만들고 리턴.
    // //C1.Tx make SYN packet (this.state == 'closed'이면 SYN 만들고나서 C1.state='SYN-SENT', seqNum 업데이트)
    // const SYN_ACK = C2.Rx.transportationLayer(SYN); 
    // //C2.RX.transport(recieve syn packet) -> C2.Tx make SYN-ACK packet  (C2.Rx.transport(syn)할 때 this.state=='closed'이면 받은 syn의 seq+1로 ack 만들어 make syn-ack SYN 리턴 C1.state='SYN-RECEIVED', seqNum 업데이트
    // const ACK = C1.Rx.transportationLayer(SYN_ACK); 
    // //C1.Rx.transport(receive syn_ack packet) ->C1.Tx(make ACK packet) (SYN-SENT에서 받은 SYN+ACK의 ack가 C1.seqNum+1이면 state='established')
    // //문제점 C1.Rx.transport()에서 받은 syn_ack packet의 seqNum를 C1.Tx.Transport에 넘겨줘야하는데 어떻게 넘겨주는가(새로 만드는 ack의 ackNum=syn_ack seqNum+1)

    // //C1.Rx.transport()를 하면 안되고 C1.receive()를 해서 그 안에서 C1.Rx.transport()하면 받은 seqNum과 ackNum, 그리고 state를 C1.Tx.transport에 업데이트 시켜줘야함.

    // //C1.Tx는 Syn,ACK, 그리고 DATA를 계속 보내야함. 
    // //C2.Tx는 SYN-ACK와 ACK를 계속 보내야함.

    // //Tx.transport는 
    // //Rx.transport로 Syn을 받으면 
    // const dataSegments = C1.Tx.transportationLayer()->...->C1.Tx.physicalLayer();
    // for(let segment of dataSegments){
    //     C2.Rx.physicalLayer()->C2.Rx.transportationLayer() 들어있는 data를 this.data에 모아놓음.
    // }


}

// const C1 = new Computer();
// C1.Tx.init();

run();