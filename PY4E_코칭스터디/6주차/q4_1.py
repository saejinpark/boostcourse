# 6명의 회원이고 "아이디,나이,전화번호,성별,지역,구매횟수" 순서로 입력되어 있음
str_infos = "abc,21세,010-1234-5678,남자,서울,5,cdb,25세,x,남자,서울,4,bbc,30세,010-2222-3333,여자,서울,3,ccb,29세,x,여자,경기,9,dab,26세,x,남자,인천,8,aab,23세,010-3333-1111,여자,경기,10"


def info_to_str(info):
    print(">>아이디:", info["id"])
    print(">>나이:", info["age"])
    print(">>전화번호:", info["phone"])
    print(">>성별:", info["gender"])
    print(">>지역:", info["local"])
    print(">>구매횟수:", info["purchases"])
    print("-"*30)


def good_customer(str_infos):

    devide_str_infos = str_infos.split(",")
    infos = []

    for base_line in range(int(len(devide_str_infos)/6)):
        start = base_line * 6
        end = start + 6
        info_limit = devide_str_infos[start:end]
        info = {
            "id": info_limit[0],
            "age": info_limit[1],
            "phone": info_limit[2] if info_limit[2] != "x" else "000-0000-0000",
            "gender": info_limit[3],
            "local": info_limit[4],
            "purchases": int(info_limit[5])
        }

        infos.append(info)

    for info in infos:
        print("\n💽처리된 회원정보\n")
        info_to_str(info)

    for info in infos:
        if info["purchases"] >= 8 and info["phone"] != "000-0000-0000":
            print("\n🎟 할인 쿠폰을 받을 회원정보\n")
            info_to_str(info)


good_customer(str_infos)
