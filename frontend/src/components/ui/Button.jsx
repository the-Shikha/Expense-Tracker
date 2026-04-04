export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-black uppercase tracking-[0.1em] rounded-2xl transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black border';

  const variantStyles = {
    
    primary:
      'bg-indigo-600 border-indigo-500 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 focus:ring-indigo-500',
    
   
    secondary:
      'bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-zinc-800 shadow-sm focus:ring-indigo-500',
    
    
    danger:
      'bg-rose-500 border-rose-400 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 focus:ring-rose-400',
    
    
    ghost:
      'bg-transparent border-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-zinc-400 hover:text-gray-950 dark:hover:text-white focus:ring-gray-300',
    
   
    outline:
      'bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-500',
   
    stealth:
      'bg-gray-950 dark:bg-white text-white dark:text-black border-transparent hover:opacity-90 shadow-xl shadow-black/10 dark:shadow-white/5'
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-[9px] tracking-[0.15em]',
    md: 'px-6 py-3 text-[10px] tracking-[0.2em]',
    lg: 'px-10 py-4 text-[12px] tracking-[0.25em]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}