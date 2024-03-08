var StringCompression = function (chars) {
  debugger;
  if (chars.length === 1) return chars.length;
  let l = 0,
    r = 1;
  let count = 1;

  while (r <= chars.length) {
    if (chars[l] === chars[r]) {
      count++;
      r++;
    } else {
      const countString = count.toString();
      const countSplit = countString.split("");
      const countSplitLen = countSplit.length;
      if (count > 1) {
        if (count > 9) {
          let tempL = l;
          for (let num of countSplit) {
            chars[tempL + 1] = num;
            tempL++;
          }
          chars.splice(l + countSplitLen + 1, count - countSplitLen - 1);
        } else {
          chars[l + 1] = countString;
          chars.splice(l + 2, r - l - 2);
        }
        l = l + countSplitLen + 1;
        r = l + 1;
        count = 1;
      } else {
        l++;
        r = l + 1;
        count = 1;
      }
    }
  }
  return chars.length;
};

console.log(
  StringCompression([
    "a",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "c",
  ])
);
