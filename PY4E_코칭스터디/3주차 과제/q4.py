def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num**(1/2))+1):
        if num % i == 0:
            return False
    return True

def count_prime_number(n, m):
    count = 0
    numbers = [i for i in range(n, m+1)]
    for number in numbers:
        if is_prime(number):
            count += 1
    print("소수개수 %d" % count)


n = int(input("첫 번째 수 입력 : "))
m = int(input("두 번째 수 입력 : "))
count_prime_number(n, m)
