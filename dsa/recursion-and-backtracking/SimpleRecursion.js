function sayHi(count) {
  if (count <= 1) {
    return;
  }
  count = count - 1;

  sayHi(count);

  console.log("Hello " + count);
}

sayHi(10);
