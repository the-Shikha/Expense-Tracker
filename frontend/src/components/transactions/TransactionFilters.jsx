import { Search, RotateCcw, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearch,
  setType,
  setCategory,
  resetFilters
} from '../../store/filtersSlice';
import { CATEGORIES } from '../../types';

export function TransactionFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // Categories ko unique banane ke liye Set ka use karein
  const allCategories = Array.from(
    new Set([...CATEGORIES.income, ...CATEGORIES.expense])
  ).sort();

  return (
    <div className="relative mt-8 px-4 md:px-0">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl opacity-50 pointer-events-none" />

      <div className="relative backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/50 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 shadow-xl shadow-black/5">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 items-center">

          {/* 1. SEARCH INPUT */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
              <Search size={16} strokeWidth={2.5} />
            </div>

            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search || ''} // Fallback to empty string
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/10 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none text-sm font-bold transition-all placeholder:text-gray-400 dark:text-white"
            />
          </div>

          {/* 2. TYPE SELECT */}
          <div className="relative group">
            <select
              value={filters.type}
              onChange={(e) => dispatch(setType(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/10 focus:border-indigo-500 outline-none text-sm font-bold transition-all appearance-none cursor-pointer dark:text-white"
            >
              <option value="all" className="dark:bg-zinc-900">All Types</option>
              <option value="income" className="dark:bg-zinc-900">Income</option>
              <option value="expense" className="dark:bg-zinc-900">Expense</option>
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
          </div>

          {/* 3. CATEGORY SELECT */}
          <div className="relative group">
            <select
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-white/10 focus:border-indigo-500 outline-none text-sm font-bold transition-all appearance-none cursor-pointer dark:text-white"
            >
              <option value="all" className="dark:bg-zinc-900">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat} className="dark:bg-zinc-900">
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform" />
          </div>

          {/* 4. RESET BUTTON */}
          <button
            onClick={() => dispatch(resetFilters())}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all shadow-lg shadow-indigo-500/25"
          >
            <RotateCcw size={14} strokeWidth={3} />
            Reset Filters
          </button>

        </div>
      </div>
    </div>
  );
}