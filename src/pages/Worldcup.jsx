import React from 'react';
import { Badge, Card, SectionTitle } from "../components/ui/index.jsx";
import { wcPhases } from "../data/strategicData.js";

export default function Worldcup({ setActive }) {
  return (
    <div>
            <SectionTitle>FIFA World Cup 2026 Execution Blueprint</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {wcPhases.map((p, i) => (
                <Card key={i} style={{ borderLeft: `3px solid var(--color-border-${p.color})`, margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{p.phase}</p>
                    <Badge color={p.color}>{p.period}</Badge>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 8px" }}><strong>Target Freq:</strong> {p.freq}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Priorities:</p>
                  <ul style={{ margin: "0 0 8px 16px", padding: 0, fontSize: 12, color: "var(--color-text-secondary)" }}>
                    {p.priorities.map((pr, j) => <li key={j}>{pr}</li>)}
                  </ul>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 4px" }}><strong>Audience:</strong> {p.audience}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-success)", margin: 0 }}><strong>Monetization:</strong> {p.monetization}</p>
                </Card>
              ))}
            </div>
          </div>
  );
}
