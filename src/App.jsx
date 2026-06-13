import { useState } from "react";
import { Badge, Card, SectionTitle, SubTitle, MetricGrid, IdeaList, CompetitorCard } from "./components/ui/index.jsx";
import PromptSuite from "./components/PromptSuite.jsx";
import { sectionGroups, competitors, viralIdeas, worldCupIdeas, evergreenIdeas, tools, resources, publishingPhases, hookCategories, retentionTechniques, wcPhases, kpis, ninetyDayPlan, contentPillarsV2, storyStructureV2, distributionStrategy } from "./data/strategicData.js";





export default function NinetyFootball() {
  const [active, setActive] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  


  

  

  


  

  

  const copyrightInfo = [
    { topic: "Fair Use Basics", content: "Fair Use (US law) allows limited use of copyrighted material for commentary, criticism, education, or transformative works. For football content, this means: brief clips with substantial commentary may qualify, but raw highlight compilations without transformation do NOT qualify. Fair use is a legal defense, not a guaranteed right." },
    { topic: "YouTube Content ID", content: "Most professional football footage (Premier League, Champions League, La Liga, etc.) is registered with YouTube's Content ID system. Using even 3 seconds of PL footage will trigger an automatic claim — your monetisation goes to the rights holder. The key practical rule: avoid all live match footage from top leagues unless licensed." },
    { topic: "Safe Content Types", content: "Maximum copyright safety: AI-generated visuals, original commentary over static images, licensed Getty images, data visualisations and graphics, historic footage from pre-1928 (public domain), press conference clips (usually freely available), your own original filming." },
    { topic: "Football Footage Risks", content: "HIGHEST RISK: Premier League, Champions League, La Liga, Serie A, Bundesliga clips. These rights holders are highly aggressive with Content ID and takedowns. MEDIUM RISK: International friendlies, lower leagues. LOWER RISK: Women's football, futsal, beach football, non-league. SAFE: Press conferences, training ground clips published by clubs officially." },
    { topic: "The 'Reused Content' Policy", content: "YouTube has a separate 'reused content' monetisation policy. Channels that primarily compile others' content without transformative commentary risk demonetisation even if individual claims are cleared. Build original value into every video: unique narration, research, graphics, your own analysis." },
    { topic: "Best Legal Strategy", content: "1) Use AI-generated or original visuals as primary content. 2) Use officially released club/federation clips. 3) License footage from Getty Sport or AP Images when budget allows. 4) Build a library of public domain historical football footage from archive.org. 5) Always add significant original voiceover, analysis, and graphics as transformation." },
  ];


  const monRoadmap = [
    { milestone: "0–1,000 subscribers", timeframe: "Month 1–3", revenue: "$0–$50/mo", strategies: ["Focus entirely on views/reach, not revenue", "Build social following to complement YouTube", "Test content formats relentlessly", "Set up affiliate links in description (Football boots, gear) ready for YPP"] },
    { milestone: "1,000–10,000 subscribers", timeframe: "Month 3–6", revenue: "$50–$500/mo", strategies: ["YPP active — Shorts pool revenue starts", "Affiliate marketing: boots, streaming services, football apps", "First brand deal possible at 5K+ subs ($50–$300 per sponsored Short)", "Digital product opportunity: football quiz/ebook ($5–$15)"] },
    { milestone: "10,000–100,000 subscribers", timeframe: "Month 6–14", revenue: "$500–$8,000/mo", strategies: ["Consistent YPP Shorts revenue at scale", "Brand deals: $300–$2,500 per sponsored Short", "Channel memberships launch ($2.99–$9.99/mo)", "Affiliate income: sports betting sites ($50–$200 CPA), streaming subs", "Merchandise: print-on-demand football tees, mugs (Printful/Merch by Amazon)"] },
    { milestone: "100,000–1,000,000 subscribers", timeframe: "Month 14–30+", revenue: "$5,000–$50,000/mo", strategies: ["RPM boost with dedicated US audience", "Major brand deals ($2,000–$20,000 per video)", "Agency representation for sponsorships", "Own e-commerce (football merchandise line)", "Subscription newsletter or membership community ($5–$25/mo)", "Licensing your original content to other media companies"] },
  ];

  const renderSection = () => {
    switch (active) {
      case "overview":
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
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-warning)", margin: "0 0 6px" }}>⚡ World Cup 2026 — Critical Timing Window</p>
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

      case "competitors":
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

      case "content":
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

      case "publishing":
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

      case "viral":
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

      case "scripting":
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

      case "production":
        return (
          <div>
            <SectionTitle>Part 5 — Video Production System</SectionTitle>
            <SubTitle>Complete Production Workflow</SubTitle>
            {[
              { step: "01 — Research & Ideation", desc: "Daily: check Google Trends, VidIQ, BBC Sport, Sky Sports, Transfermarkt for trending topics. Use ChatGPT or Claude to generate 5 angle ideas per topic. Prioritise: breaking news > viral moments > evergreen stories. Use Airtable or Notion to log ideas with priority scores.", time: "30–45 min/day" },
              { step: "02 — Script Writing", desc: "Every Short needs a script even at 60 seconds. Structure: Hook (0–3 sec) → Context (3–15 sec) → Peak moment/revelation (15–40 sec) → Call to action (40–60 sec). Use ChatGPT with a custom system prompt trained on your best-performing scripts. Aim for 100–120 words per 60-second Short.", time: "15–20 min/video" },
              { step: "03 — Voiceover Recording", desc: "Use ElevenLabs (best quality) or Murf AI for AI voiceover. Choose an American English male or female voice with authority and energy. Record at 44.1kHz for best quality export. Always review the output and re-generate any mispronunciations. Build a consistent voice identity — don't switch voices between videos.", time: "10–15 min/video" },
              { step: "04 — Visual Assembly", desc: "Primary editor: CapCut for Shorts. Sequence: Voiceover track first → B-roll/images synced to narration → Text overlays for key stats/names → Music under (5–10 dB below voice) → Subtitles always on. Use licensed images (Getty, Adobe Stock) or AI-generated visuals (Adobe Firefly) for all backgrounds.", time: "20–40 min/video" },
              { step: "05 — Thumbnail Creation", desc: "Even Shorts benefit from thumbnails — they appear in search. Rules: one dominant face or action image, maximum 3 words of bold text, high contrast, consistent colour scheme. Create a template in Canva Pro. Use bright yellow/red text on dark background for football content — high CTR style.", time: "5–10 min/video" },
              { step: "06 — Upload & Optimisation", desc: "Title: keyword-rich, 50–60 chars, curiosity gap or number hook. Description: 2–3 sentences + hashtags + links to playlists and social accounts. Tags: 10–15 relevant tags using TubeBuddy. Hashtags: 3–5 in the description. Category: Sports. Chapters if applicable. Schedule for peak times: 12pm–3pm ET.", time: "10–15 min/video" },
              { step: "07 — Analytics Review", desc: "Weekly review (30 min): check CTR (target >5%), average view duration (target >60% for Shorts), subscriber conversion rate, and top 5 performing videos. Monthly review (2 hrs): identify content pillars performing best, adjust posting ratio accordingly. Track using YouTube Studio + VidIQ.", time: "30 min/week + 2 hrs/month" },
            ].map((s, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 6 }}>
                  <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{s.step}</p>
                  <Badge color="info">{s.time}</Badge>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "8px 0 0", lineHeight: 1.7 }}>{s.desc}</p>
              </Card>
            ))}
            <SubTitle>Recommended Tools Stack</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
              {tools.map((t, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{t.name}</p>
                    <div style={{ display: "flex", gap: 4 }}>
                      <Badge color={t.price === "Free" || t.price.includes("Free") ? "success" : "warning"}>{t.price}</Badge>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 4px" }}>{t.type}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{t.use}</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case "promptsuite":
        return <PromptSuite />;

      case "copyright":
        return (
          <div>
            <SectionTitle>Part 6 — Copyright & Fair Use</SectionTitle>
            <div style={{ background: "var(--color-background-danger)", border: "0.5px solid var(--color-border-danger)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-danger)", margin: "0 0 6px" }}>Critical Warning</p>
              <p style={{ fontSize: 13, color: "var(--color-text-danger)", margin: 0 }}>Using Premier League, Champions League, La Liga, Serie A, or Bundesliga footage without a licence WILL result in Content ID claims, loss of monetisation, and possible channel strikes. This is the #1 risk for football YouTube channels. Build your strategy around this reality from Day 1.</p>
            </div>
            {copyrightInfo.map((c, i) => (
              <Card key={i}>
                <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 8px", color: "var(--color-text-primary)" }}>{c.topic}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.7 }}>{c.content}</p>
              </Card>
            ))}
            <SubTitle>Legal Sources for Football Content</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
              {[
                { source: "FIFA Official YouTube", type: "Video", price: "Free (WC 2026 archive unlocked via FIFA–YouTube deal)", use: "Historical World Cup matches, press conferences, official event footage" },
                { source: "Archive.org (Internet Archive)", type: "Video", price: "Free", use: "Historical football footage from pre-1980s, public domain matches, early World Cups" },
                { source: "Wikimedia Commons", type: "Images/Video", price: "Free (CC-licensed)", use: "Licensed football photography, stadium images, historical player photos" },
                { source: "Getty Images Sport", type: "Images", price: "$30–150/mo subscription", use: "Professional match photography for thumbnails and visual content — legally cleared" },
                { source: "AP Images", type: "Images/Video", price: "License per use", use: "Press photography and short video clips from AP Sports reporters" },
                { source: "Alamy Sport", type: "Images", price: "Per image ($20–50)", use: "Licensed sports photography, good archive depth" },
                { source: "Pixabay / Pexels", type: "Images/Video", price: "Free (CC0)", use: "Generic sports backgrounds, crowd shots, stadium atmosphere (not specific games)" },
                { source: "Adobe Firefly", type: "AI-generated images", price: "Free/paid tier", use: "Generate original football visuals — zero copyright risk" },
                { source: "YouTube Audio Library", type: "Music", price: "Free", use: "Copyright-free music for all video content" },
                { source: "Artlist.io", type: "Music", price: "$199/year", use: "Best licensed music library for sports content, covers all platforms" },
                { source: "Epidemic Sound", type: "Music", price: "$15/mo", use: "High-quality sports-suitable music, YouTube Content ID cleared" },
                { source: "Club Official Channels", type: "Video", price: "Free", use: "Most clubs post official training clips, press conferences, player interviews — freely shareable" },
                { source: "National Team Official Channels", type: "Video", price: "Free", use: "FIFA member associations post official content — check each federation's terms" },
                { source: "Storyful Sport", type: "Video", price: "Licensing", use: "Verified viral sports moments, licensed for media use" },
                { source: "Shutterstock Editorial Sport", type: "Images/Video", price: "$49–249/mo", use: "Editorial sports licensing, covers most uses for digital media" },
              ].map((s, i) => (
                <Card key={i} style={{ margin: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{s.source}</p>
                    <Badge color={s.price === "Free" || s.price.startsWith("Free") ? "success" : "warning"}>{s.type}</Badge>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "0 0 4px" }}>{s.price}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{s.use}</p>
                </Card>
              ))}
            </div>
          </div>
        );

      case "resources":
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

      case "worldcup":
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

      case "kpis":
        return (
          <div>
            <SectionTitle>Performance KPI Dashboard</SectionTitle>
            <Card>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border-secondary)" }}>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-primary)" }}>Metric</th>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-secondary)" }}>Description</th>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-danger)" }}>Poor</th>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-warning)" }}>Avg</th>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-info)" }}>Good</th>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-success)" }}>Elite</th>
                      <th style={{ padding: "8px 4px", color: "var(--color-text-primary)" }}>World-Class</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpis.map((k, i) => (
                      <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-primary)", fontWeight: 500 }}>{k.metric}</td>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-secondary)" }}>{k.desc}</td>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-danger)" }}>{k.poor}</td>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-warning)" }}>{k.avg}</td>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-info)" }}>{k.good}</td>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-success)" }}>{k.elite}</td>
                        <td style={{ padding: "8px 4px", color: "var(--color-text-primary)", fontWeight: 500 }}>{k.worldClass}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );

      case "monetization":
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

      case "roadmap":
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


      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "transparent" }}>
      <h2 className="sr-only">Ninety Football — Master Strategic Brief</h2>
      <nav className={isSidebarOpen ? "" : "nav-collapsed"} style={{ 
        width: isSidebarOpen ? 240 : 70, 
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0, 
        background: "var(--color-background-primary)", 
        borderRight: "0.5px solid var(--color-border-tertiary)", 
        padding: "1rem", 
        position: "sticky", 
        top: 0, 
        height: "100vh", 
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem"
      }}>
        <div style={{ display: "flex", justifyContent: isSidebarOpen ? "flex-end" : "center", marginBottom: "0.5rem", flexShrink: 0 }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-secondary)", cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--border-radius-md)", transition: "all 0.2s" }} onMouseOver={e => { e.currentTarget.style.background = "var(--color-background-tertiary)"; e.currentTarget.style.color = "var(--color-text-primary)"; }} onMouseOut={e => { e.currentTarget.style.background = "var(--color-background-secondary)"; e.currentTarget.style.color = "var(--color-text-secondary)"; }}>
            <i className={`ti ${isSidebarOpen ? "ti-chevron-left" : "ti-chevron-right"}`} style={{ fontSize: 18 }} />
          </button>
        </div>
        
        <div style={{ 
          borderBottom: isSidebarOpen ? "0.5px solid var(--color-border-tertiary)" : "none", 
          paddingBottom: isSidebarOpen ? "1rem" : 0,
          marginBottom: "0.5rem", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          opacity: isSidebarOpen ? 1 : 0,
          maxHeight: isSidebarOpen ? "400px" : "0px",
          transition: "all 0.3s ease",
          overflow: "hidden",
          flexShrink: 0
        }}>
          <img src="/Ninety-Football-Logo.png" alt="Ninety Football Logo" style={{ width: "80%", maxWidth: "150px", marginBottom: "0.75rem", borderRadius: "var(--border-radius-md)", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }} />
          <p style={{ fontWeight: 600, fontSize: 15, margin: 0, color: "var(--color-text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Ninety Football</p>
          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>Master Strategic Brief</p>
        </div>

        {sectionGroups.map(g => (
          <div key={g.group} style={{ marginTop: "0.5rem" }}>
            {isSidebarOpen ? (
              <p style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", padding: "4px 8px 8px", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, whiteSpace: "nowrap" }}>{g.group}</p>
            ) : (
              <div style={{ height: 16 }} />
            )}
            {g.items.map(s => (
              <button 
                key={s.id} 
                onClick={() => setActive(s.id)} 
                title={!isSidebarOpen ? s.label : ""} 
                className={`nav-item ${active === s.id ? "active" : ""}`}
              >
                <i className={`ti ${s.icon}`} style={{ fontSize: 18, marginRight: isSidebarOpen ? 12 : 0, transition: "margin 0.3s ease" }} aria-hidden="true" />
                {isSidebarOpen && <span style={{ whiteSpace: "nowrap", fontWeight: active === s.id ? 500 : 400 }}>{s.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <main style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto", maxWidth: 860 }}>
        {renderSection()}
      </main>
    </div>
  );
}
