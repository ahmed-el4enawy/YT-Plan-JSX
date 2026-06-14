import React from 'react';
import { Badge, Card, SectionTitle } from "../components/ui/index.jsx";
import { publishingPhases } from "../data/strategicData.js";

export default function Publishing({ setActive }) {
  return (
    <div>
            <SectionTitle>Publishing & Scaling Strategy</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {publishingPhases.map((p, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                    <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{p.phase}</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Badge color="info">{p.period}</Badge>
                      <Badge color="success">{p.uploads}</Badge>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}><strong>Focus:</strong> {p.focus}</p>
                  <p style={{ fontSize: 13, color: "var(--color-text-warning)", margin: "0 0 8px" }}><strong>Triggers:</strong> {p.triggers}</p>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Actions:</p>
                  <ul style={{ margin: "0 0 0 16px", padding: 0, fontSize: 12, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    {p.actions.map((a, j) => <li key={j}>{a}</li>)}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
  );
}
