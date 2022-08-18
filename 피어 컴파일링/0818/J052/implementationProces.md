# 1️⃣ 전송 계층

## Application layer
1. 입력 받는 것을 구현한다.
    - 입력 모듈 작성
    - From
    - to
    - title
    - attachment File
** 첨부파일에 대한 해석
Title 뒤에 받는 것을 첨부파일 내용이라 해석
첨부파일 이름은 이후 수신계층에서 attachment로 통일

## Presentation Layer
1. BASE64 인코딩 구현
    - BASE64 인코딩 공부
    - BASE64 인코딩 순서
        - 문자열 개수를 3으로 나누어 뒤에 = 가 몇개 들어갈지 저장한다.
        - 문자열을 하나하나 순회한다.
            - 문자 1개 -> 아스키코드
            - 아스키코드 -> 8비트 이진수
            - 8비트 이진수를 받을 때마다 합친다.
        - 위의 합친 이진수를 6개씩 끊어서 배열에 저장한다.
        - 마지막에 남은 문자열이 6개보다 작으면 부족한 만큼 패딩 0을 붙여준다.
        - Base64 table 을 Map 자료구조로 만든다.
        - 인코딩 결과를 저장할 빈 문자열을 생성한다.
        - 6개씩 끊은 배열을 돌면서 Map을 보고 인코딩 문자열에 하나하나 추가한다.
2. 첨부파일 부분을 BASE64 로 인코딩한다.
    - data `\r\n` 으로 split
    - 마지막 부분 저장
    - 해당 부분 인코딩
    - data에서 마지막 부분 길이 만큼 뺀 값 substring
    - 해당 substring에 인코딩된 값 더하고 반환

## Session Layer
1. UUID Version4 규격 생성 규칙 학습
2. UUID 추가
    - `\r\n` 으로 spilt 배열 생성
    - 해당 배열과 uuid 를 이용해 emailSessionData 생성
    - emailSessionData 반환

## Network Layer
1. 나의 IP를 알아낸다.
2. 수신용 IP를 고정한다.
3. 빈 배열을 생성한다.
4. 나의 IP, 수신용 IP, 받은 data를 푸쉬한다.
5. 위의 3가지 정보를 출력한다.
6. 배열을 반환한다.

## Data Link Layer
### 전송 계층
1. Mac Address Table을 만든다.
2. 받은 데이터 배열의 0,1 인덱스에 맞는 Value 값을 저장한다.
3. 빈 배열을 생성한다.
4. 송신측 MAC, 수신측 MAC, packet을 배열에 저장한다.
5. 위의 3가지 정보를 출력한다.
6. 배열을 반환한다.

### 수신 계층
1. 프레임을 받는다.
2. index 1이 도착 MAC 주소
3. 해당 주소가 destination MAC이 아니라면 무시
4. index 2가 packet
5. packet 반환

## Physical Layer
1. Frame을 바이트 단위로 변경한다.
    - Frame 을 문자열로 저장한다.
    - 저장한 문자열을 바이트로 변경한다.
2. 바이트 단위로 변경한 것으로 16진수 문자열을 생성한다.
       
## Transport Layer
1. send(data, sender)
    **데이터를 받아 3계층 -> 2계층 -> 1계층을 거친 데이터를 반환하는 함수**
    - 데이터를 받는다 +
    - 3 계층을 구현한다. +
    - 2 계층을 구현한다. +
    - 1 계층을 구현한다. +

2. receive(data, receiver)
    **send(data) 로부터 반환된 데이터를 받아 1계층 -> 2계층 -> 3계층을 거친 데이터를 반환하는 함수**
    - Rx 1계층 구현 +
    - Rx 2계층 구현 +
    - Rx 3계층 구현 +

3. 3-way Handshake 구현
    1) 송신부가 `SYN` 을 보낸다.
        - 패킷을 작성한다.
            - Source포트 : 10000
            - Destination Port : 220 고정
            - sequence number : 23
            - Ack Number : undefined
            - Content-Length : 0
        - 위의 정보를 배열로 만든다.
        - transport data
    2) 수신부가 패킷을 받았음을 출력한다.
    3) 수신부가 SYN+ACK 패킷을 보낸다.
        - 패킷을 작성한다. 
            - Source포트 : 받은 패킷의 dest Port
            - Destination Port : 받은 패킷의 source Port
            - Sequence Num : 121
            - Ack Num : 받은 패킷의 sequence Num + 1
            - Content-Length : 0
        - 위의 정보를 배열로 만든다.
        - transport data
    4) 송신부가 패킷을 받았음을 출력한다.
    5) 송신부가 ACK 패킷을 보낸다.
        - 패킷을 작성한다.
            - Source포트 : 받은 패킷의 dest Port
            - Destination Port : 받은 패킷의 source Port
            - Sequence Num : 받은 패킷의 Ack Num
            - Ack Num : 받은 패킷의 sequence Num + 1
            - Content-Length : 0
        - 위의 정보로 배열을 만든다.
        - transport data
    6) 수신부가 패킷을 받았음을 출력한다.
    7) 송신부가 DATA 패킷을 보낸다. (100 씩 끊어서) 
        - 패킷을 작성한다.
            - Source포트 : 받은 패킷의 dest Port
            - Destination Port : 받은 패킷의 source Port
            - Sequence Num : 받은 패킷의 Ack Num
            - Segmentation : True or false (남은부분인 100이하면 false)
            - Ack Num : 받은 패킷의 sequence Num + 1
            - Content-Length : 0
            - Content
        - 위의 정보로 배열을 만든다.
        - transport data
    8) 수신부가 패킷을 받았음을 출력한다.
        - 수신부 데이터를 받을 빈 문자열 생성한다.
        - 패킷을 받을 때마다 패킷의 데이터를 빈 문자열에 더한다.
    9) 수신부가 ACK 패킷을 보낸다.
        - 패킷을 작성한다.
            - Source포트 : 받은 패킷의 dest Port
            - Destination Port : 받은 패킷의 source Port
            - Sequence Num : 받은 패킷의 Ack Num
            - Ack Num : 받은 패킷의 sequence Num + 1
            - Content-Length : 0
    10) 송신부가 패킷을 받았음을 출력한다.
    11) 7) ~ 10) 과정을 받은 데이터를 모두 보낼때까지 반복한다.