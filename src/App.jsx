import { useState } from "react";
import PromptSuite from "./PromptSuite.jsx";
import { publishingPhases, hookCategories, retentionTechniques, wcPhases, kpis, ninetyDayPlan, contentPillarsV2, storyStructureV2, distributionStrategy } from "./strategicData.js";

const sectionGroups = [
  { group: "STRATEGY", items: [
    { id: "overview", label: "Executive Summary", icon: "ti-layout-dashboard" },
    { id: "competitors", label: "Competitive Intel", icon: "ti-target" },
    { id: "content", label: "Content Architecture", icon: "ti-building" },
    { id: "publishing", label: "Publishing & Scale", icon: "ti-rocket" },
  ]},
  { group: "EXECUTION", items: [
    { id: "viral", label: "Viral Intelligence", icon: "ti-bolt" },
    { id: "scripting", label: "Story Structure", icon: "ti-file-text" },
    { id: "production", label: "Production System", icon: "ti-video" },
    { id: "promptsuite", label: "Prompt Suite", icon: "ti-wand" },
    { id: "copyright", label: "Copyright & Safety", icon: "ti-shield-check" },
  ]},
  { group: "GROWTH", items: [
    { id: "worldcup", label: "World Cup 2026", icon: "ti-trophy" },
    { id: "kpis", label: "Performance KPIs", icon: "ti-gauge" },
    { id: "monetization", label: "Monetization", icon: "ti-currency-dollar" },
    { id: "roadmap", label: "90-Day Roadmap", icon: "ti-map-2" },
    { id: "resources", label: "Resources", icon: "ti-database" },
  ]},
];


const Badge = ({ children, color = "info" }) => (
  <span style={{
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "var(--border-radius-md)",
    fontSize: "12px",
    fontWeight: 500,
    background: `var(--color-background-${color})`,
    color: `var(--color-text-${color})`,
    border: `0.5px solid var(--color-border-${color})`,
  }}>{children}</span>
);

const Card = ({ children, style = {} }) => (
  <div style={{
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderRadius: "var(--border-radius-lg)",
    padding: "1rem 1.25rem",
    marginBottom: "1rem",
    ...style
  }}>{children}</div>
);

const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: "1.5rem", marginTop: "2rem", color: "var(--color-text-primary)" }}>{children}</h2>
);

const SubTitle = ({ children }) => (
  <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: "0.75rem", marginTop: "1.5rem", color: "var(--color-text-primary)" }}>{children}</h3>
);

const MetricGrid = ({ metrics }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: "1.5rem" }}>
    {metrics.map((m, i) => (
      <div key={i} style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "0.875rem 1rem" }}>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>{m.label}</p>
        <p style={{ fontSize: 22, fontWeight: 500, margin: 0, color: "var(--color-text-primary)" }}>{m.value}</p>
        {m.sub && <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>{m.sub}</p>}
      </div>
    ))}
  </div>
);


const IdeaList = ({ title, ideas, color = "info" }) => (
  <Card>
    <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 12, color: "var(--color-text-primary)" }}>{title}</p>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 6 }}>
      {ideas.map((idea, i) => (
        <div key={i} style={{ fontSize: 13, padding: "4px 8px", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", color: "var(--color-text-primary)", borderLeft: `2px solid var(--color-border-${color})` }}>
          <span style={{ color: "var(--color-text-tertiary)", fontSize: 11, marginRight: 6 }}>{String(i + 1).padStart(2, "0")}</span>
          {idea}
        </div>
      ))}
    </div>
  </Card>
);


const CompetitorCard = ({ ch }) => (
  <Card>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
      <div>
        <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{ch.name}</p>
        <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "2px 0 0" }}>{ch.country} · {ch.type}</p>
      </div>
      <Badge color="info">{ch.subs}</Badge>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-success)", margin: "0 0 4px" }}>Copy from them</p>
        {ch.copy.map((c, i) => <p key={i} style={{ fontSize: 12, margin: "2px 0", color: "var(--color-text-secondary)" }}>+ {c}</p>)}
      </div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-danger)", margin: "0 0 4px" }}>Avoid their mistakes</p>
        {ch.avoid.map((a, i) => <p key={i} style={{ fontSize: 12, margin: "2px 0", color: "var(--color-text-secondary)" }}>– {a}</p>)}
      </div>
    </div>
  </Card>
);

export default function NinetyFootball() {
  const [active, setActive] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const competitors = [
    { name: "Goal (GOAL's Front Three)", country: "UK/Global", type: "Football news & stories", subs: "710K+", copy: ["Editorial-style storytelling", "Mix of news + nostalgia", "Strong SEO titles"], avoid: ["Over-reliance on text overlays", "Inconsistent posting rhythm"] },
    { name: "HITC Sevens", country: "UK", type: "Football lists & history", subs: "800K+", copy: ["List-format hooks", "Nostalgic content performs well", "Fast-paced editing"], avoid: ["Narrow topic scope", "Heavy UK-centric focus"] },
    { name: "Copa90", country: "UK", type: "Football culture & stories", subs: "1.5M+", copy: ["Culture angle on football", "Fan-focused narratives", "High production energy"], avoid: ["Long-form heavy (hard to scale)", "Expensive to replicate"] },
    { name: "HQ Sports Shorts", country: "USA", type: "Viral sports highlights", subs: "1.75M+", copy: ["US audience framing", "Reaction hooks", "Daily upload discipline"], avoid: ["Generic commentary", "Low information density"] },
    { name: "The Overlap / Gary Neville", country: "UK", type: "Football analysis & interviews", subs: "600K+", copy: ["Authority positioning", "Long-form clips repurposed as Shorts"], avoid: ["Requires on-camera talent", "Expensive production"] },
    { name: "Tifo Football", country: "UK", type: "Tactical & business analysis", subs: "1.1M+", copy: ["Deep dive angle = trust", "Business of football is underserved"], avoid: ["Animation-heavy (high cost)", "Niche audience at scale"] },
    { name: "StatMan Dave", country: "UK", type: "Football statistics", subs: "400K+", copy: ["Data-driven hooks", "Stat graphics are shareable", "Low production cost"], avoid: ["Limited storytelling", "Algorithm-dependent spikes"] },
    { name: "Footy Accumulators", country: "UK", type: "Football predictions & betting", subs: "200K+", copy: ["Betting/predictions angle for US = high RPM", "Weekly recurring content formats"], avoid: ["Compliance risks in some markets", "Audience loyalty issues"] },
    { name: "ESPN FC (YouTube)", country: "USA", type: "Football news & analysis", subs: "2M+", copy: ["US sports framing of football", "Debate format works well", "High search visibility"], avoid: ["Requires credentialed access", "Studio budget"] },
    { name: "Deestroying", country: "USA", type: "Football entertainment & challenges", subs: "5M+", copy: ["US-native personality + football = viral", "Entertainment over education", "Consistent brand identity"], avoid: ["Requires on-camera presence", "Heavy production"] },
  ];


  const viralIdeas = [
    "The most expensive transfer flop in history", "Ronaldo vs Messi career stats in 60 seconds", "The day this goalkeeper scored from his box",
    "Every World Cup final goal ever in 60 seconds", "Which club has spent the most money in history?", "The most embarrassing own goals ever",
    "This player went from homeless to world class", "The referee who changed football history", "When a team signed a 73-year-old player",
    "The player who played for 6 different national teams", "The match that started a war", "Football's greatest free kick takers ranked",
    "The richest club in football history", "The player who faked his own death to escape a contract", "Every Ballon d'Or winner since 1956",
    "The forgotten World Cup goal that changed everything", "Which national team has the most World Cup wins?", "The club that went bankrupt and came back",
    "Football's most iconic celebrations ranked", "The player who missed a World Cup final penalty and became president",
    "The stadium that holds 100,000 fans", "Football's fastest ever goal in history", "The team that won the league without losing a match",
    "The goalkeeper who scored a hat-trick", "Which manager has won the most trophies?", "The most yellow cards in a single match",
    "The match where 149 own goals were scored", "The penalty shootout that lasted 48 kicks", "Football's worst ever signing (and why it failed)",
    "The player who appeared on the cover of FIFA 30 times", "When Real Madrid had every Ballon d'Or winner in the squad", "The World Cup host that got embarrassed at home",
    "The club owner who ruined everything in one summer", "Football's greatest ever last-minute goals", "The transfer that saved a club from bankruptcy",
    "This player scored 5 goals in 9 minutes", "The match that changed the offside rule forever", "Football's biggest upsets of all time",
    "The country that plays football on a glacier", "The World Cup that nobody wanted to host", "When a player's mother collapsed in the stands mid-match",
    "The referee who admitted he got the decision wrong", "Football's most underrated defenders ever", "The kit that was banned for being too revealing",
    "The player who scored against his own team 3 times in one season", "Why this World Cup trophy is not the original", "The city with the most football world champions",
    "This player walked out of a World Cup — and was right to", "Football's greatest hat-tricks ever scored", "When VAR robbed the underdog",
  ];

  const worldCupIdeas = [
    "Every 2026 group explained in 60 seconds", "Predicting the World Cup winner using stats only", "The best 2026 World Cup kits ranked",
    "Which 2026 host city should you visit?", "The player who deserves a World Cup medal but never got one", "Every World Cup winning goal ever",
    "2026 dark horses: 5 teams nobody is talking about", "The World Cup's greatest individual performances ever", "How the USA team built for 2026",
    "The countries playing in their first ever World Cup", "Ranking every World Cup mascot in history", "The oldest player to score at a World Cup",
    "The biggest shock result in World Cup group stages ever", "All 32 national anthems in 5 minutes", "The World Cup golden boot race explained",
    "What happens if two teams draw at the World Cup?", "The rules change that shocked the 2026 tournament", "How VAR works at the World Cup",
    "Every World Cup penalty shootout in history", "The stadium that hosted the 2026 final and its history",
    "This country has never lost a group stage game", "The World Cup hat-trick scorers ranked", "When a 17-year-old won the World Cup",
    "The World Cup moments even non-fans remember", "Ranking every World Cup ball in history", "The 2026 opening ceremony explained",
    "How much money does winning the World Cup pay?", "Every country that has hosted the World Cup", "The World Cup's greatest goalkeepers",
    "Why 48 teams makes the 2026 World Cup different", "The referee governing the World Cup final and their history",
    "The 2026 USA squad: every player's story in 5 minutes", "Every World Cup final score in history", "The World Cup squad that cost $2 billion",
    "Breaking down every 2026 quarter-final prediction", "The World Cup player who scored in 4 tournaments", "Why Messi's 2022 win was the greatest World Cup story",
    "The country that has lost 3 World Cup finals", "How England finally won the World Cup in 1966", "2026 World Cup: who is the referee to watch?",
    "The night Germany got humiliated 7–1 at a World Cup", "World Cup 2026: every group stage result predicted", "The first African nation to win a World Cup?",
    "When a World Cup was abandoned and restarted", "The journalist who predicted the World Cup winner 4 times", "The World Cup 2026 final venue in 60 seconds",
    "Every World Cup winner since 1930 in under 2 minutes", "The 2026 breakthrough star before they were famous",
    "Predicting the 2030 World Cup hosts already", "The 2026 World Cup economic impact on USA",
  ];

  const evergreenIdeas = [
    "The story of football's greatest ever comeback", "Why Pelé is still the GOAT for purists", "The forgotten footballer who changed the game forever",
    "The worst referee decisions in Champions League history", "How Messi's contract leaked and changed football forever", "The club that invented the offside trap",
    "Football's most iconic jersey numbers and why they matter", "The manager who won leagues in 5 different countries",
    "The Academy that produced 20 world stars", "The city with two rival clubs and their history", "The night Ajax shocked Europe with teenagers",
    "How the Premier League became the richest league on earth", "The player who reinvented the false nine position",
    "The goalkeeper who revolutionised modern football", "Every Champions League final score since 1955", "The worst penalty kicks in World Cup history",
    "When a club were banned from their own stadium", "The transfer window rule that changed football forever",
    "The country that plays in a league in another country", "Every footballer to win the Treble", "The player who left Real Madrid and came back 10 years later",
    "How Bosman ruling changed football contracts forever", "The club that has never been relegated in 100 years",
    "Every club to win the Champions League more than once", "The forgotten golden generation that never won anything",
    "How data analytics changed how clubs sign players", "The most dangerous football stadium in history",
    "The player who scored the most penalties ever", "The manager who built three different dynasties", "Football's most iconic number 10s ranked",
    "When a club played a game with no fans", "The league that had 4 top-6 clubs finish bottom 6",
    "How shirt sponsorship money changed football", "The player whose career ended at 23 due to injury — and what happened next",
    "The club with the most youth academy graduates in its first team", "The country where football is the national religion",
    "How Wembley Stadium was rebuilt and why it matters", "The night Liverpool came back from 3–0 down",
    "Every player to score 50+ Champions League goals", "The managers who transformed a club's identity in one season",
    "Football's funniest press conference moments", "The dirtiest match in football history", "The transfer that never happened and why",
    "When a player punched the referee and got a contract", "How the Champions League format changed in 2024",
    "The club that played three finals in one week", "Every team to win the league unbeaten",
    "The forgotten striker who outscored everyone in the 90s", "Why third goalkeepers barely ever play",
  ];


  const tools = [
    { name: "CapCut", type: "Editing", price: "Free/Pro", use: "Primary Short-form video editor. Best for quick cuts, text overlays, trending transitions" },
    { name: "Adobe Premiere Pro", type: "Editing", price: "$55/mo", use: "Professional editing for longer-form content and documentary shorts" },
    { name: "DaVinci Resolve", type: "Editing", price: "Free", use: "Professional colour grading and editing, excellent free alternative" },
    { name: "ElevenLabs", type: "Voiceover", price: "$5–22/mo", use: "Best AI voiceover tool for football narration. High quality, natural-sounding voices" },
    { name: "Murf AI", type: "Voiceover", price: "$19/mo", use: "Reliable AI voice generation, good for multiple voice styles" },
    { name: "Opus Clip", type: "Automation", price: "$19/mo", use: "Auto-clips long videos into Shorts with AI-driven curation" },
    { name: "VidIQ", type: "Analytics/SEO", price: "Free/$10/mo", use: "YouTube keyword research, channel analytics, competitor tracking" },
    { name: "TubeBuddy", type: "SEO", price: "Free/$9/mo", use: "Tag research, A/B thumbnail testing, upload optimisation" },
    { name: "ChatGPT / Claude", type: "Research/Scripts", price: "$20/mo", use: "Script writing, story research, idea generation, title brainstorming" },
    { name: "Canva Pro", type: "Thumbnails/Branding", price: "$13/mo", use: "Thumbnail creation, banner design, branding assets" },
    { name: "Adobe Firefly", type: "AI Images", price: "Free/$5/mo", use: "Generate background images, custom visuals, thumbnail backgrounds — no copyright risk" },
    { name: "Descript", type: "Transcription/Subtitles", price: "$12/mo", use: "Auto transcription, subtitle burning, audio cleanup" },
    { name: "Notion", type: "Workflow", price: "Free", use: "Content calendar, script database, idea tracking" },
    { name: "Buffer / Later", type: "Scheduling", price: "$15/mo", use: "Cross-platform post scheduling for YouTube, TikTok, Instagram simultaneously" },
    { name: "Airtable", type: "Database", price: "Free", use: "Track all video ideas, scripts, status, performance data" },
  ];

  const resources = [
    { name: "Sofascore", type: "Match Data", price: "Free", rel: "★★★★★", use: "Live scores, player ratings, detailed match statistics" },
    { name: "FBref.com", type: "Statistics", price: "Free", rel: "★★★★★", use: "Advanced football stats, historical data, player comparison — powered by StatsBomb" },
    { name: "Transfermarkt", type: "Transfer/Value", price: "Free", rel: "★★★★★", use: "Player market values, transfer history, contract data — essential for transfer content" },
    { name: "WhoScored.com", type: "Statistics", price: "Free", rel: "★★★★", use: "Match and player ratings, formation analysis" },
    { name: "BBC Sport / Sky Sports", type: "News", price: "Free", rel: "★★★★★", use: "Breaking news, official statements, injury updates" },
    { name: "The Athletic", type: "Deep News", price: "$12/mo", rel: "★★★★★", use: "Exclusive behind-the-scenes stories, excellent for documentary content ideas" },
    { name: "FIFA Media Library", type: "Images/Video", price: "Free (licensed)", rel: "★★★★", use: "Official FIFA content, historical World Cup footage — requires media accreditation" },
    { name: "Getty Images / Shutterstock", type: "Images", price: "$30–150/mo", rel: "★★★★★", use: "Licensed football photography — essential for legal thumbnails and B-roll stills" },
    { name: "Pixabay / Unsplash", type: "Images", price: "Free", rel: "★★★", use: "Generic sports backgrounds, crowd shots, atmosphere photography" },
    { name: "YouTube Audio Library", type: "Music", price: "Free", rel: "★★★★", use: "Copyright-free background music for all content" },
    { name: "Artlist.io", type: "Music", price: "$199/yr", rel: "★★★★★", use: "Best licensed music library for sports content, no claim issues" },
    { name: "ESPN Stats & Info API", type: "API", price: "Media partners", rel: "★★★★", use: "Real-time sports data for graphics overlays" },
    { name: "SportMonks API", type: "API", price: "$25+/mo", rel: "★★★★", use: "Live football data API for data-driven Short graphics" },
    { name: "RSSSF", type: "Historical", price: "Free", rel: "★★★★", use: "Historical football records, results archives going back to 1800s" },
    { name: "Wikidata / Wikipedia", type: "Reference", price: "Free", rel: "★★★", use: "Player biographies, club histories, verified facts for scripts" },
  ];

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
      <nav style={{ 
        width: isSidebarOpen ? 240 : 70, 
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        flexShrink: 0, 
        background: "var(--color-background-primary)", 
        borderRight: "0.5px solid var(--color-border-tertiary)", 
        padding: "1rem 0", 
        position: "sticky", 
        top: 0, 
        height: "100vh", 
        overflowY: "auto",
        overflowX: "hidden"
      }}>
        <div style={{ padding: "0 1rem", marginBottom: "1rem", display: "flex", justifyContent: isSidebarOpen ? "flex-end" : "center" }}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "transparent", border: "none", color: "var(--color-text-secondary)", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "var(--border-radius-md)" }}>
            <i className={`ti ${isSidebarOpen ? "ti-chevron-left" : "ti-chevron-right"}`} style={{ fontSize: 20 }} />
          </button>
        </div>
        
        <div style={{ 
          padding: isSidebarOpen ? "0 1rem 1rem" : "0 4px", 
          borderBottom: isSidebarOpen ? "0.5px solid var(--color-border-tertiary)" : "none", 
          marginBottom: "0.5rem", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center",
          opacity: isSidebarOpen ? 1 : 0,
          maxHeight: isSidebarOpen ? "200px" : "0px",
          transition: "all 0.3s ease",
          overflow: "hidden"
        }}>
          <img src="/Ninety-Football-Logo.png" alt="Ninety Football Logo" style={{ width: "80%", maxWidth: "150px", marginBottom: "0.75rem", borderRadius: "var(--border-radius-md)" }} />
          <p style={{ fontWeight: 600, fontSize: 15, margin: 0, color: "var(--color-text-primary)", letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>Ninety Football</p>
          <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "4px 0 0", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>Master Strategic Brief</p>
        </div>

        {sectionGroups.map(g => (
          <div key={g.group} style={{ marginTop: "0.5rem" }}>
            {isSidebarOpen ? (
              <p style={{ fontSize: 10, fontWeight: 600, color: "var(--color-text-tertiary)", padding: "12px 1rem 8px", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0, whiteSpace: "nowrap" }}>{g.group}</p>
            ) : (
              <div style={{ height: 16 }} />
            )}
            {g.items.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)} title={!isSidebarOpen ? s.label : ""} style={{
                display: "flex", width: "100%", alignItems: "center", justifyContent: isSidebarOpen ? "flex-start" : "center",
                padding: isSidebarOpen ? "8px 1rem" : "12px 0", fontSize: 13,
                background: active === s.id ? "var(--color-background-info)" : "transparent",
                color: active === s.id ? "var(--color-text-info)" : "var(--color-text-secondary)",
                border: "none", cursor: "pointer", borderRadius: 0,
                borderLeft: active === s.id ? "3px solid var(--color-text-info)" : "3px solid transparent",
                transition: "all 0.2s"
              }}>
                <i className={`ti ${s.icon}`} style={{ marginRight: isSidebarOpen ? 12 : 0, fontSize: 18 }} aria-hidden="true" />
                {isSidebarOpen && <span style={{ whiteSpace: "nowrap" }}>{s.label}</span>}
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
