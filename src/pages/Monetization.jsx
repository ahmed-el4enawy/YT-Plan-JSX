import React from 'react';
import { Badge, Card, SectionTitle, SubTitle } from "../components/ui/index.jsx";
import { monRoadmap } from "../data/strategicData.js";

export default function Monetization({ setActive }) {
  return (
    <div>
            <SectionTitle>Monetisation & Revenue Architecture</SectionTitle>
            {monRoadmap.map((m, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 15, margin: "0 0 4px", color: "var(--color-text-primary)" }}>{m.milestone}</p>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Badge color="info">{m.timeframe}</Badge>
                      <Badge color="success">{m.revenue}</Badge>
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 6 }}>
                  {m.strategies.map((s, j) => (
                    <p key={j} style={{ fontSize: 13, margin: 0, padding: "4px 8px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", color: "var(--color-text-primary)", borderLeft: "2px solid var(--color-border-info)" }}>→ {s}</p>
                  ))}
                </div>
              </Card>
            ))}
            <SubTitle>Revenue Stream Overview</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
              {[
                { stream: "YouTube Shorts Ad Revenue", potential: "$50–$5,000/mo", timeline: "Month 3+ (post-YPP)", note: "Scale with view volume, US audience boosts RPM" },
                { stream: "YouTube Long-form RPM", potential: "$200–$15,000/mo", timeline: "Month 6+", note: "Create 3–5 min videos alongside Shorts for 10–30x higher RPM" },
                { stream: "Brand Sponsorships", potential: "$300–$20,000/deal", timeline: "5K+ subs", note: "Football boots, sportswear, sports betting (geo-compliant), streaming services, football apps" },
                { stream: "Affiliate Marketing", potential: "$100–$2,000/mo", timeline: "Month 2+", note: "Amazon (football gear), DAZN, ESPN+, football betting affiliates ($50–200 CPA)" },
                { stream: "Channel Memberships", potential: "$500–$5,000/mo", timeline: "50K+ subs", note: "Community access, early access, discord, exclusive analysis" },
                { stream: "Digital Products", potential: "$200–$3,000/mo", timeline: "Month 6+", note: "Football quiz packs, betting tips subscriptions, football history ebooks ($5–$25)" },
                { stream: "Merchandise", potential: "$500–$8,000/mo", timeline: "100K+ subs", note: "Print-on-demand: football tees, hoodies, mugs. Use Printful + Shopify or Merch by Amazon" },
                { stream: "Content Licensing", potential: "$1,000–$20,000/deal", timeline: "100K+ subs, original content", note: "License your original documentaries and stories to other media platforms" },
              ].map((s, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <p style={{ fontWeight: 500, fontSize: 13, margin: "0 0 4px", color: "var(--color-text-primary)" }}>{s.stream}</p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-info)", margin: "0 0 4px" }}>{s.potential}</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 6px" }}>Active from: {s.timeline}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{s.note}</p>
                </Card>
              ))}
            </div>
          </div>
  );
}
