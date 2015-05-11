'use strict';

describe('ThreadStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/ThreadStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
