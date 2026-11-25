// Infinite Currying

function add(a) {
  return function (b) {
    if (b) return add(a + b);
    return a;
  };
}

console.log(add(2)(3)(6)());

const a = add(2);
const b = a(3);
const c = a(6);
c();
