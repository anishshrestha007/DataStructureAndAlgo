const users = [
  {
    name: "Anish Shrestha",
    address: "Lalitpur",
  },
  {
    name: "Manjushree Ranjitkar",
    address: "Dang",
  },
];

function getUsers() {
  setTimeout(() => {
    var usersDom = "";
    users.forEach((element) => {
      usersDom += `UserName : ${element.name}`;
    });

    document.write(usersDom);
  }, 1000);
}

function createUsers(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      users.push(user);
      let error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error occured while creating post!");
      }
    }, 2000);
  });
}
// Simply calling the function
// createUsers({
//   name: "Aman Shrestha",
//   address: "Kathmandu",
// });

// getUsers();

// Using promise
createUsers({
  name: "Aman Shrestha",
  address: "Kathmandu",
})
  .then(getUsers)
  .catch((err) => console.log(err));

// async/await example

// async function asyncFuncExample() {
//   await createUsers({
//     name: "Aman Shrestha",
//     address: "Kathmandu",
//   });
//   getUsers();
// }
// asyncFuncExample();
