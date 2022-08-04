import { Address } from "./address.js";
import { FakeCpu } from "./fakeCpu.js";

const addressList = [
    new Address("192.168.1.2", "CC:46:D6:A0:41:BB"),
    new Address("192.168.1.3", "3C:5A:B4:00:11:CD"),
    new Address("192.168.1.4", "CC:46:D6:B1:F9:CC"),
    new Address("192.168.1.5", "3C:5A:B4:93:01:4B"),
    new Address("192.168.1.6", "3C:5A:B4:11:7B:B0"),
    new Address("192.168.1.7", "CC:46:D6:B0:CC:EF"),
    new Address("192.168.1.8", "CC:46:D6:A4:3F:F0"),
    new Address("192.168.1.9", "3C:5A:B4:6F:EA:DC"),
    new Address("192.168.1.10 ", "3C:5A:B4:08:A4:5B"),
];

const fakeCpuList = addressList.map((address) => new FakeCpu(address));

const fakeCpuMacMap = new Map(
    addressList.map((address, index) => [address.getMac(), fakeCpuList[index]])
);

const fakeCpuIpMap = new Map(
    addressList.map((address, index) => [address.getIp(), fakeCpuList[index]])
);


