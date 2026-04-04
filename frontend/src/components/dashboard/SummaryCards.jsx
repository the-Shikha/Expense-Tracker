import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      icon: Wallet,
      gradient: 'from-indigo-500 to-blue-600',
      iconColor: 'text-indigo-500',
      label: 'Net Capital'
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      iconColor: 'text-emerald-500',
      label: 'Inflow'
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: TrendingDown,
      gradient: 'from-rose-500 to-orange-600',
      iconColor: 'text-rose-500',
      label: 'Outflow'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4 md:px-0">
      {cards.map((card) => (
        <div 
          key={card.title} 
          className="group relative overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/5 md:hover:-translate-y-1"
        >
         
          <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${card.gradient} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity`} />

          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1 md:space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                  {card.label}
                </span>
              </div>
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">
                {card.title}
              </h3>
              <p className="text-2xl md:text-3xl font-black text-gray-950 dark:text-white tracking-tighter tabular-nums">
                ₹{card.value.toLocaleString('en-IN')}
              </p>
            </div>

            <div className={`p-3 md:p-4 rounded-2xl md:rounded-[1.5rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 ${card.iconColor} transition-transform group-hover:scale-110 duration-500`}>
              <card.icon size={24} strokeWidth={2.5} />
            </div>
          </div>

          <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-gray-100 dark:via-white/5 to-transparent" />
        </div>
      ))}
    </div>
  );
}