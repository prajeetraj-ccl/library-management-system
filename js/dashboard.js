if(sessionStorage.getItem("login")!="true"){
    window.location.href="index.html";
}

function dashboardUI(){
    const header=document.createElement("div");
    header.classList.add("header");

    const title=document.createElement("h2");
    title.innerHTML="Library Dashboard";

    const logout=document.createElement("button");
    logout.id="logout";
    logout.innerHTML="Logout";

    logout.onclick=function(){
        sessionStorage.removeItem("login");
        window.location.href="index.html";
    }

    header.appendChild(title);
    header.appendChild(logout);

    const container=document.createElement("div");
    container.classList.add("container");

    const welcome=document.createElement("h2");
    welcome.innerHTML="Welcome Librarian ";

    container.appendChild(welcome);

    const cardContainer=document.createElement("div");
    cardContainer.classList.add("card-container");

    function createCard(name,value){
        const card=document.createElement("div");
        card.classList.add("card");

        const title=document.createElement("h3");
        title.innerHTML=name;

        const count=document.createElement("p");
        count.innerHTML=value;

        card.appendChild(title);
        card.appendChild(count);

        return card;

    }

    cardContainer.appendChild(createCard("Books","120"));
    cardContainer.appendChild(createCard("Members","50"));
    cardContainer.appendChild(createCard("Borrowed","25"));
    cardContainer.appendChild(createCard("Returned","95"));
    container.appendChild(cardContainer);

    const menu=document.createElement("div");
    menu.classList.add("menu");

    const books=document.createElement("a");
    books.href="books.html";
    books.innerHTML="📚 Books";

    const members=document.createElement("a");
    members.href="members.html";
    members.innerHTML="👤 Members";

    menu.appendChild(books);
    menu.appendChild(members);
    container.appendChild(menu);
    document.body.appendChild(header);
    document.body.appendChild(container);

}

dashboardUI();