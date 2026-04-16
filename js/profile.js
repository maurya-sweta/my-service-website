// LOAD PROFILE & BOOKINGS
function loadProfile() {

    let user = localStorage.getItem("currentUser");

    let userDetailsDiv = document.getElementById("userDetails");
    let bookingContainer = document.getElementById("bookingContainer");

    if (!user) {
        userDetailsDiv.innerHTML = "<p>Please login!</p>";
        bookingContainer.innerHTML = "";
        return;
    }

    // User data from registration/login
    let userData = JSON.parse(localStorage.getItem("user_" + user)) || {};

    userDetailsDiv.innerHTML = `
        <p><b>Name:</b> ${userData.name || user}</p>
        <p><b>Email:</b> ${userData.email || "Not provided"}</p>
    `;

    // Bookings
    let key = "booking_" + user;
    let bookings = JSON.parse(localStorage.getItem(key)) || [];

    if (bookings.length === 0) {
        bookingContainer.innerHTML = "<p>No bookings yet 😢</p>";
        return;
    }

    bookingContainer.innerHTML = "";

    bookings.forEach(b => {
        bookingContainer.innerHTML += `
        <div class="card">
            <h3>${b.service}</h3>
            <p>👨‍🔧 ${b.provider}</p>
            <p>📍 ${b.city}</p>
            <p>📅 ${b.date}</p>
            <p>⏰ ${b.time}</p>
        </div>
        `;
    });
}

// CLEAR BOOKINGS
function clearBookings() {
    let user = localStorage.getItem("currentUser");
    if (!user) return;

    let key = "booking_" + user;
    localStorage.removeItem(key);

    alert("All bookings cleared!");
    loadProfile();
}