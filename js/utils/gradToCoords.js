module.exports = function(center, radius, numberGraduations) {
    function getAngleFor(graduation) {
        return 2 * Math.PI / numberGraduations * graduation;
    }

    return function gradToCoords(graduation) {
        var currentAngle = getAngleFor(graduation);

        return {
            x: Math.round((center.x + Math.cos(currentAngle) * radius) * 100) / 100,
            y: Math.round((center.y + Math.sin(currentAngle) * radius) * 100) / 100
        };
    };
};
