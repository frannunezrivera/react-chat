'use strict';

describe('ReactChatApp', function () {
  var React = require('react/addons');
  var ReactChatApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactChatApp = require('components/ReactChatApp.js');
    component = React.createElement(ReactChatApp);
  });

  it('should create a new instance of ReactChatApp', function () {
    expect(component).toBeDefined();
  });
});
