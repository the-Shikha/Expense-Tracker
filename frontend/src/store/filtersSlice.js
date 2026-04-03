import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search: '',
  type: 'all',
  category: 'all',
  startDate: '',
  endDate: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDateRange: (state, action) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    resetFilters: () => initialState,
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