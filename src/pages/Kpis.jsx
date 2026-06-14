import React from 'react';
import { Card, SectionTitle } from "../components/ui/index.jsx";
import { kpis } from "../data/strategicData.js";

export default function Kpis({ setActive }) {
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
}
