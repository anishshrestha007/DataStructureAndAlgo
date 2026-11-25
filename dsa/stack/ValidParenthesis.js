/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  let openingArr = ["(", "{", "["];
  let closingArr = [")", "}", "]"];
  let strArr = s.split("");
  if (strArr.length % 2 !== 0) return false;
  for (i = 1; i < strArr.length; i++) {
    const element = strArr[i];
    const prevElement = strArr[i - 1];

    if (i == 1 && closingArr.includes(prevElement)) return false;
    if (closingArr.includes(element)) {
      if (openingArr.indexOf(prevElement) !== closingArr.indexOf(element)) {
        return false;
      } else {
        strArr.splice(i - 1, 2);
        i = i - 2;
      }
    }
  }
  if (strArr.length > 0) return false;
  else return true;
};

isValid("[({{}})]");

// var isValid = function (s) {
//     let openingArr = ["(", "{", "["];
//     let closingArr = [")", "}", "]"];
//     let strArr = s.split("");
//     for (i = 0; i < strArr.length; i++) {
//       debugger;
//       const element = strArr[i];
//       const nextElement = strArr[i + 1];
//       if (i % 2 === 0 && closingArr.includes(element)) return false;

//       if (i % 2 !== 0 && openingArr.includes(element)) return false;

//       if (openingArr.indexOf(element) !== closingArr.indexOf(nextElement))
//         return false;
//     }
//     return true;
//   };

// var isValid = function (s) {
//   let strArr = s.split("");
//   let len = strArr.length;
//   if (len % 2 !== 0) {
//     return false;
//   }
//   const firstElements = strArr.splice(0, len / 2);
//   const secondElements = strArr.splice(len / 2, len);
//   for (i = 0; i < len; i++) {
//     if (firstElements[0] !== secondElements[len - i - 1]) {
//       return false;
//     }
//     return true;
//   }
// };

// isValid("()[]{}");
