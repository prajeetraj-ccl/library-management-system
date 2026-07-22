if (sessionStorage.getItem("login") != "true") {
  window.location.href = "index.html";
}

const params = new URLSearchParams(window.location.search);
const bookId = Number(params.get("id"));
let books = JSON.parse(localStorage.getItem("books"));

for (let i = 0; i < books.length; i++) {
  if (books[i].id == bookId) {
    document.getElementById("book_name").value = books[i].bookName;
    document.getElementById("author").value = books[i].author;
    document.getElementById("category").value = books[i].category;
    document.getElementById("isbn").value = books[i].isbn;
    document.getElementById("publisher").value = books[i].publisher;
    document.getElementById("language").value = books[i].language;
    document.getElementById("copies").value = books[i].copies;
    document.getElementById("status").value = books[i].status;
    break;
  }
}

document.getElementById("updateBtn").onclick = function () {
  const bookName = document.getElementById("book_name").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
  const isbn = document.getElementById("isbn").value;
  const publisher = document.getElementById("publisher").value;
  const language = document.getElementById("language").value;
  const copies = document.getElementById("copies").value;
  const status = document.getElementById("status").value;
  const message = document.getElementById("message");
  if (bookName == "") {
    message.innerHTML = "Book Name is required";
    message.style.color = "red";
    return;
  }
  if (author == "") {
    message.innerHTML = "Author is required";
    message.style.color = "red";
    return;
  }
  if (category == "") {
    message.innerHTML = "Category is required";
    message.style.color = "red";
    return;
  }
  if (isbn == "") {
    message.innerHTML = "ISBN is required";
    message.style.color = "red";
    return;
  }
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == bookId) {
      books[i].bookName = bookName;
      books[i].author = author;
      books[i].category = category;
      books[i].isbn = isbn;
      books[i].publisher = publisher;
      books[i].language = language;
      books[i].copies = copies;
      books[i].status = status;

      break;
    }
  }

  localStorage.setItem("books", JSON.stringify(books));

  message.innerHTML = "Book Updated Successfully";
  message.style.color = "green";

  setTimeout(function () {
    window.location.href = "books.html";
  }, 1000);
};
