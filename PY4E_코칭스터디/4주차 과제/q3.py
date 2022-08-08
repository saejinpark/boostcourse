import re
import os

guest_book = {
    "김갑": "123456789",
    "이을": "010-1234-5678",
    "박병": "010-5678-111",
    "최정": "111-1111-1111",
    "정무": "010-3333-3333"
}


def wrong_guest_book(name, number):
    CHECK_EXACT_NUMBER = re.compile("010-\d{4}-\d{4}")
    print("-"*30)
    print("이름:", name)
    print("번호:", guest_book[name])
    if CHECK_EXACT_NUMBER.match(guest_book[name]):
        if not os.path.exists("./guest_book"):
            os.makedirs("./guest_book")
        file = open(f"./guest_book/{name}.txt", "w")
        file.write(number)
        print("저장합니다.")
    else:
        print("해당 번호는 올바르지 않습니다.")


for name in guest_book:
    wrong_guest_book(name, guest_book[name])
