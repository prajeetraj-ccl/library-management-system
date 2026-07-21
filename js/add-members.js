if(sessionStorage.getItem("login")!="true"){
    window.location.href="index.html";
}

document.getElementById("saveBtn").onclick=function(){
    const name=document.getElementById("member_name").value;
    const mobile=document.getElementById("mobile").value;
    const email=document.getElementById("email").value;
    const status=document.getElementById("status").value;
    const message=document.getElementById("message");
    if(name==""){
        message.innerHTML="Member Name is required";
        message.style.color="red";
        return;
    }
    if(mobile==""){
        message.innerHTML="Mobile Number is required";
        message.style.color="red";
        return;
    }
    if(email==""){
        message.innerHTML="Email is required";
        message.style.color="red";
        return;
    }
    message.innerHTML="Member Added Successfully";
    message.style.color="green";
    
    console.log(name);
    console.log(mobile);
    console.log(email);
    console.log(status);

}