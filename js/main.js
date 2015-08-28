(function() {
    'use strict';

    var canvasContainer = document.getElementById('canvas-container');
    var WIDTH = canvasContainer.offsetWidth > 600 ? 600 : canvasContainer.offsetWidth;
    var HEIGHT = WIDTH;

    var canvas = document.getElementById('dataviz');
    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    var ctx = canvas.getContext('2d');
    var parameters = {
        graduationNumber: 5,
        currentFactor: 2
    };

    var RADIUS = HEIGHT / 2;

    function emptyCircle() {
        ctx.beginPath();
        ctx.arc(WIDTH / 2, HEIGHT / 2, RADIUS, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'orange';
        ctx.stroke();
    }

    function getAngleFor(number) {
        return 2 * Math.PI / parameters.graduationNumber * number;
    }

    function getCoordinatesFor(number) {
        var currentAngle = getAngleFor(number);
        var x = RADIUS + Math.cos(currentAngle) * RADIUS;
        var y = RADIUS + Math.sin(currentAngle) * RADIUS;

        return [x, y];
    }

    function drawLine(a, b) {
        var aCoords = getCoordinatesFor(a);
        var bCoords = getCoordinatesFor(b);

        ctx.beginPath();
        ctx.moveTo(aCoords[0], aCoords[1]);
        ctx.lineTo(bCoords[0], bCoords[1]);
        ctx.stroke();
    }

    function draw() {
        emptyCircle();

        for (var i = 0 ; i <= 2000 ; i++) {
            drawLine(i, parameters.currentFactor * i % parameters.graduationNumber);
        }
    }

    draw();

    function addEventListenersTo(className, mappedValue) {
        var mappedInputs = document.getElementsByClassName(className);
        for (var i = 0, c = mappedInputs.length ; i < c ; i++) {
            mappedInputs[i].addEventListener('input', function() {
                parameters[mappedValue] = this.value * 1;
                for (var j = 0, c2 = mappedInputs.length ; j < c2 ; j++) {
                    mappedInputs[j].value = parameters[mappedValue];
                }
                draw();
            });
        }
    }

    addEventListenersTo('graduation_input', 'graduationNumber');
    addEventListenersTo('current_factor', 'currentFactor');
})();
