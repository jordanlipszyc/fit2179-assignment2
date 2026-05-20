// Import visualisation specificatoins as modules to keep this file clean and focused on rendering
import { choropleth } from "./choropleth.js";
import { graph2 } from "./graph2.js";
import { age } from "./age.js";

vegaEmbed("#choropleth", choropleth, { "actions": false })
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

var parent = document.getElementById('graph2').parentElement;
var width = parent.offsetWidth;
vegaEmbed("#graph2", { ...graph2, width: width }, { "actions": false, "theme": "dark" })
  .catch(console.error);

parent = document.getElementById('age').parentElement;
width = parent.offsetWidth;
vegaEmbed("#age", { ...age, width: width }, { "actions": false, "theme": "dark" })
  .catch(console.error);