if (sessionStorage.getItem("login") != "true") {
    window.location.href = "index.html";
}

document.getElementById("saveBtn").onclick = function () {
    const bookName = document.getElementById("book_name").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;
    const message = document.getElementById("message");
    if (bookName == "") {
        message.innerHTML = "Book Name is required";
        message.style.color = "red";
        return;
    }
    if (author == "") {
        message.innerHTML = "Author Name is required";
        message.style.color = "red";
        return;
    }
    if (category == "") {
        message.innerHTML = "Category is required";
        message.style.color = "red";
        return;
    }
    message.innerHTML = "Book Added Successfully";
    message.style.color = "green";
};