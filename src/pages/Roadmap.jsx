import React from 'react';
import { Badge, Card, SectionTitle } from "../components/ui/index.jsx";
import { competitors, ninetyDayPlan } from "../data/strategicData.js";

export default function Roadmap({ setActive }) {
  return (
    <div>
            <SectionTitle>90-Day Operator Roadmap</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {ninetyDayPlan.map((r, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{r.week}: {r.obj}</p>
                    <Badge color="info">{r.uploads} Uploads</Badge>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 4px" }}><strong>Research:</strong> {r.research}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px" }}><strong>Test:</strong> {r.test}</p>
                  <div style={{ background: "var(--color-background-success)", padding: "6px 10px", borderRadius: "var(--border-radius-md)", display: "inline-block" }}>
                    <p style={{ fontSize: 12, color: "var(--color-text-success)", margin: 0 }}><strong>Milestone:</strong> {r.milestone}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Card style={{ marginTop: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 8px", color: "var(--color-text-primary)" }}>Key success factors</p>
              {[
                "Post daily without exception, especially during World Cup 2026 (June–July) — this single window can add 2,000–10,000 subscribers in 8 weeks",
                "Solve copyright before you scale — one channel strike at 50K subs destroys years of work",
                "Treat Shorts as the top of funnel. Introduce 3–5 minute long-form videos by Month 4 to unlock 10–30x higher RPM",
                "Build the brand on Instagram and TikTok simultaneously — most football sponsorships require cross-platform reach",
                "Focus the US audience angle aggressively — this is your RPM advantage over UK/global competitors",
                "Never rely on ad revenue alone. Sponsorships and affiliates should match or exceed YouTube ad revenue within 12 months",
              ].map((f, i) => (
                <p key={i} style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "4px 0", paddingLeft: 12, borderLeft: "2px solid var(--color-border-success)" }}>{f}</p>
              ))}
            </Card>
          </div>
  );
}
