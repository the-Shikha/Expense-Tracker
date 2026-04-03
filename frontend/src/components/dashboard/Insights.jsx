import { TrendingUp, AlertCircle, Calendar } from 'lucide-react';

export function Insights({ transactions }) {
  const expenseTransactions = transactions.filter(
    (t) => t.type === 'expense'
  );

  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  const highestCategory = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  )[0];

  const currentMonth = new Date().getMonth();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  const currentMonthExpenses = expenseTransactions
    .filter((t) => new Date(t.date).getMonth() === currentMonth)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const lastMonthExpenses = expenseTransactions
    .filter((t) => new Date(t.date).getMonth() === lastMonth)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlyChange =
    lastMonthExpenses > 0
      ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

  const recentTransactions = transactions.slice(0, 5);

  const insights = [
    {
      icon: TrendingUp,
      title: 'Top Category',
      value: highestCategory ? highestCategory[0] : '—',
      sub: highestCategory
        ? `₹${highestCategory[1].toFixed(0)} spent`
        : '',
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: Calendar,
      title: 'Monthly Change',
      value:
        monthlyChange !== 0
          ? `${monthlyChange > 0 ? '+' : ''}${monthlyChange.toFixed(1)}%`
          : '0%',
      sub: 'vs last month',
      bg: monthlyChange > 0 ? 'bg-red-50' : 'bg-green-50',
      iconColor: monthlyChange > 0 ? 'text-red-500' : 'text-green-600',
    },
    {
      icon: AlertCircle,
      title: 'Activity',
      value: `${recentTransactions.length}`,
      sub: 'transactions',
      bg: 'bg-gray-100',
      iconColor: 'text-gray-700',
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {insights.map((item) => (
          <div
            key={item.title}
            className={`rounded-2xl p-5 border border-gray-200 ${item.bg} hover:shadow-md transition`}
          >
            {/* ICON */}
            <div className="mb-3">
              <item.icon className={`w-5 h-5 ${item.iconColor}`} />
            </div>

            {/* TITLE */}
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            {/* VALUE */}
            <h2 className="text-xl font-semibold text-gray-900">
              {item.value}
            </h2>

            {/* SUBTEXT */}
            <p className="text-sm text-gray-400 mt-1">
              {item.sub}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}