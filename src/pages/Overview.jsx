import React from 'react';
import { Card, SectionTitle, SubTitle, MetricGrid } from "../components/ui/index.jsx";
import { sectionGroups } from "../data/strategicData.js";

export default function Overview({ setActive }) {
  return (
    <div>
            <SectionTitle>Executive Summary — Master Strategic Brief</SectionTitle>
            <Card style={{ background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-info)", margin: "0 0 6px" }}>Mission Statement</p>
              <p style={{ fontSize: 13, color: "var(--color-text-info)", margin: 0, lineHeight: 1.7 }}>Build Ninety Football into a category-leading football media brand capable of achieving massive scale before, during, and after the FIFA World Cup 2026 — generating tens of millions of annual views, a highly engaged US-first audience, premium RPM, and diversified revenue streams that sustain long-term growth.</p>
            </Card>
            <MetricGrid metrics={[
              { label: "Primary Market", value: "United States", sub: "Highest RPM geography" },
              { label: "Business Model", value: "Media Brand", sub: "Shorts → Long-form → Products" },
              { label: "World Cup Search Spike", value: "400–800%", sub: "vs normal periods" },
              { label: "Target: Year 1", value: "70K subs", sub: "$3K–$6K/mo revenue" },
              { label: "Shorts RPM (US)", value: "$0.05–0.15", sub: "Per 1,000 views" },
              { label: "Timeline to 100K", value: "12–18 mo", sub: "With daily posting" },
            ]} />
            <SubTitle>Strategic Framework — 17 Sections</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 6, marginBottom: "1.5rem" }}>
              {sectionGroups.map(g => (
                <Card key={g.group} style={{ margin: 0 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{g.group}</p>
                  {g.items.filter(s => s.id !== "overview").map(s => (
                    <button key={s.id} onClick={() => setActive(s.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "4px 8px", fontSize: 12, cursor: "pointer", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-primary)", marginBottom: 4 }}>
                      <i className={`ti ${s.icon}`} style={{ marginRight: 6, fontSize: 12 }} aria-hidden="true" />{s.label}
                    </button>
                  ))}
                </Card>
              ))}
            </div>
            <div style={{ background: "var(--color-background-warning)", border: "0.5px solid var(--color-border-warning)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-warning)", margin: "0 0 6px" }}> World Cup 2026 — Critical Timing Window</p>
              <p style={{ fontSize: 13, color: "var(--color-text-warning)", margin: 0 }}>The FIFA World Cup 2026 is in progress NOW (June–July 2026), hosted across USA/Canada/Mexico. YouTube is an official FIFA Preferred Platform. This is the single largest traffic opportunity in football content for the next 4 years. Every day of delay is lost traffic, subscribers, and revenue.</p>
            </div>
            <SubTitle>Company Overview</SubTitle>
            <Card>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Brand", "Ninety Football"], ["Model", "Football-first digital media brand"], ["Primary Platform", "YouTube Shorts → Long-form"], ["Primary Market", "United States"], ["Secondary Markets", "Canada, UK, Australia, Europe"], ["Tertiary", "Global English-speaking audience"]].map(([k, v], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", fontSize: 13 }}>
                    <span style={{ color: "var(--color-text-tertiary)" }}>{k}</span>
                    <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{v}</span>
                  </div>
                ))}
              </div>
            </Card>
            <SubTitle>Core Objectives</SubTitle>
            {["Generate tens of millions of annual views across multiple platforms", "Build a highly engaged, returning audience with >30% returning viewer rate", "Maximize retention and subscriber conversion through narrative-driven content", "Achieve premium RPM by targeting US audience and high-value advertiser categories", "Create evergreen content assets that compound traffic over years", "Build a defensible media brand that remains relevant beyond the World Cup 2026 cycle"].map((f, i) => (
              <p key={i} style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "4px 0", paddingLeft: 12, borderLeft: "2px solid var(--color-border-info)" }}>{f}</p>
            ))}
          </div>
  );
}
