import { useState } from "react";

const inputStyle = {
  width: "100%",
  fontFamily: "var(--font-sans)",
  fontSize: "13px",
  color: "var(--color-text-primary)",
  background: "var(--color-background-secondary)",
  border: "0.5px solid var(--color-border-secondary)",
  borderRadius: "var(--border-radius-md)",
  padding: "7px 10px",
  outline: "none",
  resize: "none"
};

const labelStyle = {
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--color-text-secondary)",
  textTransform: "uppercase",
  letterSpacing: ".04em",
  marginBottom: "4px",
  display: "block"
};

const Field = ({ label, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const Row = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%" }}>
    {children}
  </div>
);

const Badge = ({ children, color }) => {
  let bg, text;
  if (color === "danger") { bg = "var(--color-background-danger)"; text = "var(--color-text-danger)"; }
  else if (color === "info") { bg = "var(--color-background-info)"; text = "var(--color-text-info)"; }
  else if (color === "success") { bg = "var(--color-background-success)"; text = "var(--color-text-success)"; }
  else if (color === "warning") { bg = "var(--color-background-warning)"; text = "var(--color-text-warning)"; }
  else { bg = "var(--color-background-secondary)"; text = "var(--color-text-primary)"; }

  return (
    <span style={{
      display: "inline-block",
      fontSize: "11px",
      padding: "2px 8px",
      borderRadius: "4px",
      fontWeight: 500,
      marginLeft: "auto",
      background: bg,
      color: text,
      border: `0.5px solid ${text.replace('text', 'border')}`
    }}>
      {children}
    </span>
  );
};

const BlockHeader = ({ title, sub, icon, badgeText, color }) => {
  let iconBg, iconColor;
  if (color === "danger") { iconBg = "var(--color-background-danger)"; iconColor = "var(--color-text-danger)"; }
  else if (color === "info") { iconBg = "var(--color-background-info)"; iconColor = "var(--color-text-info)"; }
  else if (color === "success") { iconBg = "var(--color-background-success)"; iconColor = "var(--color-text-success)"; }
  else if (color === "warning") { iconBg = "var(--color-background-warning)"; iconColor = "var(--color-text-warning)"; }
  
  return (
    <div style={{ padding: "1rem 1.25rem", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "var(--border-radius-md)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0, background: iconBg, color: iconColor }}>
        <i className={icon} aria-hidden="true"></i>
      </div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--color-text-primary)" }}>{title}</div>
        <div style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "1px" }}>{sub}</div>
      </div>
      <Badge color={color}>{badgeText}</Badge>
    </div>
  );
};

const Block = ({ children }) => (
  <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: "var(--border-radius-lg)", overflow: "hidden", marginBottom: "2rem" }}>
    {children}
  </div>
);

export default function PromptSuite() {
  const [globalChannel, setGlobalChannel] = useState("Ninety Football");
  const [globalNiche, setGlobalNiche] = useState("Football / Soccer");

  // Script State
  const [sType, setSType] = useState("YouTube Shorts");
  const [sTone, setSTone] = useState("Energetic and cinematic");
  const [sTopic, setSTopic] = useState("");
  const [sAudience, setSAudience] = useState("");
  const [sLength, setSLength] = useState("");
  const [sWords, setSWords] = useState("");
  const [sKw, setSKw] = useState("");
  const [sInfo, setSInfo] = useState("");
  const [scriptOut, setScriptOut] = useState("Fill in the fields above and click \"Generate script prompt\" to build your professional prompt.");

  // Idea State
  const [iComp, setIComp] = useState("");
  const [iLen, setILen] = useState("");
  const [iFmt, setIFmt] = useState("YouTube Shorts (under 1 min)");
  const [ideaOut, setIdeaOut] = useState("Fill in the fields above and click \"Generate idea prompt\".");

  // Luma State
  const [lFocus, setLFocus] = useState("");
  const [lSubjects, setLSubjects] = useState("");
  const [lMood, setLMood] = useState("");
  const [lStyle, setLStyle] = useState("");
  const [lumaOut, setLumaOut] = useState("Fill in the fields above and click \"Generate LumaLabs prompt\".");

  // Voice State
  const [vScript, setVScript] = useState("");
  const [vPace, setVPace] = useState("Fast (1.5×)");
  const [vChar, setVChar] = useState("Storytelling, educational, slightly deep");
  const [voiceOut, setVoiceOut] = useState("Fill in the fields above and click \"Generate voice prompt\".");

  const [copied, setCopied] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const genScript = () => {
    const ch = globalChannel || "[Channel Name]";
    const ni = globalNiche || "[Niche]";
    const sub = sTopic || "[Topic]";
    const au = sAudience || "[Target Audience]";
    const le = sLength || "[Length]";
    const wc_line = sWords ? ` — total script length must be strictly ${sWords} words. Do not exceed or fall short.` : "";
    const kw_line = sKw ? `\nKeywords to weave in naturally: ${sKw}.` : "";
    const info_line = sInfo ? `\n\nBACKGROUND INFO / DATA TO INCLUDE:\n${sInfo}` : "";

    const out = `You are an elite YouTube scriptwriter specialising in the ${ni} niche, with a deep understanding of short-form retention psychology and viral storytelling.

Write a complete ${sType} script for the channel "${ch}". The script must be ${sTone} and must hold the viewer from the very first frame to the very last word.

Topic: ${sub}

TARGET AUDIENCE: ${au}

RUNTIME: ${le} minutes${wc_line}${kw_line}${info_line}

STRUCTURE THE SCRIPT IN FOUR NAMED PARTS (use these exact part labels as plain inline text — do not use generic labels like "Hook" or "Call to Action"):

Part 1 [give it a content-specific name]: The opening statement. Hit immediately with a visceral fact, a counter-intuitive claim, or a provocative question that forces the viewer to keep watching. No preamble, no greeting.

Part 2 [give it a content-specific name]: The setup. Establish why this topic matters right now and what the viewer will gain by watching to the end. Create a knowledge gap they need to close.

Part 3 [give it a content-specific name]: The core revelation. Deliver the main value through storytelling, vivid examples, or a step-by-step breakdown. Build tension toward a twist or unexpected insight. Include clear transitions between each beat.

Part 4 [give it a content-specific name]: The close. Land the payoff with a memorable final line, then issue a natural, non-pushy call to action that fits the tone of the video.

STRICT FORMATTING RULES — every rule is non-negotiable:
- No blank or empty lines anywhere in the script.
- No question marks or exclamation marks.
- No em-dashes, en-dashes, or pause marks such as [-] or [...].
- Permitted punctuation only: comma and full stop.
- No section labels such as Hook, Intro, CTA, or Outro — replace every label with its content-specific name as shown above.
- No Intro or Outro headlines of any kind.
- Transitions between parts must be seamless and feel completely natural when spoken aloud.
- Write for the ear, not the eye. Every sentence must sound fluid at speaking pace.

Now write the full script.`;
    setScriptOut(out);
  };

  const genIdea = () => {
    const ch = globalChannel || "[Channel Name]";
    const ni = globalNiche || "[Niche]";
    const comp = iComp || "[Competitor Topics]";
    const len = iLen || "1";

    const out = `You are a viral content strategist with a proven track record of engineering YouTube breakout hits in the ${ni} space.

Channel: "${ch}" — Niche: ${ni}

My competitors published these viral videos recently:
${comp}

Your task: generate 10 completely original video ideas that are inspired by the emotional and structural DNA of those videos, but are distinct enough to own their own lane and feel fresh to the audience.

Each idea must be designed for the ${iFmt} format and target a runtime of approximately ${len} minute(s).

For each idea, deliver all four of the following — no exceptions:

1. VIDEO TITLE — punchy, curiosity-driven, optimised for click-through rate. No clickbait that the video cannot deliver on.
2. CONTENT CONCEPT — one sentence that describes exactly what the viewer experiences from start to finish.
3. VIRAL POTENTIAL ANALYSIS — explain specifically which psychological triggers make this idea shareable. Reference at least two of the following: curiosity gap, emotional resonance, social identity, shock value, aspirational pull, nostalgia, controversy, or insider knowledge.
4. UNIQUE ANGLE — what makes this version of the idea impossible for competitors to replicate without copying directly.

Format each idea clearly under a numbered heading. Do not include generic filler or vague suggestions. Every idea must be immediately actionable for a production team.`;
    setIdeaOut(out);
  };

  const genLuma = () => {
    const focus = lFocus || "[Main Focus]";
    const subj = lSubjects || "[Key Subjects]";
    const mood = lMood || "[Mood]";
    const style = lStyle || "[Art Style]";
    const ni = globalNiche || "football";

    const out = `Create a cinematic still featuring ${focus}, incorporating ${subj} as supporting elements. The overall mood is ${mood} — every visual cue from lighting to color grade should reinforce this emotion without over-explaining it. The aesthetic is ${style}. The subject should be framed as the undisputed focal point, with background elements adding depth and context to the ${ni} world without competing for attention. Lens compression should feel like a 85mm–135mm prime at shallow depth of field. Color palette should feel intentional and consistent, not random. Render at 16:9 aspect ratio, production-ready for use as a YouTube thumbnail or video B-roll frame.`;
    setLumaOut(out);
  };

  const genVoice = () => {
    const intro = vScript ? `Read the following script aloud:\\n\\n"""\\n${vScript}\\n"""` : "[Paste your script here before copying]";

    const out = `${intro}

VOICE DIRECTION:
- Delivery style: ${vChar}.
- Pacing: ${vPace} — maintain this pace from the first word to the last with zero deceleration.
- No pauses between sentences or paragraphs. Transitions should be completely seamless, as if one continuous thought.
- No filler sounds, breath noises, or unnatural hesitations.
- Emphasis should feel organic, not robotic — stress words that carry meaning, not every other word.
- The listener should feel they are being spoken to directly by someone who genuinely believes every word they are saying.
- Maintain consistent energy and vocal presence throughout. Do not fade at the end of sentences.`;
    setVoiceOut(out);
  };

  const buttonStyle = {
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: 500,
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-secondary)",
    borderRadius: "var(--border-radius-md)",
    cursor: "pointer",
    color: "var(--color-text-primary)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    justifyContent: "center"
  };

  const outputStyle = {
    margin: "0 1.25rem 1.25rem",
    background: "var(--color-background-secondary)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderRadius: "var(--border-radius-md)",
    padding: "1rem",
    fontSize: "12.5px",
    lineHeight: 1.7,
    color: "var(--color-text-secondary)",
    fontFamily: "var(--font-mono)",
    whiteSpace: "pre-wrap",
    maxHeight: "260px",
    overflowY: "auto"
  };



  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: "1.5rem", marginTop: "2rem", color: "var(--color-text-primary)" }}>Production Scripting Engine</h2>
      
      <div style={{ padding: "1.25rem", background: "var(--color-background-secondary)", borderRadius: "var(--border-radius-lg)", border: "0.5px solid var(--color-border-tertiary)", marginBottom: "1.5rem" }}>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <i className="ti ti-settings" aria-hidden="true"></i> Shared channel details — fill once, applied to all prompts
        </div>
        <Row>
          <Field label="Channel name">
            <input style={inputStyle} value={globalChannel} onChange={e => setGlobalChannel(e.target.value)} placeholder="e.g. Ninety Football" />
          </Field>
          <Field label="Niche">
            <input style={inputStyle} value={globalNiche} onChange={e => setGlobalNiche(e.target.value)} placeholder="e.g. Football / Soccer" />
          </Field>
        </Row>
      </div>

      {/* SCRIPT PROMPT */}
      <Block>
        <BlockHeader title="Script prompt" sub="Generate a full short-form YouTube script" icon="ti-script" badgeText="Prompt 1" color="danger" />
        <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Row>
            <Field label="Video type">
              <select style={inputStyle} value={sType} onChange={e => setSType(e.target.value)}>
                <option>YouTube Shorts</option><option>Long-form educational</option><option>Listicle</option><option>Storytime</option><option>Tutorial</option>
              </select>
            </Field>
            <Field label="Tone / style">
              <select style={inputStyle} value={sTone} onChange={e => setSTone(e.target.value)}>
                <option>Energetic and cinematic</option><option>Calm and educational</option><option>Motivational</option><option>Humorous</option><option>Dramatic storytelling</option>
              </select>
            </Field>
          </Row>
          <Field label="Topic / subject">
            <input style={inputStyle} value={sTopic} onChange={e => setSTopic(e.target.value)} placeholder="e.g. How Messi's left foot changed modern football" />
          </Field>
          <Row>
            <Field label="Target audience">
              <input style={inputStyle} value={sAudience} onChange={e => setSAudience(e.target.value)} placeholder="e.g. Football enthusiasts aged 16–35" />
            </Field>
            <Field label="Video length (mins)">
              <input style={inputStyle} value={sLength} onChange={e => setSLength(e.target.value)} placeholder="e.g. 0:59" />
            </Field>
          </Row>
          <Row>
            <Field label="Word count (optional)">
              <input style={inputStyle} value={sWords} onChange={e => setSWords(e.target.value)} placeholder="e.g. 150" />
            </Field>
            <Field label="Keywords (optional)">
              <input style={inputStyle} value={sKw} onChange={e => setSKw(e.target.value)} placeholder="e.g. dribbling, goals, legacy" />
            </Field>
          </Row>
          <Field label="Info and data for the script (optional)">
            <textarea style={inputStyle} rows={3} value={sInfo} onChange={e => setSInfo(e.target.value)} placeholder="Paste any background information, stats, or specific data from the internet here..." />
          </Field>
        </div>
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "0 1.25rem" }}></div>
        <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "8px", marginBottom: "1rem" }}>
          <button style={{ ...buttonStyle, flex: 1 }} onClick={genScript}><i className="ti ti-wand" aria-hidden="true"></i> Generate script prompt ↗</button>
          <button style={buttonStyle} onClick={() => handleCopy(scriptOut, 'script')}>
            {copied === 'script' ? <><i className="ti ti-check" aria-hidden="true"></i> Copied</> : <><i className="ti ti-copy" aria-hidden="true"></i> Copy</>}
          </button>
        </div>
        <div style={outputStyle}>{scriptOut}</div>
      </Block>

      {/* IDEA GENERATION */}
      <Block>
        <BlockHeader title="Idea generation prompt" sub="Produce 10 viral video concepts from competitor data" icon="ti-bulb" badgeText="Prompt 2" color="info" />
        <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Field label="Competitor viral video topic(s)">
            <textarea style={inputStyle} rows={2} value={iComp} onChange={e => setIComp(e.target.value)} placeholder="e.g. Top 10 cheapest clubs in La Liga, Ronaldo's untold childhood story" />
          </Field>
          <Row>
            <Field label="Target video length (mins)">
              <input style={inputStyle} value={iLen} onChange={e => setILen(e.target.value)} placeholder="e.g. 1" />
            </Field>
            <Field label="Format preference">
              <select style={inputStyle} value={iFmt} onChange={e => setIFmt(e.target.value)}>
                <option>YouTube Shorts (under 1 min)</option><option>Mini-doc (3–5 min)</option><option>Listicle (5–10 min)</option>
              </select>
            </Field>
          </Row>
        </div>
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "0 1.25rem" }}></div>
        <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "8px", marginBottom: "1rem" }}>
          <button style={{ ...buttonStyle, flex: 1 }} onClick={genIdea}><i className="ti ti-wand" aria-hidden="true"></i> Generate idea prompt ↗</button>
          <button style={buttonStyle} onClick={() => handleCopy(ideaOut, 'idea')}>
            {copied === 'idea' ? <><i className="ti ti-check" aria-hidden="true"></i> Copied</> : <><i className="ti ti-copy" aria-hidden="true"></i> Copy</>}
          </button>
        </div>
        <div style={outputStyle}>{ideaOut}</div>
      </Block>

      {/* LUMALABS */}
      <Block>
        <BlockHeader title="Cinematic rendering specs" sub="Cinematic 16:9 visual for thumbnails or B-roll" icon="ti-camera" badgeText="Config 3" color="success" />
        <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Field label="Main focus">
            <input style={inputStyle} value={lFocus} onChange={e => setLFocus(e.target.value)} placeholder="e.g. a football striker celebrating a goal" />
          </Field>
          <Row>
            <Field label="Key subjects / elements">
              <input style={inputStyle} value={lSubjects} onChange={e => setLSubjects(e.target.value)} placeholder="e.g. stadium crowd, floodlights, confetti" />
            </Field>
            <Field label="Mood / emotion">
              <input style={inputStyle} value={lMood} onChange={e => setLMood(e.target.value)} placeholder="e.g. triumphant, electric, cinematic" />
            </Field>
          </Row>
          <Field label="Art style / aesthetic">
            <input style={inputStyle} value={lStyle} onChange={e => setLStyle(e.target.value)} placeholder="e.g. hyper-realistic, 4K cinematic, golden hour lighting" />
          </Field>
        </div>
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "0 1.25rem" }}></div>
        <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "8px", marginBottom: "1rem" }}>
          <button style={{ ...buttonStyle, flex: 1 }} onClick={genLuma}><i className="ti ti-wand" aria-hidden="true"></i> Generate rendering specs ↗</button>
          <button style={buttonStyle} onClick={() => handleCopy(lumaOut, 'luma')}>
            {copied === 'luma' ? <><i className="ti ti-check" aria-hidden="true"></i> Copied</> : <><i className="ti ti-copy" aria-hidden="true"></i> Copy</>}
          </button>
        </div>
        <div style={outputStyle}>{lumaOut}</div>
      </Block>

      {/* GOOGLE AI STUDIO */}
      <Block>
        <BlockHeader title="Voiceover synthesis config" sub="Read-aloud instruction for TTS engines" icon="ti-microphone" badgeText="Config 4" color="warning" />
        <div style={{ padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "12px" }}>
          <Field label="Script text to be read">
            <textarea style={inputStyle} rows={3} value={vScript} onChange={e => setVScript(e.target.value)} placeholder="Paste your final script here (or write a placeholder)" />
          </Field>
          <Row>
            <Field label="Speaking pace">
              <select style={inputStyle} value={vPace} onChange={e => setVPace(e.target.value)}>
                <option>Fast (1.5×)</option><option>Natural (1×)</option><option>Slightly fast (1.25×)</option>
              </select>
            </Field>
            <Field label="Voice character">
              <select style={inputStyle} value={vChar} onChange={e => setVChar(e.target.value)}>
                <option>Storytelling, educational, slightly deep</option><option>Energetic and youthful</option><option>Calm and authoritative</option>
              </select>
            </Field>
          </Row>
        </div>
        <div style={{ height: "0.5px", background: "var(--color-border-tertiary)", margin: "0 1.25rem" }}></div>
        <div style={{ padding: "1rem 1.25rem 0", display: "flex", gap: "8px", marginBottom: "1rem" }}>
          <button style={{ ...buttonStyle, flex: 1 }} onClick={genVoice}><i className="ti ti-wand" aria-hidden="true"></i> Generate synthesis config ↗</button>
          <button style={buttonStyle} onClick={() => handleCopy(voiceOut, 'voice')}>
            {copied === 'voice' ? <><i className="ti ti-check" aria-hidden="true"></i> Copied</> : <><i className="ti ti-copy" aria-hidden="true"></i> Copy</>}
          </button>
        </div>
        <div style={outputStyle}>{voiceOut}</div>
      </Block>

    </div>
  );
}
