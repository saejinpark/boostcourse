function Element(process, priority) {
  this.process = process;
  this.priority = priority;
}

function PriorityQueue() {
  this.array = [];
}

// 객체 데이터 반환
PriorityQueue.prototype.getBuffer = function () {
  return this.array.map((element) => element.process);
};

// 데이터 존재 여부 확인
PriorityQueue.prototype.isEmpty = function () {
  return this.array.length === 0;
};

// 데이터 추가
PriorityQueue.prototype.enqueue = function (data, priority) {
  let element = new Element(data, priority);
  let added = false;

  for (let i = 0; i < this.array.length; i++) {
    if (element.priority < this.array[i].priority) {
      this.array.splice(i, 0, element);
      added = true;
    }

    if (!added) {
      this.array.push(element);
    }
  }

  return this.array.length;
};

// 데이터 삭제
PriorityQueue.prototype.dequeue = function () {
  return this.array.shift();
};

// 가장 우선순위가 낮은 데이터 반환
PriorityQueue.prototype.front = function () {
  return this.array.length === 0 ? undefined : this.array[0].process;
};

// 데이터 크기 반환
PriorityQueue.prototype.size = function () {
  return this.array.length;
};

// 데이터 크기 초기화
PriorityQueue.prototype.clear = function () {
  this.array = [];
};

module.exports = PriorityQueue;
