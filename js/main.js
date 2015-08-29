var d3 = require('d3');
var dispatcher = require('./dispatcher');

(function() {
    'use strict';

    var canvasContainer = document.getElementById('canvas-container');
    var WIDTH = canvasContainer.offsetWidth > 600 ? 600 : canvasContainer.offsetWidth;
    var HEIGHT = WIDTH;

    var svg = d3.select('#circle').attr({ width: WIDTH, height: HEIGHT });

    var center = { x: WIDTH / 2, y: HEIGHT / 2 };
    var radius = (WIDTH * 0.95) / 2; // do not take full width to prevent from cropped circle

    var circle = svg.append('circle')
        .attr({
            'cx': center.x,
            'cy': center.y,
            'r': radius
        });

    var factor = 2, numberGraduations = 100;
    function draw() {
        var gradToCoords = require('./utils/gradToCoords')(center, radius, numberGraduations);

        var graduations = d3.range(0, numberGraduations).map(g => {
            var coords = gradToCoords(g);
            var coords2 = gradToCoords(g * factor);

            return {
                x: coords.x,
                y: coords.y,
                x2: coords2.x,
                y2: coords2.y
            };
        });

        var segments = svg.selectAll('line').data(graduations);
        segments.enter()
            .append("line")
                .attr({
                    'x1': g => g.x,
                    'y1': g => g.y,
                    'x2': g => g.x2,
                    'y2': g => g.y2
                });

        segments.transition()
            .duration(500)
            .attr({
                'x1': g => g.x,
                'y1': g => g.y,
                'x2': g => g.x2,
                'y2': g => g.y2
            });

        segments.exit().remove();

        var circles = svg.selectAll('.graduation').data(graduations);
        circles.enter()
            .append('circle')
                .attr({
                    'class': 'graduation',
                    r: 3,
                    cx: d => d.x,
                    cy: d => d.y
                });

        circles
            .transition()
            .duration(500)
                .attr({
                    cx: g => g.x,
                    cy: g => g.y,
                });

        circles.exit().remove();
    }

    draw();
    dispatcher.on('graduationChange', function(nbGraduations) {
        numberGraduations = nbGraduations;
        draw();
    });

    dispatcher.on('factorChange', function(newFactor) {
        factor = newFactor;
        draw();
    });
})();
