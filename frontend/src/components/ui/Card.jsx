export function Card({ children, className = '', hover = false }) {
  const baseStyles = 
    'relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-2xl shadow-black/[0.02]';

  const hoverStyles = hover 
    ? 'transition-all duration-500 ease-out hover:shadow-indigo-500/10 hover:border-indigo-500/20 md:hover:-translate-y-1' 
    : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      
      
      <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 dark:group-hover:opacity-100 transition-opacity blur-3xl pointer-events-none" />

    
      <div className="relative z-10">
        {children}
      </div>

     
      <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent" />
      
    </div>
  );
}