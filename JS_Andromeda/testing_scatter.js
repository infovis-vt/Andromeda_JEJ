
function scatter(div_id, data){
    
    const start = Date.now();
    
    //console.log("scatter lib>>>>")
    var cords = data.cords
    //console.log("cords: ", cords)
    data = data.df_2D
    
    var margin = {top: 10, right: 100, bottom: 10, left: 100};
    var width = 800 - margin.left - margin.right;
    var height = 620 - margin.top - margin.bottom;
    // append the svg object to the body of the page
    
    var svg = d3.select(div_id)
        .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
    var record = []
    var drag = d3.behavior.drag()
            .on('drag', dragmove)
            .origin(function() {
                var t = d3.transform(d3.select(this).attr("transform"));
                return {x: t.translate[0], y: t.translate[1]};
                });
    
    
    // Add X axis
    var x = d3.scale.linear()
        .domain([-30, 30])
        .range([ 0, width ]);
    
    svg.append("g")
        .attr("class", "axis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis().scale(x))
        .attr("opacity", "0")

    // Add Y axis
    var y = d3.scale.linear()
        .domain([-30, 30])
        .range([ height, 0]);
    
    svg.append("g")
        .attr("class", "axis")
        .call(d3.svg.axis().orient('left').scale(y))
        .attr("opacity", "0");
    
    var dots = svg.append('g')
                .selectAll("dot")
                .data(data)
                .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function (d) { return x(d.xx); } )
        .attr("cy", function (d) { return y(d.yy); } )
        .attr("x", function (d) { return x(d.xx); } )
        .attr("y", function (d) { return y(d.yy); } )
        .text(d => d.name)
        .attr("r", 8)
        .style("fill", "#69b3a2")
        .call(drag);

    // add label
    var labels = svg.append('g')
                .selectAll("text")
                .data(data)
                .enter().append("text")
        .attr("cx", function (d) { return x(d.xx); } )
        .attr("cy", function (d) { return y(d.yy); } )
        .attr("x", function(d) { return x(d.xx); })
        .attr("y", function(d) { return y(d.yy); })
        .text(d => d.name)
        .call(drag);

    var live_cords = []
    
    function dragmove(live_cords) {
      var x = d3.event.x;
      var y = d3.event.y;
      
      var cx = parseFloat(x) + parseFloat(d3.select(this).attr('cx'))
      var cy = parseFloat(y) + parseFloat(d3.select(this).attr('cy'))
        
      d3.select(this).attr("transform", "translate(" + x + "," + y + ")")
          .attr("x", cx.toString())
           .attr("y", cy.toString());
      
      //const d = new Date();
      //let ms = d.getMilliseconds();
      record.push(Date.now())
      console.log(record)
      console.log("moved point: ", this)
    }
    
    d3.selectAll("circle")
      .on("click", function(){
          d3.select(this)
            .style("fill", "orange");})
    
    const end = Date.now();
    console.log("graph render time diff: ", end-start)
}
