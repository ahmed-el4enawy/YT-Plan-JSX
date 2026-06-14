import React from 'react';
import { Badge, Card, SectionTitle, SubTitle } from "../components/ui/index.jsx";
import { tools } from "../data/strategicData.js";

export default function Production({ setActive }) {
  return (
    <div>
            <SectionTitle>Part 5 — Video Production System</SectionTitle>
            <SubTitle>Complete Production Workflow</SubTitle>
            {[
              { step: "01 — Research & Ideation", desc: "Daily: check Google Trends, VidIQ, BBC Sport, Sky Sports, Transfermarkt for trending topics. Use ChatGPT or Claude to generate 5 angle ideas per topic. Prioritise: breaking news > viral moments > evergreen stories. Use Airtable or Notion to log ideas with priority scores.", time: "30–45 min/day" },
              { step: "02 — Script Writing", desc: "Every Short needs a script even at 60 seconds. Structure: Hook (0–3 sec) → Context (3–15 sec) → Peak moment/revelation (15–40 sec) → Call to action (40–60 sec). Use ChatGPT with a custom system prompt trained on your best-performing scripts. Aim for 100–120 words per 60-second Short.", time: "15–20 min/video" },
              { step: "03 — Voiceover Recording", desc: "Use ElevenLabs (best quality) or Murf AI for AI voiceover. Choose an American English male or female voice with authority and energy. Record at 44.1kHz for best quality export. Always review the output and re-generate any mispronunciations. Build a consistent voice identity — don't switch voices between videos.", time: "10–15 min/video" },
              { step: "04 — Visual Assembly", desc: "Primary editor: CapCut for Shorts. Sequence: Voiceover track first → B-roll/images synced to narration → Text overlays for key stats/names → Music under (5–10 dB below voice) → Subtitles always on. Use licensed images (Getty, Adobe Stock) or AI-generated visuals (Adobe Firefly) for all backgrounds.", time: "20–40 min/video" },
              { step: "05 — Thumbnail Creation", desc: "Even Shorts benefit from thumbnails — they appear in search. Rules: one dominant face or action image, maximum 3 words of bold text, high contrast, consistent colour scheme. Create a template in Canva Pro. Use bright yellow/red text on dark background for football content — high CTR style.", time: "5–10 min/video" },
              { step: "06 — Upload & Optimisation", desc: "Title: keyword-rich, 50–60 chars, curiosity gap or number hook. Description: 2–3 sentences + hashtags + links to playlists and social accounts. Tags: 10–15 relevant tags using TubeBuddy. Hashtags: 3–5 in the description. Category: Sports. Chapters if applicable. Schedule for peak times: 12pm–3pm ET.", time: "10–15 min/video" },
              { step: "07 — Analytics Review", desc: "Weekly review (30 min): check CTR (target >5%), average view duration (target >60% for Shorts), subscriber conversion rate, and top 5 performing videos. Monthly review (2 hrs): identify content pillars performing best, adjust posting ratio accordingly. Track using YouTube Studio + VidIQ.", time: "30 min/week + 2 hrs/month" },
            ].map((s, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                  <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{s.step}</p>
                  <Badge color="info">{s.time}</Badge>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "8px 0 0", lineHeight: 1.7 }}>{s.desc}</p>
              </Card>
            ))}
            <SubTitle>Recommended Tools Stack</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
              {tools.map((t, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{t.name}</p>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Badge color={t.price === "Free" || t.price.includes("Free") ? "success" : "warning"}>{t.price}</Badge>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 4px" }}>{t.type}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{t.use}</p>
                </Card>
              ))}
            </div>
          </div>
  );
}
