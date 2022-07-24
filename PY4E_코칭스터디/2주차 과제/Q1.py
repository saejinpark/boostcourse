import random

ROCK_SCISSORS_PARER = ["바위", "가위", "보"]
NUMS = [0, 1, 2]

def rcp(my):
    computer = ROCK_SCISSORS_PARER[random.randint(0, 2)]
    print(f"나: {my}")
    print(f"컴퓨터: {computer}")
    if my == "바위":
        if computer == "바위":
            print("비겼습니다!")
        elif computer == "가위":
            print("나 승리!")
        elif computer == "보":
            print("컴퓨터 승리!")
    elif my == "가위":
        if computer == "바위":
            print("컴퓨터 승리!")
        elif computer == "가위":
            print("비겼습니다!")
        elif computer == "보":
            print("나 승리!")
    elif my == "보":
        if computer == "바위":
            print("나 승리!")
        elif computer == "가위":
            print("컴퓨터 승리!")
        elif computer == "보":
            print("비겼습니다!")

my = input("가위 바위 보 : ")

if my.isdigit():
    my = int(my)

while my not in ROCK_SCISSORS_PARER and my not in NUMS:
    my = input("다시 입력하세요 : ")

if my in NUMS:
    my = ROCK_SCISSORS_PARER[my]

rcp(my)
