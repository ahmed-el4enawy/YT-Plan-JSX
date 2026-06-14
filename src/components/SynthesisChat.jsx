import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Badge } from "./ui/index.jsx";

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  color: "var(--color-text-primary)",
  background: "var(--color-background-secondary)",
  border: "0.5px solid var(--color-border-secondary)",
  borderRadius: "var(--border-radius-md)",
  padding: "12px 14px",
  outline: "none",
  resize: "none"
};

const buttonStyle = {
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: 500,
  background: "var(--color-background-info)",
  border: "0.5px solid var(--color-border-info)",
  borderRadius: "var(--border-radius-md)",
  cursor: "pointer",
  color: "var(--color-text-info)",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  justifyContent: "center",
  boxShadow: "var(--glow-info)"
};

export default function SynthesisChat() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("ninety_gemini_key") || "");
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("ninety_gemini_key"));
  const [messages, setMessages] = useState([
    { role: "model", text: "Synthesis Engine initialized. I am your elite YouTube scriptwriter. Provide a topic, and I will generate a complete, highly-retentive script with visual cues and hooks. How can we dominate the feed today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleAuth = (e) => {
    e.preventDefault();
    if (apiKey.trim().length > 10) {
      localStorage.setItem("ninety_gemini_key", apiKey.trim());
      setIsAuth(true);
    }
  };

  const handleClearAuth = () => {
    localStorage.removeItem("ninety_gemini_key");
    setApiKey("");
    setIsAuth(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userText = input.trim();
    setInput("");
    
    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const systemInstruction = "You are an elite YouTube scriptwriter and strategist. When provided a topic, generate:\n1. Three high-CTR title ideas.\n2. Two highly clickable thumbnail visual concepts.\n3. A fast-paced, highly engaging script optimized for retention.\nAlways include clear visual cues in [brackets], an instant pattern-interrupt hook in the first 5 seconds, a tight narrative structure, and a strong call to action. Do not use generic AI phrasing like 'Let's dive in'. Maintain an authoritative, premium, and energetic tone.";
      
      const contents = newMessages.filter(m => m.role !== 'system').map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: contents
        })
      });

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const modelReply = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: "model", text: modelReply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "model", text: `**Error:** Synthesis failed. ${err.message}. Please check your API key and connection.` }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth) {
    return (
      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: "1.5rem", color: "var(--color-text-primary)" }}>Synthesis Engine Authentication</h2>
        <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", padding: "2rem", textAlign: "center" }}>
          <i className="ti ti-lock" style={{ fontSize: 32, color: "var(--color-text-secondary)", marginBottom: "1rem", display: "inline-block" }}></i>
          <h3 style={{ fontSize: 16, color: "var(--color-text-primary)", marginBottom: "8px" }}>Secure API Connection Required</h3>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: "2rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
            To power the interactive scripting engine, please provide your Google AI Studio API key. This key is stored securely in your local browser storage and is never transmitted to external servers.
          </p>
          <form onSubmit={handleAuth} style={{ display: "flex", gap: "10px", maxWidth: "400px", margin: "0 auto" }}>
            <input 
              type="password" 
              style={{ ...inputStyle, flex: 1 }} 
              placeholder="Paste your Gemini API key here..." 
              value={apiKey} 
              onChange={e => setApiKey(e.target.value)} 
            />
            <button type="submit" style={buttonStyle}>Authenticate</button>
          </form>
          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: "1.5rem" }}>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: "var(--color-text-info)", textDecoration: "none" }}>Get your free API key from Google AI Studio ↗</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 80px)", marginTop: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>AI Synthesis Chat</h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Badge color="success">Gemini 2.5 Flash Connected</Badge>
          <button onClick={handleClearAuth} style={{ background: "transparent", border: "none", color: "var(--color-text-tertiary)", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
            <i className="ti ti-logout" /> Disconnect
          </button>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        background: "var(--color-background-primary)", 
        border: "0.5px solid var(--color-border-tertiary)", 
        borderRadius: "var(--border-radius-lg)", 
        overflowY: "auto", 
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginBottom: "1rem"
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: m.role === "user" ? "flex-end" : "flex-start" 
          }}>
            <div style={{ 
              fontSize: 11, 
              color: "var(--color-text-tertiary)", 
              marginBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "flex",
              alignItems: "center",
              gap: 4
            }}>
              {m.role === "user" ? <><i className="ti ti-user" /> You</> : <><i className="ti ti-brain" /> Synthesis Engine</>}
            </div>
            <div style={{ 
              background: m.role === "user" ? "var(--color-background-tertiary)" : "transparent",
              border: m.role === "user" ? "1px solid var(--color-border-tertiary)" : "none",
              padding: m.role === "user" ? "12px 16px" : "0 4px",
              borderRadius: "var(--border-radius-md)",
              maxWidth: m.role === "user" ? "80%" : "100%",
              color: m.role === "user" ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              fontSize: "13.5px",
              lineHeight: 1.6,
              fontFamily: "var(--font-sans)"
            }}>
              {m.role === "user" ? (
                <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
              ) : (
                <div className="markdown-body" style={{ color: "var(--color-text-primary)" }}>
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
            <div style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 4 }}>
              <i className="ti ti-brain" /> Synthesis Engine
            </div>
            <div style={{ color: "var(--color-text-info)", fontSize: 13, display: "flex", alignItems: "center", gap: 8, padding: "0 4px" }}>
              <i className="ti ti-loader" style={{ animation: "spin 2s linear infinite" }} /> Synthesizing data...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <textarea 
          style={{ ...inputStyle, height: "60px" }} 
          placeholder="Send a prompt to the Synthesis Engine..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button 
          style={{ ...buttonStyle, height: "60px", padding: "0 24px", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }} 
          onClick={sendMessage}
          disabled={loading}
        >
          <i className="ti ti-send" style={{ fontSize: 18 }} />
        </button>
      </div>
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          color: var(--color-text-primary);
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        .markdown-body h3 { font-size: 1.1em; }
        .markdown-body p { margin-bottom: 1em; }
        .markdown-body ul, .markdown-body ol { margin-bottom: 1em; padding-left: 2em; }
        .markdown-body li { margin-bottom: 0.25em; }
        .markdown-body strong { color: var(--color-text-info); }
        .markdown-body code {
          background: var(--color-background-tertiary);
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: var(--font-mono);
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
}
