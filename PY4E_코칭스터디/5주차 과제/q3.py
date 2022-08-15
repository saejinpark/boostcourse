from random import randint

MIN_MID_MAX = ["최소값", "중간값", "최댓값"]

def guess_numbers():
    answer = []
    nums = []
    
    while len(nums) < 3:
        num = randint(1, 100)
        if num not in nums:
            nums.append(num)

    nums.sort()
    print(nums)

    num_dict = {}
    for i in range(1, 101):
        num_dict[i] = True

    cnt = 0
    while len(answer) != len(nums):
        cnt += 1
        print(f"\n{cnt}차 시도")
        try:
            test_case = int(input("\n숫자를 입력해주세요. :"))
            if not num_dict[test_case]:
                print("이미 예즉에 사용한 숫자 입니다.")
                continue
            num_dict[test_case] = False
            if test_case in nums:
                idx = nums.index(test_case)
                print(f"숫자를 맞추셨습니다! {test_case}는 {MIN_MID_MAX[idx]}입니다.")
                cnt -= 1
                answer.append(test_case)
            else:
                if cnt > 5:
                    idx = -1
                    up = True
                    min_distance = abs(nums[0] - test_case)
                    mid_distance = abs(nums[1] - test_case)
                    max_distance = abs(nums[2] - test_case)

                    if min_distance <= mid_distance and min_distance <= max_distance:
                        idx = 0
                        up = nums[0] > test_case
                    elif mid_distance <= max_distance:
                        idx = 1
                        up = nums[1] > test_case
                    else:
                        idx = 2
                        up = nums[2] > test_case

                    print(
                        f"{MIN_MID_MAX[idx]}은 {test_case} 보다 {'큽니다.' if up else '작습니다.'}")
        except:
            print("잘못된 입력입니다.")
            continue

    print("\n게임종료")
    print(f"\n{cnt}번 시도만에 예측성공!")

guess_numbers()
