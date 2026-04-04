import { Search, RotateCcw } from 'lucide-react';
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

  const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense].sort();

  return (
    <div className="relative mt-8 px-4 md:px-0">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent blur-2xl opacity-50 pointer-events-none" />

      <div className="relative backdrop-blur-2xl bg-white/80 dark:bg-zinc-900/80 border border-gray-200/50 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 shadow-xl shadow-black/5">
        
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6 items-center">

        
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
              <Search size={16} strokeWidth={2.5} />
            </div>

            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none text-sm font-medium transition-all placeholder:text-gray-400 dark:text-white"
            />
          </div>

          
          <div className="relative">
            <select
              value={filters.type}
              onChange={(e) => dispatch(setType(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 focus:ring-2 focus:ring-indigo-500/50 outline-none text-sm font-medium transition-all appearance-none cursor-pointer dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

         
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 focus:ring-2 focus:ring-indigo-500/50 outline-none text-sm font-medium transition-all appearance-none cursor-pointer dark:text-white"
            >
              <option value="all">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

         
          <button
            onClick={() => dispatch(resetFilters())}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-indigo-500/10"
          >
            <RotateCcw size={14} strokeWidth={3} />
            Reset
          </button>

        </div>
      </div>
    </div>
  );
}