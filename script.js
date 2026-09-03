// Starting account balance
let balance = 5000;

// Get saved transactions from browser storage
let transactions = JSON.parse(
    localStorage.getItem("transactions")
) || [];

// Get saved balance from browser storage
balance = Number(
    localStorage.getItem("balance")
) || 5000;


// Make a deposit or withdrawal
function makeTransaction() {

    const amountInput = document.getElementById("amount");
    const typeInput = document.getElementById("transactionType");

    const amount = Number(amountInput.value);
    const type = typeInput.value;


    // Check amount
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }


    // Check withdrawal amount
    if (type === "withdraw" && amount > balance) {
        alert("Insufficient balance.");
        return;
    }


    // Update balance
    if (type === "deposit") {
        balance += amount;
    } else if (type === "withdraw") {
        balance -= amount;
    }


    // Create transaction
    const transaction = {
        id: "TXN" + Date.now(),
        date: new Date().toLocaleString(),
        type: type,
        amount: amount,
        balance: balance
    };


    // Add transaction to list
    transactions.unshift(transaction);


    // Save data
    localStorage.setItem(
        "balance",
        balance
    );

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );


    // Update screen
    updateBalance();
    displayTransactions();


    // Clear input
    amountInput.value = "";
}


// Update balance on screen
function updateBalance() {

    const balanceElement =
        document.getElementById("balance");

    balanceElement.textContent =
        "$" + balance.toFixed(2);
}


// Display transaction history
function displayTransactions() {

    const table =
        document.getElementById("transactionTable");

    table.innerHTML = "";


    transactions.forEach(function(transaction) {

        const row =
            document.createElement("tr");


        const sign =
            transaction.type === "deposit"
                ? "+"
                : "-";


        row.innerHTML = `
            <td>${transaction.date}</td>

            <td>
                ${transaction.type.toUpperCase()}
            </td>

            <td class="${transaction.type}">
                ${sign}$${transaction.amount.toFixed(2)}
            </td>

            <td>
                $${transaction.balance.toFixed(2)}
            </td>
        `;


        table.appendChild(row);
    });
}


// Load saved data when page opens
updateBalance();
displayTransactions();
