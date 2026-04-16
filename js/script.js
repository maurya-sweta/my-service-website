function addToFav(name, service, city){

    let user = localStorage.getItem("currentUser");
    
    // ❌ જો login નથી તો
    if(!user){
    alert("Please login first!");
    return;
    }
    
    let key = "fav_" + user;
    
    let favs = JSON.parse(localStorage.getItem(key)) || [];
    
    let newFav = {
    name: name,
    service: service,
    city: city,
    time: new Date().toLocaleString()
    };
    
    // duplicate check
    let exists = favs.some(f => f.name === name && f.service === service);
    
    if(!exists){
    favs.push(newFav);
    localStorage.setItem(key, JSON.stringify(favs));
    alert("❤️ Added to Favorites!");
    }else{
    alert("Already added!");
    }
    
    }

    function showTopExperts() {
        let expertContainer = document.getElementById("expertProviders");
        expertContainer.innerHTML = "";
    
        document.querySelectorAll(".service").forEach(service => {
            let serviceName = service.querySelector("h2").innerText;
    
            service.querySelectorAll(".card").forEach(card => {
                let providerName = card.querySelector("h3").innerText;
                let ratingText = card.querySelector("p").innerText;
                let rating = parseFloat(ratingText.replace("⭐", "").trim());
    
                if (rating > 4.5) {
                    let expertCard = document.createElement("div");
                    expertCard.classList.add("expert-card");
    
                    expertCard.innerHTML = `
                        <h3>${providerName}</h3>
                        <p>🛠️ ${serviceName}</p>
                        <p>⭐ ${rating}</p>
                    `;
    
                    expertContainer.appendChild(expertCard);
                }
            });
        });
    }
    
    window.onload = showTopExperts;