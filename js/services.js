function loadExperts() {
    let selectedService = localStorage.getItem("selectedService");
    let allProviders = JSON.parse(localStorage.getItem("allServices")) || [];

    let title = document.getElementById("title");
    let expertList = document.getElementById("expertList");

    expertList.innerHTML = "";

    // ✅ Agar service select nahi hui
    if (!selectedService) {
        title.innerText = "Top Expert Providers";
        expertList.innerHTML = `
            <p style="text-align:center; color:white;">
                ⚠ Please choose a service first
            </p>
        `;
        return;
    }

    // ✅ Dynamic title
    title.innerText = "🌟 Top " + selectedService + " Experts";

    // ✅ Only selected service + 4.5+ rating
    let filteredExperts = allProviders.filter(provider =>
        provider.service.toLowerCase() === selectedService.toLowerCase() &&
        provider.rating >= 4.5
    );

    // ✅ No experts found
    if (filteredExperts.length === 0) {
        expertList.innerHTML = `
            <p style="text-align:center; color:white;">
                No 4.5+ experts available 😔
            </p>
        `;
        return;
    }

    // ✅ Show expert cards
    filteredExperts.forEach(exp => {
        let div = document.createElement("div");
        div.classList.add("expert-card");

        div.innerHTML = `
            <h3>👨‍🔧 ${exp.name}</h3>
            <p>🛠 ${exp.service}</p>
            <p>⭐ ${exp.rating}</p>
            <p>📍 ${exp.city}</p>
            <button onclick="bookExpert('${exp.name}', '${exp.service}')">
                Book Now
            </button>
        `;

        expertList.appendChild(div);
    });
}

// ✅ booking
function bookExpert(name, service) {
    localStorage.setItem("providerName", name);
    localStorage.setItem("selectedService", service);
    window.location.href = "booking.html";
}

function callProvider(name) {
    let providerNumbers =
        JSON.parse(localStorage.getItem("providerNumbers")) || {};

    let number = providerNumbers[name];

    if (!number) {
        alert("Number not found");
        return;
    }

    window.location.href = "tel:+" + number;
}

function whatsappProvider(name, service) {
    let providerNumbers =
        JSON.parse(localStorage.getItem("providerNumbers")) || {};

    let number = providerNumbers[name];

    if (!number) {
        alert("WhatsApp number not found");
        return;
    }

    let msg = `Hello ${name}, I need ${service} service`;
    let url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

    window.open(url, "_blank");
}

function addToFav(name, service, city) {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    favs.push({ name, service, city });

    localStorage.setItem("favorites", JSON.stringify(favs));

    alert(name + " added to favorites ❤️");
}

function bookService(service, provider) {
    localStorage.setItem("selectedService", service);
    localStorage.setItem("providerName", provider);

    // booking page open
    window.location.href = "booking.html";
}

function bookProvider(name, service) {
    event.stopPropagation();

    localStorage.setItem("providerName", name);
    localStorage.setItem("selectedService", service);

    window.location.href = "booking.html";
}

function saveAllProviders() {
    let allProviders = [];
    let services = document.querySelectorAll(".service");

    services.forEach(serviceBlock => {
        let serviceName = serviceBlock.querySelector("h2").innerText.trim();
        let cards = serviceBlock.querySelectorAll(".card");

        cards.forEach(card => {
            let name = card.querySelector("h3").innerText.trim();
            let ratingText = card.querySelectorAll("p")[0].innerText;
            let cityText = card.querySelectorAll("p")[1].innerText;

            let rating = parseFloat(ratingText.replace("⭐", "").trim());
            let city = cityText.replace("📍", "").trim();

            allProviders.push({
                name,
                rating,
                city,
                service: serviceName
            });
        });
    });

    localStorage.setItem("allServices", JSON.stringify(allProviders));
}

function showTopExperts(button) {
    let serviceBox = button.closest(".service");
    let cards = serviceBox.querySelectorAll(".card");
    let resultBox = serviceBox.querySelector(".top-experts-box");

    resultBox.innerHTML = "";

    let found = false;

    cards.forEach(card => {
        let ratingText = card.querySelectorAll("p")[0].innerText;
        let rating = parseFloat(ratingText.replace("⭐", "").trim());

        if (rating >= 4.5) {
            found = true;

            let name = card.querySelector("h3").innerText;
            let city = card.querySelectorAll("p")[1].innerText;

            resultBox.innerHTML += `
                <div class="expert-card">
                    <h3>${name}</h3>
                    <p>${ratingText}</p>
                    <p>${city}</p>
                </div>
            `;
        }
    });

    if (!found) {
        resultBox.innerHTML = `<p>No 4.5+ experts found 😔</p>`;
    }
}

document.querySelectorAll(".btns button").forEach(btn => {
    btn.style.pointerEvents = "auto";
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btns").forEach(box => {
        box.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

    // ✅ save providers once page loads
    saveAllProviders();

    // ✅ stop parent click issue
    document.querySelectorAll(".btns button").forEach(button => {
        button.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    });

});

let currentChatProvider = "";

document.querySelectorAll(".card").forEach(card => {
  const providerName = card.querySelector("h3").innerText;
  const serviceName = card.closest(".service").querySelector("h2").innerText;

  const callBtn = card.querySelector(".call");
  const whatsappBtn = card.querySelector(".whatsapp");
  const bookBtn = card.querySelector(".book");

  if(callBtn){
    callBtn.onclick = function () {
      startFakeCall(providerName);
    };
  }

  if(whatsappBtn){
    whatsappBtn.onclick = function () {
      openChatBox(providerName, serviceName);
    };
  }

  if(bookBtn){
    bookBtn.onclick = function () {
      bookService(serviceName, providerName);
    };
  }
});

function startFakeCall(name){
    document.getElementById("callingName").innerText = "📞 Calling " + name;
    document.getElementById("callPopup").style.display = "flex";

    let audio = document.getElementById("ringtone");
    if(audio){
        audio.play();
    }
}

function endFakeCall(){
    document.getElementById("callPopup").style.display = "none";

    let audio = document.getElementById("ringtone");
    if(audio){
        audio.pause();
        audio.currentTime = 0;
    }
}

function openChatBox(name){
    currentChatProvider = name;
    document.getElementById("chatPopup").style.display = "flex";
    document.getElementById("chatTitle").innerText = "💬 " + name;
    loadChatMessages();
}

function closeChatBox(){
    document.getElementById("chatPopup").style.display = "none";
}

// ===== CALL SAVE =====
function startFakeCall(name){
    document.getElementById("callingName").innerText = "📞 Calling " + name;
    document.getElementById("callPopup").style.display = "flex";

    let calls = JSON.parse(localStorage.getItem("callHistory")) || [];
    calls.push({
        provider: name,
        time: new Date().toLocaleString()
    });
    localStorage.setItem("callHistory", JSON.stringify(calls));

    let audio = document.getElementById("ringtone");
    if(audio) audio.play();
}

// ===== OPEN CHAT =====
function openChatBox(name){
    currentChatProvider = name;
    document.getElementById("chatPopup").style.display = "flex";
    document.getElementById("chatTitle").innerText = "💬 " + name;
    loadChatMessages();
}

// ===== SAVE CHAT =====
function sendChatMessage(){
    let input = document.getElementById("chatInput");
    let msg = input.value.trim();

    if(!msg) return;

    let chats = JSON.parse(localStorage.getItem("chatHistory")) || [];

    chats.push({
        provider: currentChatProvider,
        message: msg,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("chatHistory", JSON.stringify(chats));

    input.value = "";
    loadChatMessages();
}

// ===== LOAD CHAT =====
function loadChatMessages(){
    let chats = JSON.parse(localStorage.getItem("chatHistory")) || [];

    let filtered = chats.filter(
        c => c.provider === currentChatProvider
    );

    document.getElementById("chatMessages").innerHTML =
        filtered.map(c => `<p>${c.message}</p>`).join("");
}
function findNearbyByGPS() {
    if (!navigator.geolocation) {
        alert("Location not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;

        updateRealDistances(userLat, userLng);
    });
}

function updateRealDistances(userLat, userLng) {
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let providerLat = parseFloat(card.dataset.lat);
        let providerLng = parseFloat(card.dataset.lng);

        let distance = calculateDistance(
            userLat,
            userLng,
            providerLat,
            providerLng
        );

        let distanceBox = card.querySelector(".distance");

        if (distanceBox) {
            distanceBox.innerText = `📍 ${distance.toFixed(1)} km away`;
        }

        // nearby highlight
        if (distance <= 5) {
            card.style.border = "3px solid #00ff99";
            card.style.boxShadow = "0 0 15px #00ff99";
        }
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    let R = 6371; // Earth km
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function findNearbyByGPS() {
    if (!navigator.geolocation) {
        alert("Location not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;

        updateDistanceByCity(userLat, userLng);
    });
}

function updateDistanceByCity(userLat, userLng) {
    const cityCoords = {
        ahmedabad: { lat: 23.0225, lng: 72.5714 },
        surat: { lat: 21.1702, lng: 72.8311 },
        mumbai: { lat: 19.0760, lng: 72.8777 },
        delhi: { lat: 28.6139, lng: 77.2090 },
        bangalore: { lat: 12.9716, lng: 77.5946 },
        pune: { lat: 18.5204, lng: 73.8567 },
        jaipur: { lat: 26.9124, lng: 75.7873 },
        hyderabad: { lat: 17.3850, lng: 78.4867 },
        chennai: { lat: 13.0827, lng: 80.2707 },
        bhopal: { lat: 23.2599, lng: 77.4126 },
        lucknow: { lat: 26.8467, lng: 80.9462 },
        indore: { lat: 22.7196, lng: 75.8577 },
        kolkata: { lat: 22.5726, lng: 88.3639 },
        rajkot: { lat: 22.3039, lng: 70.8022 },
        vadodara: { lat: 22.3072, lng: 73.1812 },
        pune: { lat: 18.5204, lng: 73.8567 }
    };

    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let city = card.querySelectorAll("p")[1].innerText
        .replace("📍", "")
        .trim()
        .toLowerCase();

        let coords = cityCoords[city];
        if (!coords) return;

        let distance = calculateDistance(
            userLat,
            userLng,
            coords.lat,
            coords.lng
        );

        let distanceBox = card.querySelector(".distance");
        if (distanceBox) {
            distanceBox.innerText = `📍 ${distance.toFixed(1)} km away`;
        }

        if (distance <= 5) {
            card.style.border = "3px solid #00ff99";
            card.style.boxShadow = "0 0 15px #00ff99";
        }
    });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    let R = 6371;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;

    let a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}