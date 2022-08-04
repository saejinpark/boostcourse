import input from './input.js';
import OSI from './OSI.js';

const app = async () => {
  //7계층 메일 입력받아서 6계층에 넘김
  const MAIL = await input();
  const MYOSI = new OSI(MAIL);
  MYOSI.present();
  //6계층에서 가공한 데이터 5계층으로
  MYOSI.session();
  //5계층에서 세션값을 붙인 데이터를 4계층에서 tcp 통신
  MYOSI.transport(10001, 8080);
  //4계층에서 수신 후에 OSI class에 IP정보를 추가한다.
  //   MYOSI.network('192.168.1.5', '192.168.1.9');
  //3계층에서 만든 ip를 포함한 헤더에 MACgpejfmf 추가한다.
  //   MYOSI.dataLink();
  //dataLink에서 만든 정보들이 포함된 헤더를 16진수 문자열로 내보낸다.
  //   const HEX = MYOSI.physical();
};

app();
