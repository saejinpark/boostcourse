SCORE_BOUNDARY_GRADE = {
    95: "A+",
    90: "A",
    85: "B+",
    80: "B",
    75: "C+",
    70: "C",
    65: "D+",
    60: "D"
}


def grade_result(score):
    for boundary in SCORE_BOUNDARY_GRADE.keys():
        if score >= boundary:
            return SCORE_BOUNDARY_GRADE[boundary]
    return "F"


def grader(name, score):
    print("학생이름 : " + str(name))
    print("점수 : " + str(score))
    print("학점 : " + grade_result(score))


grader("이호창", 99)
grader("동동일", 45)
grader("동동이", 55)
grader("권민우", 59)
