if (protectPage()) {
  setupStorage().then(function () {
    renderDashboard();
  });
}

function renderDashboard() {
  const content = renderLayout("Dashboard");
  const books = getBooks();
  const members = getMembers();
  let borrowedCount = 0;
  let availableCount = 0;

  for (let i = 0; i < books.length; i++) {
    if (books[i].availableCopies < books[i].copies) {
      borrowedCount = borrowedCount + (books[i].copies - books[i].availableCopies);
    }
    if (books[i].availableCopies > 0) {
      availableCount = availableCount + books[i].availableCopies;
    }
  }

  const grid = document.createElement("div");
  grid.className = "stats-grid";

  grid.appendChild(createStatCard("Books", books.length));
  grid.appendChild(createStatCard("Members", members.length));
  grid.appendChild(createStatCard("Borrowed Copies", borrowedCount));
  grid.appendChild(createStatCard("Available Copies", availableCount));

  content.appendChild(grid);

  const card = document.createElement("div");
  card.className = "card";
  card.style.marginTop = "18px";

  const heading = createElementWithText("h2", "Quick Actions");
  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.appendChild(createLink("Add Book", "add-book.html", "btn-primary"));
  actions.appendChild(createLink("Register Member", "add-members.html", "btn-success"));
  actions.appendChild(createLink("Manage Authors", "authors.html", "btn-light"));
  actions.appendChild(createLink("Manage Categories", "categories.html", "btn-light"));

  card.appendChild(heading);
  card.appendChild(actions);
  content.appendChild(card);
}

function createStatCard(name, value) {
  const card = document.createElement("div");
  card.className = "card stat-card";

  const title = createElementWithText("h3", name);
  const count = createElementWithText("p", String(value));

  card.appendChild(title);
  card.appendChild(count);
  return card;
}
