export class Address {
    constructor(ip, mac) {
        ((ip, mac) => {
            this.getIp = () => {
                return ip;
            };
            this.getMac = () => {
                return mac;
            };
        }).call(this, ip, mac);
    }
}
