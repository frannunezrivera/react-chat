'use strict';

describe('ThreadListItem', function () {
  var React = require('react/addons');
  var ThreadListItem, component;

  beforeEach(function () {
    ThreadListItem = require('components/ThreadListItem.js');
    component = React.createElement(ThreadListItem);
  });

  it('should create a new instance of ThreadListItem', function () {
    expect(component).toBeDefined();
  });
});
