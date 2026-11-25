// Sliding window technique

// 3. Longest Substring Without Repeating Characters

// Given a string s, find the length of the longest substring without repeating characters.

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

const lengthOfLongestSubstring = function (s) {
  if (s !== null && s.length === 0) return 0;
  const set = new Set();
  let max = 0,
    i = 0,
    j = 0;
  while (i < s.length) {
    let char = s.charAt(i);
    while (set.has(char)) {
      set.delete(s.charAt(j));
      j++;
    }

    set.add(char);
    max = Math.max(max, i - j + 1);
    i++;
  }
  return max;
};

console.log(lengthOfLongestSubstring("pwwkew"));
