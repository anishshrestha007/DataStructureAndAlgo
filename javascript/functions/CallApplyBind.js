const name = {
  firstName: "Anish",
  lastName: "Shrestha",
};

const getInfo = function (middleName, city) {
  console.log(
    this.firstName + " " + middleName + " " + this.lastName + " City: " + city
  );
};
//name will be bind with this when the function is called upon
getInfo.call(name, "Bahadur", "Lalitpur");

//The only difference between apply and call is how we send the parameters. So in apply we send extra parameters as an array
getInfo.apply(name, ["Bahadur", "Lalitpur"]);

//The only difference between bind and call is that bind gives us copy of that method which we can call later rather than calling it in same moment which is done in call.
const getInfoBinded = getInfo.bind(name, "Bahadur", "Lalitpur");
console.log(getInfoBinded);
