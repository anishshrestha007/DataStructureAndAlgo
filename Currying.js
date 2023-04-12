//Currying can be done through two methods
// 1.Bind
// 2.Closures

function multiply(x, y) {
  console.log(x * y);
}

// this is called as curriying through bind
let multiplyBytwo = multiply.bind(this, 2);
let multiplyBythree = multiply.bind(this, 3);

multiplyBytwo(5);
multiplyBythree(5);

function multiplyWithClosure(x) {
  return function (y) {
    console.log(x * y);
  };
}

let multiplyByTwoWithClosure = multiplyWithClosure(2);
let multiplyByThreeWithClosure = multiplyWithClosure(3);
multiplyByTwoWithClosure(5);
multiplyByThreeWithClosure(5);
