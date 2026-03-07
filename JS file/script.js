document.getElementById("sign-in-btn").addEventListener("click", function(){
    const username = document.getElementById("input-username");
    const usernameValue = username.value;
    const password = document.getElementById("input-password");
    const passwordValue = password.value;

    if(usernameValue === "admin" && passwordValue === "admin123"){
        alert("Login successful!");
        window.location.assign("./home.html");
    } else {
        alert("Invalid username or password. Please try again.");
        return;
    }
});