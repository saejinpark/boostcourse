export const PacketType = {
  SYN: 'SYN',
  ACK: 'ACK',
  SYNACK: 'SYN+ACK',
  DATA: 'DATA',
};

export const ConveyPacketType = {
  Revieved: '>> Recieved Packet: ',
  Sending: '>> Sending Packet: ',
};

export const addressTable = {
  '192.168.1.2': 'CC:46:D6:A0:41:BB',
  '192.168.1.3': '3C:5A:B4:00:11:CD',
  '192.168.1.4': 'CC:46:D6:B1:F9:CC',
  '192.168.1.5': 'CC:46:D6:B1:F9:CC',
  '192.168.1.6': '3C:5A:B4:11:7B:B0',
  '192.168.1.7': 'CC:46:D6:B0:CC:EF',
  '192.168.1.8': 'CC:46:D6:A4:3F:F0',
  '192.168.1.9': '3C:5A:B4:6F:EA:DC',
  '192.168.1.10 ': '3C:5A:B4:08:A4:5B',
};

export const IP = {
  sourceIP: '192.168.1.5',
  destIP: '192.168.1.9',
};
