let editingBookId = 0;

if (protectPage()) {
  setupStorage().then(function () {
    editingBookId = getQueryNumber("id");
    renderBookForm();
  });
}

function renderBookForm() {
  const title = editingBookId > 0 ? "Edit Book" : "Add Book";
  const content = renderLayout(title);
  const card = document.createElement("div");
  card.className = "card";

  const form = document.createElement("div");
  form.className = "form-grid";

  form.appendChild(createField("Title", "text", "bookName", "Enter book title"));
  form.appendChild(createField("ISBN", "text", "isbn", "Enter ISBN"));
  form.appendChild(createField("Publisher", "text", "publisher", "Enter publisher"));
  form.appendChild(createField("Language", "text", "language", "Enter language"));
  form.appendChild(createField("Copies", "number", "copies", "Enter copies"));

  const authorOptions = [""].concat(getAuthorNames());
  const categoryOptions = [""].concat(getCategoryNames());
  form.appendChild(createSelectField("Author", "author", authorOptions));
  form.appendChild(createSelectField("Category", "category", categoryOptions));

  const message = document.createElement("p");
  message.id = "message";
  message.className = "message";

  const actions = document.createElement("div");
  actions.className = "form-actions";

  const save = createButton(editingBookId > 0 ? "Update Book" : "Save Book", "btn-primary");
  save.onclick = function () {
    saveBookForm(message, save);
  };

  const back = createLink("Back", "books.html", "btn-light");

  actions.appendChild(save);
  actions.appendChild(back);
  card.appendChild(form);
  card.appendChild(message);
  card.appendChild(actions);
  content.appendChild(card);

  if (editingBookId > 0) {
    fillBookForm();
  }
}

function getAuthorNames() {
  const authors = getAuthors();
  const names = [];
  for (let i = 0; i < authors.length; i++) {
    names.push(authors[i].authorName);
  }
  return names;
}

function getCategoryNames() {
  const categories = getCategories();
  const names = [];
  for (let i = 0; i < categories.length; i++) {
    names.push(categories[i].categoryName);
  }
  return names;
}

function fillBookForm() {
  const book = findBookById(editingBookId);

  if (book == null) {
    showToast("Book not found", "error");
    window.location.href = "books.html";
    return;
  }

  document.getElementById("bookName").value = book.bookName;
  document.getElementById("isbn").value = book.isbn;
  document.getElementById("publisher").value = book.publisher;
  document.getElementById("language").value = book.language;
  document.getElementById("copies").value = book.copies;
  document.getElementById("author").value = book.author;
  document.getElementById("category").value = book.category;
}

function saveBookForm(message, button) {
  if (!validateBookForm()) {
    showMessage(message, "Please fix the errors", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Saving...";

  setTimeout(function () {
    if (editingBookId > 0) {
      updateBook();
      showMessage(message, "Book updated successfully", "success");
    } else {
      addBook();
      showMessage(message, "Book added successfully", "success");
    }

    setTimeout(function () {
      window.location.href = "books.html";
    }, 800);
  }, 400);
}

function validateBookForm() {
  let isValid = true;
  const bookName = document.getElementById("bookName").value.trim();
  const isbn = document.getElementById("isbn").value.trim();
  const publisher = document.getElementById("publisher").value.trim();
  const language = document.getElementById("language").value.trim();
  const copies = document.getElementById("copies").value.trim();
  const author = document.getElementById("author").value;
  const category = document.getElementById("category").value;

  if (!isRequired(bookName)) {
    showFieldError("bookName", "Title is required");
    isValid = false;
  } else {
    showFieldSuccess("bookName");
  }

  if (!isRequired(isbn)) {
    showFieldError("isbn", "ISBN is required");
    isValid = false;
  } else if (isIsbnDuplicate(isbn, editingBookId)) {
    showFieldError("isbn", "ISBN already exists");
    isValid = false;
  } else {
    showFieldSuccess("isbn");
  }

  if (!isRequired(publisher)) {
    showFieldError("publisher", "Publisher is required");
    isValid = false;
  } else {
    showFieldSuccess("publisher");
  }

  if (!isRequired(language)) {
    showFieldError("language", "Language is required");
    isValid = false;
  } else {
    showFieldSuccess("language");
  }

  if (!isPositiveNumber(copies)) {
    showFieldError("copies", "Copies must be a positive number");
    isValid = false;
  } else {
    showFieldSuccess("copies");
  }

  if (author == "") {
    showFieldError("author", "Author is required");
    isValid = false;
  } else {
    showFieldSuccess("author");
  }

  if (category == "") {
    showFieldError("category", "Category is required");
    isValid = false;
  } else {
    showFieldSuccess("category");
  }

  return isValid;
}

function addBook() {
  const books = getBooks();
  const copies = Number(document.getElementById("copies").value);

  const book = {
    id: getNextId(books),
    bookName: document.getElementById("bookName").value.trim(),
    isbn: document.getElementById("isbn").value.trim(),
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    publisher: document.getElementById("publisher").value.trim(),
    language: document.getElementById("language").value.trim(),
    year: new Date().getFullYear(),
    copies: copies,
    availableCopies: copies,
    status: "Available",
    borrowHistory: []
  };

  books.push(book);
  saveBooks(books);
}

function updateBook() {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id == editingBookId) {
      const oldBorrowed = Number(books[i].copies) - Number(books[i].availableCopies);
      const newCopies = Number(document.getElementById("copies").value);

      books[i].bookName = document.getElementById("bookName").value.trim();
      books[i].isbn = document.getElementById("isbn").value.trim();
      books[i].author = document.getElementById("author").value;
      books[i].category = document.getElementById("category").value;
      books[i].publisher = document.getElementById("publisher").value.trim();
      books[i].language = document.getElementById("language").value.trim();
      books[i].copies = newCopies;
      books[i].availableCopies = newCopies - oldBorrowed;

      if (books[i].availableCopies < 0) {
        books[i].availableCopies = 0;
      }

      books[i].status = getBookAvailability(books[i]);
      break;
    }
  }

  saveBooks(books);
}
