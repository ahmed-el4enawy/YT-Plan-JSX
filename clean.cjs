const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(
  /import \{ subNiches[\s\S]*?from "\.\/strategicData\.js";/,
  'import { publishingPhases, hookCategories, retentionTechniques, wcPhases, kpis, ninetyDayPlan, contentPillarsV2, storyStructureV2, distributionStrategy } from "./strategicData.js";'
);

code = code.replace(
  /const sectionGroups = \[[\s\S]*?\];/,
  `const sectionGroups = [
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
];`
);

code = code.replace(/case "philosophy":[\s\S]*?case "competitors":/g, 'case "competitors":');
code = code.replace(/case "psychology":[\s\S]*?case "viral":/g, 'case "viral":');

fs.writeFileSync('src/App.jsx', code);
console.log("Cleaned App.jsx successfully.");
