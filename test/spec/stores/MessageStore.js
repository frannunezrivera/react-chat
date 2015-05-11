'use strict';

describe('MessageStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/MessageStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
