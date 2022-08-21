UNDER_BUS_AGE_BOUNDARY_FARE = {
    8:{"카드":0, "현금":0},
    14:{"카드":450, "현금":450},
    20:{"카드":720, "현금":1000},
}
MORE_THAN_BUS_AGE_BOUNDARY_FARE = {
    75:{"카드":0, "현금":0},
    20:{"카드":1200, "현금":1300},
}

def bus_fare(age, payment_type):
    print(f"나이: {age}세")
    print("지불유형: " + payment_type)
    fare = ""
    if age < 20:
        for boundary in UNDER_BUS_AGE_BOUNDARY_FARE.keys():
            if age < boundary:
                fare = str(UNDER_BUS_AGE_BOUNDARY_FARE[boundary][payment_type])
                break
    else:
        for boundary in MORE_THAN_BUS_AGE_BOUNDARY_FARE.keys():
            if age >= boundary:
                fare = str(MORE_THAN_BUS_AGE_BOUNDARY_FARE[boundary][payment_type])
                break
    print(f"버스요금: {fare}원")

for i in range(1, 100):
    bus_fare(i, "카드")
    bus_fare(i, "현금")
    print("---------------------------")