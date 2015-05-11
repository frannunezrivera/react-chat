'use strict';

describe('MessageListItem', function () {
  var React = require('react/addons');
  var MessageListItem, component;

  beforeEach(function () {
    MessageListItem = require('components/MessageListItem.js');
    component = React.createElement(MessageListItem);
  });

  it('should create a new instance of MessageListItem', function () {
    expect(component).toBeDefined();
  });
});
