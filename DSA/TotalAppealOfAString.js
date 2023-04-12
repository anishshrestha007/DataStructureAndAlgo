const s = "abbca";
// let count = s.length;
// const totalAppealString = function (s) {
//   calculateTotal(s);
//   console.log(count);
// };

// const calculateTotal = function (s) {
//   for (let index = 2; index <= s.length; index++) {
//     count += totalValue(s, index);
//   }
// };

// const sliceString = function (s, i) {
//   const slicedString = [];
//   const end = i - 1;
//   for (let j = 0; j < s.length - end; j++) {
//     slicedString.push(s.slice(j, i++));
//   }

//   return slicedString;
// };

// const totalValue = function (s, index) {
//   const slicedString = sliceString(s, index);
//   let totalVal = 0;
//   for (let i = 0; i < slicedString.length; i++) {
//     const element = slicedString[i];
//     const set = {};
//     for (let j = 0; j < element.length; j++) {
//       const ele = element[j];
//       if (!set[ele]) {
//         set[ele] = 1;
//         totalVal++;
//       }
//     }
//   }
//   return totalVal;
// };

// totalAppealString(s);

const ord = (c) => c.charCodeAt();

const appealSum = (s) => {
  let last = Array(26).fill(0),
    res = 0;
  for (let i = 0; i < s.length; i++) {
    last[ord(s[i]) - 97] = i + 1;
    for (let j = 0; j < 26; j++) res += last[j];
  }
  console.log(res);
  return res;
};
appealSum(s);
