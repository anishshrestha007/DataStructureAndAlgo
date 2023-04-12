// Valid Anagram
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

var isAnagram = function (s, t) {
  let s1 = s.split("").sort().join("");
  let t1 = t.split("").sort().join("");
  return s1 == t1;
};
console.log(isAnagram("anagram", "nagaram"));

// Example 1:

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false
