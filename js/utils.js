function getApp() {
  return document.getElementById("app");
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createElementWithText(tagName, text) {
  const element = document.createElement(tagName);
  element.textContent = text;
  return element;
}

function createButton(text, className) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  return button;
}

function createLink(text, href, className) {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = href;
  if (className != "") {
    link.className = className;
  }
  return link;
}

function createField(labelText, inputType, id, placeholder) {
  const field = document.createElement("div");
  field.className = "field";

  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = id;

  const input = document.createElement("input");
  input.type = inputType;
  input.id = id;
  input.placeholder = placeholder;

  const error = document.createElement("span");
  error.className = "error-text";
  error.id = id + "Error";

  field.appendChild(label);
  field.appendChild(input);
  field.appendChild(error);
  return field;
}

function createSelectField(labelText, id, options) {
  const field = document.createElement("div");
  field.className = "field";

  const label = document.createElement("label");
  label.textContent = labelText;
  label.htmlFor = id;

  const select = document.createElement("select");
  select.id = id;

  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("option");
    option.value = options[i];
    option.textContent = options[i] == "" ? "Select" : options[i];
    select.appendChild(option);
  }

  const error = document.createElement("span");
  error.className = "error-text";
  error.id = id + "Error";

  field.appendChild(label);
  field.appendChild(select);
  field.appendChild(error);
  return field;
}

function showFieldError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "Error");
  const field = input.parentElement;

  field.classList.remove("valid");
  field.classList.add("invalid");
  error.textContent = message;
}

function showFieldSuccess(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "Error");
  const field = input.parentElement;

  field.classList.remove("invalid");
  field.classList.add("valid");
  error.textContent = "";
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = "message " + type;
}

function showToast(text, type) {
  const toast = document.createElement("div");
  toast.className = "toast " + type;
  toast.textContent = text;
  document.body.appendChild(toast);

  setTimeout(function () {
    if (toast.parentElement) {
      toast.parentElement.removeChild(toast);
    }
  }, 2200);
}

function showConfirm(message) {
  return window.confirm(message);
}

function debounce(callback, delay) {
  let timer = null;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
}

function getQueryNumber(name) {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get(name));
}

function getNextId(items) {
  let maxId = 0;

  for (let i = 0; i < items.length; i++) {
    if (items[i].id > maxId) {
      maxId = items[i].id;
    }
  }

  return maxId + 1;
}

function createTable(headers) {
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for (let i = 0; i < headers.length; i++) {
    const th = document.createElement("th");
    th.textContent = headers[i];
    tr.appendChild(th);
  }

  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(document.createElement("tbody"));
  return table;
}

function paginate(items, page, rowsPerPage) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageItems = [];

  for (let i = start; i < end && i < items.length; i++) {
    pageItems.push(items[i]);
  }

  return pageItems;
}

function sortItems(items, field) {
  items.sort(function (a, b) {
    if (typeof a[field] == "number") {
      return a[field] - b[field];
    }
    return String(a[field]).localeCompare(String(b[field]));
  });
}
