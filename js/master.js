let masterType = "";
let masterItems = [];
let masterVisibleItems = [];
let masterEditId = 0;
let masterSearch = "";
let masterPage = 1;
let masterRows = 5;

if (protectPage()) {
  setupStorage().then(function () {
    if (window.location.pathname.indexOf("authors.html") != -1) {
      masterType = "author";
    } else {
      masterType = "category";
    }
    renderMasterPage();
  });
}

function renderMasterPage() {
  const pageTitle = masterType == "author" ? "Authors" : "Categories";
  const content = renderLayout(pageTitle);
  const card = document.createElement("div");
  card.className = "card";
  masterItems = getMasterItems();
  const form = document.createElement("div");
  form.className = "toolbar";
  const nameField = createField(getMasterLabel(), "text", "masterName", "Enter " + getMasterLabel().toLowerCase());

  const save = createButton("Save", "btn-primary");
  save.id = "masterSave";
  save.onclick = saveMasterForm;

  const cancel = createButton("Cancel Edit", "btn-light");
  cancel.onclick = clearMasterForm;

  const search = document.createElement("input");
  search.placeholder = "Search";
  search.onkeyup = debounce(function () {
    masterSearch = search.value.toLowerCase();
    masterPage = 1;
    applyMasterFilters();
  }, 300);

  const sort = document.createElement("select");
  sort.id = "masterSort";
  const sortOption = document.createElement("option");
  sortOption.value = "name";
  sortOption.textContent = "Sort by name";
  sort.appendChild(sortOption);
  sort.onchange = applyMasterFilters;

  const rowSelect = document.createElement("select");
  rowSelect.id = "masterRows";
  addOption(rowSelect, "5", "Rows 5");
  addOption(rowSelect, "10", "Rows 10");
  addOption(rowSelect, "15", "Rows 15");
  rowSelect.onchange = function () {
    masterRows = Number(rowSelect.value);
    masterPage = 1;
    applyMasterFilters();
  };

  const buttonRow = document.createElement("div");
  buttonRow.className = "button-row";
  buttonRow.appendChild(save);
  buttonRow.appendChild(cancel);
  form.appendChild(nameField);
  form.appendChild(search);
  form.appendChild(sort);
  form.appendChild(rowSelect);
  form.appendChild(buttonRow);

  const total = document.createElement("p");
  total.id = "masterTotal";
  total.className = "muted";

  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap";
  const table = createTable(["ID", getMasterLabel(), "Action"]);
  table.id = "masterTable";
  tableWrap.appendChild(table);

  const empty = document.createElement("div");
  empty.id = "masterEmpty";
  empty.className = "empty-state";
  empty.textContent = "No Records Found";

  const pagination = document.createElement("div");
  pagination.id = "masterPagination";
  pagination.className = "pagination";

  card.appendChild(form);
  card.appendChild(total);
  card.appendChild(tableWrap);
  card.appendChild(empty);
  card.appendChild(pagination);
  content.appendChild(card);

  applyMasterFilters();
}

function addOption(select, value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.appendChild(option);
}

function getMasterItems() {
  if (masterType == "author") {
    return getAuthors();
  }
  return getCategories();
}

function saveMasterItems(items) {
  if (masterType == "author") {
    saveAuthors(items);
  } else {
    saveCategories(items);
  }
}

function getMasterField() {
  if (masterType == "author") {
    return "authorName";
  }
  return "categoryName";
}

function getMasterLabel() {
  if (masterType == "author") {
    return "Author Name";
  }
  return "Category Name";
}

function saveMasterForm() {
  const name = document.getElementById("masterName").value.trim();
  const field = getMasterField();
  let isValid = true;

  if (!isRequired(name)) {
    showFieldError("masterName", getMasterLabel() + " is required");
    isValid = false;
  } else if (!hasMinimumLength(name, 3)) {
    showFieldError("masterName", "Minimum 3 letters required");
    isValid = false;
  } else if (!hasMaximumLength(name, 50)) {
    showFieldError("masterName", "Maximum 50 letters allowed");
    isValid = false;
  } else if (isDuplicateName(masterItems, field, name, masterEditId)) {
    showFieldError("masterName", "Duplicate name is not allowed");
    isValid = false;
  } else {
    showFieldSuccess("masterName");
  }

  if (!isValid) {
    return;
  }

  if (masterEditId > 0) {
    updateMaster(name);
    showToast(getMasterLabel() + " updated successfully", "success");
  } else {
    addMaster(name);
    showToast(getMasterLabel() + " added successfully", "success");
  }

  clearMasterForm();
  applyMasterFilters();
}

function addMaster(name) {
  const item = {
    id: getNextId(masterItems)
  };

  item[getMasterField()] = name;
  masterItems.push(item);
  saveMasterItems(masterItems);
}

function updateMaster(name) {
  for (let i = 0; i < masterItems.length; i++) {
    if (masterItems[i].id == masterEditId) {
      masterItems[i][getMasterField()] = name;
      break;
    }
  }

  saveMasterItems(masterItems);
}

function clearMasterForm() {
  masterEditId = 0;
  document.getElementById("masterName").value = "";
  document.getElementById("masterSave").textContent = "Save";

  const field = document.getElementById("masterName").parentElement;
  field.classList.remove("valid");
  field.classList.remove("invalid");
  document.getElementById("masterNameError").textContent = "";
}

function applyMasterFilters() {
  masterVisibleItems = [];
  const field = getMasterField();

  for (let i = 0; i < masterItems.length; i++) {
    if (masterItems[i][field].toLowerCase().indexOf(masterSearch) != -1) {
      masterVisibleItems.push(masterItems[i]);
    }
  }

  sortItems(masterVisibleItems, field);
  renderMasterRows();
}

function renderMasterRows() {
  const table = document.getElementById("masterTable");
  const tbody = table.querySelector("tbody");
  clearElement(tbody);

  const rows = paginate(masterVisibleItems, masterPage, masterRows);
  const field = getMasterField();

  for (let i = 0; i < rows.length; i++) {
    const item = rows[i];
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.textContent = item.id;
    const nameCell = document.createElement("td");
    nameCell.textContent = item[field];
    const actionCell = document.createElement("td");
    actionCell.appendChild(createMasterActions(item));

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(actionCell);
    tbody.appendChild(row);
  }

  document.getElementById("masterTotal").textContent = "Total: " + masterVisibleItems.length;
  document.getElementById("masterEmpty").style.display = masterVisibleItems.length == 0 ? "block" : "none";
  table.style.display = masterVisibleItems.length == 0 ? "none" : "table";
  renderMasterPagination();
}

function createMasterActions(item) {
  const actions = document.createElement("div");
  actions.className = "actions";

  const edit = createButton("Edit", "btn-warning btn-small");
  edit.onclick = function () {
    masterEditId = item.id;
    document.getElementById("masterName").value = item[getMasterField()];
    document.getElementById("masterSave").textContent = "Update";
  };

  const remove = createButton("Delete", "btn-danger btn-small");
  remove.onclick = function () {
    deleteMaster(item.id);
  };

  actions.appendChild(edit);
  actions.appendChild(remove);
  return actions;
}

function deleteMaster(id) {
  if (!showConfirm("Delete this record?")) {
    return;
  }

  for (let i = 0; i < masterItems.length; i++) {
    if (masterItems[i].id == id) {
      masterItems.splice(i, 1);
      break;
    }
  }

  saveMasterItems(masterItems);
  clearMasterForm();
  applyMasterFilters();
  showToast("Record deleted successfully", "success");
}

function renderMasterPagination() {
  const pagination = document.getElementById("masterPagination");
  clearElement(pagination);

  const totalPages = Math.ceil(masterVisibleItems.length / masterRows);
  const left = document.createElement("div");
  const right = document.createElement("div");
  right.className = "page-buttons";

  left.textContent = "Page " + masterPage + " of " + (totalPages == 0 ? 1 : totalPages);

  const prev = createButton("Previous", "btn-light");
  prev.disabled = masterPage == 1;
  prev.onclick = function () {
    masterPage--;
    renderMasterRows();
  };
  right.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createButton(String(i), masterPage == i ? "btn-primary" : "btn-light");
    pageButton.onclick = function () {
      masterPage = i;
      renderMasterRows();
    };
    right.appendChild(pageButton);
  }

  const next = createButton("Next", "btn-light");
  next.disabled = masterPage >= totalPages;
  next.onclick = function () {
    masterPage++;
    renderMasterRows();
  };
  right.appendChild(next);

  pagination.appendChild(left);
  pagination.appendChild(right);
}
