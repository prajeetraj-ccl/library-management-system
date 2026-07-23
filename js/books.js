let allBooks = [];
let visibleBooks = [];
let currentPage = 1;
let rowsPerPage = 5;
let searchText = "";

if (protectPage()) {
  setupStorage().then(function () {
    allBooks = getBooks();
    sortItems(allBooks, "bookName");
    visibleBooks = allBooks.slice();
    renderBooksPage();
  });
}

function renderBooksPage() {
  const content = renderLayout("Books");

  const card = document.createElement("div");
  card.className = "card";

  const toolbar = createBookToolbar();
  const total = document.createElement("p");
  total.id = "totalBooks";
  total.className = "muted";

  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  const table = createTable(["ID", "Title", "Author", "ISBN", "Category", "Language", "Copies", "Availability", "Action"]);
  table.id = "booksTable";
  tableWrap.appendChild(table);

  const empty = document.createElement("div");
  empty.id = "emptyBooks";
  empty.className = "empty-state";
  empty.textContent = "No Records Found";

  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.className = "pagination";

  card.appendChild(toolbar);
  card.appendChild(total);
  card.appendChild(tableWrap);
  card.appendChild(empty);
  card.appendChild(pagination);
  content.appendChild(card);

  applyBookFilters();
}

function createBookToolbar() {
  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";

  const search = document.createElement("input");
  search.id = "searchBook";
  search.placeholder = "Search title, ISBN, author";
  search.onkeyup = debounce(function () {
    searchText = search.value.toLowerCase();
    currentPage = 1;
    applyBookFilters();
  }, 300);

  const category = createToolbarSelect("categoryFilter", "All Categories", getUniqueBookValues("category"));
  const author = createToolbarSelect("authorFilter", "All Authors", getUniqueBookValues("author"));
  const language = createToolbarSelect("languageFilter", "All Languages", getUniqueBookValues("language"));
  const status = createToolbarSelect("statusFilter", "All Status", ["Available", "Partially Available", "Out of Stock"]);
  const sort = createToolbarSelect("sortBooks", "Sort By", ["Title", "Author", "Year", "Copies"]);
  const rows = createToolbarSelect("rowsPerPage", "Rows", ["5", "10", "15"]);

  category.onchange = resetPageAndFilter;
  author.onchange = resetPageAndFilter;
  language.onchange = resetPageAndFilter;
  status.onchange = resetPageAndFilter;
  sort.onchange = resetPageAndFilter;
  rows.onchange = function () {
    rowsPerPage = Number(rows.value);
    resetPageAndFilter();
  };

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";

  const reset = createButton("Reset", "btn-light");
  reset.onclick = function () {
    search.value = "";
    category.value = "";
    author.value = "";
    language.value = "";
    status.value = "";
    sort.value = "";
    rows.value = "5";
    rowsPerPage = 5;
    searchText = "";
    resetPageAndFilter();
  };

  const add = createLink("Add Book", "add-book.html", "btn-primary");
  buttonRow.appendChild(reset);
  buttonRow.appendChild(add);

  toolbar.appendChild(search);
  toolbar.appendChild(category);
  toolbar.appendChild(author);
  toolbar.appendChild(language);
  toolbar.appendChild(status);
  toolbar.appendChild(sort);
  toolbar.appendChild(rows);
  toolbar.appendChild(buttonRow);
  return toolbar;
}

function createToolbarSelect(id, firstText, values) {
  const select = document.createElement("select");
  select.id = id;

  const first = document.createElement("option");
  first.value = "";
  first.textContent = firstText;
  select.appendChild(first);

  for (let i = 0; i < values.length; i++) {
    const option = document.createElement("option");
    option.value = values[i];
    option.textContent = values[i];
    select.appendChild(option);
  }

  return select;
}

function resetPageAndFilter() {
  currentPage = 1;
  applyBookFilters();
}

function applyBookFilters() {
  visibleBooks = [];

  const category = document.getElementById("categoryFilter").value;
  const author = document.getElementById("authorFilter").value;
  const language = document.getElementById("languageFilter").value;
  const status = document.getElementById("statusFilter").value;
  const sortValue = document.getElementById("sortBooks").value;

  for (let i = 0; i < allBooks.length; i++) {
    const book = allBooks[i];
    const availability = getBookAvailability(book);
    const matchSearch =
      book.bookName.toLowerCase().indexOf(searchText) != -1 ||
      book.isbn.toLowerCase().indexOf(searchText) != -1 ||
      book.author.toLowerCase().indexOf(searchText) != -1;

    if (!matchSearch) {
      continue;
    }
    if (category != "" && book.category != category) {
      continue;
    }
    if (author != "" && book.author != author) {
      continue;
    }
    if (language != "" && book.language != language) {
      continue;
    }
    if (status != "" && availability != status) {
      continue;
    }

    visibleBooks.push(book);
  }

  if (sortValue == "Title") {
    sortItems(visibleBooks, "bookName");
  } else if (sortValue == "Author") {
    sortItems(visibleBooks, "author");
  } else if (sortValue == "Year") {
    sortItems(visibleBooks, "year");
  } else if (sortValue == "Copies") {
    sortItems(visibleBooks, "copies");
  } else {
    sortItems(visibleBooks, "bookName");
  }

  renderBookRows();
}

function renderBookRows() {
  const table = document.getElementById("booksTable");
  const tbody = table.querySelector("tbody");
  clearElement(tbody);

  const pageBooks = paginate(visibleBooks, currentPage, rowsPerPage);

  for (let i = 0; i < pageBooks.length; i++) {
    const book = pageBooks[i];
    const row = document.createElement("tr");

    addCell(row, book.id);
    addCell(row, book.bookName);
    addCell(row, book.author);
    addCell(row, book.isbn);
    addCell(row, book.category);
    addCell(row, book.language);
    addCell(row, book.availableCopies + " / " + book.copies);

    const availabilityCell = document.createElement("td");
    availabilityCell.appendChild(createAvailabilityBadge(book));
    row.appendChild(availabilityCell);

    const actionCell = document.createElement("td");
    actionCell.appendChild(createBookActions(book));
    row.appendChild(actionCell);
    tbody.appendChild(row);
  }

  document.getElementById("totalBooks").textContent = "Total Books: " + visibleBooks.length;
  document.getElementById("emptyBooks").style.display = visibleBooks.length == 0 ? "block" : "none";
  table.style.display = visibleBooks.length == 0 ? "none" : "table";
  renderBookPagination();
}

function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text == undefined ? "" : text;
  row.appendChild(cell);
}

function createAvailabilityBadge(book) {
  const badge = document.createElement("span");
  const availability = getBookAvailability(book);
  badge.textContent = availability;
  badge.className = "badge success";

  if (availability == "Partially Available") {
    badge.className = "badge warning";
  }
  if (availability == "Out of Stock") {
    badge.className = "badge danger";
  }

  return badge;
}

function createBookActions(book) {
  const actions = document.createElement("div");
  actions.className = "actions";

  actions.appendChild(createLink("View", "book-details.html?id=" + book.id, "btn-light btn-small"));
  actions.appendChild(createLink("Edit", "edit-book.html?id=" + book.id, "btn-warning btn-small"));

  const deleteButton = createButton("Delete", "btn-danger btn-small");
  deleteButton.onclick = function () {
    handleDeleteBook(book.id);
  };
  actions.appendChild(deleteButton);

  return actions;
}

function handleDeleteBook(id) {
  const book = findBookById(id);

  if (!canDeleteBook(book)) {
    showToast("Cannot delete borrowed books", "error");
    return;
  }

  if (showConfirm("Delete this book?")) {
    deleteBookById(id);
    allBooks = getBooks();
    applyBookFilters();
    showToast("Book deleted successfully", "success");
  }
}

function renderBookPagination() {
  const pagination = document.getElementById("pagination");
  clearElement(pagination);

  const totalPages = Math.ceil(visibleBooks.length / rowsPerPage);
  const left = document.createElement("div");
  const right = document.createElement("div");
  right.className = "page-buttons";

  left.textContent = "Page " + currentPage + " of " + (totalPages == 0 ? 1 : totalPages);

  const prev = createButton("Previous", "btn-light");
  prev.disabled = currentPage == 1;
  prev.onclick = function () {
    if (currentPage > 1) {
      currentPage--;
      renderBookRows();
    }
  };

  right.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createButton(String(i), currentPage == i ? "btn-primary" : "btn-light");
    pageButton.onclick = function () {
      currentPage = i;
      renderBookRows();
    };
    right.appendChild(pageButton);
  }

  const next = createButton("Next", "btn-light");
  next.disabled = currentPage >= totalPages;
  next.onclick = function () {
    if (currentPage < totalPages) {
      currentPage++;
      renderBookRows();
    }
  };
  right.appendChild(next);

  pagination.appendChild(left);
  pagination.appendChild(right);
}
