import React from 'react';
import { Badge, Card, SectionTitle, SubTitle } from "../components/ui/index.jsx";
import { resources } from "../data/strategicData.js";

export default function Resources({ setActive }) {
  return (
    <div>
            <SectionTitle>Part 7 — Football Media Resource Database</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 8 }}>
              {resources.map((r, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{r.name}</p>
                    <Badge color={r.price === "Free" ? "success" : "warning"}>{r.price}</Badge>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{r.type}</span>
                    <span style={{ fontSize: 11, color: "var(--color-text-secondary)" }}>{r.rel}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{r.use}</p>
                </Card>
              ))}
            </div>
            <SubTitle>Additional Research Resources</SubTitle>
            {[
              { cat: "News Sources", items: ["BBC Sport bbc.com/sport", "Sky Sports skysports.com", "ESPN FC espn.com/soccer", "The Guardian football theguardian.com/football", "Fabrizio Romano (X/@FabrizioRomano)", "David Ornstein (X/@David_Ornstein)"] },
              { cat: "Statistics & Databases", items: ["FBref.com (StatsBomb-powered)", "Understat.com (xG data)", "SoccerReference.com", "11v11.com (historical results back to 1888)", "Worldfootball.net", "Soccerway.com"] },
              { cat: "Transfer Databases", items: ["Transfermarkt.com", "Capology.com (salary data)", "Football Transfers (footballtransfers.com)", "CIES Football Observatory (salary rankings)"] },
              { cat: "Sports APIs", items: ["SportMonks API (€25+/mo) — live data", "API-Football (RapidAPI — free tier available)", "OpenFootball (free, open source historical data)", "ESPN API (limited public access)", "Opta/Stats Perform (media contracts only)"] },
            ].map((cat, i) => (
              <Card key={i}>
                <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, color: "var(--color-text-primary)" }}>{cat.cat}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 4 }}>
                  {cat.items.map((item, j) => (
                    <p key={j} style={{ fontSize: 13, margin: 0, padding: "3px 0", color: "var(--color-text-secondary)", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>→ {item}</p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
  );
}
