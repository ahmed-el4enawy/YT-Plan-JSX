import { useState, useEffect } from "react";
import PromptSuite from "./pages/PromptSuite.jsx";
import SynthesisChat from "./pages/SynthesisChat.jsx";
import Overview from "./pages/Overview.jsx";
import Competitors from "./pages/Competitors.jsx";
import Content from "./pages/Content.jsx";
import Publishing from "./pages/Publishing.jsx";
import Viral from "./pages/Viral.jsx";
import Scripting from "./pages/Scripting.jsx";
import Production from "./pages/Production.jsx";
import Copyright from "./pages/Copyright.jsx";
import Resources from "./pages/Resources.jsx";
import Worldcup from "./pages/Worldcup.jsx";
import Kpis from "./pages/Kpis.jsx";
import Monetization from "./pages/Monetization.jsx";
import Roadmap from "./pages/Roadmap.jsx";

import { sectionGroups } from "./data/strategicData.js";

export default function NinetyFootball() {
  const [active, setActive] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setZoom(prev => Math.max(0.5, Math.min(prev + (e.deltaY > 0 ? -0.1 : 0.1), 2)));
      }
    };
    
    const handleKeyDown = (e) => {
      if (e.ctrlKey && (e.key === '=' || e.key === '+' || e.key === '-')) {
        e.preventDefault();
        setZoom(prev => Math.max(0.5, Math.min(prev + (e.key === '-' ? -0.1 : 0.1), 2)));
      } else if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        setZoom(1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.zoom = zoom;
  }, [zoom]);

  const renderSection = () => {
    switch (active) {
      case "overview": return <Overview setActive={setActive} />;
      case "competitors": return <Competitors />;
      case "content": return <Content />;
      case "publishing": return <Publishing />;
      case "viral": return <Viral />;
      case "scripting": return <Scripting />;
      case "production": return <Production />;
      case "promptsuite": return <PromptSuite />;
      case "generator": return <SynthesisChat />;
      case "copyright": return <Copyright />;
      case "resources": return <Resources />;
      case "worldcup": return <Worldcup />;
      case "kpis": return <Kpis />;
      case "monetization": return <Monetization />;
      case "roadmap": return <Roadmap />;
      default: return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "transparent" }}>
      <h2 className="sr-only">Ninety Football — Master Strategic Brief</h2>
      <nav className={isSidebarOpen ? "" : "nav-collapsed"} style={{ 
        width: isSidebarOpen ? 240 : 70, 
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0, 
        background: "var(--color-background-primary)", 
        borderRight: "0.5px solid var(--color-border-tertiary)", 
        padding: "1rem", 
        position: "sticky", 
        top: 0, 
        height: "100vh", 
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <div style={{ display: "flex", justifyContent: isSidebarOpen ? "flex-end" : "center", marginBottom: "0.5rem", flexShrink: 0 }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--border-radius-md)", transition: "all 0.2s" }} onMouseOver={e => { e.currentTarget.style.background = "var(--color-background-tertiary)"; e.currentTarget.style.color = "var(--color-text-primary)"; }} onMouseOut={e => { e.currentTarget.style.background = "var(--color-background-secondary)"; e.currentTarget.style.color = "var(--color-text-secondary)"; }}>
            <i className={`ti ${isSidebarOpen ? "ti-chevron-left" : "ti-chevron-right"}`} style={{ fontSize: 18 }} />
          </button>
        </div>
        
        <div style={{ 
          borderBottom: isSidebarOpen ? "0.5px solid var(--color-border-tertiary)" : "none", 
          paddingBottom: isSidebarOpen ? "1rem" : 0,
          marginBottom: "0.5rem", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          opacity: isSidebarOpen ? 1 : 0,
          maxHeight: isSidebarOpen ? "400px" : "0px",
          transition: "all 0.3s ease",
          overflow: "hidden",
          flexShrink: 0
        }}>
          <img src="/Ninety-Football-Logo.png" alt="Ninety Football Logo" style={{ width: "80%", maxWidth: "150px", marginBottom: "0.75rem", borderRadius: "var(--border-radius-md)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }} />
          <p style={{ fontWeight: 600, fontSize: 15, margin: 0, color: "var(--color-text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Ninety Football</p>
          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>Master Strategic Brief</p>
        </div>

        {sectionGroups.map(g => (
          <div key={g.group} style={{ marginTop: "0.5rem" }}>
            {isSidebarOpen ? (
              <p style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", padding: "4px 8px 8px", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, whiteSpace: "nowrap" }}>{g.group}</p>
            ) : (
              <div style={{ height: 16 }} />
            )}
            {g.items.map(s => (
              <button 
                key={s.id} 
                onClick={() => setActive(s.id)} 
                title={!isSidebarOpen ? s.label : ""} 
                className={`nav-item ${active === s.id ? "active" : ""}`}
              >
                <i className={`ti ${s.icon}`} style={{ fontSize: 18, marginRight: isSidebarOpen ? 12 : 0, transition: "margin 0.3s ease" }} aria-hidden="true" />
                {isSidebarOpen && <span style={{ whiteSpace: "nowrap", fontWeight: active === s.id ? 500 : 400 }}>{s.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <main style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto", maxWidth: active === "generator" ? "100%" : 860, transition: "max-width 0.3s ease" }}>
        {renderSection()}
      </main>
    </div>
  );
}
