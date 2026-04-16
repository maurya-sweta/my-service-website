let captchaCode = "";

function generateCaptcha() {

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";

captchaCode = "";

for (let i = 0; i < 5; i++) {

captchaCode += chars.charAt(Math.floor(Math.random() * chars.length));

}

document.getElementById("captcha").innerText = captchaCode;

}

window.onload = generateCaptcha;