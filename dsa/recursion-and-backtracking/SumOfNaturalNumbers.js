function addNaturalNumbers(inputNumbers) {
  if (inputNumbers == 0) return 0;

  return inputNumbers + addNaturalNumbers(inputNumbers - 1);
}

var result = addNaturalNumbers(5);
console.log(result);
