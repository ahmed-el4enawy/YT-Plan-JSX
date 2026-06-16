export default function StandaloneCaptionIframe() {
  return (
    <div style={{ width: "100%", height: "100vh", padding: 0, margin: 0 }}>
      <iframe 
        src="http://localhost:3000" 
        style={{ width: "100%", height: "100%", border: "none", borderRadius: "12px" }}
        title="AI Caption Studio"
        allow="microphone; camera; clipboard-read; clipboard-write"
      />
    </div>
  );
}
