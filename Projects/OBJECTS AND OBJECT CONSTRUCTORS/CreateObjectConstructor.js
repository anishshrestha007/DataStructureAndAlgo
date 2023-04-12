// Object constructor naming convention should start with capital letter

function Books() {
  this.title = "The Hobbit";
  this.author = "J.R.R. Tolkien";
  this.noOfPages = 295;
  this.read = "not read yet";
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.noOfPages} pages, ${this.read}`;
  };
}

var theHobbit = new Books();
console.log(theHobbit.info());
