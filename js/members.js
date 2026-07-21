if(sessionStorage.getItem("login")!="true"){
    window.location.href="index.html";
}
fetch("../data/members.json")
.then(function(response){
    return response.json();
})
.then(function(members){
    const table = document.querySelector("table");
    for(let i=0;i<members.length;i++){
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${members[i].id}</td>
            <td>${members[i].memberName}</td>
            <td>${members[i].mobile}</td>
            <td>${members[i].email}</td>
            <td>${members[i].status}</td>
            <td>
                <a href="member-details.html">View</a>
            </td>
        `;
        table.appendChild(row);
    }
});