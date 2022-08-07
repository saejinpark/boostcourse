import re
import os

guest_book = {
    "김갑": "123456789",
    "이을": "010-1234-5678",
    "박병": "010-5678-111",
    "최정": "111-1111-1111",
    "정무": "010-3333-3333"
}

FIND_WORD_REG = re.compile("\d{3}-\d{4}-\d{4}")

for name in guest_book:
    if not os.path.exists("./guest_book"):
        os.makedirs("./guest_book")

    print("-"*30)
    print("이름:", name)
    print("번호:", guest_book[name])

    if FIND_WORD_REG.match(guest_book[name]):
        file = open(f"./guest_book/{name}.txt", "w")
        print("저장합니다.")
        file.write(guest_book[name])
    else:
        print("해당 번호는 올바르지 않습니다.")
