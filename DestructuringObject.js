const user = {
  name: "Anish",
  age: 27,
  fullName: {
    name: "Shrestha",
  },
};
// Destructuring Object
const { name: firstName, age } = user;

// Destructuring object inside object
const {
  fullName: { name },
} = user;

console.log(name);
