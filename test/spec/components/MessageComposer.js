'use strict';

describe('MessageComposer', function () {
  var React = require('react/addons');
  var MessageComposer, component;

  beforeEach(function () {
    MessageComposer = require('components/MessageComposer.js');
    component = React.createElement(MessageComposer);
  });

  it('should create a new instance of MessageComposer', function () {
    expect(component).toBeDefined();
  });
});
