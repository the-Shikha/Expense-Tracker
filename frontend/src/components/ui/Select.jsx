import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(
  ({ label, options = [], className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-2 group">
        {label && (
          <div className="flex items-center px-1">
            <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em] transition-all duration-500 group-focus-within:text-indigo-500 group-focus-within:translate-x-1">
              {label}
            </label>
          </div>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            className={`
              w-full appearance-none px-5 py-3.5 
              bg-gray-50/50 dark:bg-black/40 
              backdrop-blur-md
              border transition-all duration-500 outline-none
              rounded-[1.25rem] text-sm font-bold tracking-tight
              text-gray-900 dark:text-white cursor-pointer
              ${
                props.error 
                  ? 'border-rose-500/50 ring-4 ring-rose-500/5' 
                  : 'border-gray-100 dark:border-white/5 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 dark:focus:bg-black/60'
              } 
              hover:border-gray-300 dark:hover:border-white/20
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="bg-white dark:bg-zinc-950 text-gray-900 dark:text-white py-4"
              >
                {option.label}
              </option>
            ))}
          </select>

          
          <div className="absolute right-5 pointer-events-none text-gray-400 group-focus-within:text-indigo-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-all duration-300 group-focus-within:rotate-180">
            <ChevronDown size={16} strokeWidth={2.5} />
          </div>

         
          <div className="absolute inset-0 rounded-[1.25rem] bg-indigo-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity blur-xl" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';