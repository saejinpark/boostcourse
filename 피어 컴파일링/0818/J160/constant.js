const STATE = Object.freeze({
  'CLOSED'      : 'CLOSED',
  'SYN_SENT'    : 'SYN_SENT',
  'ESTABLISHED' : 'ESTABLISHED',
  'LISTEN'      : 'LISTEN',
  'SYN_RCV'     : 'SYN_RCV',
});


const SIGN = Object.freeze({
  'SYN'     : 'SYN',
  'SYN+ACK' : 'SYN+ACK',
  'ACK'     : 'ACK',
  'DATA'    : 'DATA'
});


const IP_TO_MAC = Object.freeze({
  '192.168.1.2' : 'CC:46:D6:A0:41:BB',
  '192.168.1.3' : '3C:5A:B4:00:11:CD',
  '192.168.1.4' : 'CC:46:D6:B1:F9:CC',
  '192.168.1.5' : '3C:5A:B4:93:01:4B',
  '192.168.1.6' : '3C:5A:B4:11:7B:B0',
  '192.168.1.7' : 'CC:46:D6:B0:CC:EF',
  '192.168.1.8' : 'CC:46:D6:A4:3F:F0',
  '192.168.1.9' : '3C:5A:B4:6F:EA:DC',
  '192.168.1.10' : '3C:5A:B4:08:A4:5B',
});


module.exports = { STATE, SIGN, IP_TO_MAC };