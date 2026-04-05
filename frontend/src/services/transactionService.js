let transactions =[
  { "id": "1", "title": "March Monthly Salary", "amount": 85000, "type": "income", "category": "Salary", "date": "2026-03-01", "description": "HDFC Bank Salary Credit" },
  { "id": "2", "title": "House Rent", "amount": 20000, "type": "expense", "category": "Bills & Utilities", "date": "2026-03-02", "description": "Monthly apartment rent" },
  { "id": "3", "title": "BigBasket Grocery", "amount": 4500, "type": "expense", "category": "Food & Dining", "date": "2026-03-04", "description": "Monthly kitchen supplies" },
  { "id": "4", "title": "Freelance Project - Phase 1", "amount": 15000, "type": "income", "category": "Freelance", "date": "2026-03-07", "description": "Website UI Design payment" },
  { "id": "5", "title": "Electricity & Water Bill", "amount": 2800, "type": "expense", "category": "Bills & Utilities", "date": "2026-03-10", "description": "Utility payments for Feb" },
  { "id": "6", "title": "Amazon - Office Chair", "amount": 8500, "type": "expense", "category": "Shopping", "date": "2026-03-12", "description": "Ergonomic chair for home office" },
  { "id": "7", "title": "Mutual Fund SIP", "amount": 10000, "type": "expense", "category": "Investments", "date": "2026-03-15", "description": "Monthly Index Fund investment" },
  { "id": "8", "title": "Uber Office Rides", "amount": 1400, "type": "expense", "category": "Transportation", "date": "2026-03-18", "description": "Weekly commute total" },
  { "id": "9", "title": "Dividend Income", "amount": 1200, "type": "income", "category": "Investments", "date": "2026-03-20", "description": "Stock market quarterly dividends" },
  { "id": "10", "title": "Zomato - Weekend Treats", "amount": 1150, "type": "expense", "category": "Food & Dining", "date": "2026-03-22", "description": "Dinner with friends" },
  { "id": "11", "title": "Netflix & Spotify", "amount": 799, "type": "expense", "category": "Entertainment", "date": "2026-03-25", "description": "Monthly digital subscriptions" },
  { "id": "12", "title": "Health Checkup", "amount": 2500, "type": "expense", "category": "Healthcare", "date": "2026-03-28", "description": "Routine blood tests" },
  { "id": "13", "title": "Birthday Gift - Friend", "amount": 2000, "type": "income", "category": "Gifts", "date": "2026-03-30", "description": "Gift from group circle" },
  { "id": "14", "title": "April Salary Advance", "amount": 85000, "type": "income", "category": "Salary", "date": "2026-04-01", "description": "Early salary credit for April" },
  { "id": "15", "title": "Broadband Internet Bill", "amount": 999, "type": "expense", "category": "Bills & Utilities", "date": "2026-04-01", "description": "Airtel Fiber monthly bill" },
  { "id": "16", "title": "Fuel - Shell Station", "amount": 3500, "type": "expense", "category": "Transportation", "date": "2026-04-02", "description": "Full tank petrol" },
  { "id": "17", "title": "Udemy React Course", "amount": 499, "type": "expense", "category": "Education", "date": "2026-04-02", "description": "Advanced React Patterns" },
  { "id": "18", "title": "Weekend Gateway - Resort", "amount": 12000, "type": "expense", "category": "Travel", "date": "2026-04-03", "description": "Hotel booking for trip" },
  { "id": "19", "title": "Car Service - Minor", "amount": 4200, "type": "expense", "category": "Other Expense", "date": "2026-04-04", "description": "Oil change and filter cleaning" },
  { "id": "20", "title": "Sold Freelance Assets", "amount": 5000, "type": "income", "category": "Freelance", "date": "2026-04-04", "description": "Sold UI kit on marketplace" }
]

export const transactionService = {
  async fetchTransactions() {
    return transactions;
  },

  async createTransaction(formData, userId) {
    const newTransaction = {
      id: Date.now().toString(),
      ...formData,
      user_id: userId,
    };

    transactions = [newTransaction, ...transactions];
    return newTransaction;
  },

  async updateTransaction(id, formData) {
    transactions = transactions.map((t) =>
      t.id === id ? { ...t, ...formData } : t
    );

    return transactions.find((t) => t.id === id);
  },

  async deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
  },
};