// ✅ Load Feedback
function loadFeedback() {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    let feedbackList = document.getElementById("feedbackList");
    let avgBox = document.getElementById("averageRating");

    feedbackList.innerHTML = "";

    // 👉 Empty State
    if (feedbacks.length === 0) {
        feedbackList.innerHTML = `<p class="empty">No reviews yet 😔</p>`;
        avgBox.innerHTML = "⭐ No ratings yet";
        return;
    }

    let total = 0;

    feedbacks.forEach((fb) => {
        total += Number(fb.rating);

        let div = document.createElement("div");
        div.classList.add("feedback-box");

        div.innerHTML = `
            <button class="delete-btn" onclick="deleteFeedback(${fb.id})">❌</button>
            <h4>${fb.name}</h4>
            <p>${fb.message}</p>
            <p>⭐ ${"⭐".repeat(fb.rating)}</p>
            <small>${fb.date || ""}</small>
        `;

        feedbackList.appendChild(div);
    });

    // 👉 Average Rating
    let avg = (total / feedbacks.length).toFixed(1);

    avgBox.innerHTML = `
        ⭐ Average Rating: <b>${avg}</b> / 5 <br>
        (${feedbacks.length} Reviews)
    `;
}

// ✅ Delete Feedback
function deleteFeedback(id) {
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbacks = feedbacks.filter(fb => fb.id !== id);

    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    loadFeedback();
}