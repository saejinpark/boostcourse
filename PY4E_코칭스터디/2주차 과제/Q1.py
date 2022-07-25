import random

ROCK_SCISSORS_PARER = ["바위", "가위", "보"]
ROCK_SCISSORS_PARER_INDEX = [0, 1, 2]
RESULT = ["비겼습니다!", "나 승리!", "컴퓨터 승리!"]
ROCK_SCISSORS_PARER_DICT = {
    "바위": {
        "바위": 0,
        "가위": 1,
        "보": 2
    },
    "가위": {
        "바위": 2,
        "가위": 0,
        "보": 1,
    },
    "보": {
        "바위": 1,
        "가위": 2,
        "보": 0,
    }
}

def translate_rock_scissors_paper(my):
    if my.isdigit():
        my = int(my)
        if my in ROCK_SCISSORS_PARER_INDEX:
            my = ROCK_SCISSORS_PARER[my]
    while my not in ROCK_SCISSORS_PARER and my not in ROCK_SCISSORS_PARER_INDEX:
        my = translate_rock_scissors_paper(input("다시 입력하세요 : "))
    return my


def rcp(my):
    computer = ROCK_SCISSORS_PARER[random.randint(0, 2)]
    print(f"나: {my}")
    print(f"컴퓨터: {computer}")
    print(RESULT[ROCK_SCISSORS_PARER_DICT[my][computer]])


my = translate_rock_scissors_paper(input("가위 바위 보 : "))


rcp(my)
