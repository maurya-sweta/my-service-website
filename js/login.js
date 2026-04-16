document.addEventListener("DOMContentLoaded", function(){

    // ✅ GENERATE CAPTCHA
    function generateCaptcha(){
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
        let captcha = "";

        for(let i=0; i<5; i++){
            captcha += chars[Math.floor(Math.random() * chars.length)];
        }

        document.getElementById("captchaText").innerText = captcha;
        return captcha;
    }

    let currentCaptcha = generateCaptcha();

    // ✅ FORM SAFE CHECK
    let form = document.getElementById("loginForm");
    if(!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        let email = document.getElementById("email").value.trim();
        let username = document.getElementById("username").value.trim();
        let password = document.getElementById("password").value.trim();
        let captchaInput = document.getElementById("captchaInput").value.trim();

        let storedEmail = localStorage.getItem("email");
        let storedUser = localStorage.getItem("username");
        let storedPass = localStorage.getItem("password");

        // ✅ Gmail validation
        if(!email.endsWith("@gmail.com")){
            document.getElementById("message").innerText = "Enter valid Gmail!";
            return;
        }

        // ✅ CAPTCHA check
        if(captchaInput !== currentCaptcha){
            document.getElementById("message").innerText = "Wrong CAPTCHA!";
            currentCaptcha = generateCaptcha();
            return;
        }

        // ✅ LOGIN CHECK
        if(email === storedEmail && username === storedUser && password === storedPass){

            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerText = "Login Successful!";

            // ✅ SAVE CURRENT USER
            localStorage.setItem("currentUser", username);

            // ✅ SAVE USER DETAILS
            let userData = {
                name: username,
                email: email
            };

            localStorage.setItem("user_" + username, JSON.stringify(userData));

            // ✅ REDIRECT
            setTimeout(()=>{
                window.location.href = "dashboard.html"; 
            },1000);

        } else {
            document.getElementById("message").innerText = "Invalid Details!";
        }
    });

});