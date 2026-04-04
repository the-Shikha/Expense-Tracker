import { useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Sparkles, Target, Zap, Waves } from 'lucide-react';

export function Insights({ transactions }) {
  const expenseTransactions = useMemo(() => 
    transactions.filter((t) => t.type === 'expense'), 
  [transactions]);

  const categoryTotals = useMemo(() => 
    expenseTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {}), 
  [expenseTransactions]);

  const highestCategory = useMemo(() => 
    Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0], 
  [categoryTotals]);

  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const { currentMonthExp, lastMonthExp } = useMemo(() => ({
    currentMonthExp: expenseTransactions
      .filter(t => new Date(t.date).getMonth() === currentMonth)
      .reduce((s, t) => s + Number(t.amount), 0),
    lastMonthExp: expenseTransactions
      .filter(t => new Date(t.date).getMonth() === lastMonth)
      .reduce((sum, t) => sum + Number(t.amount), 0)
  }), [expenseTransactions, currentMonth, lastMonth]);

  const diff = lastMonthExp > 0 ? ((currentMonthExp - lastMonthExp) / lastMonthExp) * 100 : 0;
  const isRising = diff > 0;

  return (
    <div className="mt-16 relative">
      
      <div className="flex flex-col gap-2 mb-10 px-2">
        
        <h3 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white">
          Financial Insights
        </h3>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        
        <div className="group relative overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500 group-hover:scale-110 transition-transform duration-500">
              <Target size={20} strokeWidth={2.5} />
            </div>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sector Peak</span>
          </div>
          
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tight mb-1">Highest Burn</h3>
          <p className="text-2xl font-black text-gray-950 dark:text-white uppercase tracking-tighter transition-colors group-hover:text-indigo-500">
            {highestCategory ? highestCategory[0] : 'Idle'}
          </p>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-xs font-bold text-gray-400">₹</span>
            <span className="text-xl font-black tabular-nums dark:text-white">
               {highestCategory ? Number(highestCategory[1]).toLocaleString('en-IN') : 0}
            </span>
          </div>
         
          <div className="mt-6 w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 rounded-full w-2/3 group-hover:w-full transition-all duration-1000" />
          </div>
        </div>

        
        <div className="group relative overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-2">
          <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:rotate-12 ${isRising ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
              {isRising ? <ArrowUpRight size={20} strokeWidth={2.5} /> : <ArrowDownRight size={20} strokeWidth={2.5} />}
            </div>
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Monthly Delta</span>
          </div>

          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-tight mb-1">Momentum</h3>
          <div className="flex items-center gap-3">
            <p className={`text-4xl font-black tabular-nums tracking-tighter ${isRising ? 'text-rose-500' : 'text-emerald-500'}`}>
              {isRising ? '+' : ''}{diff.toFixed(0)}%
            </p>
            <div className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${isRising ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-white'}`}>
              {isRising ? 'Caution' : 'Optimal'}
            </div>
          </div>
          <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
            Variance compared to <br/> previous billing cycle
          </p>
        </div>

        
        <div className="group relative overflow-hidden bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-2">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Waves size={80} className="text-white dark:text-black" />
          </div>

          <div className="flex items-center gap-2 mb-8">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">Insights</span>
          </div>

          <p className="text-lg font-bold text-gray-600 dark:text-white leading-tight tracking-tight relative z-10">
            {isRising 
              ? "High velocity detected in your spending. Strategic reduction recommended." 
              : "Spending flow has reached an equilibrium point. Financial health is stable."}
          </p>

          <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-black dark:hover:text-white transition-colors">
            Optimize Flow <Zap size={12} fill="currentColor" />
          </button>
        </div>

      </div>
    </div>
  );
}