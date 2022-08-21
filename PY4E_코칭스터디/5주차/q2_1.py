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
    name_score_list = []
    for name_answer in name_answer_list:
        name, answers = name_answer.split(",")
        score = 0
        for i in range(len(answers)):
            if int(answers[i]) == correct_answer[i]:
                score += 10

        name_score_list.append([name, score])

    name_score_list.sort(key=lambda x: x[1], reverse=True)

    for idx, name_score in enumerate(name_score_list):
        print(f"이름: {name_score[0]} 점수: {name_score[1]} 등수: {idx+1}")


grader(s, a)
