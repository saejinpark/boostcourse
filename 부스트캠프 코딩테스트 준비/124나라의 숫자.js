const solution = (n) => {
  const USE_NUMBERS = ["4", "1", "2"];

  const to123CountryNum = (transferNum, num) => {
    if (num === 0) return transferNum;
    return to123CountryNum(
      USE_NUMBERS[num % 3] + transferNum,
      parseInt((num - 1) / 3)
    );
  };

  let answer = to123CountryNum("", n);

  return answer;
};
