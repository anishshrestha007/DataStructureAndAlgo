// Write a function subLength() that takes 2 parameters, a string and a single character. The function should search the string for the two occurrences of the character and return the length between them including the 2 characters. If there are less than 2 or more than 2 occurrences of the character the function should return 0.

// Examples:

// subLength('Saturday', 'a'); // returns 6
// subLength('summer', 'm'); // returns 2
// subLength('digitize', 'i'); // returns 0
// subLength('cheesecake', 'k'); // returns 0

// function subLength(str, char) {
//   let count = 0;
//   let si = -1;
//   let result = 0;
//   [...str].forEach((s, i) => {
//     if (s === char) {
//       if (++count > 2) return (result = 0);
//       else if (si >= 0) return (result = i - si + 1);
//       si = i;
//     }
//   });
//   return result;
// }

// console.log(subLength("momentum", "m"));

// Write a function groceries() that takes an array of object literals of grocery items. The function should return a string with each item separated by a comma except the last two items should be separated by the word 'and'. Make sure spaces (' ') are inserted where they are appropriate.

// Examples:

// groceries( [{item: 'Carrots'}, {item: 'Hummus'}, {item: 'Pesto'}, {item: 'Rigatoni'}] );
// // returns 'Carrots, Hummus, Pesto and Rigatoni'

// groceries( [{item: 'Bread'}, {item: 'Butter'}] );
// // returns 'Bread and Butter'

// groceries( [{item: 'Cheese Balls'}] );
// // returns 'Cheese Balls'

// function groceries(arr) {
//   let result = "";
//   if (arr.length === 1) {
//     return arr[0].item;
//   }
//   arr.forEach((e, i) => {
//     if (i + 1 === arr.length) {
//       result = result + " and " + e.item;
//     } else {
//       result = i + 2 === arr.length ? result + e.item : result + e.item + ", ";
//     }
//   });
//   return result;
// }

// console.log(
//   groceries([{ item: "Lettuce" }, { item: "Onions" }, { item: "Tomatoes" }])
// );

// Write a function factorial() that takes a number as an argument and returns the factorial of the number.

// Example:

// factorial(6);
// // returns `720` because 6 * 5 * 4 * 3 * 2 * 1 = 720
// Assume only positive numbers will be given as an argument for the factorial() function.

// function factorial(n) {
//   if (n <= 1) {
//     return 1;
//   }

//   return n * factorial(n - 1);
// }

// function validateCred(arr) {
//   let check = false;
//   let sum = 0;
//   arr.reverse().forEach((e, i) => {
//     if (check === true) {
//       check = false;
//       if (e * 2 > 9) sum = sum + e * 2 - 9;
//       else sum = sum + e * 2;
//     } else {
//       sum = sum + e;
//       check = true;
//     }
//   });
//   if (sum % 10 === 0) return true;
//   return false;
// }

// function findInvalidCards(nestedArr) {
//   return nestedArr.filter((arr) => !validateCred(arr));
// }

// //console.log(validateCred([4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]));

// function idInvalidCardCompanies(nestedArr) {
//   const invalidCards = findInvalidCards(nestedArr);

//   const invalidCompanies = invalidCards.map((e, i) => {
//     const firstDigit = e[e.length - 1];
//     switch (firstDigit) {
//       case 3:
//         return "Amex (American Express)";
//       case 4:
//         return "Visa";
//       case 5:
//         return "Mastercard";
//       case 6:
//         return "Discover";
//       default:
//         return "";
//     }
//   });

//   return invalidCompanies;
// }

// console.log(
//   idInvalidCardCompanies([
//     [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8],
//     [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5],
//     [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3],
//     [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6],
//   ])
// );

/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
// var canPlaceFlowers = function (flowerbed, n) {
//   let i = 0;
//   debugger;
//   while (n !== 0 && i < flowerbed.length) {
//     if (i == 0) {
//       if (flowerbed[i] === 0) {
//         if (flowerbed.length === 1 || flowerbed[i + 1] === 0) {
//           flowerbed[0] = 1;
//           n--;
//           i++;
//           continue;
//         }
//       }
//     } else if (i === flowerbed.length - 1) {
//       if (flowerbed[flowerbed.length - 1] == 0 && flowerbed[i - 1] == 0) {
//         flowerbed[i] = 1;
//         n--;
//         i++;
//         continue;
//       }
//     } else if (
//       flowerbed[i - 1] === 0 &&
//       flowerbed[i + 1] === 0 &&
//       flowerbed[i] === 0
//     ) {
//       flowerbed[i] = 1;
//       n--;
//       i++;
//       continue;
//     }

//     i++;
//   }
//   return n === 0 ? true : false;
// };

// console.log(canPlaceFlowers([1, 0], 1));
// var reverseVowels = function (s) {
//   let i = 0,
//     j = s.length - 1;
//   let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
//   let sArr = s.split("");
//   debugger;
//   while (j > i) {
//     if (vowels.includes(sArr[i]) && vowels.includes(sArr[j])) {
//       let temp = sArr[i];
//       sArr[i] = sArr[j];
//       sArr[j] = temp;
//       i++;
//       j--;
//     } else if (vowels.includes(sArr[i])) {
//       j--;
//     } else if (vowels.includes(sArr[j])) {
//       i++;
//     } else {
//       i++;
//       j--;
//     }
//   }
//   return sArr.join("");
// };

// console.log(reverseVowels("race car"));

// var increasingTriplet = function (nums) {
//   debugger;
//   let i = 0,
//     j = 1,
//     k = nums.length - 1;

//   while (i < k && j < k) {
//     if (nums[i] < nums[j] && nums[j] < nums[k]) return true;
//     if (nums[j] < nums[i]) {
//       i = j;
//     } else if (nums[i] >= nums[k]) {
//       i++;
//       j++;
//     } else if (nums[k] <= nums[i]) {
//       k--;
//     } else if (nums[j] > nums[k]) {
//       k--;
//     } else j++;
//   }
//   return false;
// };

// console.log(increasingTriplet([1, 5, 0, 4, 1, 3]));

//[1,5,0,4,1,3]
//[20, 100, 10, 12, 5, 13]

// var shortestSubArray = function () {
//   let arr = [1];
//   let m = new Map();
//   let max = 0,
//     diff = Infinity;
//   for (i = 0; i < arr.length; i++) {
//     if (m.has(arr[i]))
//       m.set(arr[i], {
//         ...m.get(arr[i]),
//         endIndex: i,
//         value: m.get(arr[i]).value + 1,
//       });
//     else
//       m.set(arr[i], {
//         startIndex: i,
//         endIndex: i,
//         value: 1,
//       });
//   }
//   m.forEach((a) => {
//     if (a.value > max) {
//       max = a.value;
//       diff = a.endIndex - a.startIndex + 1;
//     } else if (max === a.value) {
//       if (a.endIndex - a.startIndex < diff) {
//         diff = a.endIndex - a.startIndex + 1;
//       }
//     }
//   });
//   return diff;
// };

// console.log(shortestSubArray());
