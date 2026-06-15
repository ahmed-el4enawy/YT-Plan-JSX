import React, { useState, useRef, useEffect } from "react";
import { Badge } from "../components/ui/index.jsx";

const CAPTION_STYLES = [
  { id: "football_news", label: "Football News", color: "#FFFF00", stroke: "#000" },
  { id: "hormozi", label: "Hormozi", color: "#00FFFF", stroke: "#000" },
  { id: "mrbeast", label: "MrBeast", color: "#FFFF00", stroke: "#FF6600" },
  { id: "karaoke", label: "Karaoke", color: "#FFFFFF", stroke: "#0080FF" },
  { id: "minimal", label: "Minimal", color: "#FFFFFF", stroke: "transparent" },
  { id: "bounce", label: "Bounce", color: "#00FF88", stroke: "#000" },
  { id: "classic", label: "Classic", color: "#FFFF00", stroke: "#000" },
];

const SectionHeader = ({ title }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "12px 0 8px" }}>
    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-primary)" }}>{title}</span>
    <i className="ti ti-chevron-up" style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}></i>
  </div>
);

const ControlRow = ({ label, children }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
    <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", minWidth: "80px" }}>{label}</span>
    <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px" }}>
      {children}
    </div>
  </div>
);

const SliderControl = ({ value, min, max, onChange, unit = "%" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%" }}>
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value} 
      onChange={e => onChange(e.target.value)}
      style={{ flex: 1, accentColor: "var(--color-text-info)", height: "4px", background: "var(--color-border-secondary)", borderRadius: "2px", appearance: "none" }}
    />
    <div style={{ display: "flex", alignItems: "center", background: "var(--color-background-secondary)", border: "1px solid var(--color-border-tertiary)", borderRadius: "4px", padding: "4px 8px" }}>
      <span style={{ fontSize: "12px", color: "var(--color-text-primary)", width: "30px", textAlign: "right" }}>{value}{unit}</span>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "4px" }}>
        <i className="ti ti-chevron-up" style={{ fontSize: "8px", color: "var(--color-text-tertiary)", cursor: "pointer" }}></i>
        <i className="ti ti-chevron-down" style={{ fontSize: "8px", color: "var(--color-text-tertiary)", cursor: "pointer" }}></i>
      </div>
    </div>
  </div>
);

export default function CaptionGenerator() {
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  
  // Controls state
  const [style, setStyle] = useState("hormozi");
  const [position, setPosition] = useState(10);
  const [fontSize, setFontSize] = useState(14);
  const [strokeThickness, setStrokeThickness] = useState(10);
  const [shadowOpacity, setShadowOpacity] = useState(40);
  
  // Job state
  const [status, setStatus] = useState("idle"); 
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setProgress(0);
      setJobId(null);
    }
  };

  const handleProcess = async () => {
    if (!file) return;
    setStatus("uploading");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("captionStyle", style);
    formData.append("captionPosition", position);

    try {
      const res = await fetch("http://localhost:5000/api/process", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to start processing");
      
      setJobId(data.jobId);
      setStatus("processing");
      pollStatus(data.jobId);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to connect to Python backend. Is it running on port 5000?");
    }
  };

  const pollStatus = async (id) => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/status/${id}`);
        const data = await res.json();
        
        if (data.status === "completed") {
          setStatus("completed");
          setProgress(100);
          setCurrentPhase("Finished!");
          clearInterval(interval);
        } else if (data.status === "failed") {
          setStatus("error");
          setErrorMsg(data.errorMessage || "Processing failed");
          clearInterval(interval);
        } else {
          setProgress(data.progress || 0);
          setCurrentPhase(data.currentPhase || "Processing...");
        }
      } catch (err) {
        console.error("Poll error", err);
      }
    }, 2000);
  };

  const handleDownload = () => {
    if (!jobId) return;
    window.open(`http://localhost:5000/api/download/${jobId}`, "_blank");
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 48px)", gap: "24px", overflow: "hidden", margin: "-1.5rem -2rem", padding: "1.5rem 2rem", background: "#0D0E12" }}>
      
      {/* LEFT PANEL: Professional Editor Controls */}
      <div className="custom-scrollbar" style={{ width: "360px", flexShrink: 0, display: "flex", flexDirection: "column", background: "#14151A", borderRadius: "12px", border: "1px solid #1E2028", overflowY: "auto" }}>
        
        {/* Top Navigation */}
        <div style={{ display: "flex", borderBottom: "1px solid #1E2028", padding: "0 16px" }}>
          {["Captions", "Text", "Animation", "Text to speech"].map((tab, i) => (
            <div key={tab} style={{ padding: "16px 12px", fontSize: "13px", fontWeight: i === 1 ? 600 : 500, color: i === 1 ? "var(--color-text-info)" : "var(--color-text-secondary)", borderBottom: i === 1 ? "2px solid var(--color-text-info)" : "2px solid transparent", cursor: "pointer" }}>
              {tab}
            </div>
          ))}
        </div>

        {/* Sub Navigation */}
        <div style={{ display: "flex", padding: "12px 16px", gap: "8px" }}>
          {["Basic", "Templates", "Bubble", "Effects"].map((tab, i) => (
            <div key={tab} style={{ flex: 1, textAlign: "center", padding: "6px 0", fontSize: "12px", fontWeight: 500, background: i === 0 ? "#1E2028" : "transparent", color: i === 0 ? "#FFF" : "var(--color-text-secondary)", borderRadius: "4px", cursor: "pointer" }}>
              {tab}
            </div>
          ))}
        </div>

        <div style={{ padding: "0 16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "var(--color-text-info)" }} />
            <span style={{ fontSize: "13px", fontWeight: 500, color: "#FFF" }}>Apply to all</span>
          </div>

          <SectionHeader title="Preset style" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "24px" }}>
            {CAPTION_STYLES.map(s => (
              <div 
                key={s.id} 
                onClick={() => setStyle(s.id)}
                style={{ 
                  aspectRatio: "1", 
                  background: "#0A0B0E", 
                  border: style === s.id ? "1.5px solid var(--color-text-info)" : "1px solid #2A2D35", 
                  borderRadius: "8px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ 
                  fontFamily: s.id === "classic" ? "Anton, sans-serif" : "Bebas Neue, sans-serif", 
                  fontSize: "20px", 
                  fontWeight: 900, 
                  color: s.color, 
                  WebkitTextStroke: s.stroke !== "transparent" ? `1px ${s.stroke}` : "none",
                  textShadow: s.id === "minimal" ? "0 0 10px rgba(255,255,255,0.5)" : "2px 2px 0 #000"
                }}>
                  Aa
                </span>
              </div>
            ))}
          </div>

          <SectionHeader title="Position & Size" />
          <ControlRow label="Scale">
            <SliderControl value={fontSize} min={10} max={40} onChange={setFontSize} unit="%" />
          </ControlRow>
          <ControlRow label="Y-Position (API)">
            <SliderControl value={position} min={5} max={50} onChange={setPosition} unit="%" />
          </ControlRow>
          <ControlRow label="X-Position">
            <SliderControl value={50} min={0} max={100} onChange={() => {}} unit="%" />
          </ControlRow>

          <div style={{ height: "1px", background: "#1E2028", margin: "16px 0" }}></div>

          <SectionHeader title="Stroke" />
          <ControlRow label="Color">
            <div style={{ width: "60px", height: "24px", background: "#000", border: "1px solid #333", borderRadius: "4px" }}></div>
          </ControlRow>
          <ControlRow label="Thickness">
            <SliderControl value={strokeThickness} min={0} max={20} onChange={setStrokeThickness} unit="" />
          </ControlRow>

          <div style={{ height: "1px", background: "#1E2028", margin: "16px 0" }}></div>

          <SectionHeader title="Shadow" />
          <ControlRow label="Color">
            <div style={{ width: "60px", height: "24px", background: "#000", border: "1px solid #333", borderRadius: "4px" }}></div>
          </ControlRow>
          <ControlRow label="Opacity">
            <SliderControl value={shadowOpacity} min={0} max={100} onChange={setShadowOpacity} unit="%" />
          </ControlRow>
          <ControlRow label="Blurriness">
            <SliderControl value={4} min={0} max={20} onChange={() => {}} unit="%" />
          </ControlRow>

        </div>
      </div>

      {/* RIGHT PANEL: Video Preview & Execution */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Header / Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#14151A", padding: "12px 24px", borderRadius: "12px", border: "1px solid #1E2028" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button style={{ background: "transparent", border: "none", color: "var(--color-text-secondary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <i className="ti ti-chevron-left" style={{ fontSize: "18px", marginRight: "4px" }}></i>
              <span style={{ fontSize: "13px", fontWeight: 500 }}>Back</span>
            </button>
            <div style={{ width: "1px", height: "20px", background: "#1E2028" }}></div>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFF" }}>Ninety Football Shorts Template</span>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button 
              onClick={handleProcess}
              disabled={!file || status === "processing" || status === "uploading"}
              style={{ 
                background: "var(--color-text-info)", 
                color: "#000", 
                border: "none", 
                padding: "8px 24px", 
                borderRadius: "6px", 
                fontWeight: 600, 
                fontSize: "13px", 
                cursor: !file || status === "processing" || status === "uploading" ? "not-allowed" : "pointer",
                opacity: !file || status === "processing" || status === "uploading" ? 0.5 : 1
              }}
            >
              {status === "uploading" ? "Uploading..." : status === "processing" ? "Processing..." : "Generate Captions"}
            </button>
          </div>
        </div>

        {/* Video Canvas */}
        <div style={{ flex: 1, background: "#0A0B0E", borderRadius: "12px", border: "1px solid #1E2028", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", borderRadius: "8px" }}
            />
          ) : (
            <div 
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={{ width: "80px", height: "80px", background: "#1E2028", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <i className="ti ti-video-plus" style={{ fontSize: "32px", color: "var(--color-text-info)" }}></i>
              </div>
              <h3 style={{ color: "#FFF", fontSize: "18px", marginBottom: "8px" }}>Upload a Video</h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>Click to browse or drag & drop (.mp4, .mov)</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".mp4,.mov,.webm" 
            style={{ display: "none" }} 
          />
        </div>

        {/* Timeline / Progress Footer */}
        <div style={{ height: "120px", background: "#14151A", borderRadius: "12px", border: "1px solid #1E2028", padding: "16px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {(status === "processing" || status === "completed" || status === "error" || status === "uploading") ? (
            <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#FFF" }}>
                  {status === "error" ? "Processing Failed" : status === "completed" ? "Generation Complete" : currentPhase || "Initializing API..."}
                </span>
                {status === "completed" ? (
                  <button onClick={handleDownload} style={{ background: "transparent", border: "1px solid var(--color-text-success)", color: "var(--color-text-success)", padding: "4px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
                    Download Result
                  </button>
                ) : status === "error" ? (
                  <span style={{ color: "var(--color-text-danger)", fontSize: "12px" }}>{errorMsg}</span>
                ) : (
                  <span style={{ color: "var(--color-text-info)", fontSize: "13px", fontWeight: 600 }}>{Math.round(progress)}%</span>
                )}
              </div>
              
              <div style={{ width: "100%", height: "12px", background: "#1E2028", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: "100%", 
                  background: status === "completed" ? "var(--color-text-success)" : status === "error" ? "var(--color-text-danger)" : "var(--color-text-info)", 
                  transition: "width 0.3s ease",
                  position: "relative"
                }}>
                  {status === "processing" && (
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", animation: "shimmer 1.5s infinite" }}></div>
                  )}
                </div>
              </div>
            </div>
          ) : (
             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
               <div style={{ display: "flex", gap: "16px" }}>
                 <i className="ti ti-player-play" style={{ fontSize: "20px", cursor: "pointer" }}></i>
                 <i className="ti ti-player-track-next" style={{ fontSize: "20px", cursor: "pointer" }}></i>
               </div>
               <div style={{ flex: 1, margin: "0 24px", height: "40px", background: "repeating-linear-gradient(90deg, #1E2028, #1E2028 2px, transparent 2px, transparent 10px)", opacity: 0.5 }}></div>
               <div style={{ fontSize: "24px", fontWeight: 700, color: "#FFF", fontVariantNumeric: "tabular-nums" }}>00:00<span style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>:00</span></div>
             </div>
          )}
        </div>
        
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2A2D35; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3A3D45; }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}</style>
    </div>
  );
}
