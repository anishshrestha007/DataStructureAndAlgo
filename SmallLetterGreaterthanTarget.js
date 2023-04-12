/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  let left = 0;
  let right = letters.length - 1;
  let lowestCharacter = -1;
  while (left <= right) {
    let mid = Math.trunc((right + left) / 2);
    const targetChar = target.charCodeAt();
    if (targetChar < letters[mid].charCodeAt()) {
      lowestCharacter = mid;
      right = mid - 1;
    } else {
      if (mid < letters.length - 1) lowestCharacter = mid + 1;
      else lowestCharacter = 0;
      left = mid + 1;
    }
  }
  return letters[lowestCharacter];
};

console.log(nextGreatestLetter(["c", "f", "j"], "j"));
