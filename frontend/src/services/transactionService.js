let transactions = [
  {
    id: "1",
    title: "Salary",
    amount: 50000,
    type: "income",
    category: "Salary",
    date: "2024-03-01",
    user_id: "1",
  },
  {
    id: "2",
    title: "Groceries",
    amount: 2000,
    type: "expense",
    category: "Food & Dining",
    date: "2024-03-02",
    user_id: "1",
  },
  {
    id: "3",
    title: "Uber Ride",
    amount: 300,
    type: "expense",
    category: "Transportation",
    date: "2024-03-03",
    user_id: "1",
  },
  {
    id: "4",
    title: "Freelance",
    amount: 8000,
    type: "income",
    category: "Freelance",
    date: "2024-03-04",
    user_id: "1",
  },
  {
    id: "5",
    title: "Shopping",
    amount: 2500,
    type: "expense",
    category: "Shopping",
    date: "2024-03-05",
    user_id: "1",
  },
  {
    id: "6",
    title: "Electricity Bill",
    amount: 1200,
    type: "expense",
    category: "Bills & Utilities",
    date: "2024-03-06",
    user_id: "1",
  },
  {
    id: "7",
    title: "Movie",
    amount: 600,
    type: "expense",
    category: "Entertainment",
    date: "2024-03-07",
    user_id: "1",
  },
  {
    id: "8",
    title: "Investment Return",
    amount: 3000,
    type: "income",
    category: "Investments",
    date: "2024-03-08",
    user_id: "1",
  },
  {
    id: "9",
    title: "Medicine",
    amount: 500,
    type: "expense",
    category: "Healthcare",
    date: "2024-03-09",
    user_id: "1",
  },
  {
    id: "10",
    title: "Books",
    amount: 700,
    type: "expense",
    category: "Education",
    date: "2024-03-10",
    user_id: "1",
  },

  // 👇 extra for 20 total
  {
    id: "11",
    title: "Gift",
    amount: 1500,
    type: "income",
    category: "Gifts",
    date: "2024-03-11",
    user_id: "1",
  },
  {
    id: "12",
    title: "Flight",
    amount: 6000,
    type: "expense",
    category: "Travel",
    date: "2024-03-12",
    user_id: "1",
  },
  {
    id: "13",
    title: "Restaurant",
    amount: 1200,
    type: "expense",
    category: "Food & Dining",
    date: "2024-03-13",
    user_id: "1",
  },
  {
    id: "14",
    title: "Bonus",
    amount: 10000,
    type: "income",
    category: "Salary",
    date: "2024-03-14",
    user_id: "1",
  },
  {
    id: "15",
    title: "Gym",
    amount: 1000,
    type: "expense",
    category: "Healthcare",
    date: "2024-03-15",
    user_id: "1",
  },
  {
    id: "16",
    title: "Course",
    amount: 2000,
    type: "expense",
    category: "Education",
    date: "2024-03-16",
    user_id: "1",
  },
  {
    id: "17",
    title: "Side Income",
    amount: 4000,
    type: "income",
    category: "Other Income",
    date: "2024-03-17",
    user_id: "1",
  },
  {
    id: "18",
    title: "Taxi",
    amount: 250,
    type: "expense",
    category: "Transportation",
    date: "2024-03-18",
    user_id: "1",
  },
  {
    id: "19",
    title: "Clothes",
    amount: 3000,
    type: "expense",
    category: "Shopping",
    date: "2024-03-19",
    user_id: "1",
  },
  {
    id: "20",
    title: "Misc Expense",
    amount: 800,
    type: "expense",
    category: "Other Expense",
    date: "2024-03-20",
    user_id: "1",
  },
];

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