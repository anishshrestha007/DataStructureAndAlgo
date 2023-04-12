import moment from "moment";

function getDateString(newValue) {
  var dateString = newValue;
  var dateObj = new Date(dateString);
  var momentObj = moment(dateObj);
  var momentString = momentObj.format("YYYY-MM-DD");
  return momentString;
}

function getFormattedDate(date) {
  return moment(date).format("MMM YYYY");
}

export { getDateString, getFormattedDate };
