function saveProviderNumber() {
    let name = document.getElementById("providerName").value.trim().toLowerCase();
    let number = document.getElementById("providerNumber").value.trim();

    let providerNumbers =
        JSON.parse(localStorage.getItem("providerNumbers")) || {};

    providerNumbers[name] = number;

    localStorage.setItem(
        "providerNumbers",
        JSON.stringify(providerNumbers)
    );

    alert("Provider saved successfully ✅");
}