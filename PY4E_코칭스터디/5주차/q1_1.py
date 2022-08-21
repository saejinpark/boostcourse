from random import randint


def bs31():
    print("🍧"*31)
    print("배스킨 라빈스 써리원 게임")
    print("🍧"*31)

    my_turn = False
    base_line = 1
    while base_line <= 31:
        my_turn = False if my_turn else True
        try:
            if my_turn:
                my = list(map(int, input("\nMy turn - 숫자를 입력하세요: ").split()))
                if base_line + len(my) - 1 > 31 or len(my) > 3:
                    raise IndexError
                for i in range(len(my)):
                    if base_line + i != my[i]:
                        raise LookupError
                base_line = my[-1]

                print("현재숫자 :", base_line)

                base_line += 1

            else:
                computer = randint(1, 3)
                for i in range(computer):
                    print("컴퓨터 :", base_line)
                    base_line += 1
                    if base_line > 31:
                        break
        except:
            my_turn = False if my_turn else True
            print("잘못된 입력입니다. 다시 입력해주세요.!")
            continue

    if my_turn:
        print("\n컴퓨터 승리!")
    else:
        print("\n내 승리!")


bs31()
