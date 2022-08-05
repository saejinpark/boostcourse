# I. 나만의 체크포인트

## 1. 실행 방법

1. `npm install` (dependency: Jest, cheerio)

1. `node main` 으로 실행한다.

1. 주소를 입력한다. (예: `www.naver.com`)

1. 캐시 파기 시간 내에 같은 주소를 입력하면 캐시된 리소스를 확인할 수 있다.

  파기 시간을 바꾸려면 `main.js` 파일 상단에 있는 아래 변수를 수정한다.

  ```javascript
  Browser.CACHE_TIME = 5000; // milliseconds (default: 5000)
  ```

(리다이렉션은 구현하지 못했기 때문에 응답 코드가 `200 OK`인 사이트만 가능하다.)

## 2. 설계

![design](https://user-images.githubusercontent.com/89635107/182932371-41a3f3e3-4767-43bb-ab3e-4c470f449776.png)

- `main.js`에서 주소를 입력하면, `browser.js`에서 https 요청을 보내고, 받은 HTML 파싱한다.

  파싱했으면 리소스 주소를 얻고 다시 https 요청을 보낸다.

  https 요청에 응답이 왔을 때마다 로그 이벤트를 발생시켜 `main.js`에서 로그가 기록되게 한다.

- 캐시 구현

  파기 시간이 설정되어 있다고 가정하였다.

  여기서는 일괄적으로 5초 이후 파기된다고 가정하고 시뮬레이션을 하였다.

## 3. HTTP 헤더 시각화도구: HTTP 분석기

- [x] HTTP 요청을 보내는 기능 작성

- [x] 요청 시간과 다운로드 시간 측정하는 기능 작성

- [x] 처음에 받은 HTML 파싱하는 기능 작성

- [x] 스타일 시트와 자바스크립트, 이미지에 대해 요청을 보내는 기능 작성

- [x] 캐싱 기능 작성

처음 `www.daum.net`을 입력하면 아래와 같이 출력한다.

![no-cache](https://user-images.githubusercontent.com/89635107/182927493-60eb3616-c175-4391-9021-f24d482db52c.png)

이후 캐시된 데이터를 갖고 오면 아래와 같이 출력한다.

![cache](https://user-images.githubusercontent.com/89635107/182927481-90a35a83-62c2-4290-a839-51f6d36b1a2d.png)

캐시 덕분에 총 로딩 시간이 `437` 밀리초에서 `184` 밀리초로 줄어든 것을 확인할 수 있다.

## 4. 아쉬운 점

- Transfer 크기를 못 구한 점 (실제 크기보다 작았다.)

- 캐시를 좀더 구체적으로 구현하지 못한 점 (http 응답 헤더의 캐시 정책)

- 리다이렉션은 구현하지 못한 점

# II. 학습 메모

## Node.js GET request

https://nodejs.dev/learn/making-http-requests-with-nodejs

## promisify http.request 

https://stackoverflow.com/a/38543075

## http.request 이벤트 순서

In a successful request, the following events will be emitted in the following order:

- `socket`

- `response`

    - `data` any number of times, on the res object ('data' will not be emitted at all if the response body is empty, for instance, in most redirects)

    - `end` on the res object

- `close`

https://nodejs.dev/learn/making-http-requests-with-nodejs

## Jest: 비동기 함수 테스트

Promise를 쓸 때:

```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

await를 쓸 때:

```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```

https://jestjs.io/docs/asynchronous

## Troubleshooting: `Error: getaddrinfo ENOTFOUND`

Another common source of error for

```
Error: getaddrinfo ENOTFOUND
```

is writing the protocol (https, https, ...) when setting the host property in options

host에 `https` 등을 적어서 생기는 문제이다.

문제 코드 예시:

```javascript
const options = {
  // ...
  hostname: "https://foo.com/", // <- cause of error
  port: 443,
  path: "/",
  method: "GET"
};
```

https://stackoverflow.com/a/28385129

## readline sync 처럼 쓰기

```javascript
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

(async () => {
    const name = await prompt('Whats your Name: ');
    // ...
})();

//when done reading prompt exit program 
rl.on('close', () => process.exit(0))
```

https://stackoverflow.com/a/68504470

## Event emitter 튜토리얼

기본적인 사용 방법 튜토리얼

https://www.youtube.com/watch?v=l20MBBFZAmA