export const Badge = ({ children, color = "info" }) => (
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

export const Card = ({ children, style = {} }) => (
  <div style={{
    background: "var(--color-background-primary)",
    border: "0.5px solid var(--color-border-tertiary)",
    borderRadius: "var(--border-radius-lg)",
    padding: "1rem 1.25rem",
    marginBottom: "1rem",
    ...style
  }}>{children}</div>
);

export const SectionTitle = ({ children }) => (
  <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: "1.5rem", marginTop: "2rem", color: "var(--color-text-primary)" }}>{children}</h2>
);

export const SubTitle = ({ children }) => (
  <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: "0.75rem", marginTop: "1.5rem", color: "var(--color-text-primary)" }}>{children}</h3>
);

export const MetricGrid = ({ metrics }) => (
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

export const IdeaList = ({ title, ideas, color = "info" }) => (
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

export const CompetitorCard = ({ ch }) => (
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
