import FinBot from "./components/finbot";

import { demoData, demoSummary, formatMoney as money } from "./data/demo-data";

const { spending, recentTransactions: transactions, savingsGoal: goal } = demoData;

function Balance({ amount }: { amount: number }) {
  const [whole, cents] = money(amount).split(".");
  return <h2>{whole}<span>.{cents}</span></h2>;
}

// Each chart segment follows its category's share of the sample spending.
let chartPosition = 0;
const chartSegments = spending.map((item) => {
  const start = chartPosition;
  chartPosition += demoSummary.totalSpent > 0 ? item.amount / demoSummary.totalSpent * 100 : 0;
  const end = Math.max(start, chartPosition - 0.75);
  return `${item.color} ${start}% ${end}%, #fff ${end}% ${chartPosition}%`;
});
const chartBackground = demoSummary.totalSpent > 0
  ? `conic-gradient(${chartSegments.join(", ")})`
  : "#efeff2";

export default function Home() {
  return (
    <div className="dashboard">
      <a className="skip-link" href="#main">Skip to dashboard</a>
      <aside className="sidebar">
        <a className="brand" href="#main"><span className="brand-icon">hw<span>•</span></span><span>hokie<span className="brand-light">wallet</span></span></a>
        <p className="nav-label">YOUR MONEY, SIMPLIFIED</p>
        <nav aria-label="Main navigation">
          <a className="nav-active" href="#main" aria-current="page"><span aria-hidden="true">◫</span> Overview</a>
          <a href="#activity"><span aria-hidden="true">⇄</span> Recent activity</a>
          <a href="#savings"><span aria-hidden="true">◎</span> Savings goal</a>
          <a href="#finbot"><span aria-hidden="true">✧</span> Ask FinBot</a>
        </nav>
        <div className="sidebar-note"><span className="little-star" aria-hidden="true">✳</span><h3>Small steps.<br />Big possibilities.</h3><p>A little clarity goes a long way. Make room for what matters.</p><span className="hokie-tag">MADE FOR HOKIES</span></div>
        <div className="profile"><span className="avatar">H</span><div><strong>Hokie student</strong><small>Personal dashboard</small></div></div>
      </aside>
      <main id="main">
        <header className="topbar"><span>My workspace <span className="breadcrumb">/ Overview</span></span><span className="demo-badge"><span /> Demo · Sample data</span></header>
        <div className="content">
          <section className="welcome"><div><p className="eyebrow">A LITTLE CLARITY FOR YOUR EVERYDAY</p><h1>Good to see you, Hokie <span className="wave" aria-hidden="true">✳</span></h1><p>Here’s where your money stands. You’ve got this.</p></div><span className="date-label">{demoData.month} {demoData.year}</span></section>
          <section className="balance-grid" aria-label="Account overview">
            <article className="balance-card"><div className="card-label">Bank balance <span className="card-icon" aria-hidden="true">▥</span></div><Balance amount={demoData.bankBalance} /><p><span className="status-dot" /> Available in checking</p></article>
            <article className="balance-card wallet-card"><div className="card-label">Hokie Wallet <span className="card-icon" aria-hidden="true">▱</span></div><Balance amount={demoData.walletBalance} /><p>Your everyday campus balance <span aria-hidden="true">↗</span></p></article>
            <article className="balance-card"><div className="card-label">Spent this month <span className="card-icon" aria-hidden="true">↗</span></div><Balance amount={demoSummary.totalSpent} /><p>Of your {money(demoData.monthlyBudget, 0)} monthly budget</p><div className="budget-track" role="progressbar" aria-label="Monthly budget spent" aria-valuenow={demoSummary.budgetPercent} aria-valuemin={0} aria-valuemax={100} aria-valuetext={`${money(demoSummary.totalSpent)} spent of ${money(demoData.monthlyBudget)}`}><span style={{ width: `${demoSummary.budgetPercent}%` }} /></div></article>
          </section>
          <div className="detail-grid">
            <section className="panel spending-panel"><div className="section-heading"><div><p className="eyebrow">THE BIG PICTURE</p><h2>A month in spending</h2></div><span className="subtle-pill">{demoData.month}</span></div><div className="spending-content"><div className="donut" role="img" style={{ background: chartBackground }} aria-label={`Total spending: ${money(demoSummary.totalSpent)}. ${spending.map((item) => `${item.name}: ${money(item.amount)}`).join(", ")}`}><div><span>Total spent</span><strong>{money(demoSummary.totalSpent)}</strong><small>this month</small></div></div><div className="legend">{spending.map((item) => <div className="legend-row" key={item.name}><span className="legend-dot" style={{ background: item.color }} /><span>{item.name}</span><strong>{money(item.amount)}</strong></div>)}<p className="budget-note">{demoSummary.budgetRemaining >= 0 ? <>You have <strong>{money(demoSummary.budgetRemaining)}</strong> left in your budget.</> : <>You are <strong>{money(Math.abs(demoSummary.budgetRemaining))}</strong> over your budget.</>}</p></div></div></section>
            <section className="panel savings-panel" id="savings"><div className="section-heading"><div><p className="eyebrow">LOOKING AHEAD</p><h2>A little closer every day</h2></div><span className="goal-icon" aria-hidden="true">◎</span></div><p className="goal-name">{goal.name} <span>Savings goal</span></p><div className="goal-amount"><strong>{money(goal.saved, 0)}</strong><span>of {money(goal.target, 0)}</span><b>{demoSummary.savingsPercent}%</b></div><progress value={goal.saved} max={goal.target} aria-label={`${goal.name}: ${money(goal.saved)} of ${money(goal.target)}`} /><p className="goal-caption">{demoSummary.savingsRemaining > 0 ? <>Just <strong>{money(demoSummary.savingsRemaining, 0)} to go.</strong> Future you says thanks.</> : "Goal reached. Future you says thanks!"}</p><div className="savings-tip"><span aria-hidden="true">✧</span><p>Little by little adds up.<br /><strong>{demoSummary.weeksToGoal === null ? "Set a weekly contribution to plan your goal." : demoSummary.weeksToGoal === 0 ? "You’ve reached your savings goal." : `${money(goal.weeklyContribution, 0)} a week gets you there in ${demoSummary.weeksToGoal} weeks.`}</strong></p></div></section>
            <section className="panel" id="activity"><div className="section-heading"><div><p className="eyebrow">THE EVERYDAY DETAILS</p><h2>Recent activity</h2></div><span className="subtle-pill">Sample transactions</span></div><ul className="transactions">{transactions.map((item) => <li key={item.id}><span className="transaction-icon" aria-hidden="true">{item.icon}</span><div className="transaction-name"><strong>{item.name}</strong><span>{item.category} · {item.date}</span></div><strong>{money(item.amount)}</strong></li>)}</ul><p className="activity-note">A snapshot of your latest sample purchases.</p></section>
            <FinBot />
          </div>
          <footer><span><strong>hokiewallet</strong> · More clarity. Less money stress.</span><span>Built for student life <span aria-hidden="true">↗</span></span></footer>
        </div>
      </main>
    </div>
  );
}
