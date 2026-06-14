import React from 'react';
import { Badge, Card, SectionTitle, SubTitle, CompetitorCard } from "../components/ui/index.jsx";
import { competitors } from "../data/strategicData.js";

export default function Competitors({ setActive }) {
  return (
    <div>
            <SectionTitle>Part 3 — Competitor Analysis</SectionTitle>
            <SubTitle>Top 10 YouTube Competitors</SubTitle>
            {competitors.map((ch, i) => <CompetitorCard key={i} ch={ch} />)}
            <SubTitle>Top Instagram Accounts to Study</SubTitle>
            {[
              { user: "@goal", followers: "52M+", style: "Highlight clips, transfer news graphics, breaking news Stories", lesson: "Their transfer news graphic template is shared millions of times — create your own visual template system" },
              { user: "@championsleague", followers: "100M+", style: "Official match clips, player celebrations, draw ceremonies", lesson: "Timing is everything — post within minutes of key moments" },
              { user: "@premierleague", followers: "75M+", style: "Clip reels, player of the week, official stats", lesson: "Consistent visual identity and posting rhythm builds massive trust" },
              { user: "@espnfc", followers: "20M+", style: "US-framed football analysis, reactions, debate graphics", lesson: "The US audience responds to debate-style content and sports talk format" },
              { user: "@433", followers: "50M+", style: "Pure viral football moments, skills, funny moments", lesson: "Simple, consistent format with no commentary performs extremely well — proof that raw moments travel" },
              { user: "@b_r_football", followers: "14M+", style: "Bleacher Report football — editorial graphics, transfer news, stats", lesson: "High-quality graphic templates and consistent brand voice builds media authority" },
              { user: "@caughtoffside", followers: "2M+", style: "Fan-first content, transfer rumours, opinion pieces", lesson: "Engaged communities will come to you for information if you build a reputation for accuracy" },
              { user: "@theathleticfc", followers: "1.5M+", style: "Editorial football journalism reposted as short clips", lesson: "Quality > quantity. Even 3 posts per week at high quality outperforms 21 low-effort posts" },
              { user: "@talksport", followers: "5M+", style: "UK-centric radio clips, debate bites, controversy reactions", lesson: "Audio-first content (radio clips) works on Instagram — consider repurposing your own commentary" },
              { user: "@footballdaily", followers: "3M+", style: "Football culture, facts, fan content, memes", lesson: "Meme and fan culture content gets enormous organic reach — include one meme/fan post per week" },
            ].map((acc, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{acc.user}</p>
                  <Badge color="info">{acc.followers}</Badge>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>{acc.style}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-primary)", margin: 0 }}><span style={{ fontWeight: 500 }}>Key lesson:</span> {acc.lesson}</p>
              </Card>
            ))}
          </div>
  );
}
