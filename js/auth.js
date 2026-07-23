function isLoggedIn() {
  return sessionStorage.getItem("login") == "true";
}

function protectPage() {
  if (!isLoggedIn()) {
    history.replaceState(null, "", "index.html");
    window.location.replace("index.html");
    return false;
  }
  history.replaceState(null, "", window.location.href);
  return true;
}

function loginUser(username, password) {
  if (username == "admin" && password == "1234") {
    sessionStorage.setItem("login", "true");
    history.replaceState(null, "", "dashboard.html");
    window.location.replace("dashboard.html");
    return true;
  }
  return false;
}

function logoutUser() {
  sessionStorage.clear();
  history.replaceState(null, "", "index.html");
  window.location.replace("index.html");
}

window.onpopstate = function () {
  if (!isLoggedIn() && window.location.pathname.indexOf("index.html") == -1) {
    window.location.replace("index.html");
  }
};
