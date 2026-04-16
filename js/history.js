let calls = JSON.parse(localStorage.getItem("callHistory")) || [];
let chats = JSON.parse(localStorage.getItem("chatHistory")) || [];

document.getElementById("callHistory").innerHTML =
  calls.map(c => `<p>${c.provider} - ${c.time}</p>`).join("");

document.getElementById("chatHistory").innerHTML =
  chats.map(c => `<p>${c.provider}: ${c.message}</p>`).join("");

function loadHistory(filter = ""){
    let callBox = document.getElementById("callHistory");
    let chatBox = document.getElementById("chatHistory");

    let filteredCalls = calls.filter(c =>
        c.provider.toLowerCase().includes(filter.toLowerCase())
    );

    let filteredChats = chats.filter(c =>
        c.provider.toLowerCase().includes(filter.toLowerCase()) ||
        c.message.toLowerCase().includes(filter.toLowerCase())
    );

    document.getElementById("totalCalls").innerText = calls.length;
document.getElementById("totalChats").innerText = chats.length;

let providerCount = {};

[...calls, ...chats].forEach(item => {
    providerCount[item.provider] =
        (providerCount[item.provider] || 0) + 1;
});

let top = "-";
let max = 0;

for(let provider in providerCount){
    if(providerCount[provider] > max){
        max = providerCount[provider];
        top = provider;
    }
}

document.getElementById("topProvider").innerText = top;

    callBox.innerHTML = filteredCalls.length
        ? filteredCalls.map(c =>
            `<p>📞 <b>${c.provider}</b><br>🕒 ${c.time}</p>`
          ).join("")
        : `<p class="empty">No call history found</p>`;

    chatBox.innerHTML = filteredChats.length
        ? filteredChats.map(c =>
            `<p>💬 <b>${c.provider}</b><br>${c.message}<br>🕒 ${c.time}</p>`
          ).join("")
        : `<p class="empty">No chat history found</p>`;
}

function clearHistory(){
    localStorage.removeItem("callHistory");
    localStorage.removeItem("chatHistory");
    calls = [];
    chats = [];
    loadHistory();
}

document.getElementById("searchHistory").addEventListener("input", function(){
    loadHistory(this.value);
});

loadHistory();