// import * as d3 from "./node_modules/d3/index.js";

let fig = d3.select("#simple-feedforward-vertical");
let diagram = fig.select("g.diagram");
let labels = fig.select("g.labels");

let width = fig.attr("width") - 50;
let height = fig.attr("height");

let sizes = [3, 4, 4, 1];
let nLayers = sizes.length;
let r = 30;
let strokeWidth = 3;
let maxSize = Math.max(...sizes.map(size => size - 1));
let dy = (height - 2 * r - 2 * strokeWidth) / maxSize;

let dx = (width - 2 * r - 2 * strokeWidth) / (nLayers - 1);

function ithLayer(size, i) {
  let x = r + strokeWidth + i * dx;
  let offset = 0.5 * (maxSize - size + 1) * dy + r + strokeWidth;
  return d3.range(size).map(j => [x, offset + j * dy]);
}

let centers = sizes.map(ithLayer);

diagram
  .selectAll("g.edges")
  .data(centers.slice(0, -1))
  .enter()
  .append("g")
  .attr("class", "edges")
  .each(function(cs, i) {
    d3.select(this)
      .selectAll("g")
      .data(cs)
      .enter()
      .append("g")
      .each(function(c, j) {
        let data =
          i + 1 < nLayers - 1 ? centers[i + 1].slice(1) : centers[i + 1];
        let g = d3.select(this);
        d3.select(this)
          .selectAll("line")
          .data(data)
          .enter()
          .append("line")
          .attr("x1", c[0])
          .attr("y1", c[1])
          .attr("x2", d => d[0])
          .attr("y2", d => d[1])
          .attr("stroke", "pink")
          .attr("stroke-width", 3);
      });
  });

diagram
  .selectAll("g.nodes")
  .data(centers)
  .enter()
  .append("g")
  .attr("class", "nodes")
  .selectAll("circle")
  .data(cs => cs)
  .enter()
  .append("circle")
  .attr("cx", ([cx, _cy]) => cx)
  .attr("cy", ([_cx, cy]) => cy)
  .attr("r", r)
  .attr("stroke", "white")
  .attr("stroke-width", strokeWidth)
  .attr("fill", "#191919")
  .attr("fill-opacity", 1);

let biases = centers.slice(0, -1).map(cs => cs[0]);

diagram
  .selectAll("text.one")
  .data(biases)
  .enter()
  .append("text")
  .attr("class", "one")
  .text("1")
  .attr("x", c => c[0])
  .attr("y", c => c[1])
  .attr("fill", "#42affa")
  .attr("text-anchor", "middle")
  .attr("alignment-baseline", "central");

diagram
  .append("text")
  .text("x[i,:]")
  .style("font-family", "Monaco")
  .style("font-size", "50%")
  .attr("x", -20)
  .attr("y", 263)
  .attr("fill", "papayawhip")
  .attr("text-anchor", "left");

diagram
  .append("text")
  .text("y[i]")
  .style("font-family", "Monaco")
  .style("font-size", "50%")
  .attr("x", 390)
  .attr("y", 155)
  .attr("fill", "papayawhip")
  .attr("text-anchor", "left");
// let layers = ["Input(2)", "Dense(3)", "Dense(3)", "Dense(1)"];
// labels
//   .selectAll("text.layer")
//   .data(layers)
//   .enter()
//   .append("text")
//   .attr("class", "layer code small")
//   .text(t => t)
//   .attr("x", (_, i) => r + strokeWidth + i * dx)
//   .attr("y", height + 50)
//   .attr("fill", "#42affa")
//   .attr("text-anchor", "middle")
//   .attr("alignment-baseline", "central");
