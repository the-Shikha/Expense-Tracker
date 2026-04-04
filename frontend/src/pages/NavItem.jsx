export function NavItem({ label, icon: Icon, active, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative flex items-center gap-3 px-4 py-3 rounded-2xl 
        transition-all duration-300 cursor-pointer select-none
        ${active 
          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
          : 'text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
        }
      `}
    >
      
      {active && (
        <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[4px_0_12px_rgba(99,102,241,0.5)]" />
      )}

      
      <div className={`
        transition-transform duration-300 group-hover:scale-110
        ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}
      `}>
        {Icon && (
          <Icon 
            size={18} 
            strokeWidth={active ? 3 : 2} 
            className="transition-all"
          />
        )}
      </div>

      
      <span className={`
        text-[11px] uppercase tracking-[0.2em] font-black transition-all
        ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}
      `}>
        {label}
      </span>

     
      {active && (
        <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-2xl -z-10" />
      )}
    </div>
  );
}