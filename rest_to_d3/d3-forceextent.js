d3.forceExtent = function(extent) {
    var nodes;

    if (extent == null) extent=[[0,800], [0,500]];

    function force() {
        var i,
            n = nodes.length,
            node,
            r = 0;

        for (i = 0; i < n; ++i) {
            node = nodes[i];
            r = (node.radius || 0);
            node.x = Math.max(Math.min(node.x, extent[0][1]-r), extent[0][0]+r);
            node.y = Math.max(Math.min(node.y, extent[1][1]-r), extent[1][0]+r);
        }
    }

    force.initialize = function(_) { nodes = _; };

    force.extent = function(_) {
        return arguments.length ? (extent = _, force) : extent;
    };

    return force;
};
