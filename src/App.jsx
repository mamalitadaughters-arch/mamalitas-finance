import { useState, useEffect } from "react";

const COLORS = {
  cream: "#FDF6EE", blush: "#F2C4B0", rose: "#C97B6B", mauve: "#8B4F5E",
  deepPlum: "#4A2535", gold: "#C9A84C", sage: "#7A9E7E", warmWhite: "#FFFAF5",
};

const defaultBudget = [
  { id: 1, category: "Groceries & Food", budgeted: 800, spent: 0, icon: "🛒" },
  { id: 2, category: "Kids & School", budgeted: 400, spent: 0, icon: "🎒" },
  { id: 3, category: "Housing & Utilities", budgeted: 2200, spent: 0, icon: "🏠" },
  { id: 4, category: "Healthcare", budgeted: 300, spent: 0, icon: "💊" },
  { id: 5, category: "Transportation", budgeted: 500, spent: 0, icon: "🚗" },
  { id: 6, category: "Self-Care & Misc", budgeted: 150, spent: 0, icon: "✨" },
];
const defaultSavings = [
  { id: 1, name: "Emergency Fund", goal: 10000, saved: 0, icon: "🛡️", color: "#7A9E7E" },
  { id: 2, name: "Family Vacation", goal: 3000, saved: 0, icon: "🌴", color: "#C9A84C" },
  { id: 3, name: "Back to School", goal: 800, saved: 0, icon: "📚", color: "#C97B6B" },
  { id: 4, name: "Christmas Fund", goal: 1500, saved: 0, icon: "🎁", color: "#8B4F5E" },
];
const defaultDebts = [
  { id: 1, name: "Credit Card", balance: 0, payment: 0, rate: 0, icon: "💳" },
  { id: 2, name: "Car Loan", balance: 0, payment: 0, rate: 0, icon: "🚗" },
  { id: 3, name: "Medical Bill", balance: 0, payment: 0, rate: 0, icon: "🏥" },
];
const wisdoms = [
  "She considers a field and buys it; out of her earnings she plants a vineyard. — Proverbs 31:16",
  "A little every day adds up to a life well-built.",
  "Mama, your steady hand shapes more than budgets — it shapes futures.",
  "Plan with intention. Spend with purpose. Save with hope.",
  "You are not just managing money. You are building a legacy.",
];
const ICONS = ["🛒","🎒","🏠","💊","🚗","✨","💳","🏥","🌴","📚","🎁","🛡️","💰","🏦","📱","🍽️","👗","⛽","🎓","🏋️","🐾","🎮","✈️","🎄"];

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }

function ProgressBar({ value, max, color = COLORS.rose }) {
  const pct = Math.min((value / (max || 1)) * 100, 100);
  return (
    <div style={{ background: "#E8DDD5", borderRadius: 99, height: 10, overflow: "hidden", width: "100%" }}>
      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: value > max && max > 0 ? "#C0392B" : color, transition: "width 0.6s ease" }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return <div style={{ background: COLORS.warmWhite, borderRadius: 18, padding: "20px 22px", boxShadow: "0 2px 18px rgba(74,37,53,0.07)", border: "1px solid rgba(201,168,76,0.18)", ...style }}>{children}</div>;
}

function NumInput({ value, onChange, prefix }) {
  return (
    <div style={{ display: "flex", alignItems: "center", background: COLORS.cream, border: `1.5px solid ${COLORS.blush}`, borderRadius: 8, padding: "5px 10px" }}>
      {prefix && <span style={{ color: COLORS.mauve, fontSize: 13, marginRight: 2 }}>{prefix}</span>}
      <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)}
        style={{ border: "none", background: "transparent", outline: "none", fontFamily: "Georgia, serif", fontSize: 13, color: COLORS.deepPlum, width: 72, textAlign: "right" }} />
    </div>
  );
}

function TxtInput({ value, onChange, placeholder }) {
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ border: `1.5px solid ${COLORS.blush}`, background: COLORS.cream, borderRadius: 8, padding: "5px 10px", fontFamily: "Georgia, serif", fontSize: 13, color: COLORS.deepPlum, outline: "none", width: 130 }} />
  );
}

function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ fontSize: 20, background: COLORS.cream, border: `1px solid ${COLORS.blush}`, borderRadius: 8, padding: "4px 8px", cursor: "pointer" }}>{value}</button>
      {open && (
        <div style={{ position: "absolute", top: 38, left: 0, zIndex: 200, background: "#fff", border: `1px solid ${COLORS.blush}`, borderRadius: 12, padding: 10, display: "flex", flexWrap: "wrap", gap: 4, width: 210, boxShadow: "0 8px 24px rgba(74,37,53,0.15)" }}>
          {ICONS.map(ic => (
            <button key={ic} onClick={() => { onChange(ic); setOpen(false); }}
              style={{ fontSize: 20, border: "none", cursor: "pointer", padding: 4, borderRadius: 6, background: ic === value ? COLORS.blush : "transparent" }}>{ic}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function EditBar({ editing, onToggle, onAdd, addLabel }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 4 }}>
      <button onClick={onToggle} style={{ background: editing ? COLORS.mauve : COLORS.cream, color: editing ? "#fff" : COLORS.mauve, border: `1.5px solid ${COLORS.mauve}`, borderRadius: 50, padding: "6px 16px", fontSize: 12, fontFamily: "Georgia, serif", cursor: "pointer", fontWeight: 600 }}>
        {editing ? "✓ Done" : "✏️ Edit"}
      </button>
      {editing && <button onClick={onAdd} style={{ background: COLORS.sage, color: "#fff", border: "none", borderRadius: 50, padding: "6px 16px", fontSize: 12, fontFamily: "Georgia, serif", cursor: "pointer", fontWeight: 600 }}>+ {addLabel}</button>}
    </div>
  );
}

function DelBtn({ onClick }) {
  return <button onClick={onClick} style={{ background: "#fee", border: "1px solid #fcc", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 12, color: "#c00" }}>🗑</button>;
}

function BudgetTab() {
  const [budget, setBudget] = useState(() => load("ml_budget", defaultBudget));
  const [editing, setEditing] = useState(false);
  useEffect(() => save("ml_budget", budget), [budget]);
  const upd = (id, f, v) => setBudget(b => b.map(i => i.id === id ? { ...i, [f]: v } : i));
  const totalBudgeted = budget.reduce((a, b) => a + b.budgeted, 0);
  const totalSpent = budget.reduce((a, b) => a + b.spent, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.mauve}, ${COLORS.deepPlum})` }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          {[["Monthly Budget", `$${totalBudgeted.toLocaleString()}`, false], ["Spent So Far", `$${totalSpent.toLocaleString()}`, false], ["Remaining", `$${(totalBudgeted - totalSpent).toLocaleString()}`, true]].map(([l, v, h]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ color: h ? COLORS.gold : "rgba(255,255,255,0.7)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>{l}</div>
              <div style={{ color: h ? COLORS.gold : "#fff", fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}><ProgressBar value={totalSpent} max={totalBudgeted} color={COLORS.gold} /></div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 6, textAlign: "right" }}>{totalBudgeted > 0 ? Math.round((totalSpent / totalBudgeted) * 100) : 0}% used</div>
      </Card>

      <EditBar editing={editing} onToggle={() => setEditing(!editing)} onAdd={() => setBudget(b => [...b, { id: Date.now(), category: "New Category", budgeted: 0, spent: 0, icon: "💰" }])} addLabel="Category" />

      {budget.map(item => {
        const pct = item.budgeted > 0 ? Math.round((item.spent / item.budgeted) * 100) : 0;
        const isOver = item.spent > item.budgeted && item.budgeted > 0;
        return (
          <Card key={item.id}>
            {editing ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <IconPicker value={item.icon} onChange={v => upd(item.id, "icon", v)} />
                  <TxtInput value={item.category} onChange={v => upd(item.id, "category", v)} placeholder="Category" />
                  <DelBtn onClick={() => setBudget(b => b.filter(i => i.id !== item.id))} />
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Budget/mo</div><NumInput value={item.budgeted} onChange={v => upd(item.id, "budgeted", v)} prefix="$" /></div>
                  <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Spent</div><NumInput value={item.spent} onChange={v => upd(item.id, "spent", v)} prefix="$" /></div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                    <span style={{ fontFamily: "Georgia, serif", color: COLORS.deepPlum, fontSize: 14, fontWeight: 600 }}>{item.category}</span>
                  </div>
                  <div>
                    <span style={{ color: isOver ? "#C0392B" : COLORS.sage, fontWeight: 700, fontSize: 14 }}>${item.spent.toLocaleString()}</span>
                    <span style={{ color: "#999", fontSize: 12 }}> / ${item.budgeted.toLocaleString()}</span>
                  </div>
                </div>
                <ProgressBar value={item.spent} max={item.budgeted} color={pct > 90 ? "#C0392B" : pct > 70 ? COLORS.gold : COLORS.sage} />
                <div style={{ fontSize: 11, color: isOver ? "#C0392B" : "#999", marginTop: 5, textAlign: "right" }}>
                  {isOver ? `⚠️ Over by $${(item.spent - item.budgeted).toLocaleString()}` : `${pct}% used`}
                </div>
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function SavingsTab() {
  const [savings, setSavings] = useState(() => load("ml_savings", defaultSavings));
  const [editing, setEditing] = useState(false);
  useEffect(() => save("ml_savings", savings), [savings]);
  const upd = (id, f, v) => setSavings(s => s.map(i => i.id === id ? { ...i, [f]: v } : i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.sage}, #5A7E5E)` }}>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Total Saved</div>
        <div style={{ color: "#fff", fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginTop: 4 }}>${savings.reduce((a, b) => a + b.saved, 0).toLocaleString()}</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>of ${savings.reduce((a, b) => a + b.goal, 0).toLocaleString()} across {savings.length} goals</div>
      </Card>

      <EditBar editing={editing} onToggle={() => setEditing(!editing)} onAdd={() => setSavings(s => [...s, { id: Date.now(), name: "New Goal", goal: 0, saved: 0, icon: "🏦", color: COLORS.rose }])} addLabel="Goal" />

      {savings.map(item => {
        const pct = item.goal > 0 ? Math.round((item.saved / item.goal) * 100) : 0;
        const done = item.saved >= item.goal && item.goal > 0;
        return (
          <Card key={item.id}>
            {editing ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <IconPicker value={item.icon} onChange={v => upd(item.id, "icon", v)} />
                  <TxtInput value={item.name} onChange={v => upd(item.id, "name", v)} placeholder="Goal name" />
                  <DelBtn onClick={() => setSavings(s => s.filter(i => i.id !== item.id))} />
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Goal Amount</div><NumInput value={item.goal} onChange={v => upd(item.id, "goal", v)} prefix="$" /></div>
                  <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Saved So Far</div><NumInput value={item.saved} onChange={v => upd(item.id, "saved", v)} prefix="$" /></div>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "Georgia, serif", color: COLORS.deepPlum, fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#aaa" }}>Goal: ${item.goal.toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{ background: done ? COLORS.sage : COLORS.blush, color: done ? "#fff" : COLORS.mauve, borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{done ? "✓ Done!" : `${pct}%`}</div>
                </div>
                <ProgressBar value={item.saved} max={item.goal} color={item.color} />
                <div style={{ fontSize: 12, color: COLORS.rose, marginTop: 6 }}>${Math.max(0, item.goal - item.saved).toLocaleString()} left to reach this goal</div>
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function DebtTab() {
  const [debts, setDebts] = useState(() => load("ml_debts", defaultDebts));
  const [editing, setEditing] = useState(false);
  useEffect(() => save("ml_debts", debts), [debts]);
  const upd = (id, f, v) => setDebts(d => d.map(i => i.id === id ? { ...i, [f]: v } : i));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.mauve})` }}>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Total Debt Balance</div>
        <div style={{ color: "#fff", fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginTop: 4 }}>${debts.reduce((a, b) => a + b.balance, 0).toLocaleString()}</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 }}>Every payment counts. 💪</div>
      </Card>

      <EditBar editing={editing} onToggle={() => setEditing(!editing)} onAdd={() => setDebts(d => [...d, { id: Date.now(), name: "New Debt", balance: 0, payment: 0, rate: 0, icon: "💳" }])} addLabel="Debt" />

      {debts.map(item => (
        <Card key={item.id}>
          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <IconPicker value={item.icon} onChange={v => upd(item.id, "icon", v)} />
                <TxtInput value={item.name} onChange={v => upd(item.id, "name", v)} placeholder="Debt name" />
                <DelBtn onClick={() => setDebts(d => d.filter(i => i.id !== item.id))} />
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Balance</div><NumInput value={item.balance} onChange={v => upd(item.id, "balance", v)} prefix="$" /></div>
                <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Monthly Payment</div><NumInput value={item.payment} onChange={v => upd(item.id, "payment", v)} prefix="$" /></div>
                <div><div style={{ fontSize: 11, color: "#aaa", marginBottom: 4 }}>Interest %</div><NumInput value={item.rate} onChange={v => upd(item.id, "rate", v)} prefix="%" /></div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Georgia, serif", color: COLORS.deepPlum, fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>{item.rate > 0 ? `${item.rate}% APR` : "0% interest"}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: COLORS.mauve, fontWeight: 700, fontSize: 16 }}>${item.balance.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>Min: ${item.payment}/mo</div>
                </div>
              </div>
              {item.balance > 0 && item.payment > 0 && (
                <div style={{ marginTop: 12, background: "#F7EFE8", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: COLORS.deepPlum }}>
                  💡 At ${item.payment}/mo, paid off in ~{Math.ceil(item.balance / item.payment)} months
                </div>
              )}
            </>
          )}
        </Card>
      ))}
    </div>
  );
}

function AITab() {
  const previews = [
    "How do I start saving more on groceries?",
    "What's the best way to pay off credit card debt?",
    "How do I build a 3-month emergency fund?",
    "Tips for managing money as a single mom?",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Header */}
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.deepPlum}, ${COLORS.mauve})`, textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✨</div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 22, fontWeight: 700 }}>Ask Mama Lita</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Your personal faith-inspired money coach</div>
      </Card>

      {/* Premium Notice */}
      <Card style={{ border: `2px solid ${COLORS.gold}`, background: `linear-gradient(160deg, #fffaf0, ${COLORS.cream})`, textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>🔒</div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.deepPlum, fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
          Premium Feature
        </div>
        <div style={{ color: "#7a5060", fontSize: 14, lineHeight: 1.7, fontFamily: "Georgia, serif", marginBottom: 16 }}>
          The Mama Lita AI Coach is available exclusively to our <strong style={{ color: COLORS.mauve }}>Premium Members</strong>. 
          Upgrade to unlock personalized, faith-inspired financial guidance whenever you need it — like having a wise mama in your corner 24/7.
        </div>
        <div style={{ background: COLORS.blush, borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 13, color: COLORS.deepPlum }}>
          "She opens her mouth with wisdom, and the teaching of kindness is on her tongue." — Proverbs 31:26
        </div>
        <a href="mailto:hello@mamalitas.com?subject=Premium Membership"
          style={{
            display: "block", background: `linear-gradient(135deg, ${COLORS.gold}, #b8902a)`,
            color: COLORS.deepPlum, fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700, fontSize: 15, padding: "14px 24px", borderRadius: 50,
            textDecoration: "none", letterSpacing: "0.03em",
          }}>
          Upgrade to Premium →
        </a>
        <div style={{ fontSize: 11, color: "#aaa", marginTop: 10, fontFamily: "Georgia, serif" }}>
          Questions? Email us at hello@mamalitas.com
        </div>
      </Card>

      {/* Preview of what's inside */}
      <Card>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.mauve, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
          💬 Premium members can ask questions like:
        </div>
        <div style={{ fontSize: 12, color: "#aaa", fontFamily: "Georgia, serif", marginBottom: 12 }}>
          Unlock all of these and ask your own:
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {previews.map(s => (
            <div key={s} style={{
              background: "#f5f0eb", border: `1px solid ${COLORS.blush}`, borderRadius: 10,
              padding: "10px 14px", fontSize: 13, color: "#bbb",
              fontFamily: "Georgia, serif", display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span>{s}</span>
              <span style={{ fontSize: 16 }}>🔒</span>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("budget");
  const [wisdom] = useState(() => wisdoms[Math.floor(Math.random() * wisdoms.length)]);
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "Georgia, serif", paddingBottom: 80 }}>
      <div style={{ background: `linear-gradient(160deg, ${COLORS.deepPlum} 0%, ${COLORS.mauve} 100%)`, padding: "28px 20px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(201,168,76,0.12)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ color: COLORS.gold, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>Mama Lita's</div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>Family Finance<br />Dashboard</div>
          <div style={{ marginTop: 14, background: "rgba(201,168,76,0.15)", borderLeft: `2px solid ${COLORS.gold}`, padding: "8px 12px", borderRadius: "0 8px 8px 0" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontStyle: "italic", lineHeight: 1.6 }}>"{wisdom}"</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        {tab === "budget" && <BudgetTab />}
        {tab === "savings" && <SavingsTab />}
        {tab === "debt" && <DebtTab />}
        {tab === "ai" && <AITab />}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: COLORS.warmWhite, borderTop: `1px solid ${COLORS.blush}`, display: "flex", justifyContent: "space-around", padding: "10px 0 14px", boxShadow: "0 -4px 20px rgba(74,37,53,0.08)" }}>
        {[{ id: "budget", label: "Budget", icon: "💰" }, { id: "savings", label: "Savings", icon: "🏦" }, { id: "debt", label: "Debt", icon: "📉" }, { id: "ai", label: "Ask Mama", icon: "✨" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 16px" }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontFamily: "Georgia, serif", color: tab === t.id ? COLORS.mauve : "#bbb", fontWeight: tab === t.id ? 700 : 400, letterSpacing: "0.05em" }}>{t.label}</span>
            {tab === t.id && <div style={{ width: 20, height: 2, background: COLORS.gold, borderRadius: 99 }} />}
          </button>
        ))}
      </div>
    </div>
  );
}
