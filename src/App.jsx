import { useState } from "react";

const sections = [
  { id: "overview", label: "Overview", icon: "ti-layout-dashboard" },
  { id: "analysis", label: "Part 1: Market Analysis", icon: "ti-chart-bar" },
  { id: "branding", label: "Part 2: Branding", icon: "ti-palette" },
  { id: "competitors", label: "Part 3: Competitors", icon: "ti-users" },
  { id: "content", label: "Part 4: Content Strategy", icon: "ti-bulb" },
  { id: "production", label: "Part 5: Production", icon: "ti-video" },
  { id: "copyright", label: "Part 6: Copyright", icon: "ti-shield" },
  { id: "resources", label: "Part 7: Resources", icon: "ti-database" },
  { id: "optimization", label: "Part 8: Channel Optimization", icon: "ti-settings" },
  { id: "monetization", label: "Part 9: Monetization", icon: "ti-currency-dollar" },
  { id: "roadmap", label: "Part 10: 12-Month Roadmap", icon: "ti-map" },
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

const ProsCons = ({ pros, cons }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1rem" }}>
    <div style={{ background: "var(--color-background-success)", borderRadius: "var(--border-radius-md)", padding: "0.875rem 1rem", border: "0.5px solid var(--color-border-success)" }}>
      <p style={{ fontWeight: 500, fontSize: 13, color: "var(--color-text-success)", margin: "0 0 8px" }}>Strengths / Opportunities</p>
      {pros.map((p, i) => <p key={i} style={{ fontSize: 13, margin: "4px 0", color: "var(--color-text-success)" }}>+ {p}</p>)}
    </div>
    <div style={{ background: "var(--color-background-danger)", borderRadius: "var(--border-radius-md)", padding: "0.875rem 1rem", border: "0.5px solid var(--color-border-danger)" }}>
      <p style={{ fontWeight: 500, fontSize: 13, color: "var(--color-text-danger)", margin: "0 0 8px" }}>Weaknesses / Risks</p>
      {cons.map((c, i) => <p key={i} style={{ fontSize: 13, margin: "4px 0", color: "var(--color-text-danger)" }}>– {c}</p>)}
    </div>
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

const RoadmapMonth = ({ month, data }) => (
  <Card>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
      <div>
        <p style={{ fontWeight: 500, fontSize: 15, margin: "0 0 4px", color: "var(--color-text-primary)" }}>{month}</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Badge color="info">{data.subs}</Badge>
          <Badge color="success">{data.revenue}</Badge>
          <Badge color="warning">{data.focus}</Badge>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "var(--color-text-secondary)", textAlign: "right" }}>{data.posts} posts</div>
    </div>
    <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 6 }}>
      {data.actions.map((a, i) => (
        <p key={i} style={{ fontSize: 13, margin: 0, padding: "3px 0", color: "var(--color-text-secondary)", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>→ {a}</p>
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

export default function BallSnaps() {
  const [active, setActive] = useState("overview");

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

  const channelNames = [
    { rank: 1, name: "PitchPulse", why: "Energetic, suggests real-time sports content, easy domain" },
    { rank: 2, name: "NetBreaker", why: "Evokes goals, viral moments, strong brandability" },
    { rank: 3, name: "FootballFeed", why: "Descriptive, SEO-rich, highly searchable" },
    { rank: 4, name: "StrikeFeed", why: "Punchy, sports-native, memorable" },
    { rank: 5, name: "GoalFrame", why: "Clean, visual, scalable to merchandise" },
    { rank: 6, name: "TheKickOff", why: "Familiar phrase, authority feel, US-friendly" },
    { rank: 7, name: "PressPass FC", why: "Journalist angle, credibility, niche authority" },
    { rank: 8, name: "BallReport", why: "News-media feel, trustworthy, SEO-friendly" },
    { rank: 9, name: "KickCut", why: "Short-form native, editing metaphor, punchy" },
    { rank: 10, name: "FootageFC", why: "Suggests clips and media, scalable brand" },
    { rank: 11, name: "TopBins", why: "UK slang for top corner goals, cult appeal" },
    { rank: 12, name: "PitchSide", why: "Insider perspective, credible, clean" },
    { rank: 13, name: "FinalThird", why: "Tactical term, niche credibility, unique" },
    { rank: 14, name: "MatchDayMedia", why: "Clear content positioning, professional" },
    { rank: 15, name: "GoalReel", why: "Visual + football, suggests highlight content" },
    { rank: 16, name: "FootballVault", why: "Suggests history & archives, evergreen" },
    { rank: 17, name: "TheCrossbar", why: "Iconic football image, sports slang" },
    { rank: 18, name: "CornerFlag", why: "Niche football detail, unique angle" },
    { rank: 19, name: "TacticalTV", why: "Analysis niche, strong for educated fans" },
    { rank: 20, name: "KickoffClips", why: "Descriptive for Shorts, SEO-direct" },
    { rank: 21, name: "FootballFirst", why: "News-first positioning, clean brand" },
    { rank: 22, name: "SoccerSurge", why: "US-friendly (soccer), growth metaphor" },
    { rank: 23, name: "SoccerVault", why: "Archive angle, evergreen content signal" },
    { rank: 24, name: "StadiumStories", why: "Narrative brand, scalable" },
    { rank: 25, name: "TheMatchReport", why: "Classic journalism term, authority" },
    { rank: 26, name: "BackOfTheNet", why: "Famous phrase, recognisable, fun" },
    { rank: 27, name: "FootballFlash", why: "Breaking news feel, fast content" },
    { rank: 28, name: "GoalGate", why: "Alliteration, memorable, unique" },
    { rank: 29, name: "FootballWire", why: "News wire feel, journalistic" },
    { rank: 30, name: "ElasticoFC", why: "Skill move reference, cult appeal" },
    { rank: 31, name: "PenaltyArc", why: "Tactical image, unique brand name" },
    { rank: 32, name: "FootballBuzz", why: "Trending feel, shareable" },
    { rank: 33, name: "NinetyPlusFive", why: "Stoppage time drama reference" },
    { rank: 34, name: "DeepBlockFC", why: "Tactical niche, strong sub-brand" },
    { rank: 35, name: "VolleyClub", why: "Skill reference, community feel" },
    { rank: 36, name: "TheBallReport", why: "Media-style brand, trustworthy" },
    { rank: 37, name: "SoccerPulse", why: "US-market friendly, energetic" },
    { rank: 38, name: "WorldGoals", why: "International scope, clear content" },
    { rank: 39, name: "KickFeed", why: "Social-first feel, clean name" },
    { rank: 40, name: "PitchPress", why: "Journalism angle, credible" },
    { rank: 41, name: "GoalReport", why: "SEO-direct, simple, searchable" },
    { rank: 42, name: "FootballChronicle", why: "Long-form documentary feel" },
    { rank: 43, name: "ClubHouseFeed", why: "Community-first brand" },
    { rank: 44, name: "ThePressRoom", why: "Journalism metaphor" },
    { rank: 45, name: "StrikeLine", why: "Football + news fusion" },
    { rank: 46, name: "SoccerArena", why: "US market, broad scope" },
    { rank: 47, name: "CentreCircle", why: "Football geography, unique" },
    { rank: 48, name: "FootballCanvas", why: "Creative, artistic angle" },
    { rank: 49, name: "BallBreaker", why: "Edgy, viral potential" },
    { rank: 50, name: "SoccerScript", why: "Storytelling angle" },
  ];

  const contentPillars = [
    { name: "World Cup 2026 Daily", rpm: "$0.08–0.15", virality: "Extreme", why: "FIFA + YouTube official partnership, US-hosted tournament, peak global search traffic June–July 2026", views: "50K–5M per Short" },
    { name: "Football News Flash", rpm: "$0.05–0.10", virality: "High", why: "Consistent search demand, transfer windows, match results drive daily traffic", views: "10K–500K" },
    { name: "Player Stories", rpm: "$0.06–0.12", virality: "Very High", why: "Emotional narratives drive shares. Rags-to-riches, injury comebacks, debut stories", views: "50K–2M" },
    { name: "Football History", rpm: "$0.04–0.08", virality: "High", why: "Evergreen, nostalgia-driven, low copyright risk if using licensed/public domain footage", views: "20K–1M" },
    { name: "Football Facts & Stats", rpm: "$0.04–0.08", virality: "Very High", why: "Shareable, low production cost, AI-assisted research, no footage needed", views: "30K–3M" },
    { name: "Fan Debates", rpm: "$0.06–0.10", virality: "Extreme", why: "Comment section drives algorithm. 'GOAT debates', best XIs, controversial rankings = engagement gold", views: "50K–5M" },
    { name: "Transfer News", rpm: "$0.07–0.12", virality: "High", why: "Search-driven content. Breaking transfers generate immediate traffic spikes", views: "10K–800K" },
    { name: "Football Business", rpm: "$0.10–0.20", virality: "Medium-High", why: "High US RPM niche, money/contracts angle attracts premium advertisers", views: "10K–300K" },
    { name: "Legends Series", rpm: "$0.05–0.09", virality: "High", why: "Nostalgia + education = watch time. Pelé, Maradona, Zidane, Messi, Ronaldo timeless appeal", views: "30K–2M" },
    { name: "Football Controversies", rpm: "$0.06–0.11", virality: "Extreme", why: "Controversy = clicks. Handballs, red card debates, VAR failures, scandal stories", views: "100K–10M" },
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

  const roadmap = [
    { month: "Month 1 (Jun 2026)", subs: "Target: 300 subs", revenue: "$0 (pre-monetisation)", focus: "World Cup Launch", posts: "30 posts", actions: ["Rename channel to top-10 name from list", "Redesign all branding", "Post 1 Short/day, World Cup focus", "Set up TikTok + Instagram reposts", "Target 500K total views"] },
    { month: "Month 2 (Jul 2026)", subs: "Target: 800 subs", revenue: "$0–$20", focus: "World Cup Peak", posts: "31 posts", actions: ["World Cup daily content (final + knockout stages)", "Test 5 content formats", "Track top 3 performing topics", "Build Instagram to 500 followers", "Apply for YPP if 500+ subs hit"] },
    { month: "Month 3 (Aug 2026)", subs: "Target: 1,500 subs", revenue: "$20–$80", focus: "Post-WC consolidation", posts: "31 posts", actions: ["Shift to evergreen + transfer news content", "First YPP application (if 1K reached)", "Introduce Facts + History pillars", "Analyse top 10 performing Shorts", "Start building email list"] },
    { month: "Month 4 (Sep 2026)", subs: "Target: 3,000 subs", revenue: "$50–$150", focus: "Transfer window content", posts: "30 posts", actions: ["Deadline day live updates as Shorts series", "Introduce fan debate format", "Reach out to first football sponsor", "Experiment with 90-sec format", "Test YouTube Community posts"] },
    { month: "Month 5 (Oct 2026)", subs: "Target: 5,000 subs", revenue: "$100–$300", focus: "Champions League content", posts: "31 posts", actions: ["UCL group stage daily Shorts", "Launch Legends Series playlist", "First affiliate link (football gear)", "Post one 'documentary short' per week", "Grow TikTok to 2,000 followers"] },
    { month: "Month 6 (Nov 2026)", subs: "Target: 8,000 subs", revenue: "$200–$500", focus: "Debate & Nostalgia", posts: "30 posts", actions: ["GOAT debate content for Q4", "Reach 10M total channel views", "Test merch (print-on-demand football tees)", "First sponsored post negotiation", "Introduce community polls"] },
    { month: "Month 7 (Dec 2026)", subs: "Target: 12,000 subs", revenue: "$400–$800", focus: "Year-end content", posts: "31 posts", actions: ["Best goals of 2026 series", "Best transfers of 2026", "Year-in-review World Cup retrospective", "Holiday themed football content", "Revisit copyright strategy"] },
    { month: "Month 8 (Jan 2027)", subs: "Target: 18,000 subs", revenue: "$600–$1,200", focus: "New year transfer window", posts: "31 posts", actions: ["January transfer window daily Shorts", "Introduce Business of Football pillar (high RPM)", "Launch second channel or long-form channel", "Scale to 45 posts/month (mix of Shorts + longer)", "First brand deal target: $300–$500"] },
    { month: "Month 9 (Feb 2027)", subs: "Target: 25,000 subs", revenue: "$800–$1,800", focus: "UCL knockout rounds", posts: "28 posts", actions: ["UCL last-16 prediction + reaction Shorts", "Grow email newsletter to 1,000 subscribers", "Create a football facts digital product ($5–$15)", "Target football betting site affiliate", "Reach 50M total channel views milestone"] },
    { month: "Month 10 (Mar 2027)", subs: "Target: 35,000 subs", revenue: "$1,200–$2,500", focus: "Storytelling deep dives", posts: "31 posts", actions: ["Weekly long-form Short (>3 min) experiment", "Produce first proper mini-documentary Short", "Re-pitch bigger brand deals ($500–$1,500)", "Invest in better editing tools / VA support", "A/B test thumbnail styles at scale"] },
    { month: "Month 11 (Apr 2027)", subs: "Target: 50,000 subs", revenue: "$1,800–$4,000", focus: "Scale & diversify", posts: "30 posts", actions: ["Hit 50K — post celebration Short", "Launch Channel Membership", "Hire first part-time editor (freelancer)", "Expand to Facebook Reels for extra reach", "Forecast path to 100K by month 15–18"] },
    { month: "Month 12 (May 2027)", subs: "Target: 70,000 subs", revenue: "$3,000–$6,000", focus: "Brand authority", posts: "31 posts", actions: ["Publish full monthly revenue transparency Short", "Lock in minimum 2 brand deals/month", "Evaluate channel sale or partnership value", "Plan next World Cup / Euro 2028 strategy", "Full 12-month analytics review"] },
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

  const optimizedChannel = {
    name: "PitchPulse Football (or your chosen name from Top 50 list)",
    handle: "@PitchPulseFC",
    description: `⚽ The fastest football shorts channel in the USA — stories, facts, debates & daily news in under 60 seconds.

🏆 Champions League · Premier League · World Cup 2026
🔥 Daily videos | Every transfer, goal & controversy covered

📱 TikTok | Instagram | X → @PitchPulseFC

📧 Sponsorship & Business: [your email]
🌐 pitchpulsefc.com`,
    keywords: ["football shorts", "soccer news", "Champions League", "Premier League highlights", "World Cup 2026", "football facts", "transfer news", "football stories", "soccer shorts", "football debate"],
    playlists: ["World Cup 2026 Daily", "Transfer Window News", "Player Stories", "Football History Vault", "Fan Debates", "Champions League", "Football Facts", "Legends Series"],
    hashtags: ["#FootballShorts", "#SoccerNews", "#WorldCup2026", "#PremierLeague", "#UCL", "#TransferNews", "#FootballFacts", "#SoccerShorts", "#FootballDebate", "#FootballHistory"],
  };

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
            <SectionTitle>BallSnaps — Complete YouTube Growth Strategy</SectionTitle>
            <p style={{ fontSize: 15, color: "var(--color-text-secondary)", marginBottom: "1.5rem", lineHeight: 1.7 }}>
              This is a 10-part professional growth plan for building a football-focused YouTube Shorts channel targeting the US audience, timed to capitalise on the FIFA World Cup 2026 — currently in progress, hosted in USA/Canada/Mexico, with YouTube as an official FIFA Preferred Platform.
            </p>
            <div style={{ background: "var(--color-background-warning)", border: "0.5px solid var(--color-border-warning)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-warning)", margin: "0 0 6px" }}>World Cup 2026 — Critical Timing Alert</p>
              <p style={{ fontSize: 13, color: "var(--color-text-warning)", margin: 0 }}>The 2026 World Cup is happening RIGHT NOW (June–July 2026). YouTube has an official FIFA partnership this tournament. This is the single biggest traffic opportunity in football content for the next 4 years. Starting and scaling this channel immediately is essential to capture peak search volume.</p>
            </div>
            <MetricGrid metrics={[
              { label: "Shorts RPM (US audience)", value: "$0.05–0.15", sub: "Per 1,000 views" },
              { label: "Long-form RPM potential", value: "$2–8", sub: "Sports/news niche" },
              { label: "Brand deal (50K subs)", value: "$300–1,500", sub: "Per sponsored Short" },
              { label: "World Cup search spike", value: "400–800%", sub: "vs normal periods" },
              { label: "YPP Shorts threshold", value: "1K subs + 10M views", sub: "In 90 days" },
              { label: "Target timeline to 100K", value: "12–18 months", sub: "With daily posting" },
            ]} />
            <Card>
              <p style={{ fontWeight: 500, fontSize: 14, marginBottom: 8, color: "var(--color-text-primary)" }}>Navigate this plan using the sidebar. Use the sections in order or jump to what you need.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 6 }}>
                {sections.slice(1).map(s => (
                  <button key={s.id} onClick={() => setActive(s.id)} style={{ textAlign: "left", padding: "6px 10px", fontSize: 13, cursor: "pointer", borderRadius: "var(--border-radius-md)", background: "var(--color-background-secondary)", border: "0.5px solid var(--color-border-tertiary)", color: "var(--color-text-primary)" }}>
                    <i className={`ti ${s.icon}`} style={{ marginRight: 6, fontSize: 14 }} aria-hidden="true" />
                    {s.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        );

      case "analysis":
        return (
          <div>
            <SectionTitle>Part 1 — Football Shorts Market Analysis</SectionTitle>
            <MetricGrid metrics={[
              { label: "Global football audience", value: "4 billion+", sub: "Largest sport on earth" },
              { label: "US soccer viewers (2026)", value: "58% weekly", sub: "US adults engage with football" },
              { label: "YouTube Shorts daily views", value: "70–90B", sub: "Global daily Shorts views" },
              { label: "Football search volume", value: "Top 3 niches", sub: "On YouTube globally" },
            ]} />
            <SubTitle>Current Market Opportunity</SubTitle>
            <Card>
              <p style={{ fontSize: 14, color: "var(--color-text-primary)", lineHeight: 1.8, margin: 0 }}>
                Football Shorts represents one of the highest-opportunity niches on YouTube in 2026 for three converging reasons: (1) The FIFA World Cup 2026 is being hosted in the USA — for the first time, the American audience is deeply engaged with football, and FIFA has officially partnered with YouTube as a Preferred Platform, meaning unprecedented traffic is being directed to football creators. (2) YouTube Shorts per-watch-hour revenue reached parity with long-form in the US in May 2025 — the monetisation gap has closed significantly. (3) The football shorts space is large but fragmented — most successful channels are UK-based and do not speak to the US audience with American-framing, sports culture context, or US sports media production values.
              </p>
            </Card>
            <SubTitle>RPM Reality Check</SubTitle>
            <Card>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: "var(--color-text-primary)" }}>Shorts RPM benchmarks</p>
                  {[["US-targeted football Shorts", "$0.05–0.15"], ["General sports Shorts", "$0.03–0.08"], ["Business of football content", "$0.10–0.25"], ["1M Shorts views (US audience)", "$50–$150"]].map(([k, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", fontSize: 13 }}>
                      <span style={{ color: "var(--color-text-secondary)" }}>{k}</span>
                      <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8, color: "var(--color-text-primary)" }}>Long-form RPM potential</p>
                  {[["Football news (US)", "$3–7"], ["Football analysis", "$4–9"], ["Football business", "$8–18"], ["10M long-form views/yr", "$30K–$90K"]].map(([k, v], i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "0.5px solid var(--color-border-tertiary)", fontSize: 13 }}>
                      <span style={{ color: "var(--color-text-secondary)" }}>{k}</span>
                      <span style={{ fontWeight: 500, color: "var(--color-text-primary)" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <SubTitle>Competition Level</SubTitle>
            <ProsCons
              pros={["Most top football Shorts channels are UK-based with UK framing", "Very few channels are combining all content types in one brand", "World Cup 2026 is bringing millions of new American football fans online", "The FIFA–YouTube partnership creates discovery opportunities", "Transfer windows, UCL, and weekly league results = daily content opportunities"]}
              cons={["Premier League and UCL footage is heavily copyright-claimed", "Channels like ESPN FC and Sky Sports have massive head starts", "Algorithm favours established channels in early months", "Shorts RPM alone is not enough to build a business — diversification required", "World Cup content surge will die down post-July 2026"]}
            />
            <SubTitle>Sustainability of the Business Model</SubTitle>
            <Card>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.8, margin: 0 }}>
                A football Shorts channel is sustainable long-term ONLY if it diversifies revenue. Ad revenue from Shorts alone will never pay the bills at under 1M subscribers. The correct model is: Shorts as the growth engine → funnel to long-form videos (higher RPM) → build a brand → monetise through sponsorships, affiliates, and owned products. Football provides a permanent evergreen content supply with predictable annual events (World Cup every 4 years, Euros every 4 years, UCL and domestic leagues every year, transfer windows twice a year). The business model is sustainable if you treat it as a media brand, not a single-platform content channel.
              </p>
            </Card>
          </div>
        );

      case "branding":
        return (
          <div>
            <SectionTitle>Part 2 — Channel Branding</SectionTitle>
            <SubTitle>BallSnaps — Brand Assessment</SubTitle>
            <ProsCons
              pros={["'Ball' is universal and sport-neutral, allowing expansion", "'Snaps' captures the short-form, moment-based content idea", "Short and easy to pronounce in American English", "Suitable for Instagram (Snaps = Stories connection)", "Available as a domain (.com possible)"]}
              cons={["'Snaps' feels more aligned with Snapchat than YouTube — wrong platform association", "Not immediately identifiable as football/soccer", "Lacks authority or news-media credibility", "Hard to build into a serious football media brand", "Low SEO value — no football keyword in the name"]}
            />
            <p style={{ fontSize: 14, color: "var(--color-text-secondary)", marginBottom: 8 }}>Verdict: BallSnaps is a functional working name but should be upgraded before serious growth. A better name will help with SEO, brand recall, and sponsorship conversations.</p>
            <SubTitle>Top 50 Alternative Channel Names</SubTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 8 }}>
              {channelNames.map(n => (
                <div key={n.rank} style={{ background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-md)", padding: "8px 12px", display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 11, color: "var(--color-text-tertiary)", minWidth: 24, paddingTop: 2 }}>#{n.rank}</span>
                  <div>
                    <p style={{ fontWeight: 500, fontSize: 14, margin: "0 0 2px", color: "var(--color-text-primary)" }}>{n.name}</p>
                    <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{n.why}</p>
                  </div>
                </div>
              ))}
            </div>
            <Card style={{ marginTop: "1.5rem", background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-info)", margin: "0 0 6px" }}>Top Recommendation: PitchPulse</p>
              <p style={{ fontSize: 13, color: "var(--color-text-info)", margin: 0 }}>PitchPulse is energetic, sports-native, has no conflicting associations, is domain-available, works for US and global audiences, and scales into a serious media brand. It signals speed, energy, and football without being limited to one content type.</p>
            </Card>
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
            <SectionTitle>Part 4 — Content Strategy</SectionTitle>
            <SubTitle>Content Pillars</SubTitle>
            {contentPillars.map((p, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 6 }}>
                  <p style={{ fontWeight: 500, fontSize: 15, margin: 0, color: "var(--color-text-primary)" }}>{p.name}</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Badge color="success">RPM: {p.rpm}</Badge>
                    <Badge color="info">Virality: {p.virality}</Badge>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>{p.why}</p>
                <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0 }}>Expected views per Short: {p.views}</p>
              </Card>
            ))}
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

      case "optimization":
        return (
          <div>
            <SectionTitle>Part 8 — Channel Optimisation</SectionTitle>
            <div style={{ background: "var(--color-background-warning)", border: "0.5px solid var(--color-border-warning)", borderRadius: "var(--border-radius-lg)", padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-warning)", margin: "0 0 4px" }}>Current Channel Status</p>
              <p style={{ fontSize: 13, color: "var(--color-text-warning)", margin: 0 }}>30 subscribers, 8 videos, joined Dec 2017 but inactive. The channel age is an advantage (older channels get slightly more trust from YouTube's algorithm). Prioritise a complete rebrand before posting more content.</p>
            </div>
            {[
              { field: "Channel Name", current: "BallSnaps", optimised: "PitchPulse Football (or best name from Top 50)", why: "Adds the keyword 'Football' for SEO. A professional name builds authority faster. Rename before the World Cup content push." },
              { field: "Handle", current: "@BallSnaps", optimised: "@PitchPulseFC", why: "Short, memorable, professional. FC suffix adds football identity. Use the same handle across all platforms (YouTube, TikTok, Instagram, X)." },
              { field: "Channel Description", current: "Generic, no keyword optimisation, personal email exposed", optimised: optimizedChannel.description, why: "Includes platform keywords, competition names, a clear content promise, cross-platform social handles, and a professional email. Formatted for skimmability." },
              { field: "Profile Picture", current: "Unknown/unoptimised", optimised: "Custom logo: football icon or wordmark on solid dark background. Clean on mobile (50px circle). White on dark works best. Avoid busy designs. Commission from Fiverr ($15–50) or design in Canva Pro.", why: "Profile picture is visible everywhere in YouTube — search, comments, notifications. A professional logo is non-negotiable." },
              { field: "Banner / Channel Art", current: "Unknown", optimised: "2560×1440px banner. Bold channel name on left, 4–5 content type icons centre, social handles right. Include World Cup 2026 badge during tournament period. Use Canva Pro template then customise.", why: "Banner is a first impression. It needs to communicate your content type within 3 seconds on desktop and mobile." },
              { field: "Watermark", current: "None", optimised: "Small logo watermark in bottom-right corner of all long-form videos. Should appear at 20-second mark (prompt viewers to subscribe before end of video).", why: "Watermarks reinforce brand on embedded and shared videos. Requires enabling in YouTube Studio > Customisation > Branding." },
              { field: "Keywords (Channel Tags)", current: "Unknown", optimised: optimizedChannel.keywords.join(", "), why: "Channel-level keywords help YouTube categorise your channel. Include competition names, 'shorts', 'news', and 'facts' to cast a wide discovery net." },
              { field: "Upload Defaults", current: "Unknown", optimised: "Set default: Category = Sports, Comments = On (filtered for spam), Licence = Standard YouTube. Pre-fill default description template with social links and hashtags. Set default visibility to Private then manually review before publishing.", why: "Upload defaults save time and ensure consistency across every video." },
              { field: "Featured Sections (Homepage)", current: "Unknown", optimised: "Row 1: World Cup 2026 (featured playlist). Row 2: Latest uploads. Row 3: Player Stories playlist. Row 4: Football History Vault. Row 5: Fan Debates. Row 6: Evergreen Facts.", why: "Organised homepage dramatically improves session time. New visitors see a structured media brand, not a random video dump." },
              { field: "About / Contact", current: "Personal Gmail exposed", optimised: "Create a dedicated business email: hello@pitchpulsefc.com (use Google Workspace $6/mo). This signals professionalism to sponsors. Keep personal email separate.", why: "A professional email address is the difference between getting a $500 sponsor reply vs being ignored." },
            ].map((item, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 4 }}>
                  <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>{item.field}</p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div style={{ background: "var(--color-background-danger)", borderRadius: "var(--border-radius-md)", padding: "6px 10px" }}>
                    <p style={{ fontSize: 11, color: "var(--color-text-danger)", margin: "0 0 2px", fontWeight: 500 }}>Current</p>
                    <p style={{ fontSize: 12, color: "var(--color-text-danger)", margin: 0 }}>{item.current}</p>
                  </div>
                  <div style={{ background: "var(--color-background-success)", borderRadius: "var(--border-radius-md)", padding: "6px 10px" }}>
                    <p style={{ fontSize: 11, color: "var(--color-text-success)", margin: "0 0 2px", fontWeight: 500 }}>Optimised</p>
                    <p style={{ fontSize: 12, color: "var(--color-text-success)", margin: 0, whiteSpace: "pre-line" }}>{item.optimised}</p>
                  </div>
                </div>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{item.why}</p>
              </Card>
            ))}
            <SubTitle>Recommended Hashtags</SubTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {optimizedChannel.hashtags.map((h, i) => <Badge key={i} color="info">{h}</Badge>)}
            </div>
            <SubTitle>Recommended Playlists</SubTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {optimizedChannel.playlists.map((p, i) => <Badge key={i} color="success">{p}</Badge>)}
            </div>
          </div>
        );

      case "monetization":
        return (
          <div>
            <SectionTitle>Part 9 — Monetisation Roadmap</SectionTitle>
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
            <SectionTitle>Part 10 — 12-Month Execution Roadmap</SectionTitle>
            <Card style={{ background: "var(--color-background-info)", border: "0.5px solid var(--color-border-info)" }}>
              <p style={{ fontWeight: 500, fontSize: 14, color: "var(--color-text-info)", margin: "0 0 6px" }}>World Cup 2026 Priority Window</p>
              <p style={{ fontSize: 13, color: "var(--color-text-info)", margin: 0 }}>Months 1–2 (June–July 2026) represent the biggest single opportunity. The tournament runs until mid-July. YouTube and FIFA are officially partnered. Search traffic for football content is at 4–8x normal levels. Start posting World Cup content IMMEDIATELY. Every day of delay is lost traffic.</p>
            </Card>
            {roadmap.map((r, i) => <RoadmapMonth key={i} month={r.month} data={r} />)}
            <SubTitle>Revenue Projection Summary</SubTitle>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse", tableLayout: "fixed" }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                    {["Period", "Subscribers", "Monthly Views", "YT Ad Revenue", "Sponsorships", "Affiliates", "Total Est."].map((h, i) => (
                      <th key={i} style={{ textAlign: "left", padding: "8px 6px", fontWeight: 500, color: "var(--color-text-secondary)", fontSize: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Month 1–3", "300–1,500", "100K–500K", "$0–$50", "$0", "$0–$20", "$0–$70"],
                    ["Month 4–6", "3K–8K", "500K–3M", "$50–$300", "$0–$300", "$20–$150", "$70–$750"],
                    ["Month 7–9", "12K–25K", "3M–10M", "$300–$1,200", "$300–$1,500", "$100–$500", "$700–$3,200"],
                    ["Month 10–12", "35K–70K", "10M–30M", "$1,200–$3,500", "$1,000–$5,000", "$300–$1,500", "$2,500–$10,000"],
                    ["Year 2 end", "200K–500K", "30M–100M/mo", "$5,000–$15,000", "$5,000–$25,000", "$1,000–$5,000", "$11K–$45K/mo"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "8px 6px", color: j === row.length - 1 ? "var(--color-text-success)" : "var(--color-text-primary)", fontWeight: j === row.length - 1 ? 500 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <h2 className="sr-only">BallSnaps complete YouTube football channel growth strategy — 10-part professional plan</h2>
      <nav style={{ width: 220, flexShrink: 0, background: "var(--color-background-primary)", borderRight: "0.5px solid var(--color-border-tertiary)", padding: "1rem 0", position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 1rem 1rem", borderBottom: "0.5px solid var(--color-border-tertiary)", marginBottom: "0.5rem" }}>
          <p style={{ fontWeight: 500, fontSize: 14, margin: 0, color: "var(--color-text-primary)" }}>BallSnaps Strategy</p>
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>10-Part Growth Plan</p>
        </div>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display: "block", width: "100%", textAlign: "left", padding: "7px 1rem", fontSize: 13,
            background: active === s.id ? "var(--color-background-info)" : "transparent",
            color: active === s.id ? "var(--color-text-info)" : "var(--color-text-secondary)",
            border: "none", cursor: "pointer", borderRadius: 0,
            borderLeft: active === s.id ? "2px solid var(--color-border-info)" : "2px solid transparent",
          }}>
            <i className={`ti ${s.icon}`} style={{ marginRight: 8, fontSize: 13 }} aria-hidden="true" />
            {s.label.replace(/Part \d+ — /, "")}
          </button>
        ))}
      </nav>
      <main style={{ flex: 1, padding: "1.5rem", overflowY: "auto", maxWidth: 720 }}>
        {renderSection()}
      </main>
    </div>
  );
}
