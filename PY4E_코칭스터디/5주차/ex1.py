import random
import re

FIND_NUM = re.compile('\d+')

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
           17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]


def bs31():
    while len(numbers) > 0:
        my = list(map(int, FIND_NUM.findall(input("숫자를 입력하세요"))))

        for num in my:
            if num in numbers:
                numbers.remove(num)
        print(numbers)

        computer_turn_num = random.randint(1, 3)
        numbers[(computer_turn_num-1):]


bs31()
