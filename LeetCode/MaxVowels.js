var maxVowels = function (s, k) {
  debugger;
  let maxVowels = 0;
  let vowels = ["a", "e", "i", "o", "u"];
  let i = 0,
    j = k;
  let previous = 0,
    previousCount = -Infinity;

  while (j <= s.length) {
    let subCount = 0;
    let subString = s.substring(i, j);

    if (previousCount === -Infinity) {
      for (let k = 0; k < subString.length; k++) {
        if (vowels.includes(subString[k])) {
          if (k === 0) {
            previous = 1;
          }
          subCount++;
        }
      }
    } else {
      let current = vowels.includes(s[j - 1]) ? 1 : 0;
      subCount = previousCount - previous + current;
      previous = vowels.includes(s[i]) ? 1 : 0;
    }
    if (subCount > maxVowels) {
      maxVowels = subCount;
    }
    previousCount = subCount;
    i++;
    j++;
  }
  return maxVowels;
};

console.log(maxVowels("abciiidef", 3));
