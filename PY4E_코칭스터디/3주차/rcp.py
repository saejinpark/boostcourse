import random

ROCK_SCISSORS_PARER = ["가위", "바위", "보"]
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


def rcp(my):
    computer = ROCK_SCISSORS_PARER[random.randint(0, 2)]
    print(f"나: {my}")
    print(f"컴퓨터: {computer}")
    return ROCK_SCISSORS_PARER_DICT[my][computer]


def rock_scissors_paper_check(my):
    if my.isdigit():
        my = int(my)
        if my in [0, 1, 2]:
            my = ROCK_SCISSORS_PARER[my]
    while my not in ROCK_SCISSORS_PARER:
        my = rock_scissors_paper_check(input("다시 입력하세요 : "))
    return my