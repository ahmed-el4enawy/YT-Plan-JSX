import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

// Helper for unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "14px",
  color: "var(--color-text-primary)",
  background: "transparent",
  border: "none",
  padding: "16px 20px",
  outline: "none",
  resize: "none",
  lineHeight: "1.5",
  minHeight: "56px",
  maxHeight: "200px"
};

const buttonStyle = {
  padding: "8px 16px",
  fontSize: "13px",
  fontWeight: 500,
  background: "var(--color-background-info)",
  border: "1px solid var(--color-border-info)",
  borderRadius: "var(--border-radius-md)",
  cursor: "pointer",
  color: "var(--color-text-info)",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  justifyContent: "center",
  boxShadow: "var(--glow-info)",
  transition: "all 0.2s ease"
};

const secondaryButtonStyle = {
  ...buttonStyle,
  background: "var(--color-background-secondary)",
  border: "1px solid var(--color-border-tertiary)",
  color: "var(--color-text-primary)",
  boxShadow: "none"
};

const avatarStyle = { 
  width: "36px", 
  height: "36px", 
  borderRadius: "50%", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center", 
  flexShrink: 0,
  fontSize: "18px"
};

export default function SynthesisChat() {
  const [sessions, setSessions] = useState([]);
  const [sessionsLoaded, setSessionsLoaded] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingMsgId, setEditingMsgId] = useState(null);
  const [editInput, setEditInput] = useState("");
  
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, currentId, loading]);

  // Load sessions on mount
  useEffect(() => {
    const load = async () => {
      let loadedSessions = null;
      if (window.electronAPI) {
        loadedSessions = await window.electronAPI.loadChats();
      }
      if (!loadedSessions) {
        const saved = localStorage.getItem("ninety_chat_sessions");
        loadedSessions = saved ? JSON.parse(saved) : [];
      }
      setSessions(loadedSessions);
      setSessionsLoaded(true);
    };
    load();
  }, []);

  // Persist sessions
  useEffect(() => {
    if (!sessionsLoaded) return;
    localStorage.setItem("ninety_chat_sessions", JSON.stringify(sessions));
    if (window.electronAPI) {
      window.electronAPI.saveChats(sessions);
    }
  }, [sessions, sessionsLoaded]);

  const currentSession = sessions.find(s => s.id === currentId);
  const messages = currentSession ? currentSession.messages : [];

  const handleNewChat = () => {
    setCurrentId(null);
    setInput("");
    setEditingMsgId(null);
  };

  const deleteSession = (e, id) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (currentId === id) setCurrentId(null);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  };

  const handleEditMessage = (msg) => {
    setEditingMsgId(msg.id);
    setEditInput(msg.text);
  };

  const saveEditMessage = (msgId) => {
    if (!currentId) return;
    setSessions(prev => prev.map(s => {
      if (s.id !== currentId) return s;
      return {
        ...s,
        messages: s.messages.map(m => m.id === msgId ? { ...m, text: editInput } : m)
      };
    }));
    setEditingMsgId(null);
  };

  const deleteMessage = (msgId) => {
    if (!currentId) return;
    setSessions(prev => prev.map(s => {
      if (s.id !== currentId) return s;
      return {
        ...s,
        messages: s.messages.filter(m => m.id !== msgId)
      };
    }));
  };

  const saveAndRegenerate = async (msgId) => {
    if (!currentId) return;
    const session = sessions.find(s => s.id === currentId);
    const msgIndex = session.messages.findIndex(m => m.id === msgId);
    if (msgIndex === -1) return;

    // Truncate messages up to this user message, replace its text
    const newMessages = session.messages.slice(0, msgIndex);
    const updatedUserMsg = { id: msgId, role: "user", text: editInput };
    newMessages.push(updatedUserMsg);
    
    // Update session immediately
    let updatedSessions = sessions.map(s => 
      s.id === currentId ? { ...s, messages: newMessages } : s
    );
    setSessions(updatedSessions);
    setEditingMsgId(null);
    
    await generateReply(currentId, newMessages, updatedSessions);
  };

  const generateReply = async (sessionId, msgs, allSessions) => {
    setLoading(true);
    try {
      const contents = msgs.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem("ninety_gemini_key");
      const systemInstruction = "You are a highly intelligent, flexible AI assistant embedded within the Ninety Football OS dashboard. Answer the user's questions naturally, helpfully, and conversationally. You can assist with anything they need, including brainstorming, coding, content strategy, writing, or just general chat.";
      
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: contents
        })
      });

      const data = await res.json();
      
      if (data.error) throw new Error(data.error.message);
      if (!data.candidates || data.candidates.length === 0) throw new Error("No response generated by the model.");

      const modelReply = data.candidates[0].content.parts[0].text;
      
      setSessions(prev => prev.map(s => {
        if (s.id !== sessionId) return s;
        return { ...s, messages: [...s.messages, { id: generateId(), role: "model", text: modelReply }] };
      }));
    } catch (err) {
      setSessions(prev => prev.map(s => {
        if (s.id !== sessionId) return s;
        return { ...s, messages: [...s.messages, { id: generateId(), role: "model", text: `**System Error:** ${err.message}` }] };
      }));
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "56px";

    let sessionId = currentId;
    let newSessions = [...sessions];
    let sessionMsgs = [];

    if (!sessionId) {
      sessionId = generateId();
      setCurrentId(sessionId);
      const newSession = {
        id: sessionId,
        title: userText.substring(0, 35) + (userText.length > 35 ? "..." : ""),
        messages: [{ id: generateId(), role: "user", text: userText }],
        createdAt: Date.now()
      };
      newSessions = [newSession, ...newSessions];
      sessionMsgs = newSession.messages;
    } else {
      const sessionIndex = newSessions.findIndex(s => s.id === sessionId);
      sessionMsgs = [...newSessions[sessionIndex].messages, { id: generateId(), role: "user", text: userText }];
      newSessions[sessionIndex] = { ...newSessions[sessionIndex], messages: sessionMsgs };
    }
    
    setSessions(newSessions);
    await generateReply(sessionId, sessionMsgs, newSessions);
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 100px)", marginTop: "1.5rem", gap: "1.5rem" }}>
      
      {/* SIDEBAR: CHAT HISTORY */}
      <div style={{ 
        width: "280px", 
        display: "flex", 
        flexDirection: "column", 
        background: "var(--color-background-primary)", 
        border: "1px solid var(--color-border-tertiary)", 
        borderRadius: "var(--border-radius-lg)", 
        overflow: "hidden" 
      }}>
        <div style={{ padding: "1rem", borderBottom: "1px solid var(--color-border-tertiary)" }}>
          <button 
            onClick={handleNewChat} 
            style={{ 
              width: "100%", 
              padding: "12px", 
              background: "var(--color-background-secondary)", 
              border: "1px solid var(--color-border-secondary)", 
              borderRadius: "var(--border-radius-md)", 
              color: "var(--color-text-primary)", 
              cursor: "pointer", 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              fontWeight: 500,
              transition: "all 0.2s"
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-info)'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-secondary)'; }}
          >
            <i className="ti ti-message-plus" style={{ fontSize: "16px", color: "var(--color-text-info)" }}></i> New Synthesis
          </button>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }} className="hide-scrollbar">
          <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", padding: "0 0.5rem", marginBottom: "0.75rem" }}>
            Recent Sessions
          </div>
          {sessions.length === 0 ? (
            <div style={{ padding: "1rem 0.5rem", fontSize: "13px", color: "var(--color-text-tertiary)" }}>No synthesis history yet.</div>
          ) : (
            sessions.map(s => (
              <div 
                key={s.id} 
                onClick={() => setCurrentId(s.id)} 
                className="session-item"
                style={{ 
                  padding: "10px 12px", 
                  marginBottom: "4px", 
                  borderRadius: "var(--border-radius-md)", 
                  background: currentId === s.id ? "var(--color-background-secondary)" : "transparent", 
                  cursor: "pointer", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  border: currentId === s.id ? "1px solid var(--color-border-tertiary)" : "1px solid transparent"
                }}
              >
                <div style={{ fontSize: "13px", color: currentId === s.id ? "var(--color-text-primary)" : "var(--color-text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: "8px" }}>
                  <i className="ti ti-message-2" style={{ opacity: currentId === s.id ? 1 : 0.5, color: currentId === s.id ? "var(--color-text-info)" : "inherit" }}></i>
                  {s.title}
                </div>
                <button 
                  onClick={(e) => deleteSession(e, s.id)} 
                  className="session-delete-btn"
                  style={{ background: "transparent", border: "none", color: "var(--color-text-danger)", cursor: "pointer", padding: "4px", display: currentId === s.id ? "block" : "none" }}
                  title="Delete Session"
                >
                  <i className="ti ti-trash"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "var(--color-background-primary)", 
        border: "1px solid var(--color-border-tertiary)", 
        borderRadius: "var(--border-radius-lg)", 
        position: "relative",
        overflow: "hidden"
      }}>
        
        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0" }} className="hide-scrollbar">
          {messages.length === 0 ? (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div className="glow-orb" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, transparent 70%)", zIndex: 0 }}></div>
              <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", color: "var(--color-text-tertiary)", opacity: 0.9 }}>
                <div style={{ 
                  width: "90px", height: "90px", 
                  background: "linear-gradient(135deg, rgba(20,22,27,0.8), rgba(30,34,42,0.9))", 
                  borderRadius: "50%", 
                  display: "flex", alignItems: "center", justifyContent: "center", 
                  marginBottom: "2rem", 
                  border: "1px solid rgba(255,255,255,0.05)", 
                  boxShadow: "0 0 40px rgba(52, 211, 153, 0.15), inset 0 0 20px rgba(255,255,255,0.02)",
                  animation: "float 6s ease-in-out infinite"
                }}>
                  <i className="ti ti-brain" style={{ fontSize: 44, color: "var(--color-text-info)", filter: "drop-shadow(0 0 10px rgba(52, 211, 153, 0.4))" }}></i>
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "16px", letterSpacing: "-0.02em", background: "linear-gradient(90deg, #fff, #a1a1aa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Synthesis Engine</h3>
                <p style={{ fontSize: 14, maxWidth: "380px", textAlign: "center", lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                  How can I help you today? I'm a flexible AI assistant ready to brainstorm, write scripts, or answer any question you have.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ padding: "1.5rem 0" }}>
              {messages.map((m, i) => (
                <div key={m.id} className="msg-row" style={{ display: "flex", gap: "20px", padding: "1.5rem 2rem", borderBottom: i === messages.length -1 ? "none" : "1px solid var(--color-border-tertiary)", animation: "fadeIn 0.3s ease-out forwards", position: "relative" }}>
                  
                  {/* Avatar */}
                  <div style={{ ...avatarStyle, 
                    background: m.role === "user" ? "var(--color-background-secondary)" : "var(--color-background-info)", 
                    color: m.role === "user" ? "var(--color-text-secondary)" : "var(--color-text-info)",
                    border: m.role === "user" ? "1px solid var(--color-border-tertiary)" : "1px solid var(--color-border-info)",
                    boxShadow: m.role === "model" ? "var(--glow-info)" : "none"
                  }}>
                    <i className={m.role === "user" ? "ti ti-user" : "ti ti-brain"}></i>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0, marginTop: "6px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
                      {m.role === "user" ? "Executive" : "Synthesis Engine"}
                    </div>
                    
                    {editingMsgId === m.id ? (
                      <div style={{ width: "100%", animation: "fadeIn 0.2s" }}>
                        <textarea 
                          value={editInput} 
                          onChange={e => setEditInput(e.target.value)} 
                          style={{ width: "100%", background: "var(--color-background-secondary)", border: "1px solid var(--color-border-info)", color: "var(--color-text-primary)", padding: "14px", borderRadius: "var(--border-radius-md)", minHeight: "120px", fontFamily: "var(--font-sans)", resize: "vertical", marginBottom: "12px", outline: "none", fontSize: "14px", lineHeight: "1.6" }} 
                        />
                        <div style={{ display: "flex", gap: "8px" }}>
                          {m.role === 'user' ? (
                            <button onClick={() => saveAndRegenerate(m.id)} style={buttonStyle}>Save & Regenerate</button>
                          ) : (
                            <button onClick={() => saveEditMessage(m.id)} style={buttonStyle}>Save Edit</button>
                          )}
                          <button onClick={() => setEditingMsgId(null)} style={secondaryButtonStyle}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="markdown-body" style={{ color: "var(--color-text-primary)", fontSize: "14.5px", lineHeight: "1.7" }}>
                        {m.role === "user" ? <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div> : <ReactMarkdown>{m.text}</ReactMarkdown>}
                      </div>
                    )}
                  </div>

                  {/* Hover Actions */}
                  {editingMsgId !== m.id && (
                    <div className="msg-actions" style={{ position: "absolute", top: "1.5rem", right: "2rem", display: "flex", gap: "8px" }}>
                      {m.role === "model" && (
                        <button onClick={() => navigator.clipboard.writeText(m.text)} className="msg-action-btn" title="Copy response">
                          <i className="ti ti-copy"></i>
                        </button>
                      )}
                      <button onClick={() => handleEditMessage(m)} className="msg-action-btn" title="Edit message">
                        <i className="ti ti-pencil"></i>
                      </button>
                      <button onClick={() => deleteMessage(m.id)} className="msg-action-btn" title="Delete message">
                        <i className="ti ti-trash"></i>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div style={{ display: "flex", gap: "20px", padding: "1.5rem 2rem", animation: "fadeIn 0.3s ease-out forwards" }}>
                  <div style={{ ...avatarStyle, background: "var(--color-background-info)", color: "var(--color-text-info)", border: "1px solid var(--color-border-info)", boxShadow: "var(--glow-info)" }}>
                    <i className="ti ti-brain" style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}></i>
                  </div>
                  <div style={{ flex: 1, minWidth: 0, marginTop: "6px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "12px" }}>Synthesis Engine</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "70%" }}>
                      <div className="shimmer" style={{ height: "12px", borderRadius: "4px", width: "100%" }}></div>
                      <div className="shimmer" style={{ height: "12px", borderRadius: "4px", width: "85%" }}></div>
                      <div className="shimmer" style={{ height: "12px", borderRadius: "4px", width: "40%" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} style={{ height: "40px" }} />
            </div>
          )}
        </div>

        <div style={{ padding: "0 2rem 2rem", background: "linear-gradient(to bottom, transparent, var(--color-background-primary) 20%)" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "flex-end", 
            background: "rgba(20, 22, 27, 0.6)", 
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.08)", 
            borderRadius: "20px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.02)"
          }}
          className="chat-input-wrapper"
          >
            <textarea 
              ref={textareaRef}
              style={{ ...inputStyle, padding: "18px 24px" }} 
              placeholder="Message the Synthesis Engine..."
              value={input}
              onChange={handleInput}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <div style={{ padding: "12px 16px" }}>
              <button 
                style={{ 
                  width: "40px", height: "40px", borderRadius: "50%", padding: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: loading || !input.trim() ? "rgba(255,255,255,0.05)" : "var(--color-background-info)",
                  color: loading || !input.trim() ? "rgba(255,255,255,0.3)" : "var(--color-text-info)",
                  border: "none", cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  boxShadow: loading || !input.trim() ? "none" : "0 0 20px rgba(52, 211, 153, 0.4)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: loading || !input.trim() ? "scale(0.95)" : "scale(1)"
                }} 
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                <i className={loading ? "ti ti-loader" : "ti ti-arrow-up"} style={{ fontSize: "20px", animation: loading ? "spin 2s linear infinite" : "none" }} />
              </button>
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: "11.5px", color: "var(--color-text-tertiary)", marginTop: "16px", letterSpacing: "0.02em" }}>
            Powered by Google Gemini 2.5 Flash <span style={{ opacity: 0.5, margin: "0 6px" }}>•</span> Proprietary Intelligence
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.95); } }
        
        .shimmer {
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        .hide-scrollbar::-webkit-scrollbar { width: 6px; }
        .hide-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .hide-scrollbar::-webkit-scrollbar-thumb { background: var(--color-border-tertiary); border-radius: 10px; }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--color-border-secondary); }

        .session-item:hover { background: rgba(255,255,255,0.03) !important; }
        .session-item:hover .session-delete-btn { display: block !important; }

        .msg-row .msg-actions { opacity: 0; transform: translateY(5px); transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
        .msg-row:hover .msg-actions { opacity: 1; transform: translateY(0); }
        .msg-action-btn { 
          background: rgba(20,22,27,0.8); 
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.1); 
          color: var(--color-text-secondary); 
          border-radius: 8px; 
          width: 34px; height: 34px; 
          cursor: pointer; 
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); 
          display: flex; align-items: center; justify-content: center; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .msg-action-btn:hover { background: rgba(255,255,255,0.1); color: var(--color-text-primary); border-color: rgba(255,255,255,0.2); transform: translateY(-2px); }

        .chat-input-wrapper:focus-within {
          border-color: rgba(52, 211, 153, 0.3) !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(52, 211, 153, 0.1) !important;
        }

        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          color: var(--color-text-primary);
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .markdown-body h3 { font-size: 1.1em; color: var(--color-text-info); }
        .markdown-body p { margin-bottom: 1.25em; }
        .markdown-body ul, .markdown-body ol { margin-bottom: 1.25em; padding-left: 2em; }
        .markdown-body li { margin-bottom: 0.4em; }
        .markdown-body strong { color: var(--color-text-primary); font-weight: 600; }
        .markdown-body em { color: var(--color-text-secondary); }
        .markdown-body code {
          background: rgba(255,255,255,0.05);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.9em;
          border: 1px solid rgba(255,255,255,0.08);
          color: #e2e8f0;
        }
        .markdown-body blockquote {
          border-left: 3px solid var(--color-border-info);
          padding-left: 1em;
          margin-left: 0;
          color: var(--color-text-secondary);
          background: linear-gradient(90deg, rgba(52, 211, 153, 0.05), transparent);
          padding: 0.75em 1em;
          border-radius: 0 6px 6px 0;
        }
      `}</style>
    </div>
  );
}
