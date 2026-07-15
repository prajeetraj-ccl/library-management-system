function dynamicUI() {
  const divElement = document.createElement("div");
  divElement.setAttribute("id", "divElementId");
  divElement.classList.add("div-container");

  const paraElement = document.createElement("p");
  paraElement.innerHTML = "Library Management System";
  paraElement.style.textAlign = "center";
  paraElement.style.fontSize = "20px";
  paraElement.style.fontWeight = "bold";
  paraElement.style.color = "#2563EB";
  paraElement.style.marginBottom = "30px";
  paraElement.style.display = "felx";
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
  btnContainer.style.justifyContent = "centre";

  const btnElement = document.createElement("button");
  btnElement.innerHTML = "Login";
  btnElement.id = "btn_id";
  btnElement.type = "button";

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
      error.innerHTML = "";
      window.location.href = "dashboard.html";
    } else {
      error.innerHTML = "Invalid Username or Password";
    }
  };

  btnContainer.appendChild(btnElement);
  divElement.appendChild(paraElement);
  divElement.appendChild(usernameLabel);
  divElement.appendChild(inputElement);
  divElement.appendChild(passwordLabel);
  divElement.appendChild(passwordElement);
  divElement.appendChild(errorMessage);
  divElement.appendChild(btnContainer);

  document.body.appendChild(divElement);
}
dynamicUI();
