async function fetchExchangeRate(from, to) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        return data.rates[to];
    } catch (error) {
        alert("Error fetching exchange rate");
        return null;
    }
}

document.getElementById("convert").addEventListener("click", async function() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    
    if (amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    
    const rate = await fetchExchangeRate(fromCurrency, toCurrency);
    if (rate) {
        document.getElementById("exchangeRate").textContent = `1 ${fromCurrency} = ${rate.toFixed(2)} ${toCurrency}`;
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${(amount * rate).toFixed(2)} ${toCurrency}`;
    }
});

document.getElementById("swapCurrencies").addEventListener("click", function() {
    let from = document.getElementById("fromCurrency");
    let to = document.getElementById("toCurrency");
    [from.value, to.value] = [to.value, from.value];
});

document.getElementById("download").addEventListener("click", function() {
    const resultText = document.getElementById("result").textContent;
    if (resultText.includes("Result will appear here")) {
        alert("Please convert first before downloading.");
        return;
    }
    
    const blob = new Blob([resultText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "currency_conversion.txt";
    link.click();
});
