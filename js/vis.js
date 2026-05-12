// Standard Vega-Lite embedding code
var spec = "/js/vis.json";
var spec2 = "/js/influenza.json";

vegaEmbed("#vis", spec, { "actions": false })
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

vegaEmbed("#big-vis", spec2, { "actions": false })
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
