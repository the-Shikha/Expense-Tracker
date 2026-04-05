import { createSlice } from '@reduxjs/toolkit';

const savedFilters = localStorage.getItem('appFilters');
const parsedFilters = savedFilters ? JSON.parse(savedFilters) : null;


const initialState = parsedFilters || {
  search: '',
  type: 'all',
  category: 'all',
  startDate: '',
  endDate: '',
};

const saveToStorage = (state) => {
  localStorage.setItem('appFilters', JSON.stringify(state));
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      saveToStorage(state); 
    },
    setType: (state, action) => {
      state.type = action.payload;
      saveToStorage(state); 
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      saveToStorage(state); 
    },
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      saveToStorage(state); 
    },
    resetFilters: () => {
      const freshState = {
        search: '',
        type: 'all',
        category: 'all',
        startDate: '',
        endDate: '',
      };
      localStorage.removeItem('appFilters'); 
      return freshState;
    },
  },
});

export const {
  setSearch,
  setType,
  setCategory,
  setDateRange,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;