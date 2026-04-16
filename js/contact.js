// Contact Form Submit
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const formMessage = document.getElementById("formMessage");

    if(!name || !email || !subject || !message){
        formMessage.style.color = "red";
        formMessage.textContent = "Please fill all fields!";
        return;
    }

    // Save message in localStorage
    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    let newMessage = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        time: new Date().toLocaleString()
    };

    messages.push(newMessage);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    // Success message
    formMessage.style.color = "green";
    formMessage.textContent = `Thank you ${name}, your message has been saved successfully!`;

    // Clear form
    document.getElementById("contactForm").reset();
});

document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    let body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;

    window.location.href =
      `mailto:lsfinder.hub24@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
});

document.getElementById("contactForm").addEventListener("submit", function () {
    let messages = JSON.parse(localStorage.getItem("contactMessages")) || [];

    messages.push({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("contactMessages", JSON.stringify(messages));
});