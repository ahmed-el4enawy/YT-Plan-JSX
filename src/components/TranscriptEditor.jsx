import React, { useState, useRef, useEffect } from "react";

export default function TranscriptEditor({ initialCaptions, onCaptionsChange }) {
  const [captions, setCaptions] = useState(initialCaptions || []);
  
  useEffect(() => {
    if (initialCaptions) {
      setCaptions(initialCaptions);
    }
  }, [initialCaptions]);

  useEffect(() => {
    if (onCaptionsChange) {
      onCaptionsChange(captions);
    }
  }, [captions, onCaptionsChange]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedId, setFocusedId] = useState(null);
  
  // Refs for focusing inputs dynamically after splits/merges
  const inputRefs = useRef({});

  // 1. Control Header Area Tools
  const handlePurge = () => {
    if (window.confirm("Are you sure you want to clear all captions?")) {
      setCaptions([]);
    }
  };

  // Node Mutation: Insertion
  const handleInsertNode = (index) => {
    const current = captions[index];
    const newNode = {
      id: Date.now(),
      text: "",
      startTime: current ? current.endTime : 0,
      endTime: current ? current.endTime + 1 : 1
    };
    
    const newCaptions = [...captions];
    newCaptions.splice(index + 1, 0, newNode);
    setCaptions(newCaptions);
    
    // Auto-focus the new node
    setTimeout(() => {
      const el = inputRefs.current[newNode.id];
      if (el) el.focus();
    }, 10);
  };

  // Node Mutation: Removal
  const handleRemoveNode = (index) => {
    const newCaptions = [...captions];
    newCaptions.splice(index, 1);
    setCaptions(newCaptions);
  };

  // Text mutation sync
  const handleTextChange = (id, newText) => {
    setCaptions(prev => prev.map(cap => {
      if (cap.id === id) {
        const wordArr = newText.split(/\s+/).filter(w => w);
        const duration = cap.endTime - cap.startTime;
        const timePerWord = duration / Math.max(1, wordArr.length);
        const wordData = wordArr.map((w, i) => ({
          word: w,
          start: cap.startTime + (i * timePerWord),
          end: cap.startTime + ((i + 1) * timePerWord)
        }));
        return { ...cap, text: newText, words: wordData };
      }
      return cap;
    }));
  };

  // Keyboard Event Listeners
  const handleKeyDown = (e, index, cap) => {
    // Carriage Return (Enter): Triggers a string split
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputEl = e.currentTarget;
      const cursorPosition = inputEl.selectionStart;
      const originalText = cap.text;
      
      const textBefore = originalText.slice(0, cursorPosition).trim();
      const textAfter = originalText.slice(cursorPosition).trim();
      
      const currentDuration = cap.endTime - cap.startTime;
      const splitTime = cap.startTime + (currentDuration / 2);
      
      const newCaptions = [...captions];
      
      // Update current node
      newCaptions[index] = {
        ...cap,
        text: textBefore,
        endTime: splitTime
      };
      
      // Create new downstream node
      const newNodeId = Date.now();
      const newNode = {
        id: newNodeId,
        text: textAfter,
        startTime: splitTime,
        endTime: cap.endTime
      };
      
      newCaptions.splice(index + 1, 0, newNode);
      setCaptions(newCaptions);
      
      // Focus the new node
      setTimeout(() => {
        const el = inputRefs.current[newNodeId];
        if (el) {
          el.focus();
          el.setSelectionRange(0, 0);
        }
      }, 10);
    }
    
    // Cancellation (Backspace): Merge with previous
    if (e.key === 'Backspace') {
      const inputEl = e.currentTarget;
      if (inputEl.selectionStart === 0 && inputEl.selectionEnd === 0 && index > 0) {
        e.preventDefault();
        
        const prevCap = captions[index - 1];
        const newCaptions = [...captions];
        
        // Concatenate text
        const concatenatedText = prevCap.text + (prevCap.text && cap.text ? " " : "") + cap.text;
        
        newCaptions[index - 1] = {
          ...prevCap,
          text: concatenatedText,
          endTime: cap.endTime
        };
        
        // Dispose of current container
        newCaptions.splice(index, 1);
        setCaptions(newCaptions);
        
        // Focus previous and set cursor at the boundary
        setTimeout(() => {
          const el = inputRefs.current[prevCap.id];
          if (el) {
            el.focus();
            const boundary = prevCap.text.length + (prevCap.text ? 1 : 0);
            el.setSelectionRange(boundary, boundary);
          }
        }, 10);
      }
    }
  };

  // Temporal Integration Dispatch
  const handleNodeSelect = (cap) => {
    setFocusedId(cap.id);
    console.log(`Syncing video playback to: ${cap.startTime}s`);
    // Example: if (window.seekVideo) window.seekVideo(cap.startTime);
  };

  const filteredCaptions = captions.filter(c => c.text.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#14151A", color: "#FFF" }}>
      
      {/* Control Header Area */}
      <div style={{ padding: "16px", borderBottom: "1px solid #1E2028" }}>
        
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", background: "#0A0B0E", padding: "8px 12px", borderRadius: "6px", border: "1px solid #1E2028" }}>
            <i className="ti ti-search" style={{ color: "var(--color-text-tertiary)", fontSize: "16px" }}></i>
            <input 
              type="text" 
              placeholder="Search captions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: "transparent", border: "none", color: "#FFF", fontSize: "13px", outline: "none", width: "100%" }} 
            />
          </div>
          
          <button style={{ background: "transparent", border: "1px solid #1E2028", color: "var(--color-text-secondary)", width: "36px", height: "36px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="Batch Edit">
            <i className="ti ti-list-check" style={{ fontSize: "16px" }}></i>
          </button>
          
          <button style={{ background: "transparent", border: "1px solid #1E2028", color: "var(--color-text-secondary)", width: "36px", height: "36px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="Translate">
            <i className="ti ti-language" style={{ fontSize: "16px" }}></i>
          </button>
          
          <button onClick={handlePurge} style={{ background: "transparent", border: "1px solid #1E2028", color: "var(--color-text-danger)", width: "36px", height: "36px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="Purge Collection">
            <i className="ti ti-trash" style={{ fontSize: "16px" }}></i>
          </button>
        </div>
      </div>

      {/* Chronological List Body */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "2px" }} className="custom-scrollbar">
        {filteredCaptions.map((cap, index) => {
          // Identify absolute index for numbering even during search
          const absoluteIndex = captions.findIndex(c => c.id === cap.id);
          const isFocused = focusedId === cap.id;
          
          return (
            <div 
              key={cap.id} 
              onClick={() => handleNodeSelect(cap)}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                padding: "16px 12px", 
                background: isFocused ? "#1E2028" : "transparent",
                borderBottom: "1px solid #1E2028",
                transition: "background 0.2s"
              }}
              onMouseEnter={(e) => { if (!isFocused) e.currentTarget.style.background = "rgba(30, 32, 40, 0.5)"; }}
              onMouseLeave={(e) => { if (!isFocused) e.currentTarget.style.background = "transparent"; }}
            >
              {/* Fixed Sequential Index */}
              <span style={{ 
                width: "32px", 
                fontSize: "12px", 
                color: isFocused ? "var(--color-text-info, #00FFFF)" : "var(--color-text-secondary)", 
                fontWeight: 600,
                textAlign: "center",
                marginRight: "12px"
              }}>
                {absoluteIndex + 1}
              </span>
              
              {/* Inline Mutability Wrapper */}
              <input 
                ref={el => inputRefs.current[cap.id] = el}
                type="text" 
                value={cap.text}
                onChange={(e) => handleTextChange(cap.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, absoluteIndex, cap)}
                onFocus={() => handleNodeSelect(cap)}
                style={{ 
                  flex: 1, 
                  background: "transparent", 
                  border: "none", 
                  color: isFocused ? "var(--color-text-info, #00FFFF)" : "#E2E8F0", 
                  fontSize: "13px", 
                  fontWeight: 600,
                  outline: "none",
                  fontFamily: "Inter, sans-serif"
                }} 
              />
              
              {/* Dynamic Utility Layout (Hover/Focus only) */}
              <div style={{ display: "flex", gap: "8px", opacity: isFocused ? 1 : 0, transition: "opacity 0.2s" }}>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleInsertNode(absoluteIndex); }}
                  style={{ background: "#2A2D35", border: "none", width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#FFF" }}
                  title="Insert Node"
                >
                  <i className="ti ti-plus" style={{ fontSize: "14px" }}></i>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRemoveNode(absoluteIndex); }}
                  style={{ background: "#2A2D35", border: "none", width: "28px", height: "28px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#FFF" }}
                  title="Remove Node"
                >
                  <i className="ti ti-trash" style={{ fontSize: "14px" }}></i>
                </button>
              </div>
            </div>
          );
        })}
        {filteredCaptions.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--color-text-tertiary)", fontSize: "13px" }}>
            No captions found.
          </div>
        )}
      </div>
    </div>
  );
}


