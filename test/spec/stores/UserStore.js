'use strict';

describe('UserStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/UserStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
