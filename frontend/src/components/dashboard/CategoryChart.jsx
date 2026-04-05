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

  const total = useMemo(
    () => categoryData.reduce((sum, item) => sum + item.value, 0),
    [categoryData]
  );

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <Sector
          cx={cx} cy={cy}
          innerRadius={innerRadius - 6}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ opacity: 0.1, filter: 'blur(8px)' }}
        />
        <Sector
          cx={cx} cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 2}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={10}
        />
      </g>
    );
  };

  return (
    <div className="h-full w-full select-none px-2 sm:px-3 md:px-4">
      {categoryData.length > 0 ? (
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6 lg:gap-10">

         
          <div className="relative w-full lg:w-[45%] h-[240px] xs:h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-center">
            
            <div className="absolute w-[120px] h-[120px] xs:w-[140px] xs:h-[140px] sm:w-[170px] sm:h-[170px] md:w-[210px] md:h-[210px] rounded-full border border-gray-100 dark:border-white/5 shadow-inner" />

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {categoryData.map((_, index) => (
                    <linearGradient key={index} id={`grad-${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={COLORS[index % COLORS.length].start} />
                      <stop offset="100%" stopColor={COLORS[index % COLORS.length].end} />
                    </linearGradient>
                  ))}
                </defs>

                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="85%"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={(_, index) =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  animationBegin={0}
                  animationDuration={800}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#grad-${index})`}
                      className="outline-none cursor-pointer"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

           
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 sm:px-3 pointer-events-none">
              <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 truncate w-full">
                {activeIndex !== null
                  ? categoryData[activeIndex].name
                  : 'Net Spending'}
              </p>

              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-black text-gray-950 dark:text-white mt-1 tabular-nums tracking-tight">
                ₹
                {activeIndex !== null
                  ? categoryData[activeIndex].value.toLocaleString('en-IN')
                  : total.toLocaleString('en-IN')}
              </h2>

              {activeIndex !== null && (
                <div className="mt-1 flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: COLORS[activeIndex % COLORS.length].start }}
                  />
                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-indigo-500">
                    {((categoryData[activeIndex].value / total) * 100).toFixed(1)}% Share
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-[55%] space-y-2 sm:space-y-2.5 max-h-[260px] sm:max-h-[300px] md:max-h-[340px] overflow-y-auto custom-scrollbar pr-1 sm:pr-2">
            {categoryData.map((item, index) => {
              const isActive = activeIndex === index;
              const color = COLORS[index % COLORS.length];

              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`group flex items-center justify-between p-2.5 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 shadow-lg'
                      : 'bg-transparent border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${color.start}15, ${color.end}15)`,
                        color: color.start,
                      }}
                    >
                      {getCategoryIcon(item.name)}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] sm:text-sm font-black text-gray-950 dark:text-gray-100 truncate">
                        {item.name}
                      </span>
                      <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-600">
                        {((item.value / total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col text-right shrink-0">
                    <span className="text-[11px] sm:text-sm md:text-base font-black text-gray-900 dark:text-white">
                      ₹{item.value.toLocaleString('en-IN')}
                    </span>

                    <div className="mt-1.5 h-1 w-10 sm:w-12 md:w-16 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden self-end">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${(item.value / total) * 100}%`,
                          backgroundColor: color.start,
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
        <div className="h-[260px] sm:h-[300px] md:h-[340px] flex items-center justify-center text-gray-400">
          <p className="text-xs font-bold uppercase tracking-widest opacity-50 italic text-center px-4">
            No data available
          </p>
        </div>
      )}
    </div>
  );
}