function dynamicUI(){
    const divElement=document.createElement("div");
    divElement.classList.add("div-container");
    
    const logo=document.createElement("div");
    logo.innerHTML="📚";
    logo.style.fontSize="50px";
    logo.style.textAlign="center";

    const title=document.createElement("h2");
    title.innerHTML="Library Management System";
    title.style.textAlign="center";

    const welcome=document.createElement("h3");
    welcome.innerHTML="Welcome Back";
    welcome.style.textAlign="center";

    const description=document.createElement("p");
    description.innerHTML="Login to continue";
    description.style.textAlign="center";
    description.style.color="gray";

    const usernameLabel=document.createElement("label");
    usernameLabel.innerHTML="Username";

    const username=document.createElement("input");
    username.type="text";
    username.placeholder="Enter Username";
    username.id="username_id";
    username.classList.add("username-container");

    const passwordLabel=document.createElement("label");
    passwordLabel.innerHTML="Password";

    const password=document.createElement("input");
    password.type="password";
    password.placeholder="Enter Password";
    password.id="password_id";
    password.classList.add("username-container");

    const rememberDiv=document.createElement("div");
    const remember=document.createElement("input");
    remember.type="checkbox";
    const rememberLabel=document.createElement("label");
    rememberLabel.innerHTML=" Remember Me";
    rememberDiv.appendChild(remember);
    rememberDiv.appendChild(rememberLabel);

    const error=document.createElement("p");
    error.id="error_msg";

    const button=document.createElement("button");
    button.innerHTML="Login";
    button.id="btn_id";

    button.onclick=function(){
        const user=document.getElementById("username_id").value;
        const pass=document.getElementById("password_id").value;
        if(user==""){ 
            error.innerHTML="Username is required";
            return;
        }
        if(pass==""){
            error.innerHTML="Password is required";
            return;
        }
        if(user=="admin" && pass=="1234"){
            sessionStorage.setItem("login","true");
            window.location.href="dashboard.html";
        }
        else{
            error.innerHTML="Invalid Username or Password";
        }
    }

    const version=document.createElement("p");
    version.innerHTML="Version 1.0.0";
    version.style.textAlign="center";
    version.style.color="gray";
    version.style.fontSize="12px";
    version.style.marginTop="20px";

    divElement.appendChild(logo);
    divElement.appendChild(title);
    divElement.appendChild(welcome);
    divElement.appendChild(description);
    divElement.appendChild(usernameLabel);
    divElement.appendChild(username);
    divElement.appendChild(passwordLabel);
    divElement.appendChild(password);
    divElement.appendChild(error);
    divElement.appendChild(rememberDiv);
    divElement.appendChild(button);
    divElement.appendChild(version);
    document.body.appendChild(divElement);
}

dynamicUI();