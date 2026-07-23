function getBookAvailability(book) {
  if (Number(book.availableCopies) == 0) {
    return "Out of Stock";
  }

  if (Number(book.availableCopies) < Number(book.copies)) {
    return "Partially Available";
  }

  return "Available";
}

function findBookById(id) {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      return books[i];
    }
  }

  return null;
}

function isIsbnDuplicate(isbn, editId) {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].isbn.toLowerCase() == isbn.toLowerCase() && books[i].id != editId) {
      return true;
    }
  }

  return false;
}

function canDeleteBook(book) {
  return Number(book.availableCopies) == Number(book.copies);
}

function deleteBookById(id) {
  const books = getBooks();

  for (let i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books.splice(i, 1);
      saveBooks(books);
      return true;
    }
  }

  return false;
}

function getUniqueBookValues(field) {
  const books = getBooks();
  const values = [];

  for (let i = 0; i < books.length; i++) {
    if (values.indexOf(books[i][field]) == -1) {
      values.push(books[i][field]);
    }
  }

  values.sort();
  return values;
}
