// Fake data only. Both the dashboard and FinBot can import from this file.
// Spending categories summarize the whole month; recentTransactions is only a preview.
export const demoData = {
  month: "September",
  year: 2026,
  bankBalance: 1250.42,
  walletBalance: 347.8,
  monthlyBudget: 500,
  savingsGoal: { name: "Emergency fund", saved: 700, target: 1000, weeklyContribution: 25 },
  spending: [
    { name: "Food & coffee", amount: 142.5, color: "#861f41" },
    { name: "Shopping", amount: 86.84, color: "#e87722" },
    { name: "Transportation", amount: 60, color: "#d6bca7" },
  ],
  recentTransactions: [
    { id: "coffee", name: "Deet’s Place", category: "Food & coffee", date: "Sep 19", amount: -6.5, icon: "☕" },
    { id: "books", name: "University Bookstore", category: "Shopping", date: "Sep 18", amount: -42.84, icon: "▤" },
    { id: "transit", name: "Blacksburg Transit", category: "Transportation", date: "Sep 17", amount: -12, icon: "↗" },
  ],
};

export function formatMoney(value: number, decimals = 2) {
  return value.toLocaleString("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  });
}

// Derive totals so changing sample data also updates labels and charts.
const spentCents = demoData.spending.reduce((total, item) => total + Math.round(item.amount * 100), 0);
const goal = demoData.savingsGoal;
export const demoSummary = {
  totalSpent: spentCents / 100,
  budgetRemaining: (Math.round(demoData.monthlyBudget * 100) - spentCents) / 100,
  budgetPercent: demoData.monthlyBudget > 0 ? Math.min(100, spentCents / demoData.monthlyBudget) : 0,
  savingsRemaining: Math.max(0, Math.round((goal.target - goal.saved) * 100) / 100),
  savingsPercent: goal.target > 0 ? Math.min(100, Math.round(goal.saved / goal.target * 100)) : 0,
  weeksToGoal: goal.weeklyContribution > 0 ? Math.ceil(Math.max(0, goal.target - goal.saved) / goal.weeklyContribution) : null,
  largestSpendingCategory: [...demoData.spending].sort((a, b) => b.amount - a.amount)[0] ?? null,
};
