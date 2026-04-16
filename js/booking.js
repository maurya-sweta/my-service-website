// Auto-fill if needed (optional). You can remove if not using selectedService/provider.
window.onload = function() {
    // If you store earlier selected service/provider, auto-fill them here.
    let prevService = localStorage.getItem("selectedService");
    let prevProvider = localStorage.getItem("selectedProvider");
    if (prevService) {
        let sel = document.getElementById("serviceSelect");
        if (sel) sel.value = prevService;
    }
    if (prevProvider) {
        let prov = document.getElementById("provider");
        if (prov) prov.value = prevProvider;
    }
};

// CONFIRM BOOKING
function confirmBooking() {

    let user = localStorage.getItem("currentUser");
    if (!user) {
        alert("Please login first!");
        return;
    }

    // Get values
    let name = document.getElementById("userName").value.trim();
    let service = document.getElementById("serviceSelect").value;
    let provider = document.getElementById("provider").value.trim();
    let date = document.getElementById("date").value;
    let city = document.getElementById("city").value.trim();

    // Validation
    if (name === "" || service === "" || provider === "" || date === "" || city === "") {
        alert("❌ Please fill all details!");
        return;
    }

    // Create booking object
    let booking = {
        name: name,
        service: service,
        provider: provider,
        city: city,
        date: date,
        time: new Date().toLocaleString()
    };

    // Save per user
    let key = "booking_" + user;
    let bookings = JSON.parse(localStorage.getItem(key)) || [];
    bookings.push(booking);
    localStorage.setItem(key, JSON.stringify(bookings));

    alert("🎉 Booking Confirmed!");

    // Redirect to profile to see history
    window.location.href = "profile.html";
}