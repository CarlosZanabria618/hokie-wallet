"use client";

import { useState, type FormEvent } from "react";

// Canned responses keep this demo entirely local; no AI or banking APIs are called.
function demoReply(question: string) {
  const text = question.toLowerCase();
  if (/sav|goal|fund/.test(text)) return "Your sample emergency fund has $700 of its $1,000 goal. That leaves $300 — adding $25 each week would reach the goal in 12 weeks.";
  if (/spend|spent|budget|left/.test(text)) return "You’ve spent $289.34 of your $500 sample budget this month, leaving $210.66. Food & coffee is your largest category at $142.50.";
  if (/balance|wallet|bank/.test(text)) return "Your sample bank balance is $1,250.42, and your Hokie Wallet has $347.80. These are demo amounts, not connected accounts.";
  return "I’m a demo with a few sample answers. Ask about your balance, monthly spending, or savings goal to explore the dashboard.";
}

export default function FinBot() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  function ask(value: string) {
    if (!value.trim()) return;
    setQuestion(value);
    setReply(demoReply(value));
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }
  return (
    <section className="panel finbot-panel" id="finbot">
      <div className="section-heading"><div className="finbot-title"><span className="bot-icon" aria-hidden="true">✧</span><div><h2>Ask FinBot</h2><p>A little help with the money stuff.</p></div></div><span className="subtle-pill">Demo</span></div>
      <p className="bot-intro">Big plans or small questions? Start here.</p>
      <div className="suggestions"><button onClick={() => ask("How much can I spend?")}>How much can I spend? <span aria-hidden="true">↗</span></button><button onClick={() => ask("How’s my savings goal?")}>How’s my savings goal? <span aria-hidden="true">↗</span></button></div>
      <form onSubmit={handleSubmit}><label className="sr-only" htmlFor="question">Ask FinBot a question</label><div className="ask-input"><input id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about your money…" maxLength={300} /><button type="submit" disabled={!question.trim()} aria-label="Send question">↑</button></div></form>
      <div aria-live="polite" aria-atomic="true">{reply && <p className="bot-reply">{reply}</p>}</div>
      <p className="demo-note">Sample answers only · No accounts connected</p>
    </section>
  );
}
