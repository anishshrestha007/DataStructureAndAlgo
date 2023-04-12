let newform = document.getElementById("new-form");
let reviews = document.getElementsByClassName("reviews")[0];
let addBook = document.getElementById("add-book-button");
let author = document.getElementById("author");
let title = document.getElementById("title");
let noOfPages = document.getElementById("noOfPages");
let isRead = document.getElementById("is-read");

class Book {
  constructor(
    author = "UnKnown",
    title = "UnKnown",
    noOfPages = 0,
    read = false
  ) {
    this.author = author;
    this.title = title;
    this.noOfPages = noOfPages;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, noOfPages, read) {
    let newBook = new Book(author, title, noOfPages, read);
    if (!this.hasSimilarBook(newBook)) {
      this.books.push(newBook);
      buildCard(newBook);
    } else {
    }
  }

  removeBook(title) {
    let bookIndex = this.books.findIndex((x) => x.title === title);
    if (bookIndex >= 0) {
      this.books.splice(bookIndex, 1);
    }
  }

  getBook(title) {
    return this.books.find((x) => x.title === title);
  }

  hasSimilarBook(newBook) {
    let hasBook = this.books.some((x) => x.title === newBook.title);
    if (hasBook) {
      console.log("Book with same title already exists!");
    } else {
      return hasBook;
    }
  }
}

function buildCard(newBook) {
  reviews.innerHTML =
    `<div class="box" id = '${newBook.title}'>
  <div class="profile">
    <img src="https://images.unsplash.com/photo-1648737965402-2b9c3f3eaa6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="">
    <div class="bio">
      <h2>${newBook.title}</h2>
      <h3>${newBook.author}</h3>
      <h4>${newBook.noOfPages} pages</h4>
      ${
        newBook.read
          ? `<div class="led-green" id = "led-icon" onclick= "handleReadClick('${newBook.title}')"></div>`
          : `<div class="led-red" id = "led-icon" onclick= "handleReadClick('${newBook.title}')"></div>`
      }
      <button id="remove-book" onclick="handleBookRemove('${
        newBook.title
      }')">Remove</button>
    </div>
  </div>
  <div class="qoute">
    <p>
      Lorem ipsum dolor psum dolor sit amet consectetur psum dolor sit amet consectetur sit amet consectetur adipisicing elit.
    </p>
  </div>
</div>` + reviews.innerHTML;
}

function handleReadClick(title) {
  let currentBook = library.getBook(title);
  let currentBookElement = document.getElementById(title);
  let read = currentBook.read;
  library.books = library.books.map((book) => {
    if (book.title === title) {
      return new Book(book.author, book.title, book.noOfPages, !read);
    }
    return book;
  });
  let ledClass = read ? "led-red" : "led-green";
  let ledCurrentClass = read ? "led-green" : "led-red";
  currentBookElement.getElementsByClassName(ledCurrentClass)[0].className =
    ledClass;
}

function handleBookRemove(title) {
  library.removeBook(title);
  let currentBook = document.getElementById(title);
  currentBook.remove();
}

function handleBookSave(e) {
  library.addBook(title.value, author.value, noOfPages.value, isRead.checked);

  reviews.style.display = "";
  addBook.style.display = "";
  newform.style.display = "none";
}

function handleBookSaveCancel(e) {
  reviews.style.display = "";
  addBook.style.display = "";
  newform.style.display = "none";
}

function handleAddBook() {
  title.value = "";
  author.value = "";
  noOfPages.value = "";
  isRead.checked = false;
  reviews.style.display = "none";
  addBook.style.display = "none";
  newform.style.display = "";
}

let library = new Library();

library.addBook("Harry Potter", "Simon Wilson", 5248, false);
library.addBook("Song of Ice and Fire", "Robert RR Martin", 6521, true);
library.addBook("Game of Thrones", "George X Marley", 8959, true);
