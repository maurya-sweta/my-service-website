document.addEventListener("DOMContentLoaded", function(){

    let form = document.getElementById("registerForm");
    if(!form) return;
    
    form.addEventListener("submit", function(e){
        e.preventDefault();
    
        let email = document.getElementById("regEmail").value.trim();
        let username = document.getElementById("regUsername").value.trim();
        let password = document.getElementById("regPassword").value.trim();
    
        let msg = document.getElementById("msg");
    
        // ✅ Empty check
        if(email === "" || username === "" || password === ""){
            msg.innerText = "All fields required!";
            msg.style.color = "red";
            return;
        }
    
        // ✅ Gmail validation
        if(!email.endsWith("@gmail.com")){
            msg.innerText = "Enter valid Gmail!";
            msg.style.color = "red";
            return;
        }
    
        // ✅ Password length check
        if(password.length < 4){
            msg.innerText = "Password must be 4+ characters!";
            msg.style.color = "red";
            return;
        }
    
        // ✅ SAVE DATA
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
    
        msg.innerText = "✅ Registered Successfully!";
        msg.style.color = "lightgreen";
    
        // ✅ Redirect to login
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    
    });
    
    });
    
    
    // 👁️ TOGGLE PASSWORD
    function togglePassword(){
        let pass = document.getElementById("regPassword");
    
        if(pass.type === "password"){
            pass.type = "text";
        } else{
            pass.type = "password";
        }
    }