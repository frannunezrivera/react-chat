'use strict';

describe('UnreadThreadStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/UnreadThreadStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
