export class FakeCpu {
    constructor(address) {
        this.address = address;
        this.rx = new Rx(this);
    }
    getAddress() {
        return this.address;
    }
}
