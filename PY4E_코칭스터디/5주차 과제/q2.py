from functools import reduce

s = [
    "김갑,3242524215",
    "이을,3242524223",
    "박병,2242554131",
    "최정,4245242315",
    "정무,3242524315"
]


# 정답지
a = [3, 2, 4, 2, 5, 2, 4, 3, 1, 2]


def grader(name_answer_list, correct_answer):

    # 이름과 답을 구분
    name_answer_list_list = list(
        map(lambda x: x.split(","), name_answer_list))

    # 이름과 답을 int 리스트로 바꾸어 줌
    name_int_answer_list_list = list(
        map(lambda x: [x[0], list(map(int, list(x[1])))], name_answer_list_list))

    # 이름과 답이 불린 값으로 체크된 리스트를 리턴
    name_checked_answer_list_list = list(map(lambda x: [x[0], list(
        [correct_answer[i] == x[1][i] for i in range(len(x[1]))])], name_int_answer_list_list))

    # 이름과 점수를 리턴
    name_score_list = list(map(lambda x: [x[0], reduce(
        lambda acc, cur: acc + 10 if cur else acc, x[1], 0)], name_checked_answer_list_list))

    # 등수로 정렬
    name_score_list_sorted_score = sorted(
        name_score_list, key=lambda x: x[1], reverse=True)

    # 출력
    for index, name_score in enumerate(name_score_list_sorted_score):
        print(
            f"이름: {name_score[0]} 점수: { name_score[1] } 등수: {index + 1}"
        )


grader(s, a)
