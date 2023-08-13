dict = {'task1': [2], 'task2': [1.5], 'task3': [0.5], 'task4': [1]}

def find_closest_subset_sum(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for i in range(target, num[0] - 1, -1): # 17, (12-1=)11, -1
            dp[i] = dp[i] or dp[i - num[0]] # if dp[i] or dp[i -num] is True, set to True. else, set to false
        print(f'dp: {dp}, dp[i]: {dp[i]}, dp[i - num]: {dp[i-num[0]]}')
 
    closest_sum = 0
    for i in range(target, -1, -1): # find the closest number to the target. 
        print(i, 'h')
        if dp[i]:
            closest_sum = i
            break

    return closest_sum

# Example usage
nums = [6, 4, 1]
target = 17
values = dict.values()
closest_sum = find_closest_subset_sum(nums, target)
print("Closest sum:", closest_sum)

print(f'keys {values}')