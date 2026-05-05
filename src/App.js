import { useState, useEffect } from "react";

const ANTHROPIC_KEY = process.env.REACT_APP_ANTHROPIC_API_KEY;
const ACCESS_CODE_KEY = "mit_access_granted_v1";

function AccessGate({ onUnlock }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function tryCode() {
    // Code is checked against Payhip license key format - you update this list
    const validCodes = ["TT2024", "MONEY48", "THOUGHTTHERAPY"]; // placeholder codes - update with Payhip keys
    if (validCodes.includes(code.trim().toUpperCase())) {
      localStorage.setItem(ACCESS_CODE_KEY, "true");
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 380, textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 200, fontSize: "0.65rem", color: "#b4a890", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Thought Therapy</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", color: "#2a2018", fontWeight: 400, marginBottom: "0.25rem" }}>The Money Identity App</h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "#9a8c7a", fontStyle: "italic", marginBottom: "2.5rem" }}>Workbook Companion</p>
        
        <div style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: "1rem", padding: "2rem", animation: shake ? "shake 0.5s ease" : "none" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#2a2018", marginBottom: "0.5rem" }}>Enter your access code</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 200, fontSize: "0.75rem", color: "#9a8c7a", marginBottom: "1.5rem", lineHeight: 1.5 }}>Your unique code was sent in your purchase confirmation email.</p>
          
          <input
            value={code}
            onChange={e => { setCode(e.target.value); setError(false); }}
            onKeyDown={e => e.key === "Enter" && tryCode()}
            placeholder="Enter code here"
            style={{
              width: "100%", padding: "0.9rem 1rem", border: `1px solid ${error ? "#e8a090" : "#e8e0d4"}`,
              borderRadius: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem",
              color: "#2a2018", background: error ? "#fff8f7" : "#faf7f2",
              outline: "none", textAlign: "center", letterSpacing: "0.1em",
              marginBottom: "0.75rem", boxSizing: "border-box"
            }}
          />
          
          {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#c4705a", marginBottom: "0.75rem" }}>That code doesn't match. Check your confirmation email.</p>}
          
          <button onClick={tryCode} style={{
            width: "100%", background: "#2a2018", border: "none", borderRadius: "0.75rem",
            padding: "1rem", color: "#faf7f2", fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer"
          }}>Unlock App</button>
        </div>
        
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 200, fontSize: "0.7rem", color: "#b4a890", marginTop: "1.5rem" }}>
          Don't have a code? Get access at <span style={{ color: "#c4a882" }}>thoughttherapy.co</span>
        </p>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@200;300;400&display=swap');
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
}

const AFFIRMATIONS = [
  { i: "I am in charge of my earning potential.", you: "You are allowed to want and have more." },
  { i: "I am learning to trust that money can stay. This cycle ends with me.", you: "The negative patterns you've learnt about money are not a life sentence." },
  { i: "I am worthy of being financially abundant.", you: "You do not need to earn that right, you have it by just existing and believing it's true." },
  { i: "I am deeply grateful for the financial blessings I currently have and those that are on their way to me.", you: "Having financial freedom allows me the opportunity to help others." },
  { i: "I am building a new relationship with money, one I actually chose.", you: "The old patterns don't have to follow you forever." },
  { i: "I trust myself to make good decisions with money.", you: "You are more financially capable than the story you've been telling yourself." },
  { i: "I don't have to hustle myself into the ground to deserve comfort.", you: "You are allowed to receive easily. Struggle is not a requirement, be open to receiving." },
  { i: "I am allowed to want financial freedom without justifying it to anyone.", you: "Your desires are not too much, you deserve to live a life that feels free." },
  { i: "I release the idea that rich means bad. I can have money and still be a good person.", you: "Wealth doesn't corrupt people. It just amplifies what's already there." },
  { i: "I am not my parents/caregivers' relationship with money.", you: "You inherited their patterns — not their destiny." },
  { i: "I am getting better at receiving — compliments, help, money, opportunities.", you: "You closing yourself off to receiving is costing you more than you know." },
  { i: "I make decisions from possibility, not fear.", you: "You are allowed to choose based on what you want, not just what feels safe." },
  { i: "I am allowed to be paid well for work that feels natural to me.", you: "Easy for you doesn't mean it has less value. It means you're in your zone and aligned with what's meant for you." },
  { i: "I don't have to prove I'm struggling to deserve support.", you: "You are allowed to ask for help before you hit rock bottom." },
  { i: "I am building wealth at my own pace and I am happy and comfortable doing so.", you: "No need for comparison, trust your own path and unique talents." },
  { i: "I trust that the right opportunities are available to me.", you: "You don't have to grab everything out of scarcity. The right things show up and stay." },
  { i: "I am allowed to say no to money that costs me too much of myself.", you: "Not all income is equal. Some of it has a price you don't want to pay and that's okay, we don't earn money from survivalist patterns anymore." },
  { i: "I am releasing the belief that I have to work twice as hard to get to where I want to be.", you: "You are allowed to arrive at abundance without it being a war with yourself and others." },
  { i: "I'm choosing to notice that any money that flows to me comes from alignment.", you: "You being paid well or in a surprising unexpected way is not a fluke. Start letting it be normal." },
  { i: "I am allowed to save, invest, and grow, even if no one taught me how.", you: "You get to learn. You get to start. You get to figure it out." },
  { i: "I am not behind. I am exactly where my next level begins, I trust my life's journey.", you: "Stop measuring your chapter 1 against someone else's chapter 20." },
  { i: "I can hold a big vision for my finances without needing to see the whole path.", you: "You don't need to know every step. You just need to take the next one." },
  { i: "I am the kind of person who builds real financial security.", you: "That identity is available to you right now, not someday." },
  { i: "I release any shame around past money decisions. I honour the version of me that didn't know better at the time, I was stuck in survival and that's okay, I did the best I could with what I had.", you: "You cannot build forward while dragging the past behind you." },
  { i: "I am allowed to enjoy money without guilt.", you: "Spending money on yourself or those you love is the whole point of having it, enjoy it without guilt, it allows you to do so much good in the world." },
  { i: "I am open to the idea that money can come from directions I haven't considered yet.", you: "Your next financial shift might come from somewhere you're not even looking." },
  { i: "I don't have to shrink my needs to be likeable or reasonable.", you: "You are allowed to take up space and want more for your life even if others don't understand it." },
  { i: "I am becoming someone who expects good things financially.", you: "Expectation is just deciding what's normal for you, a little bit of audacity will take you far." },
  { i: "I trust myself with more. I am ready for it.", you: "The version of you who has more isn't a different person. It's just you, with less resistance." },
  { i: "I am not starting over. I am starting from experience.", you: "Everything you've been through financially has taught you something. Use it." },
];

const ASKFORMATIONS = [
  "How come it's so easy for me to earn good money?",
  "How come I always find a way to make things work financially?",
  "Why am I so worthy of financial abundance?",
  "How come money flows to me so naturally?",
  "How come I'm so good at building wealth?",
  "Why do I deserve to live a financially free life?",
  "How come receiving money is becoming easier for me every day?",
  "How come I attract such incredible opportunities?",
  "Why do I trust myself so completely with money?",
  "How come my relationship with money keeps getting better?",
  "How come it's so easy for me to create multiple income streams?",
  "Why does abundance feel so natural to me?",
  "How come I'm so open to money coming from unexpected places?",
  "Why do I make such good financial decisions?",
  "How come financial security is becoming my new normal?",
  "How come it's so easy for me to charge what I'm worth?",
  "Why do the right opportunities always find me?",
  "How come saving and growing my money feels so natural?",
  "Why do I handle money with such confidence and ease?",
  "How come I'm becoming more financially free every single day?",
  "How come people value what I offer so highly?",
  "Why is wealth such a natural fit for who I am?",
  "How come I always have more than enough?",
  "How come it's so easy for me to let go of old money patterns?",
  "Why am I so aligned with financial growth?",
  "How come I feel so safe having money?",
  "How come my mindset around money is shifting so powerfully?",
  "Why am I so deserving of a life that feels financially free?",
  "How come everything I put my energy into creates real value?",
  "Why am I exactly the kind of person who builds real lasting wealth?",
];

const CHECKIN_PROMPTS = [
  { label: "Roots", prompt: "What's the earliest thing you remember being taught about money — not in words, but in behaviour?" },
  { label: "Roots", prompt: "How did the adults around you feel about money when you were growing up? What did you absorb from that?" },
  { label: "Roots", prompt: "What did money mean in your household — safety, conflict, shame, status?" },
  { label: "Roots", prompt: "Was there ever a moment you decided you weren't good with money? What happened?" },
  { label: "Roots", prompt: "What did you have to do as a child to feel financially safe — even if safety was never actually there?" },
  { label: "Roots", prompt: "What did you decide about yourself the first time money felt out of reach?" },
  { label: "Roots", prompt: "Did you grow up believing wealth was for people like you — or for other people?" },
  { label: "Roots", prompt: "What's the money story you inherited that was never actually yours?" },
  { label: "Roots", prompt: "Where did you first learn that wanting more was dangerous, greedy, or unrealistic?" },
  { label: "Roots", prompt: "What did you have to become to survive your financial reality growing up?" },
  { label: "Patterns", prompt: "Where are you currently tolerating less than you're worth — and calling it being realistic?" },
  { label: "Patterns", prompt: "What money decision have you been avoiding — and what are you afraid it will confirm about you?" },
  { label: "Patterns", prompt: "When money comes in, what's the first thing you feel? Be honest." },
  { label: "Patterns", prompt: "Where in your life are you shrinking your financial needs to make others comfortable?" },
  { label: "Patterns", prompt: "What would you do differently if you actually believed the money would stay?" },
  { label: "Patterns", prompt: "How do you behave differently around people who have more money than you?" },
  { label: "Patterns", prompt: "What's the story you tell yourself about why you're not further along financially?" },
  { label: "Patterns", prompt: "Where are you working hard but blocking yourself from being paid well for it?" },
  { label: "Patterns", prompt: "What does your relationship with spending tell you about how safe you feel?" },
  { label: "Patterns", prompt: "What financial pattern keeps repeating — and what belief is running it?" },
  { label: "Expansion", prompt: "Who would you be if money was never a reason you said no to something?" },
  { label: "Expansion", prompt: "What would you have to believe about yourself to charge more, ask for more, expect more?" },
  { label: "Expansion", prompt: "What version of you already knows how to hold wealth — and what does that version do differently?" },
  { label: "Expansion", prompt: "What does receiving feel like in your body — and where did that response come from?" },
  { label: "Expansion", prompt: "If abundance was your baseline and not something you had to earn, what would change first?" },
  { label: "Expansion", prompt: "What are you waiting to become before you let yourself have more?" },
  { label: "Expansion", prompt: "What would financial safety actually free you to become?" },
  { label: "Expansion", prompt: "What's one money belief you're ready to retire — and what do you want to replace it with?" },
  { label: "Expansion", prompt: "If the person you're becoming looked back at this moment, what would they want you to know?" },
  { label: "Expansion", prompt: "What's the one thing you keep almost believing about yourself and money — and what would it take to fully land there?" },
];

const BELIEF_EXAMPLES = ["I have to work hard to earn money", "Rich people are greedy", "I'm not good with money", "Money always runs out", "I don't deserve to be wealthy"];

const STORAGE_KEY = "mit_entries_v3";
function loadEntries() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; } }
function saveEntries(e) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(e)); } catch {} }

async function callAI(system, userMessage) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 1000,
      system,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "";
}

function GrainOverlay() {
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", opacity: 0.035, pointerEvents: "none", zIndex: 0 }}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

function EntryDetail({ entry, onClose, onSaveFollowUp }) {
  const [followUp, setFollowUp] = useState(entry.followUp || "");
  const [followUpResponse, setFollowUpResponse] = useState(entry.followUpResponse || "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(!!entry.followUp);

  async function runFollowUp() {
    if (!followUp.trim()) return;
    setLoading(true);
    try {
      const context = entry.type === "audit"
        ? `Original belief: "${entry.belief}". AI audit: "${JSON.stringify(entry.result)}".`
        : `Prompt: "${entry.prompt}". Response: "${entry.entry}". AI reflection: "${entry.result}".`;
      const text = await callAI(
        `You are the AI companion inside The Money Identity App by Thought Therapy. CBT, nervous system regulation, identity-level money work. Direct, honest, warm — never generic. The person is continuing a previous reflection. Respond to their follow-up honestly and deeply. 3–5 sentences. End with one question that goes deeper if there's more to explore, or affirm the insight if they've landed somewhere true. No bullet points — clean prose only.`,
        `Context: ${context}\n\nFollow-up: "${followUp}"`
      );
      setFollowUpResponse(text);
      onSaveFollowUp(entry.id, followUp, text);
      setSaved(true);
    } catch { setFollowUpResponse("Something didn't connect. Try again."); }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#faf7f2", zIndex: 50, overflowY: "auto", maxWidth: 430, margin: "0 auto" }}>
      <GrainOverlay />
      <div style={{ position: "relative", zIndex: 1, padding: "1.5rem" }}>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", color: "#9a8c7a", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem", padding: 0 }}>← Journal</button>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>
          {entry.date} · {entry.type === "audit" ? "Belief Audit" : `Check-in · ${entry.label}`}
        </p>
        {entry.type === "audit" && (
          <>
            <div style={{ background: "#2a2018", borderRadius: "0.875rem", padding: "1.1rem", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>The belief</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#e8ddd0", fontStyle: "italic" }}>"{entry.belief}"</p>
            </div>
            {entry.result && !entry.result.error && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {[{ key: "origin", label: "Where it came from", icon: "○" }, { key: "cost", label: "What it's costing you", icon: "◌" }, { key: "truth", label: "The lie inside it", icon: "◉" }, { key: "rewrite", label: "Rewritten belief", icon: "◈", highlight: true }, { key: "body_check", label: "Body check", icon: "◎" }].map(item => (
                  <div key={item.key} style={{ background: item.highlight ? "#fdf8f0" : "#fff", border: `1px solid ${item.highlight ? "#c4a882" : "#e8e0d4"}`, borderRadius: "0.875rem", padding: "1.1rem" }}>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: item.highlight ? "#c4a882" : "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.icon} {item.label}</p>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: item.highlight ? "1.05rem" : "0.95rem", color: item.highlight ? "#2a2018" : "#4a3828", lineHeight: 1.65, fontWeight: item.highlight ? 500 : 400 }}>{entry.result[item.key]}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {entry.type === "checkin" && (
          <>
            <div style={{ background: "#2a2018", borderRadius: "0.875rem", padding: "1.1rem", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>The prompt</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#e8ddd0", fontStyle: "italic", lineHeight: 1.6 }}>"{entry.prompt}"</p>
            </div>
            <div style={{ borderLeft: "3px solid #c4a882", paddingLeft: "1rem", marginBottom: "1rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Your response</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#4a3828", lineHeight: 1.7 }}>{entry.entry}</p>
            </div>
            <div style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1.1rem", marginBottom: "1.25rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Reflection</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#2a2018", lineHeight: 1.75 }}>{entry.result}</p>
            </div>
          </>
        )}
        {entry.followUp && entry.followUpResponse && (
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>↳ Your follow-up</p>
            <div style={{ borderLeft: "3px solid #e8e0d4", paddingLeft: "1rem", marginBottom: "0.75rem" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", color: "#6a5c4e", lineHeight: 1.6, fontStyle: "italic" }}>{entry.followUp}</p>
            </div>
            <div style={{ background: "#fdf8f0", border: "1px solid #e8d4b8", borderRadius: "0.875rem", padding: "1rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Response</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#2a2018", lineHeight: 1.75 }}>{entry.followUpResponse}</p>
            </div>
          </div>
        )}
        <div style={{ borderTop: "1px solid #e8e0d4", paddingTop: "1.25rem" }}>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{entry.followUp ? "Continue the thread" : "Go deeper — respond here"}</p>
          <textarea value={followUp} onChange={e => { setFollowUp(e.target.value); setSaved(false); }} placeholder="What's coming up as you sit with this? Answer the question, push back, go deeper…" rows={4}
            style={{ width: "100%", background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1.1rem", fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#2a2018", lineHeight: 1.7, marginBottom: "0.75rem", outline: "none", resize: "none" }} />
          {loading && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>{[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: "50%", background: "#c4a882", animation: `shimmer 1.8s ${i*0.3}s ease-in-out infinite` }} />)}</div>}
          {followUpResponse && !loading && (
            <div style={{ background: "#fdf8f0", border: "1px solid #e8d4b8", borderRadius: "0.875rem", padding: "1rem", marginBottom: "0.75rem" }}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Response</p>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#2a2018", lineHeight: 1.75 }}>{followUpResponse}</p>
            </div>
          )}
          <button onClick={runFollowUp} disabled={!followUp.trim() || loading || saved} style={{ width: "100%", background: followUp.trim() && !saved && !loading ? "#2a2018" : "#e8e0d4", border: "none", borderRadius: "0.875rem", padding: "0.9rem", color: followUp.trim() && !saved && !loading ? "#faf7f2" : "#b4a890", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: followUp.trim() && !saved && !loading ? "pointer" : "not-allowed", transition: "all 0.2s" }}>{saved ? "✓ Saved" : "Send & Save"}</button>
        </div>
      </div>
    </div>
  );
}

export default function MoneyIdentityApp() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(ACCESS_CODE_KEY) === "true") setUnlocked(true);
  }, []);

  if (!unlocked) return <AccessGate onUnlock={() => setUnlocked(true)} />;

  const [tab, setTab] = useState("home");
  const [beliefInput, setBeliefInput] = useState("");
  const [beliefResult, setBeliefResult] = useState(null);
  const [beliefLoading, setBeliefLoading] = useState(false);
  const [checkinIndex, setCheckinIndex] = useState(0);
  const [checkinEntry, setCheckinEntry] = useState("");
  const [checkinResult, setCheckinResult] = useState(null);
  const [checkinLoading, setCheckinLoading] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [affirmationDay, setAffirmationDay] = useState(0);
  const [askDay, setAskDay] = useState(0);
  const [askJournal, setAskJournal] = useState("");
  const [askSaved, setAskSaved] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    setAffirmationDay(dayOfYear % 30);
    setCheckinIndex(dayOfYear % 30);
    setAskDay(dayOfYear % 30);
  }, []);

  function addEntry(entry) {
    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(updated);
  }

  function updateEntry(id, followUp, followUpResponse) {
    const updated = entries.map(e => e.id === id ? { ...e, followUp, followUpResponse } : e);
    setEntries(updated);
    saveEntries(updated);
    setSelectedEntry(prev => prev?.id === id ? { ...prev, followUp, followUpResponse } : prev);
  }

  async function runBeliefAudit() {
    if (!beliefInput.trim()) return;
    setBeliefLoading(true); setBeliefResult(null);
    try {
      const rawText = await callAI(
        `You are the AI companion inside The Money Identity App by Thought Therapy. Audit money beliefs using CBT and identity-level rewiring. Direct, warm, psychologically sharp. No generic affirmations.

You MUST respond with ONLY a valid JSON object. No text before or after. No markdown. No backticks. Just the raw JSON object like this example:
{"origin":"This belief likely came from watching a parent struggle financially and absorbing their anxiety.","cost":"It keeps you from pursuing higher-paying work and settling for less than you deserve.","truth":"This is an overgeneralisation — difficulty is not a permanent law of nature.","rewrite":"Money flows to me when I align my work with my real value.","body_check":"Where do you feel this belief in your body right now — and what would it feel like to breathe it out?"}`,
        beliefInput
      );
      let parsed = {};
      try {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not read response." };
      } catch { parsed = { error: "Could not read response." }; }
      setBeliefResult(parsed);
      addEntry({ id: Date.now().toString(), type: "audit", belief: beliefInput, result: parsed, date: new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }), followUp: "", followUpResponse: "" });
    } catch { setBeliefResult({ error: "Something didn't connect. Try again." }); }
    setBeliefLoading(false);
  }

  async function runCheckin() {
    if (!checkinEntry.trim()) return;
    setCheckinLoading(true); setCheckinResult(null);
    try {
      const text = await callAI(
        `You are the AI companion inside The Money Identity App by Thought Therapy. CBT, nervous system regulation, identity-level money work. Direct, honest, warm — never generic. Reflect back what you hear — the belief underneath, the identity pattern, one concrete reframe. 3–5 sentences. End with one question that goes deeper. No bullet points — clean prose only.`,
        `Prompt: "${CHECKIN_PROMPTS[checkinIndex].prompt}"\n\nResponse: "${checkinEntry}"`
      );
      setCheckinResult(text);
      addEntry({ id: Date.now().toString(), type: "checkin", label: CHECKIN_PROMPTS[checkinIndex].label, prompt: CHECKIN_PROMPTS[checkinIndex].prompt, entry: checkinEntry, result: text, date: new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }), followUp: "", followUpResponse: "" });
    } catch { setCheckinResult("Something didn't connect. Try again."); }
    setCheckinLoading(false);
  }

  function saveAskJournal() {
    if (!askJournal.trim()) return;
    addEntry({ id: Date.now().toString(), type: "ask", question: ASKFORMATIONS[askDay], entry: askJournal, date: new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }), followUp: "", followUpResponse: "" });
    setAskSaved(true);
  }

  const todayAffirmation = AFFIRMATIONS[affirmationDay];
  const tabs = [
    { key: "home", label: "Home" },
    { key: "selfconcept", label: "Affirmations" },
    { key: "ask", label: "Askformations" },
    { key: "audit", label: "Belief Audit" },
    { key: "checkin", label: "Check-in" },
    { key: "journal", label: `Journal${entries.length ? ` (${entries.length})` : ""}` },
  ];

  if (selectedEntry) return <EntryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} onSaveFollowUp={updateEntry} />;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@200;300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #faf7f2; }
        textarea { outline: none; resize: none; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #d4c9b8; border-radius: 2px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation: fadeUp 0.45s ease forwards; }
        .fu1 { animation: fadeUp 0.45s 0.1s ease both; }
        .fu2 { animation: fadeUp 0.45s 0.2s ease both; }
        @keyframes shimmer { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        .card:hover { transform:translateY(-1px); box-shadow:0 4px 20px rgba(42,32,24,0.08)!important; }
        .pb:hover { background:#3a3028!important; }
        .gb:hover { background:#f0ebe2!important; }
        .eb:hover { background:#f0ebe2!important; border-color:#c4b89a!important; }
        .er:hover { background:#f5f0e8!important; }
        .tb:hover { color:#2a2018!important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#faf7f2", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 430, minHeight: "100vh", background: "#faf7f2", display: "flex", flexDirection: "column" }}>
          <GrainOverlay />

          <div style={{ padding: "1.75rem 1.5rem 0", position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Thought Therapy</p>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", color: "#2a2018", fontWeight: 400, lineHeight: 1.1, marginBottom: "0.15rem" }}>The Money Identity App</h1>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.85rem", color: "#9a8c7a", fontStyle: "italic" }}>Workbook Companion</p>
          </div>

          <div style={{ display: "flex", padding: "1.25rem 1.5rem 0", position: "relative", zIndex: 1, borderBottom: "1px solid #e8e0d4", overflowX: "auto" }}>
            {tabs.map(s => (
              <button key={s.key} onClick={() => { setTab(s.key); setBeliefResult(null); setCheckinResult(null); setCheckinEntry(""); setBeliefInput(""); setAskJournal(""); setAskSaved(false); }} className="tb" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: tab === s.key ? 400 : 200, fontSize: "0.68rem", color: tab === s.key ? "#2a2018" : "#9a8c7a", paddingBottom: "0.75rem", marginRight: "1rem", borderBottom: tab === s.key ? "2px solid #c4a882" : "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}>{s.label}</button>
            ))}
          </div>

          <div style={{ flex: 1, padding: "1.5rem", position: "relative", zIndex: 1, overflowY: "auto" }}>

            {/* HOME */}
            {tab === "home" && (
              <div>
                <div className="fu" style={{ background: "linear-gradient(135deg,#2a2018,#4a3828)", borderRadius: "1rem", padding: "1.75rem", marginBottom: "1.25rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(196,168,130,0.12)" }} />
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Today's Check-in</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#faf7f2", lineHeight: 1.6, fontStyle: "italic", marginBottom: "1.25rem" }}>"{CHECKIN_PROMPTS[checkinIndex].prompt}"</p>
                  <button onClick={() => setTab("checkin")} style={{ background: "#c4a882", border: "none", borderRadius: "0.5rem", padding: "0.6rem 1.25rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#2a2018", fontWeight: 400, letterSpacing: "0.1em" }}>Reflect on this →</button>
                </div>

                <div className="fu1" style={{ background: "#fff", border: "1px solid #e8d4b8", borderRadius: "1rem", padding: "1.5rem", marginBottom: "1.25rem" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1rem" }}>Today's Affirmation</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", color: "#2a2018", lineHeight: 1.7, marginBottom: "0.75rem" }}>{todayAffirmation.i}</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#6a5c4e", lineHeight: 1.7, fontStyle: "italic", marginBottom: "1rem" }}>{todayAffirmation.you}</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#2a2018", lineHeight: 1.6, fontStyle: "italic", paddingTop: "0.75rem", borderTop: "1px solid #e8e0d4" }}>"{ASKFORMATIONS[askDay]}"</p>
                </div>

                <div className="fu2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  {[
                    { key: "audit", icon: "◈", title: "Belief Audit", sub: "Unpack & rewire a money belief" },
                    { key: "checkin", icon: "◎", title: "Check-in", sub: "Guided identity prompts" },
                    { key: "ask", icon: "?", title: "Askformations", sub: "Questions that rewire your brain", span: 1 },
                    { key: "journal", icon: "◐", title: "Journal", sub: `${entries.length} saved entr${entries.length === 1 ? "y" : "ies"}`, span: 1 },
                  ].map(item => (
                    <button key={item.key} onClick={() => setTab(item.key)} className="card" style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1.25rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(42,32,24,0.04)", gridColumn: `span ${item.span || 1}` }}>
                      <p style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{item.icon}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#2a2018", marginBottom: "0.2rem" }}>{item.title}</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.68rem", color: "#9a8c7a", lineHeight: 1.4 }}>{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SELF CONCEPT */}
            {tab === "selfconcept" && (
              <div>
                <div className="fu" style={{ marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#2a2018", marginBottom: "0.25rem" }}>Self Concept Affirmations</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.75rem", color: "#9a8c7a" }}>30 days of identity work. Read them slowly.</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {AFFIRMATIONS.map((a, i) => (
                    <div key={i} style={{ background: i === affirmationDay ? "#fdf8f0" : "#fff", border: `1px solid ${i === affirmationDay ? "#c4a882" : "#e8e0d4"}`, borderRadius: "0.875rem", padding: "1.1rem" }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.58rem", color: i === affirmationDay ? "#c4a882" : "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Day {i + 1}{i === affirmationDay ? " · Today" : ""}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#2a2018", lineHeight: 1.7, marginBottom: "0.5rem" }}>{a.i}</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", color: "#6a5c4e", lineHeight: 1.65, fontStyle: "italic" }}>{a.you}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ASKFORMATIONS */}
            {tab === "ask" && (
              <div>
                <div className="fu" style={{ marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#2a2018", marginBottom: "0.25rem" }}>Askformations</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.75rem", color: "#9a8c7a", lineHeight: 1.5 }}>Your brain automatically searches for answers to questions. Read today's question, sit with it, and let your mind find evidence for abundance.</p>
                </div>

                <div className="fu1" style={{ background: "linear-gradient(135deg,#2a2018,#4a3828)", borderRadius: "1rem", padding: "1.75rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(196,168,130,0.12)" }} />
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Today's Question · Day {askDay + 1}</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#faf7f2", lineHeight: 1.65, fontStyle: "italic" }}>"{ASKFORMATIONS[askDay]}"</p>
                </div>

                <div style={{ marginTop: "0.5rem" }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>All 30 questions</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {ASKFORMATIONS.map((q, i) => (
                      <div key={i} style={{ background: i === askDay ? "#fdf8f0" : "#fff", border: `1px solid ${i === askDay ? "#c4a882" : "#e8e0d4"}`, borderRadius: "0.75rem", padding: "0.9rem 1rem" }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.58rem", color: i === askDay ? "#c4a882" : "#b4a890", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Day {i + 1}{i === askDay ? " · Today" : ""}</p>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", color: "#2a2018", lineHeight: 1.55, fontStyle: "italic" }}>"{q}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BELIEF AUDIT */}
            {tab === "audit" && (
              <div>
                {!beliefResult && !beliefLoading && (
                  <>
                    <div className="fu" style={{ marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#2a2018", marginBottom: "0.4rem" }}>What's the belief?</p>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.8rem", color: "#9a8c7a", lineHeight: 1.5 }}>Write it exactly as it runs in your head. Don't clean it up.</p>
                    </div>
                    <textarea value={beliefInput} onChange={e => setBeliefInput(e.target.value)} placeholder="e.g. I'll always struggle with money no matter what I do" rows={4}
                      style={{ width: "100%", background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1.1rem", fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#2a2018", lineHeight: 1.6, marginBottom: "1rem" }} />
                    <div className="fu1" style={{ marginBottom: "1.25rem" }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Common ones to start with</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {BELIEF_EXAMPLES.map((b, i) => <button key={i} onClick={() => setBeliefInput(b)} className="eb" style={{ background: "none", border: "1px solid #e8e0d4", borderRadius: "2rem", padding: "0.35rem 0.75rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.7rem", color: "#6a5c4e", transition: "all 0.2s" }}>{b}</button>)}
                      </div>
                    </div>
                    <button onClick={runBeliefAudit} disabled={!beliefInput.trim()} className="pb" style={{ width: "100%", background: beliefInput.trim() ? "#2a2018" : "#e8e0d4", border: "none", borderRadius: "0.875rem", padding: "1rem", color: beliefInput.trim() ? "#faf7f2" : "#b4a890", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: beliefInput.trim() ? "pointer" : "not-allowed", transition: "all 0.2s" }}>Run Belief Audit</button>
                  </>
                )}
                {beliefLoading && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "40vh", gap: "1rem" }}><div style={{ display: "flex", gap: "0.4rem" }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4a882", animation: `shimmer 1.8s ${i*0.3}s ease-in-out infinite` }} />)}</div><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#9a8c7a", fontStyle: "italic" }}>Auditing the belief…</p></div>}
                {beliefResult && !beliefLoading && (
                  <div>
                    <div className="fu" style={{ background: "#2a2018", borderRadius: "0.875rem", padding: "1.1rem", marginBottom: "1rem" }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4a882", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>The belief</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#e8ddd0", fontStyle: "italic" }}>"{beliefInput}"</p>
                    </div>
                    {beliefResult.error ? <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#9a8c7a", marginBottom: "1rem" }}>{beliefResult.error}</p> : (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                        {[{ key: "origin", label: "Where it came from", icon: "○" }, { key: "cost", label: "What it's costing you", icon: "◌" }, { key: "truth", label: "The lie inside it", icon: "◉" }, { key: "rewrite", label: "Rewritten belief", icon: "◈", highlight: true }, { key: "body_check", label: "Body check", icon: "◎" }].map(item => (
                          <div key={item.key} style={{ background: item.highlight ? "#fdf8f0" : "#fff", border: `1px solid ${item.highlight ? "#c4a882" : "#e8e0d4"}`, borderRadius: "0.875rem", padding: "1.1rem" }}>
                            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: item.highlight ? "#c4a882" : "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{item.icon} {item.label}</p>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: item.highlight ? "1.05rem" : "0.95rem", color: item.highlight ? "#2a2018" : "#4a3828", lineHeight: 1.65, fontWeight: item.highlight ? 500 : 400 }}>{beliefResult[item.key]}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ background: "#fdf8f0", border: "1px solid #e8d4b8", borderRadius: "0.875rem", padding: "1rem", marginBottom: "1rem" }}>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.85rem", color: "#6a5c4e", fontStyle: "italic" }}>Saved to your Journal. Open it there to go deeper.</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button onClick={() => { setBeliefInput(""); setBeliefResult(null); }} className="gb" style={{ flex: 1, background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "0.85rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#6a5c4e", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>New Belief</button>
                      <button onClick={() => { setTab("journal"); setBeliefResult(null); setBeliefInput(""); }} className="pb" style={{ flex: 1, background: "#2a2018", border: "none", borderRadius: "0.875rem", padding: "0.85rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#faf7f2", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>View Journal →</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CHECK-IN */}
            {tab === "checkin" && (
              <div>
                {!checkinResult && !checkinLoading && (
                  <>
                    <div className="fu" style={{ marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{CHECKIN_PROMPTS[checkinIndex].label} · Today's Prompt</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "#2a2018", lineHeight: 1.6, fontStyle: "italic" }}>"{CHECKIN_PROMPTS[checkinIndex].prompt}"</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                      {CHECKIN_PROMPTS.map((_, i) => <button key={i} onClick={() => setCheckinIndex(i)} style={{ width: i === checkinIndex ? "1.5rem" : "0.4rem", height: "3px", borderRadius: "2px", background: i === checkinIndex ? "#c4a882" : "#e8e0d4", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />)}
                    </div>
                    <textarea value={checkinEntry} onChange={e => setCheckinEntry(e.target.value)} placeholder="Write what's true for you right now…" rows={6}
                      style={{ width: "100%", background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1.1rem", fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#2a2018", lineHeight: 1.7, marginBottom: "1rem" }} />
                    <button onClick={runCheckin} disabled={!checkinEntry.trim()} className="pb" style={{ width: "100%", background: checkinEntry.trim() ? "#2a2018" : "#e8e0d4", border: "none", borderRadius: "0.875rem", padding: "1rem", color: checkinEntry.trim() ? "#faf7f2" : "#b4a890", fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: checkinEntry.trim() ? "pointer" : "not-allowed", transition: "all 0.2s" }}>Reflect with AI</button>
                  </>
                )}
                {checkinLoading && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "40vh", gap: "1rem" }}><div style={{ display: "flex", gap: "0.4rem" }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4a882", animation: `shimmer 1.8s ${i*0.3}s ease-in-out infinite` }} />)}</div><p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#9a8c7a", fontStyle: "italic" }}>Reflecting…</p></div>}
                {checkinResult && !checkinLoading && (
                  <div>
                    <div className="fu" style={{ borderLeft: "3px solid #c4a882", paddingLeft: "1rem", marginBottom: "1.5rem" }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>You wrote</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.9rem", color: "#6a5c4e", lineHeight: 1.6, fontStyle: "italic" }}>{checkinEntry.slice(0, 120)}{checkinEntry.length > 120 ? "…" : ""}</p>
                    </div>
                    <div className="fu1" style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1.25rem", marginBottom: "1.25rem" }}>
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Reflection</p>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", color: "#2a2018", lineHeight: 1.75 }}>{checkinResult}</p>
                    </div>
                    <div style={{ background: "#fdf8f0", border: "1px solid #e8d4b8", borderRadius: "0.875rem", padding: "1rem", marginBottom: "1rem" }}>
                      <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.85rem", color: "#6a5c4e", fontStyle: "italic" }}>Saved to your Journal. Open it there to continue this reflection.</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button onClick={() => { setCheckinEntry(""); setCheckinResult(null); }} className="gb" style={{ flex: 1, background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "0.85rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#6a5c4e", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>Another Prompt</button>
                      <button onClick={() => { setTab("journal"); setCheckinResult(null); setCheckinEntry(""); }} className="pb" style={{ flex: 1, background: "#2a2018", border: "none", borderRadius: "0.875rem", padding: "0.85rem", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "#faf7f2", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>View Journal →</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* JOURNAL */}
            {tab === "journal" && (
              <div>
                <div className="fu" style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#2a2018", marginBottom: "0.25rem" }}>Your Work</p>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.75rem", color: "#9a8c7a" }}>{entries.length} saved {entries.length === 1 ? "entry" : "entries"} — tap any to continue</p>
                </div>
                {entries.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.1rem", color: "#c4b8a4", fontStyle: "italic", marginBottom: "0.5rem" }}>Nothing here yet.</p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.75rem", color: "#b4a890" }}>Complete a belief audit, check-in, or askformation and it'll live here.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {entries.map(entry => (
                      <button key={entry.id} onClick={() => entry.type !== "ask" && setSelectedEntry(entry)} style={{ background: "#fff", border: "1px solid #e8e0d4", borderRadius: "0.875rem", padding: "1rem 1.1rem", cursor: entry.type !== "ask" ? "pointer" : "default", textAlign: "left", transition: "all 0.2s", width: "100%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#b4a890", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                            {entry.type === "audit" ? "◈ Belief Audit" : entry.type === "ask" ? "? Askformation" : `◎ ${entry.label}`}
                          </span>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.6rem", color: "#c4b8a4" }}>{entry.date}</span>
                        </div>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "0.95rem", color: "#2a2018", lineHeight: 1.5, fontStyle: "italic" }}>
                          "{(entry.type === "audit" ? entry.belief : entry.type === "ask" ? entry.question : entry.entry).slice(0, 80)}…"
                        </p>
                        {entry.followUp && <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.65rem", color: "#c4a882", marginTop: "0.4rem" }}>↳ Follow-up saved</p>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #e8e0d4", position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 200, fontSize: "0.58rem", color: "#c4b8a4", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>The Money Identity App · Thought Therapy · thoughttherapy.co</p>
          </div>
        </div>
      </div>
    </>
  );
}
