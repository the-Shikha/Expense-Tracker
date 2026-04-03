import { Search } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          
          <Input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="pl-10"
          />
        </div>

        <Select
          value={filters.type}
          onChange={(e) => dispatch(setType(e.target.value))}
          options={[
            { value: 'all', label: 'All Types' },
            { value: 'income', label: 'Income' },
            { value: 'expense', label: 'Expense' },
          ]}
        />

        <Select
          value={filters.category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          options={[
            { value: 'all', label: 'All Categories' },
            ...allCategories.map((cat) => ({
              value: cat,
              label: cat
            })),
          ]}
        />

        <Button
          variant="secondary"
          onClick={() => dispatch(resetFilters())}
        >
          Reset Filters
        </Button>

      </div>
    </div>
  );
}