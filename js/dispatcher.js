var d3 = require('d3');

var dispatcher = d3.dispatch('graduationChange', 'factorChange');

function updateGraduationNumber() {
    d3.select('#graduation_input').attr('value', this.value);
    d3.select('#graduation_numbers_input').attr('value', +this.value)
    dispatcher.graduationChange(+this.value);
}

d3.select('#graduation_input').on('input', updateGraduationNumber);
d3.select('#graduation_numbers_input').on('change', updateGraduationNumber);

function updateCurrentFactor() {
    d3.select('#current_factor_input').attr('value', this.value);
    d3.select('#current_factor').attr('value', +this.value)
    dispatcher.factorChange(+this.value);
}

d3.select('#current_factor').on('input', updateCurrentFactor);
d3.select('#current_factor_input').on('change', updateCurrentFactor);


module.exports = dispatcher;
