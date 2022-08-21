import re

def make_comma(num):
    
    NUM_TEST = re.compile("^\d+$")
    
    while not NUM_TEST.match(num):
        num = input("다시 입력하세요.")

    reverse_num = num[::-1]

    NUM_DIVID = re.compile("\d{1,3}")

    divided_reverse_num = NUM_DIVID.findall(reverse_num)

    divided_num = list(map(lambda x: x[::-1], divided_reverse_num[::-1]))

    print(','.join(divided_num))


num = input("숫자를 입력하세요.")

make_comma(num)
