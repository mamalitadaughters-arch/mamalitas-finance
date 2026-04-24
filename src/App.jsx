import { useState, useEffect } from "react";

const COLORS = {
  cream: "#FDF6EE",
  blush: "#F2C4B0",
  rose: "#C97B6B",
  mauve: "#8B4F5E",
  deepPlum: "#4A2535",
  gold: "#C9A84C",
  sage: "#7A9E7E",
  warmWhite: "#FFFAF5",
};

const initialBudget = [
  { id: 1, category: "Groceries & Food", budgeted: 800, spent: 620, icon: "🛒" },
  { id: 2, category: "Kids & School", budgeted: 400, spent: 310, icon: "🎒" },
  { id: 3, category: "Housing & Utilities", budgeted: 2200, spent: 2200, icon: "🏠" },
  { id: 4, category: "Healthcare", budgeted: 300, spent: 85, icon: "💊" },
  { id: 5, category: "Transportation", budgeted: 500, spent: 470, icon: "🚗" },
  { id: 6, category: "Self-Care & Misc", budgeted: 150, spent: 95, icon: "✨" },
];

const initialSavings = [
  { id: 1, name: "Emergency Fund", goal: 10000, saved: 6400, icon: "🛡️", color: COLORS.sage },
  { id: 2, name: "Family Vacation", goal: 3000, saved: 1200, icon: "🌴", color: COLORS.gold },
  { id: 3, name: "Back to School", goal: 800, saved: 800, icon: "📚", color: COLORS.rose },
  { id: 4, name: "Christmas Fund", goal: 1500, saved: 300, icon: "🎁", color: COLORS.mauve },
];

const initialDebts = [
  { id: 1, name: "Credit Card A", balance: 2400, payment: 200, rate: 19.9, icon: "💳" },
  { id: 2, name: "Car Loan", balance: 8500, payment: 350, rate: 6.5, icon: "🚗" },
  { id: 3, name: "Medical Bill", balance: 650, payment: 100, rate: 0, icon: "🏥" },
];

const wisdoms = [
  "She considers a field and buys it; out of her earnings she plants a vineyard. — Proverbs 31:16",
  "A little every day adds up to a life well-built.",
  "Mama, your steady hand shapes more than budgets — it shapes futures.",
  "Plan with intention. Spend with purpose. Save with hope.",
  "You are not just managing money. You are building a legacy.",
];

function ProgressBar({ value, max, color = COLORS.rose, thin = false }) {
  const pct = Math.min((value / max) * 100, 100);
  const isOver = value > max;
  return (
    <div style={{
      background: "#E8DDD5",
      borderRadius: 99,
      height: thin ? 6 : 10,
      overflow: "hidden",
      width: "100%",
    }}>
      <div style={{
        width: `${pct}%`,
        height: "100%",
        borderRadius: 99,
        background: isOver ? "#C0392B" : color,
        transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: COLORS.warmWhite,
      borderRadius: 18,
      padding: "20px 22px",
      boxShadow: "0 2px 18px rgba(74,37,53,0.07)",
      border: `1px solid rgba(201,168,76,0.18)`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        color: COLORS.deepPlum,
        fontSize: 17,
        fontWeight: 700,
        margin: 0,
        letterSpacing: "0.01em",
      }}>{children}</h2>
    </div>
  );
}

function BudgetTab() {
  const [budget] = useState(initialBudget);
  const totalBudgeted = budget.reduce((a, b) => a + b.budgeted, 0);
  const totalSpent = budget.reduce((a, b) => a + b.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.mauve}, ${COLORS.deepPlum})` }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          {[
            { label: "Monthly Budget", value: `$${totalBudgeted.toLocaleString()}`, light: true },
            { label: "Spent So Far", value: `$${totalSpent.toLocaleString()}`, light: true },
            { label: "Remaining", value: `$${remaining.toLocaleString()}`, highlight: true },
          ].map(item => (
            <div key={item.label} style={{ textAlign: "center" }}>
              <div style={{ color: item.highlight ? COLORS.gold : "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Georgia, serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item.label}</div>
              <div style={{ color: item.highlight ? COLORS.gold : "#fff", fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', Georgia, serif", marginTop: 2 }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <ProgressBar value={totalSpent} max={totalBudgeted} color={COLORS.gold} />
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginTop: 6, textAlign: "right", fontFamily: "Georgia, serif" }}>
          {Math.round((totalSpent / totalBudgeted) * 100)}% of budget used
        </div>
      </Card>

      {budget.map(item => {
        const pct = Math.round((item.spent / item.budgeted) * 100);
        const isOver = item.spent > item.budgeted;
        return (
          <Card key={item.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontFamily: "Georgia, serif", color: COLORS.deepPlum, fontSize: 14, fontWeight: 600 }}>{item.category}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ color: isOver ? "#C0392B" : COLORS.sage, fontWeight: 700, fontSize: 14 }}>${item.spent}</span>
                <span style={{ color: "#999", fontSize: 12 }}> / ${item.budgeted}</span>
              </div>
            </div>
            <ProgressBar value={item.spent} max={item.budgeted} color={pct > 90 ? "#C0392B" : pct > 70 ? COLORS.gold : COLORS.sage} />
            <div style={{ fontSize: 11, color: isOver ? "#C0392B" : "#999", marginTop: 5, textAlign: "right" }}>
              {isOver ? `⚠️ Over by $${item.spent - item.budgeted}` : `${pct}% used`}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function SavingsTab() {
  const [savings] = useState(initialSavings);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.sage}, #5A7E5E)` }}>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontFamily: "Georgia, serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>Total Saved Across Goals</div>
        <div style={{ color: "#fff", fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginTop: 4 }}>
          ${savings.reduce((a, b) => a + b.saved, 0).toLocaleString()}
        </div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 2 }}>
          of ${savings.reduce((a, b) => a + b.goal, 0).toLocaleString()} across {savings.length} goals
        </div>
      </Card>

      {savings.map(item => {
        const pct = Math.round((item.saved / item.goal) * 100);
        const done = item.saved >= item.goal;
        return (
          <Card key={item.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "Georgia, serif", color: COLORS.deepPlum, fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>Goal: ${item.goal.toLocaleString()}</div>
                </div>
              </div>
              <div style={{
                background: done ? COLORS.sage : COLORS.blush,
                color: done ? "#fff" : COLORS.mauve,
                borderRadius: 99,
                padding: "3px 10px",
                fontSize: 12,
                fontWeight: 700,
              }}>{done ? "✓ Done!" : `${pct}%`}</div>
            </div>
            <ProgressBar value={item.saved} max={item.goal} color={item.color} />
            <div style={{ fontSize: 12, color: COLORS.rose, marginTop: 6 }}>
              ${(item.goal - item.saved).toLocaleString()} left to reach this goal
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function DebtTab() {
  const [debts] = useState(initialDebts);
  const total = debts.reduce((a, b) => a + b.balance, 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.mauve})` }}>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "Georgia, serif" }}>Total Debt Balance</div>
        <div style={{ color: "#fff", fontSize: 30, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, marginTop: 4 }}>${total.toLocaleString()}</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 2 }}>You're making progress. Every payment counts. 💪</div>
      </Card>

      {debts.map(item => (
        <Card key={item.id}>
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
          <div style={{ marginTop: 12, background: "#F7EFE8", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: COLORS.deepPlum }}>
            💡 At ${item.payment}/mo, you'll be free in ~{Math.ceil(item.balance / item.payment)} months
          </div>
        </Card>
      ))}
    </div>
  );
}

function AITab() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);

  const suggestions = [
    "How do I start saving more on groceries?",
    "What's the best way to pay off credit card debt?",
    "How do I build a 3-month emergency fund?",
    "Tips for managing money as a single mom?",
  ];

  async function askAI(question) {
    const q = question || prompt.trim();
    if (!q) return;
    setLoading(true);
    setAsked(true);
    setResponse("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are Mama Lita — a warm, faith-inspired financial coach for mothers managing family finances. 
You give practical, encouraging, grace-filled advice. You speak like a wise older mother figure who is also financially savvy.
Keep your responses to 3-4 paragraphs max. Be warm, specific, and practical. 
Occasionally weave in a short scripture or proverb when fitting, but don't force it.`,
          messages: [{ role: "user", content: q }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "I'm having trouble connecting right now. Please try again.";
      setResponse(text);
    } catch {
      setResponse("Something went wrong. Please check your connection and try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Card style={{ background: `linear-gradient(135deg, ${COLORS.deepPlum}, ${COLORS.mauve})`, textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>✨</div>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 20, fontWeight: 700 }}>Ask Mama Lita</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 4 }}>Your personal faith-inspired money coach</div>
      </Card>

      <Card>
        <div style={{ fontSize: 13, color: COLORS.mauve, fontFamily: "Georgia, serif", marginBottom: 10 }}>Quick questions:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => { setPrompt(s); askAI(s); }} style={{
              background: COLORS.cream,
              border: `1px solid ${COLORS.blush}`,
              borderRadius: 10,
              padding: "9px 12px",
              textAlign: "left",
              cursor: "pointer",
              fontSize: 13,
              color: COLORS.deepPlum,
              fontFamily: "Georgia, serif",
              transition: "background 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.background = COLORS.blush}
              onMouseOut={e => e.currentTarget.style.background = COLORS.cream}
            >
              {s}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <textarea
          placeholder="Ask your own question..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
          style={{
            width: "100%",
            border: `1.5px solid ${COLORS.blush}`,
            borderRadius: 12,
            padding: "10px 14px",
            fontFamily: "Georgia, serif",
            fontSize: 14,
            color: COLORS.deepPlum,
            background: COLORS.cream,
            resize: "none",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        <button onClick={() => askAI()} disabled={loading || !prompt.trim()} style={{
          marginTop: 10,
          width: "100%",
          background: loading ? "#ccc" : `linear-gradient(135deg, ${COLORS.rose}, ${COLORS.mauve})`,
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "12px",
          fontSize: 15,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          cursor: loading ? "default" : "pointer",
          letterSpacing: "0.03em",
        }}>
          {loading ? "Mama Lita is thinking..." : "Ask Mama Lita ✨"}
        </button>
      </Card>

      {(loading || asked) && (
        <Card style={{ borderLeft: `4px solid ${COLORS.gold}` }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: COLORS.mauve, fontSize: 14, marginBottom: 8 }}>Mama Lita says:</div>
          {loading ? (
            <div style={{ color: "#bbb", fontStyle: "italic", fontFamily: "Georgia, serif" }}>Gathering wisdom for you...</div>
          ) : (
            <div style={{ color: COLORS.deepPlum, fontSize: 14, lineHeight: 1.7, fontFamily: "Georgia, serif", whiteSpace: "pre-wrap" }}>{response}</div>
          )}
        </Card>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("budget");
  const [wisdom] = useState(() => wisdoms[Math.floor(Math.random() * wisdoms.length)]);

  const tabs = [
    { id: "budget", label: "Budget", icon: "💰" },
    { id: "savings", label: "Savings", icon: "🏦" },
    { id: "debt", label: "Debt", icon: "📉" },
    { id: "ai", label: "Ask Mama", icon: "✨" },
  ];

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.cream,
      fontFamily: "Georgia, serif",
      paddingBottom: 80,
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg, ${COLORS.deepPlum} 0%, ${COLORS.mauve} 100%)`,
        padding: "28px 20px 20px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 180, height: 180,
          borderRadius: "50%",
          background: "rgba(201,168,76,0.12)",
        }} />
        <div style={{
          position: "absolute", bottom: -20, left: -20,
          width: 100, height: 100,
          borderRadius: "50%",
          background: "rgba(242,196,176,0.1)",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ color: COLORS.gold, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 4 }}>
            Mama Lita's
          </div>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#fff", fontSize: 26, fontWeight: 700, lineHeight: 1.2 }}>
            Family Finance<br />Dashboard
          </div>
          <div style={{
            marginTop: 14,
            background: "rgba(201,168,76,0.15)",
            borderLeft: `2px solid ${COLORS.gold}`,
            padding: "8px 12px",
            borderRadius: "0 8px 8px 0",
          }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11, fontStyle: "italic", lineHeight: 1.6 }}>"{wisdom}"</div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div style={{ padding: "16px 16px 0" }}>
        {tab === "budget" && <BudgetTab />}
        {tab === "savings" && <SavingsTab />}
        {tab === "debt" && <DebtTab />}
        {tab === "ai" && <AITab />}
      </div>

      {/* Bottom Nav */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        background: COLORS.warmWhite,
        borderTop: `1px solid ${COLORS.blush}`,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 14px",
        boxShadow: "0 -4px 20px rgba(74,37,53,0.08)",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "4px 16px",
          }}>
            <span style={{ fontSize: 22 }}>{t.icon}</span>
            <span style={{
              fontSize: 10,
              fontFamily: "Georgia, serif",
              color: tab === t.id ? COLORS.mauve : "#bbb",
              fontWeight: tab === t.id ? 700 : 400,
              letterSpacing: "0.05em",
            }}>{t.label}</span>
            {tab === t.id && (
              <div style={{ width: 20, height: 2, background: COLORS.gold, borderRadius: 99 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
