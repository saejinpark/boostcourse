def find_even_number(n, m):
    numbers = [i for i in range(n, m+1)]
    mid = (n + m)/2
    for number in numbers:
        if number % 2 == 0:
            print("%d 짝수" % number)
            if mid == number:
                print("%d 중앙값" % mid)

n = int(input("첫 번째 수 입력 : "))
m = int(input("두 번째 수 입력 : "))
find_even_number(n, m)