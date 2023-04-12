// Reference : https://www.youtube.com/watch?v=Vi4Pr8bUMZs&ab_channel=AkshaySaini
// Output : {
//     user_name : "Anish Shrestha",
//     user_address_personnel_city : "Lalitpur",
//     user_address_personnel_area : "Tyagal",
//     user_address_office_city : "Norwich",
//     user_address_office_area_post : "Burton Road"
// }
var user = {
  name: "Anish shrestha",
  address: {
    personnel: {
      city: "Lalitpur",
      area: "Tyagal",
    },
    office: {
      city: "Norwich",
      area: {
        post: "Burton Road",
      },
    },
  },
};
var finalUser = {};
let traverseUser = (user, parent) => {
  for (const key in user) {
    if (typeof user[key] === "object") {
      _parent = parent + "_" + key;
      traverseUser(user[key], _parent);
    } else {
      finalUser[parent + "_" + key] = user[key];
    }
  }
};

traverseUser(user, "user");
document.write(JSON.stringify(finalUser, null, 2));
