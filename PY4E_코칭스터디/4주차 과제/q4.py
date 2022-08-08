def check_id(id):
    if len(id) != 14:
        print("잘못된 번호입니다.")
        print("올바른 번호를 넣어주세요")
        return
    before, after = id.split("-")
    if len(before) != 6:
        print("잘못된 번호입니다.")
        print("올바른 번호를 넣어주세요")
        return
    if len(after) != 7:
        print("잘못된 번호입니다.")
        print("올바른 번호를 넣어주세요")
        return
    
    birth_year = id[:2]
    birth_month = id[2:4]
    if 0 <= int(birth_year) <= 21:
        birth_year_check = input("2000년 이후 출생자 입니까? 맞으면 o 아니면 x :")
        if birth_year_check == "x":
            print("잘못된 번호입니다.")
            print("올바른 번호를 넣어주세요")
        elif after[0] not in ["3", "4"]:
            print("잘못된 번호입니다.")
            print("올바른 번호를 넣어주세요")
        elif after[0] == "3":
            print(f"{birth_year}년{birth_month}월 남자")
        elif after[0] == "4":
            print(f"{birth_year}년{birth_month}월 여자")
    else:
        if after[0] not in ["1", "2"]:
            print("잘못된 번호입니다.")
            print("올바른 번호를 넣어주세요")
        elif after[0] == "1":
            print(f"{birth_year}년{birth_month}월 남자")
        elif after[0] == "2":
            print(f"{birth_year}년{birth_month}월 여자")
    
# a = "500629-2222222"
# check_id(a)

# a = "000629-2222222"
# check_id(a)

a = "000629-1222222"
check_id(a)