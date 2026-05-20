// Import visualisation specificatoins as modules to keep this file clean and focused on rendering
import { choropleth } from "./choropleth.js";
import { graph2 } from "./graph2.js";

vegaEmbed("#choropleth", choropleth, { "actions": false })
  .then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  })
  .catch(console.error);

const el = document.getElementById('graph2');
const parent = el.parentElement;
const style = getComputedStyle(parent);
const width = parent.offsetWidth
  - parseFloat(style.paddingLeft)
  - parseFloat(style.paddingRight);

vegaEmbed("#graph2", { ...graph2, width: width }, { "actions": false, "theme": "dark" })
  .then(function (result) {
    // result.view
  })
  .catch(console.error);