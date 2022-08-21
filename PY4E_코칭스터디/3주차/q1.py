def gugudan(number):
    print("%d 단" % number)
    for i in range(1, 9, 2):
        result = number * i
        if result <= 50:
            print("%d X %d = %d" % (number, i, result))
        else:
            break

number = int(input("몇 단? : "))

gugudan(number)