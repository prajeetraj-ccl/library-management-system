console.log("Dashboard JS Loaded");

if (sessionStorage.getItem("login") !== "true") {
    window.location.href = "index.html";
}

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", function () {
    console.log("Logout Clicked");
    sessionStorage.removeItem("login");
    window.location.href = "index.html";

});