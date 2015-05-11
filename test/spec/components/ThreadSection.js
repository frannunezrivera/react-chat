'use strict';

describe('ThreadSection', function () {
  var React = require('react/addons');
  var ThreadSection, component;

  beforeEach(function () {
    ThreadSection = require('components/ThreadSection.js');
    component = React.createElement(ThreadSection);
  });

  it('should create a new instance of ThreadSection', function () {
    expect(component).toBeDefined();
  });
});
