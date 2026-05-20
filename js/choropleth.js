export const choropleth = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  width: parent.offsetWidth,
  autosize: { type: "fit", contains: "padding" },
  background: "transparent",
  config: {
    font: "'DM Mono', monospace",
    title: {
      color: "#b0a898",
    },
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
  "vconcat": [
    {
      "width": 900,
      "height": 600,
      "projection": { "type": "mercator" },
      "layer": [
        {
          "data": {
            "url": "../data/test.topojson",
            "format": {
              "type": "topojson",
              "feature": "ne_50m_admin_1_states_provinces"
            }
          },
          "transform": [{ "filter": "datum.properties.adm0_a3 === 'AUS'" }],
          "mark": {
            "type": "geoshape",
            "fill": "#e0e0e0",
            "stroke": "#333",
            "strokeWidth": 0.5
          }
        },
        {
          "data": {
            "url": "../data/influenza.csv",
            "format": { "type": "csv" }
          },
          "transform": [
            { "filter": { "param": "brush" } },
            {
              "calculate": "datum.State === 'NSW' ? 'New South Wales' : datum.State === 'Vic' ? 'Victoria' : datum.State === 'Qld' ? 'Queensland' : datum.State === 'SA' ? 'South Australia' : datum.State === 'WA' ? 'Western Australia' : datum.State === 'Tas' ? 'Tasmania' : datum.State === 'NT' ? 'Northern Territory' : datum.State === 'ACT' ? 'Australian Capital Territory' : null",
              "as": "StateFull"
            },
            {
              "calculate": "year(datum.Date)",
              "as": "Year"
            },
            {
              "aggregate": [{ "op": "count", "as": "TotalCases" }],
              "groupby": ["StateFull"]
            },
            {
              "lookup": "StateFull",
              "from": {
                "data": {
                  "values": [
                    { "StateFull": "New South Wales", "Population": 8150000 },
                    { "StateFull": "Victoria", "Population": 6610000 },
                    { "StateFull": "Queensland", "Population": 5320000 },
                    { "StateFull": "South Australia", "Population": 1830000 },
                    { "StateFull": "Western Australia", "Population": 2790000 },
                    { "StateFull": "Tasmania", "Population": 572000 },
                    { "StateFull": "Northern Territory", "Population": 250000 },
                    {
                      "StateFull": "Australian Capital Territory",
                      "Population": 457000
                    }
                  ]
                },
                "key": "StateFull",
                "fields": ["Population"]
              }
            },
            {
              "calculate": "(datum.TotalCases / datum.Population) * 100000",
              "as": "CasesPer100k"
            },
            {
              "lookup": "StateFull",
              "from": {
                "data": {
                  "url": "../data/test.topojson",
                  "format": {
                    "type": "topojson",
                    "feature": "ne_50m_admin_1_states_provinces"
                  }
                },
                "key": "properties.name",
                "fields": ["type", "properties", "geometry"]
              }
            }
          ],
          "mark": {
            "type": "geoshape",
            "stroke": "#333",
            "strokeWidth": 0.5
          },
          "encoding": {
            "shape": { "field": "geometry", "type": "geojson" },
            "color": {
              "field": "CasesPer100k",
              "type": "quantitative",
              "scale": { "scheme": "reds" },
              "title": "Cases per 100,000"
            },
            "tooltip": [
              { "field": "StateFull", "title": "State" },
              { "field": "TotalCases", "title": "Total Cases" },
              {
                "field": "Population",
                "title": "Population (2022)",
                "format": ","
              },
              {
                "field": "CasesPer100k",
                "title": "Cases per 100,000",
                "format": ".2f"
              }
            ]
          }
        }
      ]
    },
    {
      "width": 900,
      "height": 100,
      "data": {
        "url": "../data/influenza.csv",
        "format": { "type": "csv" }
      },
      "params": [
        {
          "name": "brush",
          "select": { "type": "interval", "encodings": ["x"] }
        }
      ],
      "mark": "line",
      "encoding": {
        "x": {
          "field": "Date",
          "type": "temporal",
          "timeUnit": "yearmonth",
          "title": "Date"
        },
        "y": {
          "aggregate": "count",
          "title": "Total Cases"
        }
      }
    }
  ]
}
