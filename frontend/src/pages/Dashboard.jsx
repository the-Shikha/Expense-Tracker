import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../store/authSlice';

import {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setLoading,
  setError,
} from '../store/transactionsSlice';

import { transactionService } from '../services/transactionService';

import { BalanceChart } from '../components/dashboard/BalanceChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { Insights } from '../components/dashboard/Insights';

import { TransactionFilters } from '../components/transactions/TransactionFilters';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionForm } from '../components/transactions/TransactionForm';

export function Dashboard() {
  const dispatch = useDispatch();

  const { user, role } = useSelector((state) => state.auth);
  const { transactions, loading } = useSelector(
    (state) => state.transactions
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const isAdmin = role === 'admin';

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    dispatch(setLoading(true));
    try {
      const data = await transactionService.fetchTransactions();
      dispatch(setTransactions(data));
    } catch (err) {
      dispatch(setError(err?.message || 'Failed to load transactions'));
    }
  };

  const handleAddTransaction = async (formData) => {
    const newTransaction = await transactionService.createTransaction(
      formData,
      user?.id || "1"
    );
    dispatch(addTransaction(newTransaction));
  };

  const handleUpdateTransaction = async (formData) => {
    const updated = await transactionService.updateTransaction(
      editingTransaction.id,
      formData
    );
    dispatch(updateTransaction(updated));
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    await transactionService.deleteTransaction(id);
    dispatch(deleteTransaction(id));
  };

  const handleRoleSwitch = () => {
    const newRole = role === 'admin' ? 'viewer' : 'admin';
    dispatch(setRole(newRole));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#f1f5f9] flex">

      {/* SIDEBAR */}
      <div className="w-20 bg-white/70 backdrop-blur-xl border-r border-gray-200 flex flex-col items-center py-6 space-y-6 shadow-sm">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow">
          ₹
        </div>

        <div className="text-gray-500 hover:text-blue-600 cursor-pointer">🏠</div>
        <div className="text-gray-500 hover:text-blue-600 cursor-pointer">📊</div>
        <div className="text-gray-500 hover:text-blue-600 cursor-pointer">💳</div>
        <div className="text-gray-500 hover:text-blue-600 cursor-pointer">⚙️</div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome {role} !
          </h1>

          <div className="flex items-center space-x-4">

            

            <div className="px-3 py-1 bg-white rounded-xl border text-sm shadow-sm">
              {role}
            </div>

            <button
              onClick={handleRoleSwitch}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Switch
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  setEditingTransaction(null);
                  setIsFormOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition"
              >
                + Add
              </button>
            )}

          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

  {/* BALANCE */}
  <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    
    {/* TOP */}
    <div className="flex justify-between items-center mb-3">
      <p className="text-sm text-gray-500">Total Balance</p>
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-sm">
        ₹
      </div>
    </div>

    {/* VALUE */}
    <h2 className="text-2xl font-semibold text-gray-900">
      ₹{transactions.reduce((acc, t) =>
        t.type === 'income' ? acc + t.amount : acc - t.amount, 0)}
    </h2>

    {/* SUBTEXT */}
    <p className="text-xs text-gray-400 mt-1">
      Available balance
    </p>

  </div>

  {/* INCOME */}
  <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    
    <div className="flex justify-between items-center mb-3">
      <p className="text-sm text-gray-500">Income</p>
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 text-green-600 text-sm">
        ↑
      </div>
    </div>

    <h2 className="text-2xl font-semibold text-gray-900">
      ₹{transactions
        .filter(t => t.type === 'income')
        .reduce((a, t) => a + t.amount, 0)}
    </h2>

    <p className="text-xs text-gray-400 mt-1">
      Total earnings
    </p>

  </div>

  {/* EXPENSES */}
  <div className="relative bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
    
    <div className="flex justify-between items-center mb-3">
      <p className="text-sm text-gray-500">Expenses</p>
      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 text-sm">
        ↓
      </div>
    </div>

    <h2 className="text-2xl font-semibold text-gray-900">
      ₹{transactions
        .filter(t => t.type === 'expense')
        .reduce((a, t) => a + t.amount, 0)}
    </h2>

    <p className="text-xs text-gray-400 mt-1">
      Total spending
    </p>

  </div>

</div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-md">
            <BalanceChart transactions={transactions} />
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <CategoryChart transactions={transactions} />
          </div>

        </div>

        {/* INSIGHTS */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-6">
          <Insights transactions={transactions} />
        </div>

        {/* TRANSACTIONS */}
        <div className="bg-white rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Transactions
          </h2>

          <TransactionFilters />

          <TransactionList
            transactions={transactions}
            onEdit={(t) => {
              setEditingTransaction(t);
              setIsFormOpen(true);
            }}
            onDelete={handleDeleteTransaction}
            isAdmin={isAdmin}
          />
        </div>

      </div>

      {/* MODAL */}
      {isAdmin && (
        <TransactionForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={
            editingTransaction
              ? handleUpdateTransaction
              : handleAddTransaction
          }
          transaction={editingTransaction}
        />
      )}

      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
          </div>
        </div>
      )}

    </div>
  );
}