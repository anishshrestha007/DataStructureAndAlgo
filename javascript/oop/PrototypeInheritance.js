//Reference URL: https://www.youtube.com/watch?v=12QRecyUd28&list=PL7pEw9n3GkoW0ceMeoycg9D00YjPAbtvt&index=2&ab_channel=techsith

function Person(name, age, dob, gender) {
  this.Name = name;
  this.Age = age;
  this.DOB = dob;
  this.Gender = gender;
  this.getName = function () {
    return `${this.Name}`;
  };
}

Person.prototype.Information = function () {
  return `My name: ${this.Name} age : ${this.Age} gender : ${this.Gender}`;
};

var _person = new Person("Anish Shrestha", 27, "1994/03/01", "Male");

document.write(_person.Information());

//Prototype Inheritance

function Male(name, age, dob, gender) {
  //This is just like calling super
  Person.call(this, name, age, dob, gender);
}

//In this step we inherit Person Prototype and set it to Male Prototype
Male.prototype = Object.create(Person.prototype);

var _anish = new Male("Aman Shrestha", 33, "1994/03/01", "Male");
console.dir(_anish);
console.log(_anish.getName());
console.log(_anish.Information());

//Object prototype inheritance using setPrototypeOf(destination,source)

let car = {
  drive() {
    return "Drive a car";
  },
};

//Here we cannot do this because car does not have prototype
// car.prototype.brake = function () {
//   return "Apply Brakes";
// };

let teslaCar = {};

//Now to inherit car

Object.setPrototypeOf(teslaCar, car);

console.log(teslaCar.brake());
