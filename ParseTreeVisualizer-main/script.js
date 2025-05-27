Promise.all([
    fetch('tree.json').then(res => res.json()),
    fetch('trace.json').then(res => res.json())
]).then(([treeData, traceData]) => {
    renderTree(treeData, traceData);
});

function getNodeColor(label) {
    if (label.startsWith("Function")) return "url(#func-gradient)";
    if (label.startsWith("If")) return "#ff6f61";
    if (label.startsWith("While")) return "#6a4c93";
    if (label.startsWith("Assignment")) return "#43aa8b";
    if (label.startsWith("Return")) return "#f9c846";
    if (label.startsWith("VarDecl")) return "#577590";
    if (label.startsWith("FunctionCall")) return "#f3722c";
    if (label.startsWith("Parameters")) return "#4d908e";
    if (label.startsWith("Arguments")) return "#90be6d";
    if (label.startsWith("Expr")) return "#277da1";
    if (label.startsWith("Block") || label.startsWith("Body")) return "#b5838d";
    if (label.startsWith("Program")) return "#f9844a";
    return "#adb5bd";
}

function renderTree(treeData, traceData) {
    const margin = { top: 80, right: 120, bottom: 80, left: 120 };
    const width = 1800 - margin.left - margin.right;
    const height = 1400 - margin.top - margin.bottom;

    const svg = d3.select("#tree")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("defs").append("linearGradient")
        .attr("id", "func-gradient")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "100%")
        .selectAll("stop")
        .data([
            { offset: "0%", color: "#1971c2" },
            { offset: "100%", color: "#4dabf7" }
        ])
        .enter()
        .append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    // Enable zoom and pan
    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.call(
        d3.zoom()
            .scaleExtent([0.1, 3])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            })
    );

    const root = d3.hierarchy(treeData);

    const treeLayout = d3.tree()
        .size([height, width - 200])
        .separation((a, b) => (a.parent === b.parent ? 2.7 : 2));

    treeLayout(root);

    g.selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#adb5bd')
        .attr('stroke-width', 1.2)
        .attr('stroke-opacity', 0.8)
        .attr('d', d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    const node = g.selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

    node.append('circle')
        .attr('r', 14)
        .attr('fill', d => getNodeColor(d.data.name))
        .attr('stroke', '#22223b')
        .attr('stroke-width', 2)
        .style('filter', 'drop-shadow(0 2px 8px rgba(80,80,80,0.15))')
        .on('mouseover', function () {
            d3.select(this)
                .attr('stroke', '#ffbe0b')
                .attr('stroke-width', 3);
        })
        .on('mouseout', function () {
            d3.select(this)
                .attr('stroke', '#22223b')
                .attr('stroke-width', 2);
        });

    node.append('text')
        .attr('dy', 5)
        .attr('x', d => d.children ? -20 : 20)
        .attr('text-anchor', d => d.children ? 'end' : 'start')
        .style('font-size', '13px')
        .style('font-family', '"Segoe UI", Roboto, sans-serif')
        .style('fill', '#343a40')
        .text(d => d.data.name);

    // No animation/highlighting of flow for any statements
}