function Person(name, age, dob, gender) {
  this.Name = name;
  this.Age = age;
  this.DOB = dob;
  this.Gender = gender;
}

Person.prototype.Information = function () {
  return `My name: ${this.Name} age : ${this.Age} gender : ${this.Gender}`;
};

var _person = new Person("Anish Shrestha", 27, "1994/03/01", "Male");

document.write(_person.Information());
