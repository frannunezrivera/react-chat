'use strict';

describe('Logout', function () {
  var React = require('react/addons');
  var Logout, component;

  beforeEach(function () {
    Logout = require('components/Logout.js');
    component = React.createElement(Logout);
  });

  it('should create a new instance of Logout', function () {
    expect(component).toBeDefined();
  });
});
