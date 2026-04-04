import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { CATEGORIES } from '../../types';
import { AlertTriangle, Fingerprint, Calendar, IndianRupee } from 'lucide-react';

export function TransactionForm({
  isOpen,
  onClose,
  onSubmit,
  editingTransaction,
  transactions = []
}) {
  const getInitialState = () => ({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [formData, setFormData] = useState(getInitialState());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title || '',
        amount: editingTransaction.amount || '',
        type: editingTransaction.type || 'expense',
        category: editingTransaction.category || '',
        date: editingTransaction.date || new Date().toISOString().split('T')[0],
      });
    } else {
      setFormData(getInitialState());
    }
  }, [editingTransaction, isOpen]);

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.amount || Number(formData.amount) <= 0)
      newErrors.amount = "Enter valid amount";
    if (!formData.category) newErrors.category = "Select category";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isDuplicate = transactions.some(t =>
      t.id !== editingTransaction?.id &&
      t.title.toLowerCase() === formData.title.toLowerCase() &&
      Number(t.amount) === Number(formData.amount)
    );

    if (isDuplicate && !duplicateWarning) {
      setDuplicateWarning(true);
      return;
    }

    processSubmit();
  };

  const processSubmit = async () => {
    setLoading(true);
    try {
      await onSubmit(
        editingTransaction
          ? { ...formData, id: editingTransaction.id }
          : formData
      );
      setFormData(getInitialState());
      setErrors({});
      setDuplicateWarning(false);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTransaction ? "Edit Transaction" : "Add Transaction"}
    >
      <div className="space-y-4 w-full max-w-full overflow-x-hidden">
       
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-500 uppercase font-black tracking-widest">
          Track your capital flow
        </p>

       
        {duplicateWarning && (
          <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 text-amber-500 px-4 py-3 rounded-2xl text-xs sm:text-sm animate-pulse">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} />
              <span>Duplicate detected</span>
            </div>
            <button onClick={processSubmit} className="font-black underline uppercase tracking-tighter">
              Ignore
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
         
          <div className="flex bg-gray-100 dark:bg-zinc-800/50 p-1.5 rounded-2xl border border-transparent dark:border-white/5">
            {['expense', 'income'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({ ...formData, type: t, category: '' })}
                className={`flex-1 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  formData.type === t
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          
          <div className="relative">
            <Input
              label="Transaction Title"
              placeholder="e.g. Monthly Rent"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="dark:bg-zinc-900"
            />
            {errors.title && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.title}</p>
            )}
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                <IndianRupee size={16} />
              </div>
              <input
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="pl-10 p-3.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500/50 outline-none w-full text-sm font-bold tabular-nums transition-all dark:text-white"
              />
              {errors.amount && (
                <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.amount}</p>
              )}
            </div>

            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
                <Calendar size={16} />
              </div>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="pl-10 p-3.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-transparent focus:border-indigo-500 dark:focus:border-indigo-500/50 outline-none w-full text-sm font-bold transition-all dark:text-white appearance-none"
              />
              {errors.date && (
                <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.date}</p>
              )}
            </div>
          </div>

         
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-500">
              Select Category
            </label>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto sm:max-h-none pr-1 custom-scrollbar">
              {(formData.type === 'income' ? CATEGORIES.income : CATEGORIES.expense).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat })}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                    formData.category === cat
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 border-transparent hover:border-gray-300 dark:hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="text-rose-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.category}</p>
            )}
          </div>

         
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-xs flex justify-center items-center gap-3 transition-all active:scale-95 shadow-xl shadow-indigo-500/20 overflow-hidden"
          >
            
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            {loading ? 'Processing...' : (editingTransaction ? 'Update Entry' : 'Commit Entry')}
            <Fingerprint size={18} className="group-hover:rotate-12 transition-transform" />
          </button>
        </form>
      </div>
    </Modal>
  );
}