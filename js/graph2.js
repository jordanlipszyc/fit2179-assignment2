export const graph2 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: parent.offsetWidth,
  autosize: { type: "fit", contains: "padding" },
  background: "transparent",
  config: {
    font: "'DM Mono', monospace",
    axis: {
      gridColor: "#1e2230",
      domainColor: "#2a2d3a",
      tickColor: "#2a2d3a",
      labelColor: "#7a7567",
      titleColor: "#b0a898",
      labelFontSize: 11,
      titleFontSize: 11,
      titleFont: "'DM Mono', monospace",
      labelFont: "'DM Mono', monospace"
    },
    legend: {
      labelColor: "#b0a898",
      titleColor: "#e8e2d5",
      labelFontSize: 11,
      titleFontSize: 11,
      labelFont: "'DM Mono', monospace",
      titleFont: "'DM Mono', monospace",
      symbolStrokeWidth: 2.5,
      padding: 8
    },
    view: { stroke: "transparent" }
  },
 
  data: { url: "../data/influenza.csv", format: { type: "csv" } },
 
  transform: [{
    calculate: "toDate(slice(datum.Date, 6, 10) + '-' + slice(datum.Date, 3, 5) + '-' + slice(datum.Date, 0, 2))",
    as: "DateISO"
  }],
 
  layer: [
    // ── lines ───────────────────────────────────────────────────────────
    {
      mark: { type: "line", interpolate: "monotone", strokeWidth: 2 },
      encoding: {
        x: {
          field: "DateISO",
          timeUnit: "month",
          type: "ordinal",
          axis: { title: "Month", format: "%b" }
        },
        y: {
          aggregate: "count",
          type: "quantitative",
          axis: { title: "Reported Cases", tickMinStep: 1, grid: true }
        },
        color: {
          field: "DateISO",
          timeUnit: "year",
          type: "ordinal",
          title: "Year",
          scale: { range: ["#e67e5a", "#c45fa0", "#5a8fe6", "#4ec9a0", "#f0c74a", "#a78bfa"] }
        }
      }
    },
 
    // ── dots ────────────────────────────────────────────────────────────
    {
      mark: { type: "point", filled: true, size: 55, strokeWidth: 0 },
      encoding: {
        x: { field: "DateISO", timeUnit: "month", type: "ordinal" },
        y: { aggregate: "count", type: "quantitative" },
        color: {
          field: "DateISO",
          timeUnit: "year",
          type: "ordinal",
          scale: { range: ["#e67e5a", "#c45fa0", "#5a8fe6", "#4ec9a0", "#f0c74a", "#a78bfa"] }
        },
        tooltip: [
          { field: "DateISO", timeUnit: "year",  title: "Year" },
          { field: "DateISO", timeUnit: "month", title: "Month", format: "%B" },
          { aggregate: "count", title: "Cases" }
        ]
      }
    },
 
    // ── faint area fill ─────────────────────────────────────────────────
    {
      mark: { type: "area", interpolate: "monotone", line: false },
      encoding: {
        x: { field: "DateISO", timeUnit: "month", type: "ordinal" },
        y: { aggregate: "count", type: "quantitative" },
        color: {
          field: "DateISO",
          timeUnit: "year",
          type: "ordinal",
          scale: { range: ["#e67e5a", "#c45fa0", "#5a8fe6", "#4ec9a0", "#f0c74a", "#a78bfa"] }
        },
        opacity: { value: 0.08 }
      }
    }
  ]
};