function getCachedMemory(memory, cacheMemory) {
  for (let i in memory) {
    if (["js", "css", "png", "gif", "jpg"].includes(memory[i][3])) {
      cacheMemory.push(memory[i]);
      //캐시가 100개 이상이면 FIFO
      if (cacheMemory.length > 100) cacheMemory.shift();
    }
  }
  return cacheMemory;
}

export default getCachedMemory;
