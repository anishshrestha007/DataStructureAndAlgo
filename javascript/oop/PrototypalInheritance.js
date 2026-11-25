// This saves alot of memory in larger scale application because the method sayName is only occupying a memory it is not being created/copied each time object is created as in
// previous example

// Prototypal Inheritance
function Student() {}

Student.prototype.sayName = function () {
  return `My name is ${this.name}`;
};

function EightClass(name) {
  this.name = name;
  this.age = 22;
}

EightClass.prototype = Object.create(Student.prototype);

let eightClass = new EightClass("Yenzi Lama");
console.log(eightClass.sayName());
