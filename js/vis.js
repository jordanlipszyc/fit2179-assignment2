// Standard Vega-Lite embedding code
var spec = "js/influenza.json";

vegaEmbed("#big-vis", spec, { "actions": false })
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);
