let transactions = [
  { "id": "1", "title": "Monthly Salary", "amount": 85000, "type": "income", "category": "Salary", "date": "2026-04-01", "description": "Full-time job salary for March" },
  { "id": "2", "title": "House Rent", "amount": 22000, "type": "expense", "category": "Housing", "date": "2026-04-02", "description": "Apartment rent & maintenance" },
  { "id": "3", "title": "Freelance UI Design", "amount": 35000, "type": "income", "category": "Freelance", "date": "2026-04-03", "description": "Landing page design for US client" },
  { "id": "4", "title": "BigBasket Grocery", "amount": 5400, "type": "expense", "category": "Food", "date": "2026-04-04", "description": "Monthly kitchen supplies" },
  { "id": "5", "title": "Stock Dividends", "amount": 1500, "type": "income", "category": "Investment", "date": "2026-04-05", "description": "TCS quarterly dividends" },
  { "id": "6", "title": "Electricity Bill", "amount": 3200, "type": "expense", "category": "Bills", "date": "2026-04-05", "description": "Summer AC usage bill" },
  { "id": "7", "title": "Amazon - New Monitor", "amount": 14500, "type": "expense", "category": "Shopping", "date": "2026-03-30", "description": "LG 27-inch 4K monitor for work" },
  { "id": "8", "title": "Consulting Fee", "amount": 12000, "type": "income", "category": "Freelance", "date": "2026-03-28", "description": "1-hour technical consultation" },
  { "id": "9", "title": "Zomato Dinner", "amount": 1250, "type": "expense", "category": "Food", "date": "2026-03-27", "description": "Weekend dinner with family" },
  { "id": "10", "title": "Car Fuel - Shell", "amount": 4000, "type": "expense", "category": "Travel", "date": "2026-03-26", "description": "Full tank petrol" },
  { "id": "11", "title": "Gym Membership", "amount": 2500, "type": "expense", "category": "Health", "date": "2026-03-25", "description": "Monthly subscription" },
  { "id": "12", "title": "Netflix & Spotify", "amount": 800, "type": "expense", "category": "Entertainment", "date": "2026-03-24", "description": "Digital streaming services" },
  { "id": "13", "title": "Sold Old Phone", "amount": 18000, "type": "income", "category": "Other", "date": "2026-03-22", "description": "Sold iPhone 11 on Cashify" },
  { "id": "14", "title": "Broadband Internet", "amount": 999, "type": "expense", "category": "Bills", "date": "2026-03-20", "description": "Airtel Xstream 100Mbps plan" },
  { "id": "15", "title": "Mutual Fund Sip", "amount": 10000, "type": "expense", "category": "Investment", "date": "2026-03-15", "description": "Monthly Index Fund SIP" },
  { "id": "16", "title": "Bonus Reward", "amount": 5000, "type": "income", "category": "Salary", "date": "2026-03-12", "description": "Quarterly performance bonus" },
  { "id": "17", "title": "Uber Rides", "amount": 1850, "type": "expense", "category": "Travel", "date": "2026-03-10", "description": "Weekly office commute" },
  { "id": "18", "title": "Medicine - Apollo", "amount": 2100, "type": "expense", "category": "Health", "date": "2026-03-08", "description": "Routine health checkup medicines" },
  { "id": "19", "title": "Udemy Course", "amount": 499, "type": "expense", "category": "Education", "date": "2026-03-05", "description": "React Advanced Patterns course" },
  { "id": "20", "title": "Tax Refund", "amount": 8500, "type": "income", "category": "Other", "date": "2026-03-02", "description": "Income Tax refund FY25" }
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