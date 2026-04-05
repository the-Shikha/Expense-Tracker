import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../store/authSlice';
import { setTransactions, setLoading, setError } from '../store/transactionsSlice';
import { transactionService } from '../services/transactionService';
import toast from 'react-hot-toast';

import { BalanceChart } from '../components/dashboard/BalanceChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { Insights } from '../components/dashboard/Insights';
import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionForm } from '../components/transactions/TransactionForm';
import { deleteTransaction as deleteAction } from '../store/transactionsSlice';
import { LayoutDashboard, Receipt, PieChart, Settings, Menu, X } from 'lucide-react';
import { NavItem } from './NavItem';
import { StatCard } from "./StatCard"
import { addTransaction, updateTransaction as updateAction} from '../store/transactionsSlice';

import userImg from '../assets/images/user.png';
import adminImg from '../assets/images/admin.png';

export function Dashboard() {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const { transactions } = useSelector((state) => state.transactions);
  const filters = useSelector((state) => state.filters);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [deleteId, setDeleteId] = useState(null);
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true; 
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const isAdmin = role === 'admin';

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
  if (transactions.length === 0) dispatch(setLoading(true));

  try {
    const dummyData = await transactionService.fetchTransactions();
    dispatch(setTransactions(dummyData));
    
  } catch (err) {
    dispatch(setError(err?.message || 'Failed to load'));
  } finally {
    dispatch(setLoading(false));
  }
};

const handleDeleteClick = (id) => {
  setDeleteId(id);
  setIsDeleteModalOpen(true);
};

const confirmDelete = async () => {
  try {
    await transactionService.deleteTransaction(deleteId);
    dispatch(deleteAction(deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId(null);
    toast.success("Deleted successfully!");
  } catch (err) {
    alert("Delete failed");
  }
};

  const filteredTransactions = transactions.filter(t => {
  const searchTerm = (filters.search || "").toLowerCase().trim();

  const title = (t.title || "").toLowerCase(); 
  const description = (t.description || "").toLowerCase();
  const category = (t.category || "").toLowerCase();
  

  const matchesSearch = 
    title.includes(searchTerm) || 
    description.includes(searchTerm) || 
    category.includes(searchTerm);
  const matchesType = filters.type === 'all' || t.type?.toLowerCase() === filters.type.toLowerCase();
  const matchesCategory = filters.category === 'all' || t.category === filters.category;

  return matchesSearch && matchesType && matchesCategory;
});

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(val);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const stats = transactions.reduce(
  (acc, t) => {
    const amount = Number(t.amount) || 0;
    const type = t.type?.toLowerCase();

    if (type === 'income') {
      acc.income += amount;
      acc.balance += amount;
    } else if (type === 'expense') {
      acc.expense += amount;
      acc.balance -= amount;
    }

    return acc;
  },
  { income: 0, expense: 0, balance: 0 }
);

const handleFormSubmit = async (formData) => {
  try {
    if (editingTransaction) {
      const updated = await transactionService.updateTransaction(editingTransaction.id, formData);
      dispatch(updateAction(updated)); 
      toast.success("Entry updated successfully!");
    } else {
      const newEntry = await transactionService.createTransaction(formData);
      
      dispatch(addTransaction(newEntry)); 
      toast.success("New entry created successfully!");
    }
    handleCloseForm();
  } catch (err) {
    dispatch(setError(err?.message || 'Failed to save transaction'));
  }
};

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
    
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
        transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold tracking-tight">Expense<span className="text-indigo-600">Tracker</span></h1>
            <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={role === 'admin' ? adminImg : userImg}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user?.email || "User Account"}</p>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium uppercase tracking-wider">{role}</p>
              </div>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 hover:shadow-md transition-all rounded-lg font-medium text-sm border border-gray-200 dark:border-gray-600"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>

          <nav className="space-y-2">
            <NavItem label="Dashboard" icon={LayoutDashboard} active />
            <NavItem label="Transactions" icon={Receipt} />
            <NavItem label="Analytics" icon={PieChart} />
            <NavItem label="Settings" icon={Settings} />
          </nav>
        </div>
      </aside>

      
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        
        
        <div className="lg:hidden flex items-center justify-between mb-6">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-bold tracking-tight">Expense<span className="text-indigo-600">Tracker</span></h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

       
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold">Financial Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Track your earnings and spendings easily.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => dispatch(setRole(role === 'admin' ? 'viewer' : 'admin'))}
              className="flex-1 md:flex-none px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Switch Role
            </button>
            {isAdmin && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex-1 md:flex-none px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all"
              >
                + Add Transaction
              </button>
            )}
          </div>
        </header>

       
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <StatCard title="Net Liquidity" amount={stats.balance} type="balance" format={formatCurrency} />
            <StatCard title="Inbound Revenue" amount={stats.income} type="income" format={formatCurrency} />
            <StatCard title="Outbound Burn" amount={stats.expense} type="expense" format={formatCurrency} className="sm:col-span-2 md:col-span-1" />
          </div>
        </section>

        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4">Balance Trends</h3>
            <BalanceChart transactions={transactions} />
          </div>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Income Breakdown
            </h3>
            <CategoryChart transactions={transactions.filter(t => t.type === 'income')} />
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-rose-500"></span> Expense Breakdown
            </h3>
            <CategoryChart transactions={transactions.filter(t => t.type === 'expense')} />
          </div>
        </div>

        <Insights transactions={transactions} />

        
        <div className="mt-8">
          <div className="mb-6 space-y-3">
            <h2 className="text-xl font-bold">Recent History</h2>
            <TransactionFilters />
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-x-auto shadow-sm">
            <TransactionList 
              transactions={filteredTransactions} 
              isAdmin={isAdmin} 
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
            />
          </div>
        </div>
      </main>

      {isAdmin && (
        <TransactionForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editingTransaction={editingTransaction}
          onSubmit={handleFormSubmit} 
        />
      )}
      {/* --- ISKO ADD KAREIN --- */}
{isDeleteModalOpen && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-4 mx-auto">
        <Receipt size={24} />
      </div>
      
      <h3 className="text-xl font-bold text-center mb-2">Delete Entry?</h3>
      <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
        Are you sure you want to delete this entry? This action cannot be undone.
      </p>

      <div className="flex gap-3">
        <button 
          onClick={() => setIsDeleteModalOpen(false)}
          className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-semibold transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={confirmDelete}
          className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}