let user = {
  name: "Anish Shrestha",
  address: "Lalitpur",
};

function getUserInfo(education, gender) {
  console.log(this.name + " " + this.address + education + gender);
}

// let getUser = getUserInfo.bind(user, "Bachelors");

// getUser("Male");

Function.prototype.myBind = function (...args) {
  let args1 = args.slice(1),
    obj = this;
  return function (...args2) {
    obj.apply(args[0], [...args1, args2]);
  };
};

let myBindUsers = getUserInfo.myBind(user, "Bachelors");

myBindUsers("Male");
