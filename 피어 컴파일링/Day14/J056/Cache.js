import { CODE_FILE_TYPE, IMAGE_FILE_TYPE } from './constants.js';
import { formatBytes, makeBytes } from './util.js';
class Cache {
  constructor(url) {
    this.url = url;
    this.data = {
      도메인개수: 0,
      요청개수: 0,
      이미지개수: 0,
      코드개수: 0,
      전송용량: 0,
      리다이렉트개수: 0,
      전체로딩시간: 0,
      가장큰용량: ['', ''],
      가장오랜대기시간: ['', 0],
      가장오랜다운로드시간: ['', 0],
    };
    this.domainArr = [];
    this.wholePathArr = [];
    this.isUpdate = false;
  }

  update({ 도메인, 스킴, 종류, 용량, 경로, 대기시간, 다운로드시간 }) {
    this.updateDomainCnt(도메인);
    this.updateRequestCnt();
    this.updateFileTypeCnt(종류);
    this.updateSendCapacity(용량);
    this.updateBiggestCapacity(용량, 경로);
    this.updateRedirectCnt(도메인, 경로);
    this.updateLoadingTime(대기시간, 다운로드시간);
    this.updateLongestWaitingTime(대기시간, 경로);
    this.updateLongestDownloadTime(다운로드시간, 경로);
    this.isUpdate = true;
  }

  updateDomainCnt(domain) {
    if (!this.domainArr.includes(domain)) {
      this.data.도메인개수++;
      this.domainArr.push(domain);
    }
  }

  updateRequestCnt() {
    this.data.요청개수++;
  }

  updateFileTypeCnt(fileType) {
    if (IMAGE_FILE_TYPE[fileType]) this.data.이미지개수++;
    else if (CODE_FILE_TYPE[fileType]) this.data.코드개수++;
  }

  updateSendCapacity(capacity) {
    this.data.전송용량 = formatBytes(makeBytes(this.data.전송용량) + makeBytes(capacity));
  }

  updateBiggestCapacity(capacity, path) {
    if (this.data.가장큰용량[1] < makeBytes(capacity)) {
      this.data.가장큰용량[0] = path;
      this.data.가장큰용량[1] = capacity;
    }
  }

  updateRedirectCnt(domain, path) {
    if (this.wholePathArr.includes(domain + '/' + path)) {
      this.data.리다이렉트개수++;
    } else {
      this.wholePathArr.push(domain + '/' + path);
    }
  }

  updateLoadingTime(waitingTime, downloadTime) {
    this.data.전체로딩시간 += waitingTime + downloadTime;
  }

  updateLongestWaitingTime(waitingTime, path) {
    if (this.data.가장오랜대기시간[1] < Number(waitingTime)) {
      this.data.가장오랜대기시간[0] = path;
      this.data.가장오랜대기시간[1] = waitingTime;
    }
  }

  updateLongestDownloadTime(downloadTime, path) {
    if (this.data.가장오랜다운로드시간[1] < Number(downloadTime)) {
      this.data.가장오랜다운로드시간[0] = path;
      this.data.가장오랜다운로드시간[1] = downloadTime;
    }
  }
}

export default Cache;
