if (sessionStorage.getItem("login") != "true") {
  window.location.href = "index.html";
}

const params = new URLSearchParams(window.location.search);
const bookId = Number(params.get("id"));

let books = JSON.parse(localStorage.getItem("books")); // book local storage la irunthu vangaro

for (let i = 0; i < books.length; i++) {
  //book aah find panro
  if (books[i].id == bookId) {
    document.getElementById("bookId").innerHTML = books[i].id;
    document.getElementById("bookName").innerHTML = books[i].bookName;
    document.getElementById("author").innerHTML = books[i].author;
    document.getElementById("category").innerHTML = books[i].category;
    document.getElementById("isbn").innerHTML = books[i].isbn;
    document.getElementById("publisher").innerHTML = books[i].publisher;
    document.getElementById("language").innerHTML = books[i].language;
    document.getElementById("copies").innerHTML = books[i].copies;
    document.getElementById("availableCopies").innerHTML =
      books[i].availableCopies;
    document.getElementById("status").innerHTML = books[i].status;
if (books[i].status == "Borrowed") {
    document.getElementById("borrowHistory").innerHTML = `
        Member : John <br>
        Borrow Date : 10/07/2026 <br>
        Return Date : Not Returned
    `;
} else {
    document.getElementById("borrowHistory").innerHTML = "No Borrow History";
}
    break;
  }
}
