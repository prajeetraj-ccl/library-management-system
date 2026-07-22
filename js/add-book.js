if (sessionStorage.getItem("login") != "true") {
  window.location.href = "index.html";
}

document.getElementById("saveBtn").onclick = function () {
  const bookName = document.getElementById("book_name").value;
  const isbn = document.getElementById("isbn").value;
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;
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
  if (isbn == "") {
    message.innerHTML = "ISBN is required";
    message.style.color = "red";
    return;
  }
  if (author == "") {
    message.innerHTML = "Author Name is required";
    message.style.color = "red";
    return;
  }
  if (category == "") {
    message.innerHTML = "Category is required";
    message.style.color = "red";
    return;
  }
  let books = JSON.parse(localStorage.getItem("books"));
  if (books == null) {
    books = [];
  }

  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn == isbn) {                    //duplicate iruka paka
      message.innerHTML = "ISBN Already Exists";
      message.style.color = "red";
      return;
    }
  }

  const newBook = {
    id: books.length + 1,
    bookName: bookName,
    isbn: isbn,
    author: author,
    category: category,
    publisher: publisher,
    language: language,
    copies: copies,
    availableCopies: copies,
    status: status,
  };

  books.push(newBook);    //book add panro

  localStorage.setItem("books", JSON.stringify(books));   // save panro

  message.innerHTML = "Book Added Successfully";
  message.style.color = "green";
 setTimeout(function () {
    window.location.href = "books.html";
  }, 1000);
  document.getElementById("book_name").value = "";
  document.getElementById("isbn").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
  document.getElementById("publisher").value = "";
  document.getElementById("language").value = "";
  document.getElementById("copies").value = "";
  document.getElementById("status").value = "Available";
};
