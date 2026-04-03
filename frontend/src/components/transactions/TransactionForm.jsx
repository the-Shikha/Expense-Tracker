import { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CATEGORIES } from '../../types';

export function TransactionForm({
  isOpen,
  onClose,
  onSubmit,
  transaction,
}) {
  const [formData, setFormData] = useState({
    title: '',
    amount: 0,
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title,
        amount: Number(transaction.amount),
        type: transaction.type,
        category: transaction.category,
        date: transaction.date,
      });
    } else {
      setFormData({
        title: '',
        amount: 0,
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }, [transaction, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories =
    formData.type === 'income'
      ? CATEGORIES.income
      : CATEGORIES.expense;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={transaction ? 'Edit Transaction' : 'Add Transaction'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="e.g., Grocery shopping"
          required
        />

        <Input
          label="Amount"
          type="number"
          step="0.01"
          min="0.01"
          value={formData.amount || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: parseFloat(e.target.value),
            })
          }
          placeholder="0.00"
          required
        />

        <Select
          label="Type"
          value={formData.type}
          onChange={(e) => {
            const newType = e.target.value;
            setFormData({
              ...formData,
              type: newType,
              category: '',
            });
          }}
          options={[
            { value: 'expense', label: 'Expense' },
            { value: 'income', label: 'Income' },
          ]}
        />

        <Select
          label="Category"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          options={[
            { value: '', label: 'Select a category' },
            ...categories.map((cat) => ({
              value: cat,
              label: cat,
            })),
          ]}
          required
        />

        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          max={new Date().toISOString().split('T')[0]}
          required
        />

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            className="flex-1"
            disabled={loading}
          >
            {loading
              ? 'Saving...'
              : transaction
              ? 'Update'
              : 'Add'}
          </Button>
        </div>

      </form>
    </Modal>
  );
}