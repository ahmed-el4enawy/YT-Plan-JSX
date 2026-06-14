// ── Sub-Niche Scoring Matrix ──────────────────────────────────────
// Each dimension scored 1–10. Total = sum of all 8 dimensions (max 80).
export const subNiches = [
  { name: "Football Stories", growth: 9, rpm: 7, subConv: 9, retention: 9, virality: 8, copyright: 8, scale: 8, evergreen: 9, rec: "PRIMARY" },
  { name: "Football Documentary Shorts", growth: 8, rpm: 8, subConv: 9, retention: 10, virality: 7, copyright: 7, scale: 6, evergreen: 10, rec: "PRIMARY" },
  { name: "Football Drama / Controversies", growth: 9, rpm: 6, subConv: 7, retention: 8, virality: 10, copyright: 6, scale: 8, evergreen: 7, rec: "PRIMARY" },
  { name: "Football Rankings / Debates", growth: 8, rpm: 6, subConv: 7, retention: 7, virality: 9, copyright: 9, scale: 9, evergreen: 6, rec: "PRIMARY" },
  { name: "Football History / Legends", growth: 7, rpm: 6, subConv: 8, retention: 9, virality: 7, copyright: 9, scale: 8, evergreen: 10, rec: "SECONDARY" },
  { name: "Football Facts & Stats", growth: 8, rpm: 5, subConv: 6, retention: 7, virality: 9, copyright: 10, scale: 10, evergreen: 8, rec: "SECONDARY" },
  { name: "Player Storytelling", growth: 8, rpm: 7, subConv: 9, retention: 9, virality: 8, copyright: 7, scale: 7, evergreen: 8, rec: "SECONDARY" },
  { name: "Football Business / Money", growth: 6, rpm: 10, subConv: 7, retention: 8, virality: 6, copyright: 10, scale: 7, evergreen: 8, rec: "SECONDARY" },
  { name: "World Cup Content", growth: 10, rpm: 8, subConv: 8, retention: 7, virality: 10, copyright: 5, scale: 5, evergreen: 4, rec: "SEASONAL" },
  { name: "Football News / Transfers", growth: 7, rpm: 7, subConv: 5, retention: 5, virality: 7, copyright: 6, scale: 9, evergreen: 2, rec: "EXPERIMENTAL" },
  { name: "Football Psychology", growth: 7, rpm: 8, subConv: 8, retention: 9, virality: 5, copyright: 10, scale: 5, evergreen: 9, rec: "EXPERIMENTAL" },
  { name: "Match Analysis", growth: 6, rpm: 7, subConv: 6, retention: 7, virality: 4, copyright: 3, scale: 7, evergreen: 3, rec: "AVOID" },
];

export const nicheColumns = ["Growth", "RPM", "Sub Conv.", "Retention", "Virality", "Copyright", "Scale", "Evergreen"];

// ── Market Positioning — Niche+ Model ─────────────────────────────
export const positioningAngles = [
  { angle: "Documentary Storytelling", desc: "Transform raw football facts into narrative arcs with emotional stakes, protagonist/antagonist framing, and cinematic pacing. Viewers watch for the story, not the sport.", example: "\"The striker who scored 100 goals and died at 29\" — framed as a 60-second tragedy, not a stat recap." },
  { angle: "Psychology & Human Behaviour", desc: "Explore the mental dimensions of football — pressure, choking, leadership under crisis, crowd psychology, dressing room dynamics. Massively underserved.", example: "\"Why Messi plays better when nobody expects him to\" — framed through loss aversion and flow-state theory." },
  { angle: "Rivalry & Drama", desc: "Football's deepest emotional current. Rivalries drive tribalism, which drives comments, shares, and rewatches. Build recurring series around football's greatest feuds.", example: "\"The night Mourinho sat in Guardiola's chair\" — frame as power psychology, not match recap." },
  { angle: "Business & Money", desc: "The financial architecture of football — transfers, salary structures, ownership, broadcast deals. Attracts premium US advertisers (high RPM) and differentiates from highlight channels.", example: "\"How PSG spent $1.3 billion and won nothing\" — framed as a business case study." },
  { angle: "History & Legacy", desc: "Evergreen content engine. Historical football stories compound views over years because they are perpetually searchable and never expire.", example: "\"The forgotten World Cup that changed the offside rule forever\" — educational + nostalgic hook." },
  { angle: "Leadership & Culture", desc: "Football as a lens for leadership, teamwork, culture-building. Bridges football into self-improvement and business audiences (highest RPM crossover).", example: "\"How Sir Alex Ferguson managed 38 egos for 26 years\" — framed as a leadership masterclass." },
];

export const uvp = "Ninety Football is a football media brand that tells the stories, psychology, and drama behind the world's biggest sport — not another highlights channel. Every Short is a mini-documentary built for the US audience, combining narrative storytelling, data-driven insights, and cinematic pacing to make football's greatest moments feel like breaking news.";

// ── Publishing & Scaling Phases ───────────────────────────────────
export const publishingPhases = [
  { phase: "Phase 1 — Launch", period: "Days 1–30", uploads: "1 Short/day", team: "Solo", focus: "Format validation, hook testing, audience signal capture", triggers: "Hit 50K total views → move to Phase 2", actions: ["Publish 30 Shorts in 30 days — no exceptions", "Test 5 different content formats (story, fact, debate, ranking, news)", "Track AVD and completion rate per format", "Identify top 3 performing topics by view velocity", "Set up cross-posting pipeline: TikTok + Instagram Reels"] },
  { phase: "Phase 2 — Validation", period: "Months 2–3", uploads: "1–2 Shorts/day", team: "Solo + AI tools", focus: "Double down on winning formats, kill underperformers", triggers: "3 Shorts exceed 50K views → move to Phase 3", actions: ["Increase posting to 1.5/day average (45/month)", "Allocate 60% of uploads to top-performing format", "A/B test hook styles: curiosity vs shock vs authority", "Begin building content backlog (10 Shorts ahead of schedule)", "Launch first evergreen playlist to capture search traffic"] },
  { phase: "Phase 3 — Growth", period: "Months 4–6", uploads: "2 Shorts/day", team: "Solo + freelance editor", focus: "Scale output, introduce long-form experiments, monetize", triggers: "Reach 5K subs + consistent 100K views/Short → Phase 4", actions: ["Scale to 60 Shorts/month with freelance editor support", "Introduce weekly 3–5 min long-form video (10–30x RPM)", "Apply for YPP, set up affiliate links in descriptions", "First brand deal outreach at 5K subscribers", "Build Notion content calendar with 30-day rolling pipeline"] },
  { phase: "Phase 4 — World Cup Scale-Up", period: "WC 2026 Window", uploads: "3+ Shorts/day", team: "Solo + 1–2 editors", focus: "Maximum output during peak traffic. Tournament = 30-day sprint.", triggers: "Tournament ends → transition to Phase 5", actions: ["Pre-produce 20+ WC Shorts before tournament starts", "Post 3 Shorts/day minimum during group + knockout stages", "Create daily recap + prediction + fact format trilogy", "Monitor trending topics hourly via Google Trends + X/Twitter", "Cross-post aggressively: YouTube, TikTok, IG, Facebook Reels"] },
  { phase: "Phase 5 — Post-WC Expansion", period: "Month 7+", uploads: "2 Shorts/day + 2 long-form/week", team: "2–3 team members", focus: "Diversify content, build media brand, scale revenue", triggers: "Ongoing — optimize for LTV not virality", actions: ["Shift content mix: 40% evergreen, 30% stories, 20% debate, 10% news", "Launch Channel Memberships at 10K+ subs", "Produce monthly mini-documentary (5–10 min)", "Build email newsletter for sponsor leverage", "Evaluate channel partnership or acquisition value"] },
];

// ── Viral Hook Library ────────────────────────────────────────────
export const hookCategories = [
  { type: "Curiosity Hooks", psychology: "Exploits the information gap — the brain cannot tolerate an unresolved question. Viewers must watch to close the loop.", color: "info",
    hooks: ["\"Nobody talks about what happened after this goal…\"", "\"This player has a secret that FIFA tried to hide.\"", "\"There's a reason this World Cup moment was erased from TV.\"", "\"What happened in the tunnel changed football forever.\"", "\"The rule that exists because of one single player.\"", "\"This transfer fee makes no sense — until you see why.\""] },
  { type: "Contrarian Hooks", psychology: "Challenges existing beliefs, triggering cognitive dissonance. Viewers engage to defend or update their worldview — either way, they watch.", color: "warning",
    hooks: ["\"Messi is not the GOAT — and the stats prove it.\"", "\"The Premier League is actually the worst league for development.\"", "\"VAR has made football objectively worse. Here's the proof.\"", "\"Ronaldo's best season wasn't at Real Madrid.\"", "\"The World Cup nobody wanted to watch — and it was the best one.\"", "\"Guardiola's tactics are overrated. Here's why.\""] },
  { type: "Shock Hooks", psychology: "Activates the amygdala — fight-or-flight response creates involuntary attention. The brain prioritizes threatening or unexpected information.", color: "danger",
    hooks: ["\"This goalkeeper was SHOT during a match.\"", "\"A referee was MURDERED after a World Cup call.\"", "\"This player was worth $150M — then disappeared completely.\"", "\"The match where 149 own goals were scored on purpose.\"", "\"This club signed a player who didn't exist.\"", "\"A footballer was banned for biting opponents — three times.\""] },
  { type: "Authority / Data Hooks", psychology: "Leverages social proof and numerical specificity. Precise data signals credibility and gives the viewer a framework to evaluate the claim.", color: "success",
    hooks: ["\"92% of football fans get this question wrong.\"", "\"Only 3 players in history have done this.\"", "\"According to FIFA's own data, this should be impossible.\"", "\"The stat that proves who the real GOAT is.\"", "\"$4.7 billion — that's how much one World Cup costs.\"", "\"This player's xG says he should have scored 40 more goals.\""] },
  { type: "Story / Emotional Hooks", psychology: "Activates mirror neurons and empathy circuits. Humans are wired for narrative — a character + conflict + stakes structure is irresistible.", color: "info",
    hooks: ["\"He went from sleeping on a park bench to scoring in a World Cup final.\"", "\"The moment this player's mother collapsed in the stands.\"", "\"He was told he'd never walk again. 18 months later, he scored the winning goal.\"", "\"This footballer gave away his entire salary — every month, for 10 years.\"", "\"The night a goalkeeper saved his country — and nobody thanked him.\"", "\"This player retired at 19 from anxiety. Then came back and won everything.\""] },
  { type: "World Cup / Event Hooks", psychology: "Combines temporal urgency (happening NOW) with tribal identity (national pride). Creates FOMO — fear of missing out on a shared cultural moment.", color: "warning",
    hooks: ["\"This 2026 group is already being called the Group of Death.\"", "\"The host nation has NEVER been eliminated this early.\"", "\"This World Cup rule change could decide the entire tournament.\"", "\"Every expert is wrong about this team — here's why.\"", "\"The World Cup moment that happens once every 40 years.\"", "\"This country brought 200,000 fans — and they're louder than the stadium.\""] },
  { type: "Rivalry / Drama Hooks", psychology: "Activates in-group/out-group tribal psychology. Rivalry content forces viewers to pick a side — and defend it in comments, driving algorithmic engagement.", color: "danger",
    hooks: ["\"Mourinho looked Guardiola in the eye and said THIS.\"", "\"The handshake that ended a 20-year friendship.\"", "\"This derby had 5 red cards, 2 fights, and one manager fired.\"", "\"He celebrated in front of his ex-club's fans — and meant every second.\"", "\"The transfer that made enemies out of best friends.\"", "\"When the entire stadium booed their own captain.\""] },
];

// ── Script Engineering Framework ──────────────────────────────────
export const scriptStages = [
  { stage: "First-Second Hook", time: "0–1.5s", purpose: "Stop the scroll. You have 1.5 seconds before the viewer swipes. This is not an introduction — it is an interruption.", psychology: "Pattern interrupt: the brain is in passive scroll mode. Your hook must violate expectations to trigger active attention.", rules: ["Lead with the most shocking/curious element of the entire story", "Never start with context, background, or \"today we're going to talk about\"", "Use a direct address or impossible claim", "Visual: immediate motion, face close-up, or dramatic text overlay"], example: "\"A goalkeeper was SHOT during a live match.\"" },
  { stage: "Supporting Hook", time: "1.5–5s", purpose: "Confirm the hook is worth watching. The viewer has paused — now justify their attention with a second layer of intrigue.", psychology: "Commitment escalation: once the viewer has invested 2 seconds, they need a reason to stay. The supporting hook raises the stakes.", rules: ["Add a specific detail that makes the story feel real and verified", "Introduce a character, a number, or a location", "Do NOT reveal the payoff yet — deepen the mystery"], example: "\"It was the 1994 World Cup qualifier. The score was 2–1. And what happened next changed FIFA forever.\"" },
  { stage: "Curiosity Loop", time: "5–15s", purpose: "Create nested open loops that make it psychologically uncomfortable to stop watching.", psychology: "Zeigarnik Effect: the brain remembers uncompleted tasks better than completed ones. Each open loop creates cognitive tension that demands resolution.", rules: ["Introduce 2–3 unanswered questions within 10 seconds", "Use phrases like \"but that's not the worst part\" or \"what nobody knew was...\"", "Layer mystery: answer one question while opening another"], example: "\"The player was offered $10 million to throw the game. He refused. But the people who paid didn't take no for an answer.\"" },
  { stage: "Narrative Arc", time: "15–40s", purpose: "Deliver the core story with escalating tension. Every sentence must either advance the plot or raise the emotional stakes.", psychology: "Dopamine anticipation: the brain releases dopamine not at the reward, but during the anticipation of reward. Delay the payoff while increasing tension.", rules: ["Use short, punchy sentences — 8–12 words max per line", "Include at least one reversal (\"but then everything changed\")", "Build to a single climactic moment — the peak of the story", "Every 5 seconds, give a reason to keep watching"], example: "\"He scored the equaliser in the 89th minute. / The crowd went silent. / Because the goal meant his own team was eliminated.\"" },
  { stage: "Payoff & Close", time: "40–60s", purpose: "Deliver the emotional resolution, then immediately create a reason to watch the next video or rewatch this one.", psychology: "Peak-end rule: people judge experiences by the peak moment and the final moment. A strong ending creates positive memory association with your channel.", rules: ["Deliver the revelation clearly — do not leave the viewer confused", "End with a provocative question or call to comment (\"Do you agree?\")", "Final frame: subscribe CTA + channel name + related video suggestion", "Never end weakly — the last 3 seconds determine whether they follow you"], example: "\"He never played professional football again. / But his one goal changed the offside rule forever. / What rule would YOU change? Comment below.\"" },
];

export const retentionTechniques = [
  { name: "Pattern Interrupt", desc: "Every 3–5 seconds, change something: cut angle, zoom, text overlay, sound effect, voice inflection. Monotony = swipe.", metric: "+15–25% completion rate" },
  { name: "Open Loop Stacking", desc: "Never close a story thread without opening another. The viewer should always have at least one unresolved question at any moment.", metric: "+20–40% watch time" },
  { name: "Specificity Anchoring", desc: "Replace vague claims with precise data points. \"He scored a lot\" → \"He scored 47 goals in 38 matches.\" Specificity signals credibility and locks attention.", metric: "+10–15% rewatch rate" },
  { name: "Emotional Oscillation", desc: "Alternate between positive and negative emotional beats. Joy → shock → admiration → disbelief. Flat emotional lines lose viewers.", metric: "+30% completion rate" },
  { name: "Visual Velocity", desc: "Never hold a single visual for more than 2.5 seconds on Shorts. Cut, zoom, pan, or overlay. Static frames = instant swipe on mobile.", metric: "+25% avg view duration" },
  { name: "Rewatch Hooks", desc: "Embed a detail early in the video that only makes sense after the payoff. Viewers who notice will rewatch — and rewatches are the #1 algorithm signal.", metric: "+50–100% algorithmic boost" },
];

// ── World Cup 2026 Execution Blueprint ────────────────────────────
export const wcPhases = [
  { phase: "Pre-Tournament", period: "May 1 – Jun 10, 2026", freq: "1–2 Shorts/day", color: "info",
    priorities: ["Group draw analysis and predictions", "Team preview series (48 teams × 1 Short each = 48-video backlog)", "Host city guides (16 venues)", "Historical WC parallels and narratives", "Kit rankings, mascot content, anthem compilations"],
    audience: "Search traffic begins ramping 30 days before kickoff. Viewers are researching teams, players, and schedules. Optimise for informational search queries.",
    monetization: "Low direct revenue but critical for subscriber acquisition. Every subscriber gained here will generate views throughout the tournament." },
  { phase: "Group Stage", period: "Jun 11 – Jun 28, 2026", freq: "3–4 Shorts/day", color: "success",
    priorities: ["Daily match recaps within 2 hours of final whistle", "Instant reaction Shorts to controversial moments", "Daily group standings update with elimination scenarios", "Player of the day / goal of the day series", "Meme-worthy moment compilations"],
    audience: "Peak casual viewer engagement. Many viewers are watching football for the first time. Content must be accessible, not niche. Explain context, don't assume knowledge.",
    monetization: "Shorts RPM spikes 2–3x during major tournaments due to advertiser demand. Volume is everything — more Shorts = more revenue. This is the highest-output window." },
  { phase: "Knockout Stage", period: "Jun 29 – Jul 9, 2026", freq: "3–5 Shorts/day", color: "warning",
    priorities: ["Pre-match predictions for every knockout tie", "Post-match dramatic recaps with narrative framing", "Penalty shootout history and psychology content", "\"What happens if...\" scenario Shorts", "Player drama: pressure moments, tears, celebrations"],
    audience: "Emotional intensity peaks. Viewers are invested in specific teams. Tribal content (\"Why [team] will win/lose\") drives massive engagement. Comment sections become battlegrounds.",
    monetization: "Sponsor outreach peaks — brands want to associate with tournament content. Ideal window for first paid partnership." },
  { phase: "Semi-Finals & Final", period: "Jul 10 – Jul 19, 2026", freq: "4–6 Shorts/day", color: "danger",
    priorities: ["Build narrative arcs for remaining teams", "Historic parallels (\"Last time [country] reached a final...\")", "Live reaction-style content during matches", "Pre-final prediction + post-final recap (viral potential: EXTREME)", "\"Greatest World Cup ever?\" wrap-up content"],
    audience: "Global attention at absolute peak. Single Shorts can reach 1–10M views. Every piece of content has viral potential. Prioritise speed over polish — first to publish wins.",
    monetization: "Highest RPM window. Highest brand deal value. Highest affiliate conversion rates. This is the financial peak of the year." },
  { phase: "Post-Tournament", period: "Jul 20 – Aug 31, 2026", freq: "1–2 Shorts/day", color: "info",
    priorities: ["Tournament retrospective series", "Best goals, saves, moments compilations", "Player of the tournament deep dive", "Transfer window pivot: WC performances → transfer rumours", "Evergreen documentary Shorts from tournament stories"],
    audience: "Casual viewers drop off but engaged subscribers remain. This is the retention test — content must transition smoothly from event-driven to evergreen storytelling.",
    monetization: "Revenue normalises. Focus shifts to long-term subscriber value. Begin long-form content experiments to capture higher RPM." },
];

// ── Performance KPI Dashboard ─────────────────────────────────────
export const kpis = [
  { metric: "Average View Duration", desc: "How long viewers watch before swiping away", poor: "<30%", avg: "30–50%", good: "50–70%", elite: "70–85%", worldClass: ">85%" },
  { metric: "Completion Rate", desc: "% of viewers who watch the entire Short", poor: "<15%", avg: "15–30%", good: "30–50%", elite: "50–65%", worldClass: ">65%" },
  { metric: "Rewatch Rate", desc: "% of views that are repeat watches", poor: "<2%", avg: "2–5%", good: "5–10%", elite: "10–20%", worldClass: ">20%" },
  { metric: "Views per Short", desc: "Average views within first 48 hours", poor: "<1K", avg: "1K–10K", good: "10K–100K", elite: "100K–1M", worldClass: ">1M" },
  { metric: "Subscriber Conv.", desc: "New subs per 1,000 views", poor: "<0.5", avg: "0.5–1.5", good: "1.5–3", elite: "3–6", worldClass: ">6" },
  { metric: "Returning Viewers", desc: "% of viewers who have watched before", poor: "<10%", avg: "10–20%", good: "20–35%", elite: "35–50%", worldClass: ">50%" },
  { metric: "Channel Velocity", desc: "Subscriber growth rate per 30 days", poor: "<100/mo", avg: "100–500", good: "500–2K", elite: "2K–10K", worldClass: ">10K/mo" },
  { metric: "Engagement Rate", desc: "Likes + comments per 1,000 views", poor: "<10", avg: "10–25", good: "25–50", elite: "50–100", worldClass: ">100" },
];

// ── 90-Day Operator Roadmap ───────────────────────────────────────
export const ninetyDayPlan = [
  { week: "Week 1", obj: "Foundation & First Publish", uploads: 5, research: "Set up Notion database, identify 50 content ideas, study top 10 competitors", test: "Publish first 5 Shorts — test story, fact, ranking, news, debate formats", milestone: "Channel fully branded, 5 Shorts live" },
  { week: "Week 2", obj: "Daily Publishing Rhythm", uploads: 7, research: "Analyse Week 1 performance: which format got highest AVD?", test: "Commit to 1 Short/day. Test 3 different hook styles per format.", milestone: "14-day streak, identify best-performing format" },
  { week: "Week 3", obj: "Hook Optimisation", uploads: 7, research: "Study top 5 performing Shorts from competitor channels — reverse-engineer hooks", test: "A/B test curiosity vs shock hooks on similar topics", milestone: "One Short exceeds 5K views" },
  { week: "Week 4", obj: "First Month Review", uploads: 7, research: "Full analytics review: AVD, completion rate, sub conversion, top topics", test: "Kill lowest-performing format. Double allocation to winner.", milestone: "26+ Shorts published, 10K+ total views, clear format winner identified" },
  { week: "Week 5–6", obj: "Scale Format Winner", uploads: 14, research: "Deep-dive into winning format's top performers. What topic + hook combination works?", test: "Increase to 1.5 Shorts/day. Test 90-second format alongside 60-second.", milestone: "First Short exceeds 25K views" },
  { week: "Week 7–8", obj: "Content Backlog & Systems", uploads: 14, research: "Build 2-week content backlog. Set up template system for scripts, visuals, uploads.", test: "Test posting times: 12pm ET vs 3pm ET vs 6pm ET", milestone: "50+ total Shorts, 100K+ total views, 200+ subscribers" },
  { week: "Week 9–10", obj: "Cross-Platform Expansion", uploads: 14, research: "Set up TikTok + Instagram Reels reposts. Study platform-specific performance.", test: "Same content, 3 platforms — track which platform amplifies YouTube", milestone: "Active on 3 platforms, 500+ subscribers across all" },
  { week: "Week 11–12", obj: "Monetisation Prep", uploads: 14, research: "Research YPP requirements. Set up affiliate links. Draft first brand outreach email.", test: "Test first long-form video (3–5 min) to gauge retention difference", milestone: "80+ Shorts, 500K+ total views, 500+ YouTube subscribers" },
  { week: "Week 13", obj: "90-Day Strategic Review", uploads: 7, research: "Full channel audit: best topics, best hooks, best posting times, audience demographics", test: "Decision checkpoint: continue, pivot format, or adjust niche positioning", milestone: "90+ Shorts published, format validated, growth trajectory established" },
];

// ── Brand Philosophy & Editorial Framework ────────────────────────
export const brandPhilosophy = {
  vision: "To become one of the world's leading football storytelling brands by creating content that informs, entertains, and inspires global audiences. The long-term objective is to build a modern football media company that extends beyond social media and operates across multiple content formats, platforms, and business verticals.",
  mission: "To transform football information into compelling stories that generate curiosity, emotion, discussion, and perspective.",
  missionOutcomes: ["A new insight", "A stronger emotional connection", "A surprising discovery", "A topic worth discussing", "A story worth sharing"],
  positioning: "The brand occupies a unique position at the intersection of: Football Journalism, Documentary Storytelling, Sports Business Media, Internet Culture, Data & Research, and Audience Psychology.",
  corePhilosophy: "Every content decision must answer one fundamental question: Why would someone who was not actively searching for football choose to watch this story? If a topic cannot create interest beyond existing football fans, it does not meet the publication standard. The strongest stories connect football with broader themes such as Competition, Leadership, Innovation, Economics, Culture, Identity, Human Achievement, and Global Events.",
  longTermObjective: "The goal is not to build a football channel. The goal is to build a globally recognized football media brand capable of transforming football information into stories that audiences actively choose to watch, share, discuss, and remember."
};

export const editorialCriteria = [
  { criteria: "Importance", desc: "The story has meaningful consequences for football.", examples: ["Regulatory changes", "Major transfers", "Tournament developments", "Industry shifts"] },
  { criteria: "Interest", desc: "The story contains unusual, overlooked, or unexpected information.", examples: ["Hidden business strategies", "Rare records", "Unique club models", "Little-known historical events"] },
  { criteria: "Emotion", desc: "The story generates a strong emotional response.", examples: ["Underdog journeys", "National team success", "Career revivals", "Personal sacrifice"] },
  { criteria: "Surprise", desc: "The story challenges expectations or reveals something unexpected.", examples: ["Contrarian insights", "Industry secrets", "Unusual statistics", "Hidden influences"] },
  { criteria: "Relevance", desc: "The story contributes to ongoing football conversations.", examples: ["World Cup narratives", "Trending clubs", "Emerging players", "Current controversies"] },
];

export const contentPillarsV2 = [
  { name: "Global Football & International Competitions", share: "35–40%", focus: "FIFA World Cup, Continental tournaments, National team development, Qualification campaigns, International football culture, Tournament storylines", objective: "Generate large-scale audience interest through globally relevant football narratives." },
  { name: "Narrative-Driven Football News", share: "20%", focus: "Transfers, Regulatory changes, Industry developments, Club decisions", objective: "Never report news. Interpret news through storytelling. The audience should remember the implications of the story, not the headline itself." },
  { name: "Football Business, Innovation & Economics", share: "15%", focus: "Sportswear brands, Football finance, Sponsorships, Ownership structures, Stadium development, Technology and analytics", objective: "Expand beyond traditional football coverage and differentiate the brand through high-value, curiosity-driven content." },
  { name: "Curiosity & Discovery", share: "15%", focus: "Rare events, Hidden stories, Unexpected records, Unexplained football phenomena", objective: "Create powerful information gaps that encourage viewers to continue watching until the final second." },
  { name: "Football Culture & Documentary Storytelling", share: "10%", focus: "Fan culture, Football communities, Historical events, National football identities, Human-interest stories", objective: "Create evergreen content with strong emotional resonance and long-term relevance." },
  { name: "Strategy, Rebuilds & Competitive Cycles", share: "5–10%", focus: "Club rebuilding projects, Long-term planning, Squad construction, Financial recovery, Competitive strategy", objective: "Generate discussion among highly engaged football audiences while showcasing deeper industry understanding." },
];

export const audiencePsychology = {
  primaryDrivers: ["Curiosity", "Surprise", "Controversy", "Fear", "Hope"],
  principle: "Every piece of content should intentionally leverage at least one psychological driver. The highest-performing content typically combines multiple psychological drivers within a single narrative structure."
};

export const storyStructureV2 = [
  { stage: "Hook", time: "0–3 Seconds", purpose: "Capture attention immediately. Create an information gap. Establish curiosity." },
  { stage: "Context", time: "3–10 Seconds", purpose: "Introduce the story. Explain relevance. Create audience investment." },
  { stage: "Escalation", time: "10–35 Seconds", purpose: "Increase tension. Present obstacles, conflict, or unexpected developments. Expand the narrative." },
  { stage: "Resolution", time: "35–50 Seconds", purpose: "Deliver the promised answer. Provide value. Resolve the central question." },
  { stage: "Reflection", time: "Final Seconds", purpose: "Encourage discussion. Generate comments. Leave viewers with a memorable takeaway." },
];

export const contentQualityStandards = {
  visual: ["The visual experience should maintain continuous stimulation and information density.", "No visual element should remain static for an extended period.", "Content should combine: Match footage, Historical footage, Photography, Graphics, Statistics, Maps, Headlines, Social media references, Motion graphics.", "Every visual element must serve a narrative purpose. Visuals should support the story rather than distract from it."],
  editorialPriorities: ["Story > Information", "Narrative > News", "Emotion > Facts", "Curiosity > Explanation", "Retention > Complexity"],
  principle: "The audience should remember the story before they remember the statistic."
};

export const distributionStrategy = {
  approach: "Content is developed using a multi-platform-first approach. Each story should be capable of generating multiple content formats and distribution opportunities across the entire ecosystem.",
  primary: ["YouTube Shorts", "YouTube Long-Form", "Instagram Reels", "TikTok", "X"],
  expansion: ["Website", "Newsletter", "Podcast", "Strategic Partnerships"]
};

export const competitors = [
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

export const viralIdeas = [
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

export const worldCupIdeas = [
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

export const evergreenIdeas = [
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

export const tools = [
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

export const resources = [
    { name: "Sofascore", type: "Match Data", price: "Free", rel: "", use: "Live scores, player ratings, detailed match statistics" },
    { name: "FBref.com", type: "Statistics", price: "Free", rel: "", use: "Advanced football stats, historical data, player comparison — powered by StatsBomb" },
    { name: "Transfermarkt", type: "Transfer/Value", price: "Free", rel: "", use: "Player market values, transfer history, contract data — essential for transfer content" },
    { name: "WhoScored.com", type: "Statistics", price: "Free", rel: "", use: "Match and player ratings, formation analysis" },
    { name: "BBC Sport / Sky Sports", type: "News", price: "Free", rel: "", use: "Breaking news, official statements, injury updates" },
    { name: "The Athletic", type: "Deep News", price: "$12/mo", rel: "", use: "Exclusive behind-the-scenes stories, excellent for documentary content ideas" },
    { name: "FIFA Media Library", type: "Images/Video", price: "Free (licensed)", rel: "", use: "Official FIFA content, historical World Cup footage — requires media accreditation" },
    { name: "Getty Images / Shutterstock", type: "Images", price: "$30–150/mo", rel: "", use: "Licensed football photography — essential for legal thumbnails and B-roll stills" },
    { name: "Pixabay / Unsplash", type: "Images", price: "Free", rel: "", use: "Generic sports backgrounds, crowd shots, atmosphere photography" },
    { name: "YouTube Audio Library", type: "Music", price: "Free", rel: "", use: "Copyright-free background music for all content" },
    { name: "Artlist.io", type: "Music", price: "$199/yr", rel: "", use: "Best licensed music library for sports content, no claim issues" },
    { name: "ESPN Stats & Info API", type: "API", price: "Media partners", rel: "", use: "Real-time sports data for graphics overlays" },
    { name: "SportMonks API", type: "API", price: "$25+/mo", rel: "", use: "Live football data API for data-driven Short graphics" },
    { name: "RSSSF", type: "Historical", price: "Free", rel: "", use: "Historical football records, results archives going back to 1800s" },
    { name: "Wikidata / Wikipedia", type: "Reference", price: "Free", rel: "", use: "Player biographies, club histories, verified facts for scripts" },
  ];

export const sectionGroups = [
  { group: "CORE STRATEGY", items: [
    { id: "overview", label: "Executive Summary", icon: "ti-layout-dashboard" },
    { id: "content", label: "Content Architecture", icon: "ti-building" },
    { id: "roadmap", label: "90-Day Roadmap", icon: "ti-map-2" },
  ]},
  { group: "INTELLIGENCE", items: [
    { id: "competitors", label: "Competitive Intel", icon: "ti-target" },
    { id: "viral", label: "Viral Intelligence", icon: "ti-bolt" },
    { id: "worldcup", label: "World Cup 2026", icon: "ti-trophy" },
  ]},
  { group: "PRODUCTION", items: [
    { id: "scripting", label: "Story Structure", icon: "ti-file-text" },
    { id: "production", label: "Production System", icon: "ti-video" },
    { id: "promptsuite", label: "Scripting Engine", icon: "ti-wand" },
    { id: "generator", label: "Synthesis Chat", icon: "ti-messages" },
    { id: "publishing", label: "Publishing & Scale", icon: "ti-rocket" },
  ]},
  { group: "OPERATIONS", items: [
    { id: "kpis", label: "Performance KPIs", icon: "ti-gauge" },
    { id: "monetization", label: "Monetization", icon: "ti-currency-dollar" },
    { id: "copyright", label: "Copyright & Safety", icon: "ti-shield-check" },
    { id: "resources", label: "Resources", icon: "ti-database" },
  ]},
];
