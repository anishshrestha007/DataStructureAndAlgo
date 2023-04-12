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

function createUsers(user, callBack) {
  setTimeout(() => {
    users.push(user);
    callBack();
  }, 2000);
}
//Simply calling the callback function
createUsers(
  {
    name: "Aman Shrestha",
    address: "Kathmandu",
  },
  getUsers
);
