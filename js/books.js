if (sessionStorage.getItem("login") != "true") {
  window.location.href = "index.html";
}

let books = JSON.parse(localStorage.getItem("books"));
let allBooks = [];
let currentPage = 1;
let rowsPerPage = 5;
if (books == null) {
  fetch("../data/books.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      books = data;
      allBooks = books; 
      localStorage.setItem("books", JSON.stringify(books));
      displayBooks(books);
    });
} else {
  allBooks = books; 
  displayBooks(books);
}

function displayBooks(books) {
  if (books.length == 0) {
    document.getElementById("totalBooks").innerHTML = "No Books Found";
    return;
  }
  document.getElementById("totalBooks").innerHTML =
    "Total Books : " + books.length;
  const table = document.querySelector("table");
  table.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
           <th>Availability</th> 
            <th>Action</th>
        </tr>
    `;
 let start = (currentPage - 1) * rowsPerPage;
let end = start + rowsPerPage;
for (let i = start; i < end && i < books.length; i++) {
    let availability = "";
    if (books[i].availableCopies == 0) {
        availability = "Out Of Stock";
    }
    else if (books[i].availableCopies < books[i].copies) {
        availability = "Partially Available";
    }
    else {
        availability = "Available";
    }
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${books[i].id}</td>
        <td>${books[i].bookName}</td>
        <td>${books[i].author}</td>
        <td>${books[i].isbn}</td>
        <td>${books[i].category}</td>
        <td>${availability}</td>
        <td>
            <a href="book-details.html?id=${books[i].id}">View</a> |
            <a href="edit-book.html?id=${books[i].id}">Edit</a> |
            <a href="#" onclick="deleteBook(${books[i].id})">Delete</a>
        </td>
    `;
    table.appendChild(row);
}
}
document.getElementById("pageNo").innerHTML = currentPage;
function deleteBook(id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      if (books[i].status == "Borrowed") {
        alert("Borrowed Book Cannot Be Deleted");
        return;
      }
      const result = confirm("Delete Book?");
      if (result) {
        books.splice(i, 1);
        localStorage.setItem("books", JSON.stringify(books));
        allBooks = books; // Added
        displayBooks(books);
      }
      return;
    }}}

document.getElementById("searchBook").onkeyup = function () {
  const search = this.value.toLowerCase();
  let filteredBooks = [];
  for (let i = 0; i < allBooks.length; i++) {
    if (
      allBooks[i].bookName.toLowerCase().includes(search) ||
      allBooks[i].author.toLowerCase().includes(search) ||
      allBooks[i].isbn.toLowerCase().includes(search)
    ) {
      filteredBooks.push(allBooks[i]);
    }}
  displayBooks(filteredBooks);
};

function filterBooks(){
    let category = document.getElementById("categoryFilter").value;
    let status = document.getElementById("statusFilter").value;
    let author = document.getElementById("authorFilter").value;
    let language = document.getElementById("languageFilter").value;
    let filteredBooks = [];
    for(let i=0;i<allBooks.length;i++){
        let book = allBooks[i];
        if(category != "" && book.category != category){
            continue;
        }
        if(status != "" && book.status != status){
            continue;
        }
        if(author != "" && book.author != author){
            continue;
        }
        if(language != "" && book.language != language){
            continue;
        }
        filteredBooks.push(book);
    }
    displayBooks(filteredBooks);
}
document.getElementById("categoryFilter").onchange = filterBooks;
document.getElementById("statusFilter").onchange = filterBooks;
document.getElementById("authorFilter").onchange = filterBooks;
document.getElementById("languageFilter").onchange = filterBooks;
document.getElementById("resetBtn").onclick = function(){
    document.getElementById("categoryFilter").value = "";
    document.getElementById("statusFilter").value = "";
    document.getElementById("authorFilter").value = "";
    document.getElementById("languageFilter").value = "";
    displayBooks(allBooks);
};
document.getElementById("sortBooks").onchange = function () {
    let sortValue = this.value;
    if (sortValue == "title") {
        allBooks.sort(function (a, b) {
            return a.bookName.localeCompare(b.bookName);
        });
    }
    else if (sortValue == "author") {

        allBooks.sort(function (a, b) {
            return a.author.localeCompare(b.author);
        });
    }
    else if (sortValue == "copies") {
       allBooks.sort(function (a, b) {
            return a.copies - b.copies;
        });
    }
    displayBooks(allBooks);
};
document.getElementById("prevBtn").onclick = function(){
    if(currentPage > 1){currentPage--;displayBooks(allBooks);}};

document.getElementById("nextBtn").onclick = function(){
    let totalPages = Math.ceil(allBooks.length / rowsPerPage);
    if(currentPage < totalPages){currentPage++;displayBooks(allBooks);}};