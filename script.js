const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Load from localStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value === "" || amount.value === "") {
        alert("Please fill all fields");
        return;
    }

    const now = new Date();
    const dateTime = now.toLocaleString(); // date + time

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value,
        date: dateTime
    };

    transactions.push(transaction);
    updateLocalStorage();
    updateUI();

    text.value = "";
    amount.value = "";
}

// Update UI
function updateUI() {
    list.innerHTML = "";

    let total = 0, income = 0, expense = 0;

    transactions.slice().reverse().forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${t.text}</strong>: ₹${t.amount} <br>
            <small>${t.date}</small>
            <button onclick="removeTransaction(${t.id})">❌</button>
        `;

        list.appendChild(li);

        total += t.amount;
        if (t.amount > 0) income += t.amount;
        else expense += t.amount;
    });

    balance.innerText = `₹${total}`;
    money_plus.innerText = `₹${income}`;
    money_minus.innerText = `₹${Math.abs(expense)}`;
}

// Delete Transaction
function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    updateUI();
}

// Save data
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Load on start
updateUI();

// Event
form.addEventListener("submit", addTransaction);
function toggleHistory() {
    const section = document.getElementById("history-section");

    if (section.style.display === "none") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}