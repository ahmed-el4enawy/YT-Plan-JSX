import React from 'react';
import { Badge, Card, SectionTitle, SubTitle } from "../components/ui/index.jsx";
import { retentionTechniques, storyStructureV2 } from "../data/strategicData.js";

export default function Scripting({ setActive }) {
  return (
    <div>
            <SectionTitle>Script Engineering & Structure</SectionTitle>
            <SubTitle>Story Structure Framework</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {storyStructureV2.map((s, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{s.stage}</p>
                    <Badge color="info">{s.time}</Badge>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>{s.purpose}</p>
                </Card>
              ))}
            </div>
            <SubTitle>Retention Engineering</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
              {retentionTechniques.map((t, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <p style={{ fontWeight: 500, fontSize: 13, margin: 0, color: "var(--color-text-primary)" }}>{t.name}</p>
                    <Badge color="success">{t.metric}</Badge>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{t.desc}</p>
                </Card>
              ))}
            </div>
          </div>
  );
}
