// ===============================
// 🔥 ALL SERVICES + EXPERT DATA
// ===============================
const expertsData = {
    "House Cleaning": [
        { name: "Ramesh", rating: 4.5 },
        { name: "Anita", rating: 4.2 }
    ],
    "Electrician": [
        { name: "Amit", rating: 4.6 },
        { name: "Deepak", rating: 4.3 }
    ],
    "Plumber": [
        { name: "Mahesh", rating: 4.2 },
        { name: "Salim", rating: 4.8 }
    ],
    "TV Repair": [
        { name: "Sunil", rating: 4.2 },
        { name: "Ajay", rating: 4.4 }
    ],
    "AC Repair": [
        { name: "Rahul", rating: 4.7 },
        { name: "Vijay", rating: 4.1 }
    ]
};

// ===============================
// 🎯 LOAD ONLY 4.5+ SERVICES
// ===============================
function loadServices() {
    let serviceContainer = document.getElementById("serviceList");
    serviceContainer.innerHTML = "";

    Object.keys(expertsData).forEach(service => {
        let hasTopExpert = expertsData[service].some(exp => exp.rating >= 4.5);

        if (hasTopExpert) {
            let div = document.createElement("div");
            div.classList.add("service-card");
            div.innerHTML = `
                <h3>${service}</h3>
                <p>⭐ Top rated experts available</p>
            `;
            div.onclick = function () {
                selectService(service);
            };

            serviceContainer.appendChild(div);
        }
    });
}

// ===============================
// 🚀 SELECT SERVICE
// ===============================
function selectService(service) {
    localStorage.setItem("selectedService", service);
    window.location.href = "expert.html";
}