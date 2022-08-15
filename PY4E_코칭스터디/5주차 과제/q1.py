from random import randint

def bs31():
    print("🍧"*31)
    print("배스킨 라빈스 써리원 게임")
    print("🍧"*31)

    def _bs31(base_line=1):

        try:
            my = list(map(int, input("\nMy turn - 숫자를 입력하세요: ").split()))

            if base_line + len(my) - 1 > 31 or len(my) > 3:
                raise IndexError

            for i in range(len(my)):
                if base_line + i != my[i]:
                    raise LookupError

            base_line = my[-1]

            print("현재숫자 :", base_line)

            if base_line == 31:
                return False

            base_line += 1
            
            computer = randint(1, 3)

            for i in range(computer):
                print("컴퓨터 :", base_line)

                base_line += 1

                if base_line > 31:
                    return True

            if base_line <= 31:
                _bs31(base_line)

        except:
            
            print("잘못된 입력입니다. 다시 입력해주세요.!")
            
            _bs31(base_line)

    if _bs31():
        print("\n내 승리!")
        
    else:
        print("\n컴퓨터 승리!")


bs31()
