var assert = require('assert');

describe('gradToCoords', function() {
    var gradToCoords;

    beforeEach(function() {
        let center = { x: 10, y: 10 },
            radius = 10,
            numberGraduations = 4;

        gradToCoords = require('../../js/utils/gradToCoords')(center, radius, numberGraduations);
    });

    it('should return correct coordinates for given angle', function() {
        var fixtures = [
            { graduation: 0, expected: { x: 20, y: 10 } },
            { graduation: 1, expected: { x: 10, y: 20 } },
            { graduation: 2, expected: { x: 0, y: 10 } },
            { graduation: 3, expected: { x: 10, y: 0 } },
            { graduation: 4, expected: { x: 20, y: 10 } },
            { graduation: 5, expected: { x: 10, y: 20 } }
        ];

        fixtures.forEach(f => {
            assert.deepEqual(gradToCoords(f.graduation), f.expected, `Graduation: ${f.graduation}`);
        });
    });
});
