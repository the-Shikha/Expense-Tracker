import { useState, useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { 
  ShoppingBag, Utensils, Car, House, 
  Gamepad2, Zap, Heart, Layers 
} from 'lucide-react';

const COLORS = [
  { start: '#6366f1', end: '#4f46e5' }, 
  { start: '#10b981', end: '#059669' }, 
  { start: '#f59e0b', end: '#d97706' }, 
  { start: '#8b5cf6', end: '#7c3aed' },
  { start: '#f472b6', end: '#db2777' }, 
];

const getCategoryIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('food') || n.includes('dine')) return <Utensils size={18} />;
  if (n.includes('shop')) return <ShoppingBag size={18} />;
  if (n.includes('travel') || n.includes('car')) return <Car size={18} />;
  if (n.includes('home') || n.includes('rent')) return <House size={18} />;
  if (n.includes('ent') || n.includes('game')) return <Gamepad2 size={18} />;
  if (n.includes('bill') || n.includes('util')) return <Zap size={18} />;
  if (n.includes('health')) return <Heart size={18} />;
  return <Layers size={18} />;
};

export function CategoryChart({ transactions }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const categoryData = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      const existing = acc.find((item) => item.name === transaction.category);
      if (existing) {
        existing.value += Number(transaction.amount);
      } else {
        acc.push({
          name: transaction.category,
          value: Number(transaction.amount),
        });
      }
      return acc;
    }, []).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = useMemo(() => categoryData.reduce((sum, item) => sum + item.value, 0), [categoryData]);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx} cy={cy}
          innerRadius={innerRadius - 6}
          outerRadius={outerRadius + 6}
          startAngle={startAngle} endAngle={endAngle}
          fill={fill}
          style={{ opacity: 0.15, filter: 'blur(10px)' }}
        />
        <Sector
          cx={cx} cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle} endAngle={endAngle}
          fill={fill}
          cornerRadius={12}
        />
      </g>
    );
  };

  return (
    <div className="h-full w-full select-none">
      {categoryData.length > 0 ? (
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6 md:gap-10 p-2">
          
          
          <div className="relative w-full xl:w-[45%] h-[280px] md:h-[340px] flex items-center justify-center">
            <div className="absolute w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full border border-gray-100 dark:border-white/5 shadow-inner" />

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {categoryData.map((_, index) => (
                    <linearGradient id={`grad-${index}`} key={index} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={COLORS[index % COLORS.length].start} />
                      <stop offset="100%" stopColor={COLORS[index % COLORS.length].end} />
                    </linearGradient>
                  ))}
                </defs>
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={categoryData}
                  cx="50%" cy="50%"
                  innerRadius={60} 
                  outerRadius={82}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={(_, index) => setActiveIndex(activeIndex === index ? null : index)}
                >
                  {categoryData.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#grad-${index})`}
                      className="outline-none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 text-center">
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 truncate w-full">
                  {activeIndex !== null ? categoryData[activeIndex].name : 'Total Spend'}
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-gray-950 dark:text-white mt-1 tabular-nums tracking-tighter transition-all duration-300">
                  ₹{activeIndex !== null 
                    ? categoryData[activeIndex].value.toLocaleString('en-IN') 
                    : total.toLocaleString('en-IN')}
                </h2>
                {activeIndex !== null && (
                  <p className="text-[9px] md:text-[10px] font-bold text-indigo-500 mt-1 animate-in fade-in slide-in-from-bottom-1">
                    {((categoryData[activeIndex].value / total) * 100).toFixed(1)}% Allocation
                  </p>
                )}
            </div>
          </div>

          <div className="w-full xl:w-[55%] space-y-2 max-h-[300px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-1 md:pr-2">
            {categoryData.map((item, index) => {
              const isActive = activeIndex === index;
              const color = COLORS[index % COLORS.length];

              return (
                <div 
                  key={item.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`group relative flex items-center justify-between p-3 md:p-3.5 rounded-2xl transition-all duration-500 cursor-pointer border ${
                    isActive 
                    ? 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 shadow-xl -translate-y-0.5' 
                    : 'bg-transparent border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div 
                      className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6"
                      style={{ 
                        background: `linear-gradient(135deg, ${color.start}15, ${color.end}15)`,
                        color: color.start 
                      }}
                    >
                      {getCategoryIcon(item.name)}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs md:text-sm font-black text-gray-950 dark:text-gray-100 uppercase tracking-tight">
                        {item.name}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                        {(item.value / total * 100).toFixed(0)}% Allocation
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col text-right">
                    <span className="text-xs md:text-sm font-black text-gray-900 dark:text-white tabular-nums">
                      ₹{item.value.toLocaleString('en-IN')}
                    </span>
                    <div className="mt-1.5 md:mt-2 h-1 w-12 md:w-16 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${(item.value / total) * 100}%`,
                          backgroundColor: color.start
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        <div className="h-[280px] md:h-[340px] flex items-center justify-center text-gray-400">
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 italic">No category data available</p>
        </div>
      )}
    </div>
  );
}