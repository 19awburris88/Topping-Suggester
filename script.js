async function getSuggestion() {
    const foods = document.getElementById("foods").value;
    const drinks = document.getElementById("drinks").value;

    if (!foods || !drinks) {
        alert("Please enter your favorite foods and drinks!");
        return;
    }

    const response = await fetch("http://localhost:3000/suggest-toppings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodPreferences: foods, drinkPreferences: drinks })
    });

    const data = await response.json();
    document.getElementById("suggestion").innerText = data.suggestion || "No suggestion found!";
}
