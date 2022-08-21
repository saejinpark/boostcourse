from rcp import *

def rsp_advanced(games):
    my_draw = 0
    my_win = 0
    my_lose = 0

    computer_draw = 0
    computer_win = 0
    computer_lose = 0

    for i in range(1, games+1):
        my = rock_scissors_paper_check(input("가위 바위 보 : "))
        result = rcp(my)
        if result == 0:
            my_draw += 1
            computer_draw += 1
            print("%d 번째 판 무승부!\n" % i)
        elif result == 1:
            my_win += 1
            computer_lose += 1
            print("%d 번째 판 나의 승리!\n" % i)
        elif result == 2:
            my_lose += 1
            computer_win += 1
            print("%d 번째 판 나의 패배!\n" % i)
    print("나의 전적: %d승 %d무 %d패" % (my_win, my_draw, my_lose))
    print("컴퓨터의 전적: %d승 %d무 %d패" %
          (computer_win, computer_draw, computer_lose))


games = int(input("몇 판을 진행하시겠습니까? : "))

rsp_advanced(games)
