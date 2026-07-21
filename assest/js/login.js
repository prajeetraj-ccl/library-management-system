function dynamicUI() {
  const divElement = document.createElement("div");
  divElement.setAttribute("id", "divElementId");
  divElement.classList.add("div-container");

  const paraElement = document.createElement("p");
  paraElement.innerHTML = "Library Management System";
  paraElement.style.textAlign = "center";
  paraElement.style.fontSize = "20px";
  paraElement.style.fontWeight = "bold";
  paraElement.style.color = "#01050f";
  paraElement.style.marginBottom = "30px";
  paraElement.style.display = "flex";
  paraElement.style.justifyContent = "center";

  const usernameLabel = document.createElement("label");
  usernameLabel.innerHTML = "Username";
  usernameLabel.style.display = "block";
  usernameLabel.style.marginBottom = "5px";
  usernameLabel.style.fontWeight = "bold";

  const inputElement = document.createElement("input");
  inputElement.style.padding = "10px";
  inputElement.placeholder = "Enter Username";
  inputElement.id = "username_id";
  inputElement.type = "text";
  inputElement.classList.add("username-container");

  const passwordLabel = document.createElement("label");
  passwordLabel.innerHTML = "Password";
  passwordLabel.style.display = "block";
  passwordLabel.style.marginBottom = "5px";
  passwordLabel.style.fontWeight = "bold";

  const passwordElement = document.createElement("input");
  passwordElement.style.padding = "10px";
  passwordElement.placeholder = "Enter Password";
  passwordElement.id = "password_id";
  passwordElement.type = "password";
  passwordElement.classList.add("username-container");

  const errorMessage = document.createElement("p");
  errorMessage.id = "error_msg";
  errorMessage.style.color = "#EF4444";
  errorMessage.style.fontSize = "14px";
  errorMessage.style.margin = "5px 0";

  const btnContainer = document.createElement("div");
  btnContainer.style.display = "flex";
  btnContainer.style.justifyContent = "center";

  const btnElement = document.createElement("button");
  btnElement.innerHTML = "Login";
  btnElement.id = "btn_id";
  btnElement.type = "button";
// Logo
const logo = document.createElement("div");
logo.innerHTML = "📚";
logo.style.fontSize = "50px";
logo.style.textAlign = "center";

// Welcome Text
const welcomeText = document.createElement("h3");
welcomeText.innerHTML = "Welcome Back, Librarian!";
welcomeText.style.textAlign = "center";
welcomeText.style.margin = "10px 0 5px 0";

// Description
const description = document.createElement("p");
description.innerHTML = "Manage your library efficiently";
description.style.textAlign = "center";
description.style.color = "#6B7280";
description.style.fontSize = "14px";
description.style.marginBottom = "25px";
const rememberDiv = document.createElement("div");
rememberDiv.style.marginBottom = "15px";

const rememberCheck = document.createElement("input");
rememberCheck.type = "checkbox";
rememberCheck.id = "remember";

const rememberLabel = document.createElement("label");
rememberLabel.innerHTML = " Remember Me";
rememberLabel.htmlFor = "remember";
const version = document.createElement("p");
version.innerHTML = "Version 1.0.0";
version.style.textAlign = "center";
version.style.color = "#6B7280";
version.style.fontSize = "12px";
version.style.marginTop = "20px";

  btnElement.onclick = function () {
    const username = document.getElementById("username_id").value;
    const password = document.getElementById("password_id").value;
    const error = document.getElementById("error_msg");
    if (username === "") {
        error.innerHTML = "Username is required";
        return;
    }
    if (password === "") {
        error.innerHTML = "Password is required";
        return;
    }
    if (username === "admin" && password === "1234") {
        sessionStorage.setItem("login", "true");
        window.location.href = "dashboard.html";
    } else {
        error.innerHTML = "Invalid Username or Password";
    }
};
  divElement.appendChild(logo);
divElement.appendChild(paraElement);
divElement.appendChild(welcomeText);
divElement.appendChild(description);

divElement.appendChild(usernameLabel);
divElement.appendChild(inputElement);

divElement.appendChild(passwordLabel);
divElement.appendChild(passwordElement);

divElement.appendChild(errorMessage);

  btnContainer.appendChild(btnElement);
  
  divElement.appendChild(usernameLabel);
  divElement.appendChild(inputElement);
  divElement.appendChild(passwordLabel);
  divElement.appendChild(passwordElement);
  divElement.appendChild(errorMessage);
  
divElement.appendChild(rememberDiv);

divElement.appendChild(btnContainer);

divElement.appendChild(version);
  rememberDiv.appendChild(rememberCheck);
  rememberDiv.appendChild(rememberLabel);
  divElement.appendChild(btnContainer);

  document.body.appendChild(divElement);
}
dynamicUI();
