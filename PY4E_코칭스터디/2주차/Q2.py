SALARY_BOUNDARY_AMOUNT = {
    1200: 6,
    4600: 15,
    8800: 24,
    15000: 35,
    30000: 38,
    50000: 40
}


def rate(yearly_payment, amount):
    print(f"세후 연봉: {int(yearly_payment * (1 - amount/100))}만원")


def yearly_payment_calculator(monthly_payment):
    yearly_payment = monthly_payment * 12
    print(f"세전 연봉: {yearly_payment}만원")
    over_500_million = True
    for boundary in SALARY_BOUNDARY_AMOUNT.keys():
        if yearly_payment <= boundary:
            rate(yearly_payment, SALARY_BOUNDARY_AMOUNT[boundary])
            over_500_million = False
            break
    if over_500_million:
        rate(yearly_payment, 42)


monthly_payment = 0
while True:
    try:
        monthly_payment = int(input("월급을 입력하세요. (단위: 만원) : "))
        if monthly_payment < 0:
            continue
        break
    except:
        pass

yearly_payment_calculator(monthly_payment)
