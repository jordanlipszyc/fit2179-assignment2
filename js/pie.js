export const pie = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    data: { url: "./data/influenza_age.csv", format: { type: "csv" } },

    transform: [
        { aggregate: [{ op: "sum", field: "count", as: "total" }], groupby: ["Age group"] }
    ],

    params: [{
        name: "ageSelect",
        select: { type: "point", fields: ["Age group"], toggle: true },
        bind: "legend"
    }],

    mark: { type: "arc" },

    encoding: {
        theta: { field: "total", type: "quantitative" },
        color: {
            field: "Age group",
            type: "ordinal",
            sort: [
                "00-04", "05-09", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39",
                "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79",
                "80-84", "85+"
            ],
            legend: {
                title: "Age Group",
                labelColor: "#b0a898",
                titleColor: "#e8e2d5",
                labelFont: "'DM Mono', monospace",
                titleFont: "'DM Mono', monospace"
            }
        },
        opacity: {
            condition: { param: "ageSelect", value: 1 },
            value: 0.2
        },
        tooltip: [
            { field: "Age group", title: "Age Group" },
            { field: "total", title: "Cases" }
        ]
    },

    config: {
        background: "transparent",
        view: { stroke: "transparent" }
    }
};