# 이름, 실적
member_names = ["갑돌이", "갑순이", "을돌이", "을순이", "병돌이", "병순이"]
member_performance_records = [
    [4, 5, 3, 5, 6, 5, 3, 4, 1, 3, 4, 5],
    [2, 3, 4, 3, 1, 2, 0, 3, 2, 5, 7, 2],
    [1, 3, 0, 3, 3, 4, 5, 6, 7, 2, 2, 1],
    [3, 2, 9, 2, 3, 5, 6, 6, 4, 6, 9, 9],
    [8, 7, 7, 5, 6, 7, 5, 8, 8, 6, 10, 9],
    [7, 8, 4, 9, 5, 10, 3, 3, 2, 2, 1, 3]
]


def sales_management(member_names, member_performance_records):

    member_name_perfor_avg_list = []

    for i in range(len(member_names)):
        performance_record = member_performance_records[i]
        performance_avg = sum(performance_record) / len(performance_record)

        member_name_perfor_avg_list.append([member_names[i], performance_avg])

    member_name_perfor_avg_list.sort(key=lambda x: x[1], reverse=True)

    for i in range(2):
        member_name_perfor_avg = member_name_perfor_avg_list[i]
        name = member_name_perfor_avg[0]
        perfor_avg = member_name_perfor_avg[1]
        if perfor_avg > 5:
            print("보너스 대상자" + name)

    for i in range(4, 6):
        member_name_perfor_avg = member_name_perfor_avg_list[i]
        name = member_name_perfor_avg[0]
        perfor_avg = member_name_perfor_avg[1]
        if 3 >= perfor_avg:
            print("면담 대상자 " + name)


sales_management(member_names, member_performance_records)
