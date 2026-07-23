if (protectPage()) {
  setupStorage().then(function () {
    renderBookDetails();
  });
}

function renderBookDetails() {
  const content = renderLayout("Book Details");
  const bookId = getQueryNumber("id");
  const book = findBookById(bookId);

  const card = document.createElement("div");
  card.className = "card";

  if (book == null) {
    card.appendChild(createElementWithText("p", "Book not found"));
    card.appendChild(createLink("Back", "books.html", "btn-light"));
    content.appendChild(card);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "details-grid";

  addDetail(grid, "Title", book.bookName);
  addDetail(grid, "ISBN", book.isbn);
  addDetail(grid, "Author", book.author);
  addDetail(grid, "Category", book.category);
  addDetail(grid, "Publisher", book.publisher);
  addDetail(grid, "Language", book.language);
  addDetail(grid, "Copies", book.availableCopies + " / " + book.copies);
  addDetail(grid, "Status", getBookAvailability(book));

  const historyTitle = createElementWithText("h2", "Borrow History");
  historyTitle.style.marginTop = "22px";
  const historyBox = document.createElement("div");
  historyBox.className = "detail-box";

  renderBorrowHistory(historyBox, book);

  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.appendChild(createLink("Edit", "edit-book.html?id=" + book.id, "btn-warning"));
  actions.appendChild(createLink("Back", "books.html", "btn-light"));

  card.appendChild(grid);
  card.appendChild(historyTitle);
  card.appendChild(historyBox);
  card.appendChild(actions);
  content.appendChild(card);
}

function addDetail(parent, label, value) {
  const box = document.createElement("div");
  box.className = "detail-box";

  const strong = document.createElement("strong");
  strong.textContent = label;

  const text = document.createElement("span");
  text.textContent = value == undefined || value == "" ? "-" : value;

  box.appendChild(strong);
  box.appendChild(text);
  parent.appendChild(box);
}

function renderBorrowHistory(parent, book) {
  const history = book.borrowHistory;

  if (history == undefined || history.length == 0) {
    if (Number(book.availableCopies) < Number(book.copies)) {
      parent.appendChild(createElementWithText("p", "Some copies are borrowed. No member record is available in the old data."));
    } else {
      parent.appendChild(createElementWithText("p", "No Borrow History"));
    }
    return;
  }

  for (let i = 0; i < history.length; i++) {
    const item = document.createElement("p");
    item.textContent =
      "Member: " + history[i].memberName +
      ", Borrow Date: " + history[i].borrowDate +
      ", Return Date: " + history[i].returnDate;
    parent.appendChild(item);
  }
}
