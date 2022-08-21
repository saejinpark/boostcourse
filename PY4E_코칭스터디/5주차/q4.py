DAY = ["일", "월", "화", "수", "목", "금", "토"]
MONTH_DATE_LIST = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


def after(month, date, day, val):
    while val > 1:
        val, date = val - 1, date + 1
        if date > MONTH_DATE_LIST[month - 1]:
            date, month = 1, month + 1
            month = 1 if month == 13 else month

        day = DAY[(DAY.index(day) + 1) % len(DAY)]

    print(f"{month}월 {date}일 {day}요일")


def after_100(month, date, day):
    after(month, date, day, 100)

after_100(6, 21, "월")
