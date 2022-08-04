# I. 나만의 체크포인트

## 1. 실행 방법

1. `npm install` 실행 (dependency: Jest)

1. `node main` 실행

1. 시뮬레이션 결과가 콘솔 로그에 출력된다.

1. 같은 폴더에 `received.txt` 파일에 전송 내용이 저장된다.

## 2. 설계

![design](https://user-images.githubusercontent.com/89635107/182685428-273c13d6-6a2b-47d1-8209-25eb761c74b8.png)

각 레이어에 대해 클래스를 만들고,

메일을 보내는 `main`, 보내는 시뮬레이션을 하는 `Sender` 클래스, 받는 시뮬레이션을 하는 `Receiver` 클래스로 나누었다.

## 3. 네트워크 패킷 시뮬레이터: 전송 계층

- [x] 응용 계층 인코딩을 완성한다.

- [x] Base64 인코딩에 대해 알아본다.

- [x] 표현 계층 인코딩을 완성한다.

- [x] UUID Version 4에 대해 알아본다.

- [x] 세션 계층 인코딩을 완성한다.

- [x] 전송 계층 인코딩을 완성한다.

- [x] 네트워크 계층 인코딩을 완성한다.

- [x] 데이터링크 계층 인코딩을 완성한다.

- [x] 물리 계층 인코딩을 완성한다.

## 4. 네트워크 패킷 시뮬레이터: 수신 계층

- [x] 응용 계층 디코딩을 완성한다.

- [x] 표현 계층 디코딩을 완성한다.

- [x] 세션 계층 디코딩을 완성한다.

- [x] 전송 계층 디코딩을 완성한다.

- [x] 네트워크 계층 디코딩을 완성한다.

- [x] 데이터링크 계층 디코딩을 완성한다.

- [x] 물리 계층 디코딩을 완성한다.

이제 네트워크를 시뮬레이션 하기 위해 센더와 리시버를 만든다.

- [x] 센더를 만든다. 입력을 받으면 Application layer로부터 Physical layer까지의 모습을 보여준다.

- [x] 리시버를 만든다. 입력을 받으면 Physical layer로부터 Application layer까지의 모습을 보여준다.

출력 내용이 너무 길어서 캡쳐를 다 가져올 수는 없어 중간을 생략하였다.

TCP 세그먼트의 ACK와 SEQ 값을 중점으로 확인해보자.

![test-1](https://user-images.githubusercontent.com/89635107/182678248-94bccfaa-672a-426e-88bb-d4531799875e.png)

![test-2](https://user-images.githubusercontent.com/89635107/182678252-df5a8ece-e290-4f27-b1ce-d4f655acbacb.png)

(중간 생략)

![test-3](https://user-images.githubusercontent.com/89635107/182678254-d59f2c08-f32f-45ec-a32b-e52810bf29ff.png)

![test-4](https://user-images.githubusercontent.com/89635107/182678255-9bca565b-af0a-414c-b28e-11864c7491f7.png)

위와 같이 첨부 내용이 파일로 저장되었다.

# II. 학습 메모

## Base64 인코딩

영상에서 설명하는 것을 참고하였다

https://www.youtube.com/watch?v=aUdKd0IFl34

## Nodejs UUID v4 생성

`crypto.randomUUID()`로 생성한다. (랜덤하게 생성)

https://nodejs.org/api/crypto.html#cryptorandomuuidoptions

## Segment, Packet, Frame, Datagram

Segment: If the transport protocol is TCP, the unit of data sent from TCP to network layer is called Segment.

Datagram: This is used in 2 layers. If the network protocol is IP, the unit of data is called Datagram. At transport layer, if protocol is UDP, we use datagram there as well. Hence, we differentiate them as UDP Datagram, IP Datagram.

Frame: Physical layer representation.

Packet: It is a more generic term used either transport layer or network layer. TCP Packet, UDP Packet, IP Packet etc. I have not seen it to represent Physical layer data units.

정리하면 전송 계층인 TCP에서 segment, 데이터링크 계층에서 Datagram, 물리 계층에서 Frame, 전송 계층에서 Packet이라는 용어를 사용한다.

https://stackoverflow.com/a/11637061