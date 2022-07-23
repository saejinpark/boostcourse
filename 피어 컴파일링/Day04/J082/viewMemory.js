export class ViewMemory {
    constructor(memory) {
        this.memory = memory;
    }

    show(data) {
        const { command } = data;
        switch (command) {
            case "init":
                {
                    const { stackSize, heapSize } = data;
                    console.log(
                        "init--------------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(
                        `stackSize : ${stackSize}, heapSize : ${heapSize}`
                    );
                    console.log();
                    this.view();
                }
                break;
            case "setSize":
                {
                    const { type, length } = data;
                    console.log(
                        "setSize-----------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(`type: ${type}, length : ${length}`);
                    console.log();
                    console.log(this.memory.getTypeMap());
                    console.log();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "malloc":
                {
                    const { type, count } = data;
                    console.log(
                        "malloc------------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(`type : ${type}, count : ${count}`);
                    console.log();
                    this.view();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "free":
                {
                    const { pointer } = data;
                    console.log(
                        "free--------------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(`pointer : ${pointer}`);
                    console.log();
                    this.view();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "call":
                {
                    const { name, paramCount } = data;
                    console.log(
                        "call--------------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(`name : ${name} , paramCount : ${paramCount}`);
                    console.log();
                    this.view();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "returnFrom":
                {
                    const { name } = data;
                    console.log(
                        "returnFrom--------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(`name : ${name}`);
                    console.log();
                    this.view();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "usage":
                {
                    const {
                        stackMemory,
                        usingStackMemory,
                        remainStackMemory,
                        heapMemory,
                        usingHeapMemory,
                        remainHeapMemory,
                    } = data;
                    console.log(
                        "usage-------------------------------------------------------------------------------------------"
                    );
                    console.log(
                        `
        스택 영역 전체크기 : ${stackMemory},
             사용중인 용량 : ${usingStackMemory}, 
                 남은 용량 : ${remainStackMemory},
    ==============================================
          힙 영역 전체크기 : ${heapMemory}, 
             사용중인 용량 : ${usingHeapMemory},
                 남은 용량 : ${remainHeapMemory}
`
                    );
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "callstack":
                {
                    const { calls } = data;
                    console.log(
                        "callstack---------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(`[\n ${calls.join(" ")} \n]`);
                    console.log();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "heapdump":
                {
                    const { heapStatusArr } = data;
                    console.log(
                        "heapdump----------------------------------------------------------------------------------------"
                    );
                    heapStatusArr.forEach((heapStatus) => {
                        const { type, length, stackPointerArr } = heapStatus;
                        console.log(
                            `
    타입: ${type}
    크기: ${length}
    해당 주소를 참조하는 스택 포인터 변수 정보
    : ${stackPointerArr.join(", ")}
                `
                        );

                        console.log(
                            "    ============================================================================================"
                        );
                    });
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;

            case "garbageCollect":
                {
                    console.log(
                        "garbageCollect----------------------------------------------------------------------------------"
                    );
                    this.view();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "reset":
                {
                    console.log(
                        "reset-------------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log(this.memory);
                    console.log();
                    this.view();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            case "error":
                {
                    const { info } = data;
                    console.log(
                        "error-------------------------------------------------------------------------------------------"
                    );
                    console.log();
                    console.log("               error : " + info);
                    console.log();
                    console.log(
                        "end---------------------------------------------------------------------------------------------"
                    );
                }
                break;
            default:
                break;
        }
    }
    view() {
        console.log(
            "view--------------------------------------------------------------------------------------------"
        );
        console.log();
        console.log(
            "============================================[stack]============================================="
        );
        const viewData = this.memory.getViewData();
        if (viewData.length === 0) {
            console.log("메모리가 비었습니다.");
        } else {
            let text = "";
            viewData.forEach((element, index) => {
                text += element;
                if ((index + 1) % 4 === 0) {
                    console.log(text);
                    text = "";
                }
            });
            console.log(text);
        }
        console.log(
            "============================================[heap ]============================================="
        );
        console.log();
    }
}
