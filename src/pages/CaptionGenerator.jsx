import React, { useState, useRef } from "react";
import { Card, SectionTitle, Badge } from "../components/ui/index.jsx";

const CAPTION_STYLES = [
  { id: "hormozi", name: "Hormozi", desc: "Bold cyan highlights with thick outline" },
  { id: "mrbeast", name: "MrBeast", desc: "Yellow text with orange highlights" },
  { id: "karaoke", name: "Karaoke", desc: "Color wipe animation from left to right" },
  { id: "minimal", name: "Minimal", desc: "Subtle scaling effect with near-white highlights" },
  { id: "bounce", name: "Bounce", desc: "Playful bounce animation with bright colors" },
  { id: "classic", name: "Classic", desc: "Traditional yellow highlights with Anton font" },
];

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  color: "var(--color-text-primary)",
  background: "var(--color-background-secondary)",
  border: "0.5px solid var(--color-border-secondary)",
  borderRadius: "var(--border-radius-md)",
  padding: "8px 12px",
  outline: "none",
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--color-text-secondary)",
  textTransform: "uppercase",
  letterSpacing: ".04em",
  marginBottom: "6px",
  display: "block"
};

const Field = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%", marginBottom: "1rem" }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const buttonStyle = {
  padding: "10px 16px",
  fontSize: "13px",
  fontWeight: 500,
  background: "var(--color-background-info)",
  border: "1px solid var(--color-border-info)",
  borderRadius: "var(--border-radius-md)",
  cursor: "pointer",
  color: "var(--color-text-info)",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  justifyContent: "center",
  boxShadow: "var(--glow-info)",
  transition: "all 0.2s ease"
};

export default function CaptionGenerator() {
  const [file, setFile] = useState(null);
  const [style, setStyle] = useState("hormozi");
  const [position, setPosition] = useState(10);
  const [status, setStatus] = useState("idle"); // idle, uploading, processing, completed, error
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const fileInputRef = useRef(null);

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
      setErrorMsg(err.message || "Failed to connect to Python backend. Is it running?");
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
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      <SectionTitle>AI Caption Generation</SectionTitle>
      
      <Card>
        <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)", margin: "0 0 12px" }}>Upload Video & Configure Options</p>
        
        <Field label="Video File (.mp4, .mov, .webm)">
          <div 
            style={{ 
              border: "1px dashed var(--color-border-secondary)", 
              borderRadius: "var(--border-radius-lg)", 
              padding: "2rem", 
              textAlign: "center", 
              background: "var(--color-background-secondary)",
              cursor: "pointer",
              transition: "border-color 0.2s ease"
            }}
            onClick={() => fileInputRef.current?.click()}
            onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--color-border-info)"}
            onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--color-border-secondary)"}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".mp4,.mov,.webm" 
              style={{ display: "none" }} 
            />
            {file ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <i className="ti ti-file-check" style={{ fontSize: "32px", color: "var(--color-text-success)" }}></i>
                <span style={{ fontSize: "14px", color: "var(--color-text-primary)", fontWeight: 500 }}>{file.name}</span>
                <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <i className="ti ti-upload" style={{ fontSize: "32px", color: "var(--color-text-info)" }}></i>
                <span style={{ fontSize: "14px", color: "var(--color-text-primary)", fontWeight: 500 }}>Click to browse or drop a video file</span>
                <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>Max file size: 500MB</span>
              </div>
            )}
          </div>
        </Field>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <Field label="Caption Style">
            <select style={inputStyle} value={style} onChange={(e) => setStyle(e.target.value)}>
              {CAPTION_STYLES.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.desc}</option>
              ))}
            </select>
          </Field>
          
          <Field label={`Vertical Position: ${position}% from bottom`}>
            <input 
              type="range" 
              min="5" 
              max="50" 
              value={position} 
              onChange={(e) => setPosition(parseInt(e.target.value))}
              style={{ width: "100%", marginTop: "8px" }}
            />
          </Field>
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
          <button 
            style={{ ...buttonStyle, opacity: !file || status === "processing" || status === "uploading" ? 0.5 : 1, cursor: !file || status === "processing" || status === "uploading" ? "not-allowed" : "pointer" }} 
            onClick={handleProcess}
            disabled={!file || status === "processing" || status === "uploading"}
          >
            {status === "uploading" ? (
              <><i className="ti ti-loader" style={{ animation: "spin 2s linear infinite" }}></i> Uploading...</>
            ) : status === "processing" ? (
              <><i className="ti ti-loader" style={{ animation: "spin 2s linear infinite" }}></i> Processing...</>
            ) : (
              <><i className="ti ti-wand"></i> Generate Captions</>
            )}
          </button>
        </div>
      </Card>

      {(status === "processing" || status === "completed" || status === "error") && (
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-primary)", margin: 0 }}>Processing Status</p>
            {status === "completed" && <Badge color="success">Completed</Badge>}
            {status === "processing" && <Badge color="info">In Progress</Badge>}
            {status === "error" && <Badge color="danger">Failed</Badge>}
          </div>

          {status === "error" ? (
            <div style={{ background: "var(--color-background-danger)", border: "1px solid var(--color-border-danger)", padding: "12px 16px", borderRadius: "var(--border-radius-md)", color: "var(--color-text-danger)", fontSize: "13px" }}>
              <i className="ti ti-alert-circle" style={{ marginRight: "8px" }}></i>
              {errorMsg}
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "8px" }}>
                <span>{currentPhase || "Initializing..."}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div style={{ width: "100%", height: "8px", background: "var(--color-background-secondary)", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: status === "completed" ? "var(--color-text-success)" : "var(--color-text-info)", transition: "width 0.3s ease" }}></div>
              </div>
              
              {status === "completed" && (
                <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center" }}>
                  <button 
                    style={{ ...buttonStyle, background: "var(--color-background-success)", color: "var(--color-text-success)", borderColor: "var(--color-border-success)", boxShadow: "0 0 15px rgba(52, 211, 153, 0.2)" }} 
                    onClick={handleDownload}
                  >
                    <i className="ti ti-download"></i> Download Captioned Video
                  </button>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
