import re

def count_word(sentence, word):
    # print(a.count(word))
    FIND_WORD_REG = re.compile(word)
    print(len(FIND_WORD_REG.findall(sentence)))

sentence = '"""안녕하세요.반갑습니다. 파이썬 공부는 정말 재밌습니다."""'

count_word(sentence, "습니다")