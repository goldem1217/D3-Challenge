// Set up svg area
var svgWidth = 1000;
var svgHeight = 700;

var chartMargin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)
  .attr("class", "chartGroup");

// Read in data from csv, create charts.
d3.csv("./../assets/data/data.csv").then(function(healthData) {

    console.log(healthData);

    // Add X axis
    var x = d3.scaleLinear()
    .domain([20,40])
    .range([0,chartWidth]);
    chartGroup.append("g")
    .attr("transform", "translate(0," + chartHeight + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([4,26])
    .range([chartHeight,0]);
    chartGroup.append("g")
    .call(d3.axisLeft(y));

    // Income v. Access to Healthcare
    chartGroup.append('g')
    .selectAll("dot")
    .data(healthData)
    .enter()
    .append("circle")
        .attr("cx", function (d) { 
            return x(d.obesity); } )
        .attr("cy", function (d) { 
            return y(d.healthcare); } )
        .attr("r", 16)
        .style("fill", "red")
        .style("opacity", ".5");

        chartGroup.append("g")
        .selectAll("dot")
        .data(healthData)
        .enter()
        .append("svg:text")
        .attr("text-anchor", "middle")
        .attr("class", "circletext")
        .attr("dx", function (d) { 
            return x(d.obesity); } )
        .attr("dy", function (d) { 
            return y(d.healthcare-.25); } )
        .text(function(d) { return d.abbr } )
        .style('fill', 'white');
    


   



  }).catch(function(error) {
    console.log(error);
  });