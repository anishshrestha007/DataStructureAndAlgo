// A function which returns the inner function in which inner function has access to its external enviroment
// Javascript doesnt have concept of private methods so we use closures to fullfill that requirment
// This is a self invoked function so its new object cannot be created. That is why "changeCounter" is unaccessible from outer scope
// Module Pattern
var counter = (function () {
  // This is a private variable which is not accessible from global environment
  var privateCounter = 0;
  // This is a private method
  function changeCounter(val) {
    privateCounter += val;
  }
  // We return three functions/methods which will be accesible from global scope
  return {
    increment() {
      changeCounter(1);
    },
    decrement() {
      changeCounter(-1);
    },
    value() {
      return privateCounter;
    },
  };
})();
// Module Pattern
var myFunc = function () {
  let glob = "Global Values";
  this.sayHello = () => {
    console.log("Hello!" + glob);
  };
  function sayByeBye() {
    console.log("Bye! Bye!");
  }
};

function cow() {
  let legs = 4;
  this.ears = 2;

  this.characteristic = {
    weight: 200,
    height: 8,
    printCharcteristics: () => {
      console.log(
        `weight : ${this.characteristic.weight}  height : ${this.characteristic.height} ears : ${this.ears} legs ${legs}`
      );
    },
  };

  this.sayMoo = function () {
    console.log(`Mooo !!!  I have ${legs} legs and ${this.ears} ears.`);
  };
}

console.log(counter.value());
counter.increment();
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());
