import re

a = '"""안녕하세요.반갑습니다. 파이썬 공부는 정말 재밌습니다."""'

FIND_WORD_REG = re.compile("습니다")

print(len(FIND_WORD_REG.findall(a)))
