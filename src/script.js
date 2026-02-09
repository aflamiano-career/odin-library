// *** ORIGINAL BOOK CONSTRUCTOR ***
//
// function Book(author, title, pages, isRead) {
//   this.id = crypto.randomUUID();
//   this.author = author;
//   this.title = title;
//   this.pages = pages;
//   this.isRead = isRead;
// }

// *** REFACTOR BOOK CONSTRUCTOR TO CLASS ***
class Book {
  constructor(author, title, pages, isRead) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
  }
}

const myLibrary = [
  new Book("George Orwell", "1984", 328, true),
  new Book("Harper Lee", "To Kill a Mockingbird", 281, false),
  new Book("J.R.R. Tolkien", "The Hobbit", 310, true),
  new Book("F. Scott Fitzgerald", "The Great Gatsby", 180, false),
  new Book("Mary Shelley", "Frankenstein", 280, true),
  new Book("Jane Austen", "Pride and Prejudice", 432, false),
  new Book("Ray Bradbury", "Fahrenheit 451", 249, true),
  new Book("Aldous Huxley", "Brave New World", 268, false),
  new Book("Herman Melville", "Moby-Dick", 635, false),
  new Book("J.D. Salinger", "The Catcher in the Rye", 277, true),
];

const books = document.querySelector(".book__list");

myLibrary.forEach((book) => {
  addToHTML(book);
});

function addToHTML(book) {
  const card = document.createElement("article");
  card.setAttribute("data-id", book.id);
  card.classList.add("list__item");

  const btnIsRead = document.createElement("button");

  if (book.isRead === true) {
    card.classList.add("item--read");
    btnIsRead.textContent = "Unread";
  } else {
    card.classList.add("item--unread");
    btnIsRead.textContent = "Read";
  }

  const title = document.createElement("h2");
  title.textContent = book.title;
  title.classList.add("item__title");

  const author = document.createElement("p");
  author.textContent = book.author;
  author.classList.add("item__description");

  const pages = document.createElement("p");
  pages.textContent = book.pages;
  pages.classList.add("item__pages");

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "x";

  books.appendChild(card);
  card.appendChild(btnDelete);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(btnIsRead);
}

function addBookToLibrary(author, title, pages, isRead) {
  const book = new Book(author, title, pages, isRead);
  myLibrary.push(book);
  addToHTML(book);
  console.log("Book has been added.");
  console.log(myLibrary);
}

const btnAddBook = document.querySelector(".btn-add-book");
const formAddBook = document.querySelector(".form__add-book");

function displayForm() {
  formAddBook.classList.toggle("active");
}

btnAddBook.addEventListener("click", displayForm);
books.addEventListener("click", deleteFromLibrary);
books.addEventListener("click", updateRead);

// Form validation
const form = document.querySelector("form");
form.setAttribute("novalidate", "");

const formTitle = document.querySelector(".add-book__title");
const formAuthor = document.querySelector(".add-book__author");
const formPages = document.querySelector(".add-book__pages");
const formIsRead = document.querySelector('input[name="isRead"]:checked');

const titleError = document.createElement("span");
titleError.textContent = "The title must be filled";
titleError.classList.add("error");
formTitle.after(titleError);

const authorError = document.createElement("span");
authorError.textContent = "The author must be filled";
authorError.classList.add("error");
formAuthor.after(authorError);

const pagesError = document.createElement("span");
pagesError.classList.add("error");
formPages.after(pagesError);

form.addEventListener("submit", (e) => {
  let errors = [];
  if (formTitle.validity.valueMissing) {
    titleError.classList.add("active");
    errors.push(null);
  } else {
    titleError.classList.remove("active");
  }

  if (formAuthor.validity.valueMissing) {
    authorError.classList.add("active");

    errors.push(null);
  } else {
    authorError.classList.remove("active");
  }

  if (formPages.validity.valueMissing) {
    pagesError.textContent = "The number of pages must be filled";
    pagesError.classList.add("active");

    errors.push(null);
  } else {
    pagesError.classList.remove("active");
  }

  if (formPages.validity.rangeUnderflow) {
    pagesError.textContent = "The number of pages must be greater than 1";
    pagesError.classList.add("active");

    errors.push(null);
  } else {
    pagesError.classList.remove("active");
  }

  if (errors.length < 1) {
    addBookToLibrary(
      formAuthor.value,
      formTitle.value,
      formPages.value,
      formIsRead.value === "true",
    );
  }

  e.preventDefault();
});

// const btnAddSubmit = document.querySelector(".add-book--submit");
// btnAddSubmit.addEventListener("click", (e) => {
//   const formTitle = document.querySelector(".add-book__title");
//   const formAuthor = document.querySelector(".add-book__author");
//   const formPages = document.querySelector(".add-book__pages");
//   const formIsRead = document.querySelector('input[name="isRead"]:checked');

//   addBookToLibrary(
//     formAuthor.value,
//     formTitle.value,
//     formPages.value,
//     formIsRead.value === "true",
//   );

//   e.preventDefault();
// });

function deleteFromLibrary(e) {
  // console.log(e.target);
  const elementId = e.target.parentNode.getAttribute("data-id");
  // console.log(elementId);
  const bookItem = myLibrary.findIndex((book) => {
    return elementId === book.id;
  });

  if (e.target.textContent === "x") {
    myLibrary.splice(bookItem, 1);
    e.target.parentNode.remove();
    console.log(myLibrary);
  }
}

function updateRead(e) {
  // console.log(e.target);
  const elementId = e.target.parentNode.getAttribute("data-id");
  // console.log(elementId);
  const bookItem = myLibrary.findIndex((book) => {
    return elementId === book.id;
  });

  if (e.target.textContent === "Read" || e.target.textContent === "Unread") {
    // console.log(myLibrary[bookItem]);
    e.target.parentNode.classList.toggle("item--read");
    e.target.parentNode.classList.toggle("item--unread");
    myLibrary[bookItem].isRead = !myLibrary[bookItem].isRead;
    e.target.textContent === "Read"
      ? (e.target.textContent = "Unread")
      : (e.target.textContent = "Read");
    console.log(myLibrary);
  }
}
