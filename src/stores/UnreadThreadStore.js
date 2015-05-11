'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ChatAppDispatcher = require('../dispatcher/ReactChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');
var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var UnreadThreadStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getCount: function() {
        var threads = ThreadStore.getAll();
        var unreadCount = 0;
        for (var id in threads) {
            if (!threads[id].lastMessage.isRead) {
                unreadCount++;
            }
        }
        return unreadCount;
    }
});

UnreadThreadStore.dispatchToken = ChatAppDispatcher.register(function(action) {

    ChatAppDispatcher.waitFor([
        ThreadStore.dispatchToken,
        MessageStore.dispatchToken
    ]);

    switch (action.type) {

        case ActionTypes.CLICK_THREAD:
            UnreadThreadStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            UnreadThreadStore.emitChange();
            break;

        default:
            // do nothing
    }

});

module.exports = UnreadThreadStore;