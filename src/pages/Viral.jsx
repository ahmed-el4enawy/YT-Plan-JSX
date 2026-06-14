import React from 'react';
import { Card, SectionTitle, SubTitle } from "../components/ui/index.jsx";
import { hookCategories } from "../data/strategicData.js";

export default function Viral({ setActive }) {
  return (
    <div>
            <SectionTitle>Viral Intelligence & Hooks</SectionTitle>
            <SubTitle>The Idea Machine Workflow</SubTitle>
            <Card>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.7, margin: 0 }}>
                Virality is engineered, not accidental. Build an Airtable/Notion database to track ideas.
                <br/><br/>
                <strong>Trend Detection:</strong> Monitor Twitter/X for breaking football drama. Check Reddit (r/soccer) for highly upvoted obscure facts. Use Google Trends for rising player names.
                <br/><br/>
                <strong>Idea Scoring Model:</strong> Score every idea 1-10 on (1) Broad Appeal, (2) Emotional Weight, (3) Visual Potential. Only produce 24+ scoring ideas.
              </p>
            </Card>
            <SubTitle>Viral Hook Library</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {hookCategories.map((h, i) => (
                <Card key={i} style={{ borderLeft: `3px solid var(--color-border-${h.color})`, margin: 0 }}>
                  <p style={{ fontWeight: 500, fontSize: 15, margin: "0 0 4px", color: "var(--color-text-primary)" }}>{h.type}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 10px" }}><strong>Psychology:</strong> {h.psychology}</p>
                  <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 12px" }}>
                    {h.hooks.map((hook, j) => (
                      <p key={j} style={{ fontSize: 13, color: "var(--color-text-primary)", margin: "4px 0" }}>• {hook}</p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
  );
}
