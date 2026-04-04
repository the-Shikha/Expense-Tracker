import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export function StatCard({ title, amount, type, format, percentage = 70 }) {
  const config = {
    income: { 
      icon: ArrowUpRight, 
      accent: 'from-emerald-400 to-cyan-500', 
      glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]',
      label: 'Inflow' 
    },
    expense: { 
      icon: ArrowDownRight, 
      accent: 'from-rose-500 to-orange-500', 
      glow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.2)]',
      label: 'Outflow' 
    },
    balance: { 
      icon: Wallet, 
      accent: 'from-indigo-500 to-violet-600', 
      glow: 'group-hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]',
      label: 'Capital' 
    }
  }[type] || { icon: Wallet, accent: 'from-gray-500 to-gray-700', label: 'Stats' };

  const Icon = config.icon;
  const formattedValue = format(amount);
  
  
  const [main, decimal] = formattedValue.includes('.') 
    ? formattedValue.split('.') 
    : [formattedValue, '00'];

  return (
    <div className={`group relative w-full transition-all duration-500 hover:-translate-y-2 ${config.glow}`}>
      
     
      <div className={`absolute -inset-[1px] bg-gradient-to-br ${config.accent} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-700 rounded-[2rem] hidden dark:block`} />

      <div className="relative flex flex-col bg-white dark:bg-zinc-950 p-7 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden h-full">
        
       
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
        
       
        <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${config.accent} opacity-0 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.1] blur-3xl transition-opacity duration-1000`} />

       
        <div className="flex items-start justify-between mb-8">
          <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${config.accent} text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-[8deg]`}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-zinc-500 block mb-1">
              {config.label}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
              <TrendingUp size={10} />
              <span>+12%</span>
            </div>
          </div>
        </div>

        
        <div className="space-y-1 relative z-10">
          <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.25em]">
            {title}
          </h3>
          <div className="flex items-baseline gap-0.5">
            <h2 className="text-3xl font-black tracking-tighter tabular-nums text-gray-950 dark:text-white leading-none">
              {main}
            </h2>
            <span className="text-lg text-gray-300 dark:text-zinc-700 font-bold tabular-nums">
              .{decimal}
            </span>
          </div>
        </div>

        
        <div className="mt-8 space-y-2">
          <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-400 dark:text-zinc-600">
            <span>Utilization</span>
            <span>{percentage}%</span>
          </div>
          <div className="relative h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${config.accent} transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
              style={{ width: `${percentage}%` }} 
            />
          </div>
        </div>

        
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      </div>
    </div>
  );
}