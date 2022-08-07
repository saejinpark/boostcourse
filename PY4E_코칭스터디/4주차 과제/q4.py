import re

RESIDENT_REGISTRATION_NUMBER = [

    "500629-2222222",
    "000629-2222222",
    "000629-2222222",
    "000629-1222222"
]

RESIDENT_REGISTRATION_NUMBER_CHECK = re.compile("\d{6}-\d{7}")

for number in RESIDENT_REGISTRATION_NUMBER:
    if RESIDENT_REGISTRATION_NUMBER_CHECK.match(number):
        birth_yy_mm_dd, security_number = number.split("-")
        birth_yy = birth_yy_mm_dd[0:3]
        birth_mm = birth_yy_mm_dd[3:5]
        birth_dd = birth_yy_mm_dd[5:7]
        print(birth_yy_mm_dd, security_number)

        print(f"생년월일: {birth_yy}년, {birth_mm}월, {birth_dd}일")
        print(f"성별: {'남자' if security_number[0] in ['1', '3'] else '여자'}")
