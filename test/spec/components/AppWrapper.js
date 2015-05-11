'use strict';

describe('AppWrapper', function () {
  var React = require('react/addons');
  var AppWrapper, component;

  beforeEach(function () {
    AppWrapper = require('components/AppWrapper.js');
    component = React.createElement(AppWrapper);
  });

  it('should create a new instance of AppWrapper', function () {
    expect(component).toBeDefined();
  });
});
