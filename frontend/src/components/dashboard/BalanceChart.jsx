import { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function BalanceChart({ transactions }) {
  const [isHovered, setIsHovered] = useState(false);

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    return sorted.map((t) => {
      balance += t.type === 'income' ? Number(t.amount) : -Number(t.amount);
      return {
        date: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: Number(balance.toFixed(2)),
      };
    });
  }, [transactions]);

  const currentBalance = data[data.length - 1]?.balance || 0;

  return (
    <div className="w-full select-none group px-2 md:px-0">
    
      <div className="flex justify-between items-end mb-6 md:mb-8 px-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
            <p className="text-[9px] md:text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">Capital Flow</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tighter tabular-nums">
            ₹{currentBalance.toLocaleString('en-IN')}
          </h2>
        </div>
      </div>

    
      <div className="h-[260px] md:h-[380px] w-full relative group/chart">
        <ResponsiveContainer width="100%" height="100%">
  <AreaChart 
    data={data} 
    // CHANGE 1: Left margin ko 0 ya positive rakhein taaki labels cut na ho
    margin={{ top: 10, right: 10, left: 0, bottom: 20 }} 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <defs>
      <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
      </linearGradient>
    </defs>

    <CartesianGrid 
      strokeDasharray="3 3" 
      vertical={false} 
      stroke="currentColor" 
      className="text-gray-200 dark:text-gray-800/60" 
    />

    <XAxis 
      dataKey="date" 
      axisLine={false}
      tickLine={false}
      tick={{ fill: '#94a3b8', fontSize: 11 }}
      dy={15} // Labels ko thoda niche shift kiya
      interval="preserveStartEnd" 
      minTickGap={40}
    />

    <YAxis 
      axisLine={false}
      tickLine={false}
      tick={{ fill: '#94a3b8', fontSize: 11 }}
      // CHANGE 2: Width badha di taaki bada amount (₹100k) poora dikhe
      width={60} 
      tickFormatter={(val) => `₹${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
      // CHANGE 3: Padding add ki taaki numbers chart line se na takrayein
      tickMargin={10} 
    />

    <Tooltip 
      content={<CustomTooltip />} 
      cursor={{ stroke: '#6366f1', strokeWidth: 2, strokeDasharray: '5 5' }}
    />

    <Area
      type="monotone"
      dataKey="balance"
      stroke="#6366f1"
      strokeWidth={3}
      fill="url(#balanceFill)"
      animationDuration={1500}
      activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
    />
  </AreaChart>
</ResponsiveContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl bg-white/80 dark:bg-zinc-950/90 p-4 rounded-2xl border border-white/40 dark:border-white/5 shadow-2xl animate-in zoom-in duration-200 ring-1 ring-black/5">
        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-xl md:text-2xl font-black text-gray-950 dark:text-white tabular-nums tracking-tighter">
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
        <div className="h-1 w-full bg-indigo-500/10 rounded-full mt-2 overflow-hidden">
          <div className="h-full bg-indigo-500 w-2/3 rounded-full animate-in slide-in-from-left duration-700" />
        </div>
      </div>
    );
  }
  return null;
};