'use strict';

describe('MessageSection', function () {
  var React = require('react/addons');
  var MessageSection, component;

  beforeEach(function () {
    MessageSection = require('components/MessageSection.js');
    component = React.createElement(MessageSection);
  });

  it('should create a new instance of MessageSection', function () {
    expect(component).toBeDefined();
  });
});
