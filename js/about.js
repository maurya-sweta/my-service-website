// ✅ TYPING EFFECT
function typeEffect(text, element, speed = 50) {
    let i = 0;
    element.innerHTML = "";

    let interval = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;

        if (i >= text.length) {
            clearInterval(interval);
        }
    }, speed);
}

// ✅ START TYPING
window.onload = function () {
    let intro = document.querySelector(".intro");

    if (intro) {
        let text = "Local Service Finder helps you find trusted services easily near your location.";
        typeEffect(text, intro);
    }

    startCounters();
};

// ✅ COUNTER ANIMATION
function startCounters() {

    let counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        let target = +counter.getAttribute("data-target");
        let count = 0;

        let update = () => {
            let increment = target / 100;

            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count);
                setTimeout(update, 20);
            } else {
                counter.innerText = target;
            }
        };

        update();
    });
}

// ✅ SCROLL ANIMATION
window.addEventListener("scroll", function () {

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let position = card.getBoundingClientRect().top;
        let screen = window.innerHeight;

        if (position < screen - 100) {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }
    });

});