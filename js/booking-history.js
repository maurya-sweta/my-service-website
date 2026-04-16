let container = document.getElementById("historyContainer");
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function renderBookings() {
    container.innerHTML = "";

    if (bookings.length === 0) {
        container.innerHTML = "<h2 style='text-align:center;'>No bookings yet</h2>";
        return;
    }

    bookings.forEach((item, index) => {
        container.innerHTML += `
            <div class="card">
                <h3>${item.service}</h3>
                <p>👨‍🔧 ${item.provider}</p>
                <p>💰 ${item.price}</p>
                <p>📅 ${item.date}</p>
                <p>⏰ ${item.time}</p>
                <p>📍 ${item.address}</p>
                <p>💳 ${item.payment}</p>

                <div class="btns">
                    <button class="book" onclick="rebookService(${index})">🔁 Rebook</button>
                    <button class="call" onclick="cancelBooking(${index})">❌ Cancel</button>
                </div>
            </div>
        `;
    });

    container.innerHTML += `
        <div style="text-align:center; margin:30px;">
            <button onclick="clearAllBookings()" 
            style="padding:12px 20px; background:red; color:white; border:none; border-radius:8px;">
                🗑️ Clear All Bookings
            </button>
        </div>
    `;
}

function cancelBooking(index) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    renderBookings();
}

function clearAllBookings() {
    localStorage.removeItem("bookings");
    bookings = [];
    renderBookings();
}

function rebookService(index) {
    alert("✅ Rebooking " + bookings[index].service);
    window.location.href = "services.html";
}

renderBookings();