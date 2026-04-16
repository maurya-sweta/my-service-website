// ✅ Submit Feedback
function submitFeedback() {
    let name = document.getElementById("name").value.trim();
    let message = document.getElementById("message").value.trim();
    let rating = document.getElementById("rating").value;

    if (!name || !message || !rating) {
        showAlert("⚠️ Please fill all fields!", "error");
        return;
    }

    let feedback = {
        id: Date.now(), // unique id
        name,
        message,
        rating,
        date: new Date().toLocaleString()
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.unshift(feedback);

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    clearForm();

    showAlert("✅ Feedback submitted successfully!", "success");

    // 👉 Redirect after 1 sec (professional feel)
    setTimeout(() => {
        window.location.href = "reviews.html";
    }, 1000);
}

// ✅ Load Feedback (Only for reviews page)
function loadFeedback() {
    let feedbackList = document.getElementById("feedbackList");
    if (!feedbackList) return;

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbackList.innerHTML = "";

    // 👉 Empty State (Professional UX)
    if (feedbacks.length === 0) {
        feedbackList.innerHTML = `<p style="text-align:center;">No reviews yet 😔</p>`;
        return;
    }

    feedbacks.forEach((fb) => {
        let div = document.createElement("div");
        div.classList.add("feedback-box");

        div.innerHTML = `
            <button class="delete-btn" onclick="deleteFeedback(${fb.id})">❌</button>
            <h4>${fb.name}</h4>
            <p>${fb.message}</p>
            <p>⭐ ${"⭐".repeat(fb.rating)}</p>
            <small style="opacity:0.6;">${fb.date}</small>
        `;

        feedbackList.appendChild(div);
    });
}

// ✅ Delete Feedback (using id instead of index)
function deleteFeedback(id) {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbacks = feedbacks.filter(fb => fb.id !== id);

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    loadFeedback();
}

// ✅ Clear Form
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    document.getElementById("rating").value = "";
}

// ✅ Custom Alert (Better than default alert)
function showAlert(msg, type) {
    let alertBox = document.createElement("div");
    alertBox.innerText = msg;

    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.right = "20px";
    alertBox.style.padding = "12px 20px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.color = "white";
    alertBox.style.fontWeight = "bold";
    alertBox.style.zIndex = "999";

    alertBox.style.background = type === "success" ? "#28a745" : "#dc3545";

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 2000);
}