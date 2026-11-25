//The factory function pattern is similar to constructors, but instead of using new to create an object,
//factory functions simply set up and return the new object when you call the function.

const FactoryFunction = (string) => {
  const capitalizeString = () => string.toUpperCase();
  const printString = () => console.log(`----${capitalizeString()}----`);
  return { printString };
};

const taco = FactoryFunction("taco");

// These three fail: printString and capitalizeString only exist inside the factory,
// and only printString is returned. try/catch lets the file keep running to show each error.
try {
  printString(); // ERROR!!
} catch (e) {
  console.log("printString() ->", e.message);
}
try {
  capitalizeString(); // ERROR!!
} catch (e) {
  console.log("capitalizeString() ->", e.message);
}
try {
  taco.capitalizeString(); // ERROR!!
} catch (e) {
  console.log("taco.capitalizeString() ->", e.message);
}

taco.printString(); // this prints "----TACO----"
