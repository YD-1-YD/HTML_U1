// ========================================
// Modern Bank App - JavaScript
// ========================================

class BankAccount {
    constructor(initialBalance = 1000) {
        this.balance = initialBalance;
        this.transactions = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        const depositBtn = document.getElementById('depositBtn');
        const withdrawBtn = document.getElementById('withdrawBtn');
        const amountInput = document.getElementById('amount-input');

        depositBtn.addEventListener('click', () => this.deposit());
        withdrawBtn.addEventListener('click', () => this.withdraw());
        
        // Allow Enter key to trigger deposit
        amountInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.deposit();
            }
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    getAmount() {
        const input = document.getElementById('amount-input').value.trim();
        const amount = parseFloat(input);

        if (isNaN(amount) || amount <= 0) {
            this.showToast('Please enter a valid positive amount', 'error');
            return null;
        }
        return amount;
    }

    deposit() {
        const amount = this.getAmount();
        if (amount === null) return;

        this.balance += amount;
        this.addTransaction('Deposit', amount, 'deposit');
        this.updateDisplay();
        this.clearInput();
        this.showToast(`Successfully deposited ${this.formatCurrency(amount)}`, 'success');
    }

    withdraw() {
        const amount = this.getAmount();
        if (amount === null) return;

        if (amount > this.balance) {
            this.showToast('Insufficient funds! Cannot withdraw.', 'error');
            return;
        }

        this.balance -= amount;
        this.addTransaction('Withdrawal', amount, 'withdraw');
        this.updateDisplay();
        this.clearInput();
        this.showToast(`Successfully withdrawn ${this.formatCurrency(amount)}`, 'success');
    }

    addTransaction(type, amount, transactionType) {
        const transaction = {
            type,
            amount,
            transactionType,
            timestamp: new Date(),
            id: Date.now()
        };
        this.transactions.unshift(transaction);
        this.updateTransactionHistory();
    }

    updateTransactionHistory() {
        const historyContainer = document.getElementById('transactionList');
        
        if (this.transactions.length === 0) {
            historyContainer.innerHTML = '<p class="empty-state">No transactions yet</p>';
            return;
        }

        historyContainer.innerHTML = this.transactions.map(transaction => `
            <div class="transaction-item ${transaction.transactionType}">
                <div class="transaction-info">
                    <div class="transaction-type">${transaction.type}</div>
                    <div class="transaction-time">${this.formatTime(transaction.timestamp)}</div>
                </div>
                <div class="transaction-amount ${transaction.transactionType}">
                    ${transaction.transactionType === 'deposit' ? '+' : '−'} ${this.formatCurrency(transaction.amount)}
                </div>
            </div>
        `).join('');
    }

    formatTime(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    updateDisplay() {
        document.getElementById('balance-amount').textContent = this.formatCurrency(this.balance);
    }

    clearInput() {
        document.getElementById('amount-input').value = '';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BankAccount(1000);
});