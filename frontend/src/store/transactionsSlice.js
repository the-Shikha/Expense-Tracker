import { createSlice } from '@reduxjs/toolkit';

// 1. LocalStorage se transactions load karne ka logic
const getSavedTransactions = () => {
  const saved = localStorage.getItem('userTransactions');
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  transactions: getSavedTransactions(), 
  loading: false,
  error: null,
};

const saveToLocalStorage = (transactions) => {
  localStorage.setItem('userTransactions', JSON.stringify(transactions));
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      // FIX: Dummy data aur Local data ko merge karein
      const apiData = action.payload || [];
      const localData = getSavedTransactions();

      // Dono ko milayein aur duplicate IDs ko remove karein
      const combined = [...localData, ...apiData];
      
      // Map ka use karke duplicate ID waale entries hatayein
      const uniqueData = Array.from(
        new Map(combined.map((item) => [item.id, item])).values()
      );

      // Latest transactions ko top par rakhne ke liye sort (Optional)
      state.transactions = uniqueData.sort((a, b) => 
        new Date(b.date || 0) - new Date(a.date || 0)
      );

      state.loading = false;
      state.error = null;
      
      // Is merged data ko save karein taaki refresh par rahe
      saveToLocalStorage(state.transactions);
    },

    addTransaction: (state, action) => {
      // Ensure karein naya data top par aaye
      state.transactions.unshift(action.payload);
      saveToLocalStorage(state.transactions);
    },

    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
        saveToLocalStorage(state.transactions);
      }
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
      saveToLocalStorage(state.transactions);
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setLoading,
  setError,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;