n = ["갑돌이", "갑순이", "을돌이", "을순이", "병돌이", "병순이"]
r = [
    [4, 5, 3, 5, 6, 5, 3, 4, 1, 3, 4, 5],
    [2, 3, 4, 3, 1, 2, 0, 3, 2, 5, 7, 2],
    [1, 3, 0, 3, 3, 4, 5, 6, 7, 2, 2, 1],
    [3, 2, 9, 2, 3, 5, 6, 6, 4, 6, 9, 9],
    [8, 7, 7, 5, 6, 7, 5, 8, 8, 6, 10, 9],
    [7, 8, 4, 9, 5, 10, 3, 3, 2, 2, 1, 3]
]


def sales_management(member_names, member_records):
    name_avg_dic = {
        member_names[i]: sum(member_records[i]) / len(member_records[i]) for i in range(len(member_names))
    }

    asc_list = sorted(name_avg_dic.items(), key=lambda x: x[1], reverse=True)

    for (name, avg) in asc_list[:2]:
        if avg >= 5:
            print(f"보너스 대상자: {name}")
    print()
    for (name, avg) in asc_list[4:]:
        if avg < 3:
            print(f"면담 대상자: {name}")


sales_management(member_names, member_records)
