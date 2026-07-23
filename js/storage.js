function fetchJson(fileName) {
  return fetch("data/" + fileName)
    .then(function (response) {
      return response.json();
    });
}

function loadInitialData(key, fileName) {
  const savedData = localStorage.getItem(key);

  if (savedData != null) {
    return Promise.resolve(JSON.parse(savedData));
  }

  // Fetch JSON only once. After this, the app uses localStorage.
  return fetchJson(fileName).then(function (data) {
    localStorage.setItem(key, JSON.stringify(data));
    return data;
  });
}

function getData(key) {
  const data = localStorage.getItem(key);
  if (data == null) {
    return [];
  }
  return JSON.parse(data);
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function setupStorage() {
  return Promise.all([
    loadInitialData("books", "books.json"),
    loadInitialData("members", "members.json"),
    loadInitialData("authors", "authors.json"),
    loadInitialData("categories", "categories.json")
  ]).then(function () {
    fixOldData();
  });
}

function fixOldData() {
  const books = getBooks();
  const members = getMembers();

  // Old records did not have every new field. Add safe default values.
  for (let i = 0; i < books.length; i++) {
    if (books[i].year == undefined) {
      books[i].year = 2026;
    }
    if (books[i].borrowHistory == undefined) {
      books[i].borrowHistory = [];
    }
    if (books[i].availableCopies == undefined) {
      books[i].availableCopies = books[i].copies;
    }
  }

  for (let j = 0; j < members.length; j++) {
    if (members[j].memberCode == undefined) {
      let textId = String(members[j].id);
      while (textId.length < 3) {
        textId = "0" + textId;
      }
      members[j].memberCode = "MEM" + textId;
    }
  }

  saveBooks(books);
  saveMembers(members);
}

function getBooks() {
  return getData("books");
}

function saveBooks(books) {
  saveData("books", books);
}

function getMembers() {
  return getData("members");
}

function saveMembers(members) {
  saveData("members", members);
}

function getAuthors() {
  return getData("authors");
}

function saveAuthors(authors) {
  saveData("authors", authors);
}

function getCategories() {
  return getData("categories");
}

function saveCategories(categories) {
  saveData("categories", categories);
}
