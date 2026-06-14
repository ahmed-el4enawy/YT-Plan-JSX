import React from 'react';
import { Badge, Card, SectionTitle, IdeaList } from "../components/ui/index.jsx";
import { viralIdeas, worldCupIdeas, evergreenIdeas, contentPillarsV2, distributionStrategy } from "../data/strategicData.js";

export default function Content({ setActive }) {
  return (
    <div>
            <SectionTitle>Content Architecture Pillars</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
              {contentPillarsV2.map((p, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{p.name}</p>
                    <Badge color={p.share.includes("35") ? "success" : p.share.includes("20") ? "info" : "warning"}>{p.share}</Badge>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px" }}><strong>Focus Areas:</strong> {p.focus}</p>
                  <div style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 12px" }}>
                    <p style={{ fontSize: 12, color: "var(--color-text-primary)", margin: 0 }}><strong>Objective:</strong> {p.objective}</p>
                  </div>
                </Card>
              ))}
            </div>
            <Card style={{ marginTop: "1.5rem", marginBottom: "1.5rem", background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-info)", margin: "0 0 6px" }}>Distribution Strategy</p>
              <p style={{ fontSize: 13, color: "var(--color-text-info)", margin: "0 0 8px" }}>{distributionStrategy.approach}</p>
              <div style={{ display: "flex", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-info)", margin: "0 0 4px", opacity: 0.8 }}>PRIMARY</p>
                  {distributionStrategy.primary.map((p, j) => <div key={j} style={{ fontSize: 12, color: "var(--color-text-info)" }}>• {p}</div>)}
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-info)", margin: "0 0 4px", opacity: 0.8 }}>EXPANSION</p>
                  {distributionStrategy.expansion.map((e, j) => <div key={j} style={{ fontSize: 12, color: "var(--color-text-info)" }}>• {e}</div>)}
                </div>
              </div>
            </Card>
            <IdeaList title="50 Viral Football Shorts Ideas" ideas={viralIdeas} color="info" />
            <IdeaList title="50 World Cup 2026 Content Ideas" ideas={worldCupIdeas} color="success" />
            <IdeaList title="50 Evergreen Football Ideas" ideas={evergreenIdeas} color="warning" />
            <IdeaList
              title="50 Football Storytelling / Documentary Short Ideas"
              color="danger"
              ideas={[
                "The rise and fall of Ronaldinho", "How Messi nearly left Barcelona at 14", "The night Leicester City changed English football", "The goalkeeper who became a president",
                "How Wenger transformed Arsenal with diet and science", "The African country that almost won the World Cup", "The referee who was paid to fix a World Cup final",
                "How the Bosman ruling destroyed football clubs overnight", "The striker who scored 100 goals and died at 29", "The club that went from the Conference to the Premier League",
                "How Qatar changed football forever with money", "The manager who was sacked after winning the league", "The youth player sold for $300 who became a world star",
                "The 1994 World Cup and the penalty that ended a career", "How Abramovich took over Chelsea and what happened next",
                "The player who played with a broken leg for 60 minutes", "The agent who made $50M on one transfer", "The academy town where more professionals were born than anywhere else",
                "The footballer turned drug lord — and what happened", "The night Heysel changed football safety forever",
                "How the Champions League anthem was created", "The manager who built 3 clubs from nothing",
                "Why Romelu Lukaku's story is the definition of resilience", "The World Cup ball that was described as terrible by every goalkeeper",
                "How the Premier League laundered its way to global dominance", "The forgotten player who invented the bicycle kick",
                "The club banned from European football and why", "The 13-year-old who played in the top flight",
                "How Jurgen Klopp built the greatest pressing team in history", "The player who retired at 19 because of anxiety — and came back",
                "The story of IFK Gothenburg's back-to-back UEFA Cup wins", "How AZ Alkmaar shocked the world and then collapsed",
                "The forgotten 1970 Brazil squad — the best team never to defend a title", "When a stadium fire changed football safety forever",
                "The Dutch footballers who defied apartheid", "How Man City went from bankruptcy to billionaires",
                "The overnight rise of Saudi Pro League — good or bad for football?", "How clubs use analytics to find $10M players for $1M",
                "The forgotten women's team that was banned for 50 years", "How Gary Lineker never got a yellow card in his career",
                "The complete story of the Hillsborough disaster and justice", "How football became the world's most watched sport",
                "The physio who saved a player's career with one decision", "The 90s Italian football scandal nobody talks about anymore",
                "The 24-hour life of a Premier League groundskeeper", "How scouting AI is replacing traditional football scouts",
                "The story of the world's first professional football club", "The player who donated his entire salary to his village",
                "How the UEFA Financial Fair Play rules changed everything", "The night Diego Maradona scored the two most famous goals in history",
              ]}
            />
          </div>
  );
}
