 function goService(){
    window.location.href = "services.html";
}

function openService(service) {
    localStorage.setItem("selectedService", service);
    alert(service + " selected ✅");
    window.location.href = "services.html";
}

function goToService(type) {
    if (type === 'services') {
        window.location.href = "services.html";
    } 
    else if (type === 'expert') {
        window.location.href = "expert.html";
    } 
    else if (type === 'booking') {
        window.location.href = "booking.html";
    }
}

function goToExpert() {
    window.location.href = "expert.html";
}

function goToBooking() {
    window.location.href = "booking.html";
}

function goService() {
    window.location.href = "name.html";
}

function showTopExperts() {
    const experts = [
        { name: "Pooja Beauty", service: "Beauty Parlour", rating: 4.8, city: "Mumbai" },
        { name: "Dr. Amit Sharma", service: "Doctor", rating: 4.8, city: "Ahmedabad" },
        { name: "Fitness Pro", service: "Gym Trainer", rating: 4.8, city: "Bangalore" },
        { name: "Dream Space Designers", service: "Interior Designer", rating: 4.9, city: "Ahmedabad" },
        { name: "Anjali Yoga", service: "Yoga Trainer", rating: 4.9, city: "Rishikesh" },
        { name: "Shree Caterers", service: "Caterer", rating: 4.8, city: "Ahmedabad" }
    ];

    const topExperts = experts.filter(expert => expert.rating > 4.5);

    const expertList = document.getElementById("expertList");
    const expertBox = document.getElementById("expertListBox");

    expertList.innerHTML = "";

    topExperts.forEach(expert => {
        expertList.innerHTML += `
            <div class="expert-item">
                <h4>${expert.name}</h4>
                <p>🛠 Service: ${expert.service}</p>
                <p>⭐ Rating: ${expert.rating}</p>
                <p>📍 City: ${expert.city}</p>
            </div>
        `;
    });

    expertBox.style.display = "block";
}

function goToExperts(serviceName) {
    localStorage.setItem("selectedService", serviceName);
    window.location.href = "expert.html";
}

function showExperts(button) {
    let serviceBox = button.closest(".service");
    let serviceName = serviceBox.querySelector("h2").innerText;

    let cards = serviceBox.querySelectorAll(".card");
    let topExperts = [];

    cards.forEach(card => {
        let name = card.querySelector("h3").innerText;
        let ratingText = card.querySelector("p").innerText;
        let cityText = card.querySelectorAll("p")[1].innerText;

        let rating = parseFloat(ratingText.replace("⭐", "").trim());
        let city = cityText.replace("📍", "").trim();

        if (rating >= 4.5) {
            topExperts.push({
                name,
                rating,
                city,
                service: serviceName
            });
        }
    });

    localStorage.setItem("topExperts", JSON.stringify(topExperts));
    localStorage.setItem("selectedService", serviceName);

    window.location.href = "expert.html";
}

function openSelectedExperts() {
    let selectedService = localStorage.getItem("selectedService");

    if (!selectedService) {
        alert("⚠ Please select a service first");
        window.location.href = "name.html";
        return;
    }

    saveExpertsAndOpen(selectedService);
}

function saveExpertsAndOpen(serviceName) {
    let allServices = JSON.parse(localStorage.getItem("allServices")) || [];

    let filteredExperts = allServices.filter(expert =>
        expert.service.toLowerCase() === serviceName.toLowerCase() &&
        expert.rating >= 4.5
    );

    localStorage.setItem("filteredExperts", JSON.stringify(filteredExperts));
    localStorage.setItem("selectedService", serviceName);

    window.location.href = "expert.html";
}