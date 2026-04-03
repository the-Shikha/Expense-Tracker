import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card } from '../ui/Card';

export function BalanceChart({ transactions }) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let cumulativeBalance = 0;

  const chartData = sortedTransactions.map((transaction) => {
    if (transaction.type === 'income') {
      cumulativeBalance += Number(transaction.amount);
    } else {
      cumulativeBalance -= Number(transaction.amount);
    }

    return {
      date: new Date(transaction.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      balance: cumulativeBalance,
    };
  });

  const aggregatedData = chartData.reduce((acc, curr) => {
    const existing = acc.find((item) => item.date === curr.date);

    if (existing) {
      existing.balance = curr.balance;
    } else {
      acc.push(curr);
    }

    return acc;
  }, []);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Balance Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={aggregatedData}>

          {/* 🔥 Gradient Fill */}
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
          />

          <YAxis
            tick={{ fill: '#6b7280', fontSize: 12 }}
            tickLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `₹${value}`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value) => [`₹${value.toFixed(2)}`, 'Balance']}
          />

          {/* 🔥 AREA LINE */}
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            fill="url(#colorBalance)"
            strokeWidth={3}
            dot={false}
          />

        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}