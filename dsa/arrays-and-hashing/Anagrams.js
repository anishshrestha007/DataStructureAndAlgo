function groupAnagrams(strs) {
  var map = new Map();
  var newArr = [];
  strs.forEach((element) => {
    sortedElement = element.split("").sort().join("");
    if (!map.has(sortedElement)) {
      map.set(sortedElement, [element]);
    } else {
      map.set(sortedElement, [...map.get(sortedElement), element]);
    }
  });

  map.forEach((element) => {
    newArr.push(element);
  });

  return newArr;
}

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
