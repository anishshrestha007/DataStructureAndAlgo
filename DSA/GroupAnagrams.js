// Group Anagrams

// Given an array of strings strs, group the anagrams together. You can return the answer in any order.
// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

var groupAnagrams = function (strs) {
  if (!strs.length) return [];
  let obj = {};

  for (let i = 0; i < strs.length; i++) {
    const sortS = strs[i].split("").sort().join("");
    if (obj[sortS]) {
      obj[sortS].push(strs[i]);
    } else {
      obj[sortS] = [strs[i]];
    }
  }

  let returnObj = [];

  for (const key in obj) {
    returnObj.push(obj[key]);
  }

  return returnObj;
};

// Example 1:

// Input: strs = ["eat","tea","tan","ate","nat","bat"]
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Example 2:

// Input: strs = [""]
// Output: [[""]]
// Example 3:

// Input: strs = ["a"]
// Output: [["a"]]
