/*jshint node:true, mocha:true */

'use strict';

require('should');

var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var rescale = require('rescale')(Decimal).rescale;
var angle = require('linear-preset-factory')(require('../src/linear-presets-angle'));

function convert(x, preset) {
  return Number(rescale(preset[0], preset[1], x));
}

function invert(preset) {
  return preset.slice(0).reverse();
}

describe('angle presets', function() {
  it('should convert correctly', function() {
    (Math.PI / 4).should.be.exactly(convert(Math.PI / 4, invert(angle.radian_radian)), 'radian_radian')
      .and.exactly(convert(1 / 8, invert(angle.radian_turn)), 'radian_turn')
      .and.exactly(convert(45, invert(angle.radian_degree)), 'radian_degree')
      .and.exactly(convert(50, invert(angle.radian_gradian)), 'radian_gradian');

    (0).should.be.exactly(convert(0, angle.radian_radian), 'radian_radian')
      .and.exactly(convert(0, angle.radian_turn), 'radian_turn')
      .and.exactly(convert(0, angle.radian_degree), 'radian_degree')
      .and.exactly(convert(0, angle.radian_gradian), 'radian_gradian');
  });
});
