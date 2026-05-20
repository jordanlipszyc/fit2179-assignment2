const AGE_SORT = [
  "00-04","05-09","10-14","15-19","20-24","25-29","30-34","35-39",
  "40-44","45-49","50-54","55-59","60-64","65-69","70-74","75-79",
  "80-84","85+"
];
 
const SUBTYPE_DOMAIN = ["A", "B", "A and B", "Untyped"];
const SUBTYPE_RANGE  = ["#e67e5a", "#4ec9a0", "#a78bfa", "#94a3b8"];

export const age = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: parent.offsetWidth,
  autosize: { type: "fit", contains: "padding" },
 
  params: [
    {
      name: "yearFilter",
      value: 2022,
      bind: {
        input: "select",
        options: [2022, 2023, 2024, 2025],
        name: "Year: "
      }
    },
    {
      name: "normalise",
      value: false,
      bind: { input: "checkbox", name: "Normalise: " }
    }
  ],
 
  layer: [
    {
      data: { url: "data/influenza_age.csv", format: { type: "csv" } },
      transform: [
        { filter: "datum.year == yearFilter" },
        { calculate: "normalise ? datum.proportion : datum.count", as: "value" }
      ],
      mark: { type: "bar" },
      encoding: {
        x: {
          field: "Age group",
          type: "ordinal",
          sort: AGE_SORT,
          axis: {
            title: "Age Group",
            labelAngle: -45,
            labelColor: "#7a7567",
            titleColor: "#b0a898",
            labelFont: "'DM Mono', monospace",
            titleFont: "'DM Mono', monospace",
            gridColor: "#1e2230",
            domainColor: "#2a2d3a",
            tickColor: "#2a2d3a"
          }
        },
        y: {
          field: "value",
          type: "quantitative",
          stack: "zero",
          axis: {
            title: { expr: "normalise ? 'Proportion' : 'Reported Cases'" },
            format: { expr: "normalise ? '.0%' : ''" },
            labelColor: "#7a7567",
            titleColor: "#b0a898",
            labelFont: "'DM Mono', monospace",
            titleFont: "'DM Mono', monospace",
            gridColor: "#1e2230",
            domainColor: "#2a2d3a",
            tickColor: "#2a2d3a"
          }
        },
        color: {
          field: "Type",
          type: "nominal",
          scale: { domain: SUBTYPE_DOMAIN, range: SUBTYPE_RANGE },
          legend: {
            title: "Subtype",
            labelColor: "#b0a898",
            titleColor: "#e8e2d5",
            labelFont: "'DM Mono', monospace",
            titleFont: "'DM Mono', monospace"
          }
        },
        tooltip: [
          { field: "Age group",    title: "Age Group" },
          { field: "Type", title: "Subtype" },
          { field: "count",        title: "Cases" },
          { field: "proportion",   title: "Proportion", format: ".1%" }
        ]
      }
    }
  ],
 
  config: {
    font: "'DM Mono', monospace",
    background: "transparent",
    view: { stroke: "transparent" },
    axis: {
      gridColor: "#1e2230",
      domainColor: "#2a2d3a",
      tickColor: "#2a2d3a",
      labelColor: "#7a7567",
      titleColor: "#b0a898",
      labelFontSize: 11,
      titleFontSize: 11
    },
    legend: {
      labelColor: "#b0a898",
      titleColor: "#e8e2d5",
      labelFontSize: 11,
      titleFontSize: 11
    },
    bar: { cornerRadiusTopLeft: 2, cornerRadiusTopRight: 2 }
  }
};