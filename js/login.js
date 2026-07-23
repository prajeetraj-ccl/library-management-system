function renderLogin() {
  if (isLoggedIn()) {
    window.location.replace("dashboard.html");
    return;
  }

  const app = getApp();
  clearElement(app);

  const page = document.createElement("div");
  page.className = "login-page";

  const card = document.createElement("div");
  card.className = "login-card";

  const logo = document.createElement("div");
  logo.className = "login-logo";
  logo.textContent = "L";

  const title = createElementWithText("h1", "Library Management System");
  const heading = createElementWithText("h2", "Welcome Back");
  const note = createElementWithText("p", "Login to continue");
  note.className = "muted";
  note.style.textAlign = "center";

  const usernameField = createField("Username", "text", "username", "Enter username");
  const passwordField = createField("Password", "password", "password", "Enter password");

  const message = document.createElement("p");
  message.className = "message";

  const button = createButton("Login", "btn-primary");
  button.style.width = "100%";

  button.onclick = function () {
    submitLogin(button, message);
  };

  document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
      submitLogin(button, message);
    }
  });

  card.appendChild(logo);
  card.appendChild(title);
  card.appendChild(heading);
  card.appendChild(note);
  card.appendChild(usernameField);
  card.appendChild(passwordField);
  card.appendChild(message);
  card.appendChild(button);
  page.appendChild(card);
  app.appendChild(page);
}

function submitLogin(button, message) {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  let isValid = true;

  if (!isRequired(username)) {
    showFieldError("username", "Username is required");
    isValid = false;
  } else {
    showFieldSuccess("username");
  }

  if (!isRequired(password)) {
    showFieldError("password", "Password is required");
    isValid = false;
  } else if (!hasMinimumLength(password, 4)) {
    showFieldError("password", "Password must be at least 4 characters");
    isValid = false;
  } else {
    showFieldSuccess("password");
  }

  if (!isValid) {
    showMessage(message, "Please fix the errors and try again", "error");
    return;
  }

  button.disabled = true;
  button.textContent = "Logging in...";

  setTimeout(function () {
    if (loginUser(username, password)) {
      showMessage(message, "Login successful", "success");
    } else {
      button.disabled = false;
      button.textContent = "Login";
      showMessage(message, "Wrong username or password", "error");
    }
  }, 600);
}

renderLogin();
