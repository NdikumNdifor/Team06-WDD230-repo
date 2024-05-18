

function newsletter() {
    var email = document.getElementById("email").value;
    var requiredSymbol = email.indexOf("@");
    var emailIndex = email.lastIndexOf(".");
    if (requiredSymbol < 1 || emailIndex < requiredSymbol + 2 || emailIndex + 2 >= email.length) {
        alert("Not a valid e-mail address");
        return false;
    }
    if (email === "") {
        alert("Please enter your email address");
        return false;
    }
    alert("Thank you for subscribing to our newsletter!");
}

newsletter();



















    