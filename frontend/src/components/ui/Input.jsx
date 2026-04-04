import { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-2 group">
        {label && (
          <div className="flex items-center justify-between px-1">
            <label className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em] transition-all duration-500 group-focus-within:text-indigo-500 group-focus-within:translate-x-1">
              {label}
            </label>
            
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-5 py-3.5 bg-gray-50/50 dark:bg-black/40 
              border transition-all duration-500 outline-none
              rounded-[1.25rem] text-sm font-bold tracking-tight
              text-gray-900 dark:text-white placeholder:text-gray-400/50
              ${
                error 
                  ? 'border-rose-500/50 ring-4 ring-rose-500/5 dark:bg-rose-500/[0.02]' 
                  : 'border-gray-100 dark:border-white/5 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 dark:focus:bg-black/60'
              } 
              hover:border-gray-300 dark:hover:border-white/20
              backdrop-blur-md
              ${className}
            `}
            {...props}
          />

        
          <div className="absolute inset-0 rounded-[1.25rem] bg-indigo-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity blur-xl" />
        </div>

        {error && (
          <div className="flex items-center gap-2 px-1 animate-in fade-in slide-in-from-left-2 duration-500">
            <div className="h-[2px] w-3 bg-rose-500 rounded-full" />
            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest italic">
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';