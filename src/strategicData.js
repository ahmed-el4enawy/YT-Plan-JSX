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
