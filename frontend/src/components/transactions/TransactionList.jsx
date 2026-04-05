import { useState, useMemo } from 'react';
import {
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSelector } from 'react-redux';

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
  isAdmin,
}) {
  const filters = useSelector((state) => state.filters);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType =
        filters.type === 'all' || transaction.type === filters.type;

      const matchesCategory =
        filters.category === 'all' ||
        transaction.category === filters.category;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [transactions, filters]);

  const sortedTransactions = useMemo(() => {
    const sorted = [...filteredTransactions].sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') {
        comparison = new Date(a.date) - new Date(b.date);
      } else {
        comparison = Number(a.amount) - Number(b.amount);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [filteredTransactions, sortBy, sortOrder]);

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative">
    
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-3xl opacity-40" />

      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border border-white/20 dark:border-zinc-800 shadow-2xl rounded-3xl overflow-hidden">
        
     
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 sm:p-8 border-b border-gray-100 dark:border-zinc-800 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
              Transactions
            </h3>
            <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
              {sortedTransactions.length} Total Records
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              options={[
                { value: 'date', label: 'Date' },
                { value: 'amount', label: 'Amount' },
              ]}
            />
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur border border-gray-200 dark:border-zinc-700 hover:scale-105 transition active:scale-95"
            >
              <ArrowUpDown size={16} className={`${sortOrder === 'asc' ? 'rotate-180' : ''} transition-transform duration-300 dark:text-white`} />
            </button>
          </div>
        </div>

        
        <div className="divide-y divide-gray-100 dark:divide-zinc-800">
          {currentItems.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <div className="text-5xl mb-3 opacity-30">💸</div>
              <p className="font-semibold uppercase text-xs tracking-widest">No matching records</p>
            </div>
          ) : (
            currentItems.map((transaction) => (
              <div
                key={transaction.id}
                className="group flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 sm:px-8 py-5 hover:bg-white/40 dark:hover:bg-zinc-800/40 transition-all gap-4"
              >
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <div className={`p-3 sm:p-3.5 rounded-2xl shadow-sm transition-transform group-hover:scale-110 shrink-0 ${
                      transaction.type === 'income'
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-rose-500/10 text-rose-500'
                  }`}>
                    {transaction.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white uppercase tracking-tight truncate">
                      {transaction.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 rounded shadow-sm">
                        {transaction.category}
                      </span>
                      <span className="py-0.5">
                        {new Date(transaction.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0 dark:border-zinc-800">
                  <span className={`text-base sm:text-lg font-black tabular-nums ${
                      transaction.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'} ₹{Number(transaction.amount).toLocaleString('en-IN')}
                  </span>

                  {isAdmin && (
                    <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all sm:translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => onEdit(transaction)} className="p-2 rounded-xl hover:bg-indigo-500 hover:text-white text-indigo-500 transition-all shadow-sm active:scale-90">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => onDelete(transaction.id)} className="p-2 rounded-xl hover:bg-rose-500 hover:text-white text-rose-500 transition-all shadow-sm active:scale-90">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

       
        {totalPages > 1 && (
          <div className="p-6 bg-gray-50/50 dark:bg-white/[0.02] border-t border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedTransactions.length)} of {sortedTransactions.length}
            </p>
            
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="p-2 rounded-xl border border-gray-200 dark:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-zinc-800 transition active:scale-95"
              >
                <ChevronLeft size={16} className="text-gray-600 dark:text-zinc-400" />
              </button>

              <div className="flex gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`min-w-[36px] h-9 rounded-xl text-xs font-black transition-all ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                        : 'text-gray-400 hover:bg-white dark:hover:bg-zinc-800'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="p-2 rounded-xl border border-gray-200 dark:border-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-zinc-800 transition active:scale-95"
              >
                <ChevronRight size={16} className="text-gray-600 dark:text-zinc-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="flex-1 sm:flex-none px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl bg-white/60 dark:bg-zinc-800/60 backdrop-blur border border-gray-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition cursor-pointer dark:text-white"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-white dark:bg-zinc-900">
          {option.label}
        </option>
      ))}
    </select>
  );
}