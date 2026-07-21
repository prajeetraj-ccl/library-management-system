if (sessionStorage.getItem("login") != "true") {
    window.location.href = "index.html";
}

fetch("../data/books.json")
.then(function(response){
    return response.json();
})
.then(function(books){

    const table = document.querySelector("table");

    for(let i=0;i<books.length;i++){

        const row=document.createElement("tr");

        row.innerHTML=`
            <td>${books[i].id}</td>
            <td>${books[i].bookName}</td>
            <td>${books[i].author}</td>
            <td>${books[i].category}</td>
            <td>${books[i].status}</td>
            <td><a href="book-details.html">View</a></td>
        `;

        table.appendChild(row);

    }

})
.catch(function(error){
    console.log(error);
});