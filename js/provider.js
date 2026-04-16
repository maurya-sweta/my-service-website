

// ✅ LOAD PROVIDERS
function loadProviders(list = providers){

    let container = document.getElementById("providerContainer");

    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p><b>Service:</b> ${p.service}</p>
            <p><b>City:</b> ${p.city}</p>
            <p><b>Rating:</b> ⭐ ${p.rating}</p>

            <button onclick="bookProvider('${p.name}','${p.service}')">Book</button>
        </div>
        `;
    });

}

// ✅ SEARCH FUNCTION
function searchProvider(){

    let input = document.getElementById("searchInput").value.toLowerCase();

    let filtered = providers.filter(p =>
        p.name.toLowerCase().includes(input)
    );

    loadProviders(filtered);
}

// ✅ BOOK
function bookProvider(name, service){

    let user = localStorage.getItem("currentUser");

    if(!user){
        alert("Login first!");
        return;
    }

    let key = "booking_" + user;

    let bookings = JSON.parse(localStorage.getItem(key)) || [];

    bookings.push({
        provider: name,
        service: service,
        time: new Date().toLocaleString()
    });

    localStorage.setItem(key, JSON.stringify(bookings));

    alert("✅ Booking Confirmed!");
}

// ✅ AUTO LOAD
window.onload = loadProviders;