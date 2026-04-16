// 🔴 STEP 1: SERVICE SELECT
function selectService(service){
  localStorage.setItem("selectedService", service);
  window.location.href = "favorite.html";
}


// 🔴 STEP 2: SAVE FAVORITE (simple — no booking feel)
function saveFav(){

  let service = localStorage.getItem("selectedService");

  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  if(!service || !name){
    alert("Enter your name ❗");
    return;
  }

  let data = JSON.parse(localStorage.getItem("fav")) || [];

  let favItem = {
    service: service,
    name: name,
    date: date || "Not set",
    time: time || "Not set"
  };

  data.push(favItem);

  localStorage.setItem("fav", JSON.stringify(data));

  alert("Added to Favorites ❤️");

  loadFav();
}


// 🔴 STEP 3: LOAD FAVORITES (✨ MODERN UI)
function loadFav(){

  let user = localStorage.getItem("currentUser");
  let key = "fav_" + user;

  let data = JSON.parse(localStorage.getItem(key)) || [];

  let div = document.getElementById("list");

  if(!div) return;

  div.innerHTML = "";

  if(data.length === 0){
    div.innerHTML = "<h3>No Favorites ❤️</h3>";
    return;
  }

  data.forEach((item, index)=>{

    div.innerHTML += `
      <div class="card">
        <h3>${item.service}</h3>
        <p><b>Provider:</b> ${item.provider}</p>
        <p><b>City:</b> ${item.city}</p>

        <button onclick="removeFav(${index})">❌ Remove</button>
      </div>
    `;
  });
}


// 🔴 STEP 4: REMOVE
function removeFav(index){

  let data = JSON.parse(localStorage.getItem("fav")) || [];

  data.splice(index,1);

  localStorage.setItem("fav", JSON.stringify(data));

  loadFav();
}