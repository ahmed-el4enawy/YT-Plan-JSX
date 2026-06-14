import React from 'react';
import { Badge, Card, SectionTitle, SubTitle } from "../components/ui/index.jsx";
import { copyrightInfo } from "../data/strategicData.js";

export default function Copyright({ setActive }) {
  return (
    <div>
            <SectionTitle>Part 6 — Copyright & Fair Use</SectionTitle>
            <div style={{ background: "var(--color-background-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-danger)", margin: "0 0 6px" }}>Critical Warning</p>
              <p style={{ fontSize: 13, color: "var(--color-text-danger)", margin: 0 }}>Using Premier League, Champions League, La Liga, Serie A, or Bundesliga footage without a licence WILL result in Content ID claims, loss of monetisation, and possible channel strikes. This is the #1 risk for football YouTube channels. Build your strategy around this reality from Day 1.</p>
            </div>
            {copyrightInfo.map((c, i) => (
              <Card key={i}>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 8px", color: "var(--color-text-primary)" }}>{c.topic}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>{c.content}</p>
              </Card>
            ))}
            <SubTitle>Legal Sources for Football Content</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
              {[
                { source: "FIFA Official YouTube", type: "Video", price: "Free (WC 2026 archive unlocked via FIFA–YouTube deal)", use: "Historical World Cup matches, press conferences, official event footage" },
                { source: "Archive.org (Internet Archive)", type: "Video", price: "Free", use: "Historical football footage from pre-1980s, public domain matches, early World Cups" },
                { source: "Wikimedia Commons", type: "Images/Video", price: "Free (CC-licensed)", use: "Licensed football photography, stadium images, historical player photos" },
                { source: "Getty Images Sport", type: "Images", price: "$30–150/mo subscription", use: "Professional match photography for thumbnails and visual content — legally cleared" },
                { source: "AP Images", type: "Images/Video", price: "License per use", use: "Press photography and short video clips from AP Sports reporters" },
                { source: "Alamy Sport", type: "Images", price: "Per image ($20–50)", use: "Licensed sports photography, good archive depth" },
                { source: "Pixabay / Pexels", type: "Images/Video", price: "Free (CC0)", use: "Generic sports backgrounds, crowd shots, stadium atmosphere (not specific games)" },
                { source: "Adobe Firefly", type: "AI-generated images", price: "Free/paid tier", use: "Generate original football visuals — zero copyright risk" },
                { source: "YouTube Audio Library", type: "Music", price: "Free", use: "Copyright-free music for all video content" },
                { source: "Artlist.io", type: "Music", price: "$199/year", use: "Best licensed music library for sports content, covers all platforms" },
                { source: "Epidemic Sound", type: "Music", price: "$15/mo", use: "High-quality sports-suitable music, YouTube Content ID cleared" },
                { source: "Club Official Channels", type: "Video", price: "Free", use: "Most clubs post official training clips, press conferences, player interviews — freely shareable" },
                { source: "National Team Official Channels", type: "Video", price: "Free", use: "FIFA member associations post official content — check each federation's terms" },
                { source: "Storyful Sport", type: "Video", price: "Licensing", use: "Verified viral sports moments, licensed for media use" },
                { source: "Shutterstock Editorial Sport", type: "Images/Video", price: "$49–249/mo", use: "Editorial sports licensing, covers most uses for digital media" },
              ].map((s, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{s.source}</p>
                    <Badge color={s.price === "Free" || s.price.startsWith("Free") ? "success" : "warning"}>{s.type}</Badge>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 4px" }}>{s.price}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{s.use}</p>
                </Card>
              ))}
            </div>
          </div>
  );
}
