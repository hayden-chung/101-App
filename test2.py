dict = {'task1': [3], 'task2': [6], 'task3': [9], 'task4': [4], 'task5': [12]}
target = 13
def find_closest_subset_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    print('before', dp)

    for num in nums:
        for i in range(target, num[0] - 1, -1): # 17, (12-1=)11, -1
            dp[i] = dp[i] or dp[i - num[0]] # if dp[i] or dp[i -num] is True, set to True. else, set to false
    print('after', dp)



    closest_sum = 0
    for i in range(target, -1, -1): # find the closest number to the target. 
        if dp[i]:
            closest_sum = i
            break

    return closest_sum

# Example usage

values = dict.values()
closest_sum = find_closest_subset_sum(values, target)
print("Closest sum:", closest_sum)

print(f'keys {values}')