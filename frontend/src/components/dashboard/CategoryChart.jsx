import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Card } from '../ui/Card';

const COLORS = [
  '#3b82f6', '#60a5fa', '#93c5fd', '#cbd5e1',
  '#d1d5db', '#fbcfe8', '#f97316', '#ef4444'
];

export function CategoryChart({ transactions }) {
  const expenseTransactions = transactions.filter(
    (t) => t.type === 'expense'
  );

  const categoryData = expenseTransactions.reduce((acc, transaction) => {
    const existing = acc.find(
      (item) => item.name === transaction.category
    );

    if (existing) {
      existing.value += Number(transaction.amount);
    } else {
      acc.push({
        name: transaction.category,
        value: Number(transaction.amount),
      });
    }

    return acc;
  }, []);

  const sortedData = categoryData.sort((a, b) => b.value - a.value);

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Spending Breakdown
      </h3>

      {sortedData.length > 0 ? (
        <div className="flex items-center justify-between">

          {/* 🔥 DONUT CHART */}
          <div className="w-[55%]">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={sortedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(1)}%`
                  }
                  labelLine={false}
                >
                  {sortedData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 RIGHT SIDE LEGEND */}
          <div className="w-[45%] space-y-3 pl-4">
            {sortedData.map((item, index) => (
              <div key={item.name} className="flex items-center space-x-3">

                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-sm text-gray-700">
                  {item.name}
                </span>

              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="h-[280px] flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      )}
    </Card>
  );
}