'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ChatAppDispatcher = require('../dispatcher/ReactChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatMessageUtils = require('../utils/ChatMessageUtils');
var ThreadStore = require('../stores/ThreadStore');

var ActionTypes = ChatConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _messages = {};

function _addMessages(rawMessages) {
    rawMessages.forEach(function(message) {
        if (!_messages[message.id]) {
            _messages[message.id] = ChatMessageUtils.convertRawMessage(
                message,
                ThreadStore.getCurrentID()
            );
        }
    });
}

function _addMessage(rawMessage) {
    if (!_messages[rawMessage.id]) {
        _messages[rawMessage.id] = ChatMessageUtils.convertRawMessage(
            rawMessage,
            ThreadStore.getCurrentID()
        );
    }
}

function _markAllInThreadRead(threadID) {
    for (var id in _messages) {
        if (_messages[id].threadID === threadID) {
            _messages[id].isRead = true;
        }
    }
}

var MessageStore = assign({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function(id) {
        return _messages[id];
    },

    getAll: function() {
        return _messages;
    },

    /**
     * @param {string} threadID
     */
    getAllForThread: function(threadID) {
        var threadMessages = [];
        for (var id in _messages) {
            if (_messages[id].threadID === threadID) {
                threadMessages.push(_messages[id]);
            }
        }
        threadMessages.sort(function(a, b) {
            if (a.date < b.date) {
                return -1;
            } else if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        return threadMessages;
    },

    getAllForCurrentThread: function() {
        return this.getAllForThread(ThreadStore.getCurrentID());
    }

});

MessageStore.dispatchToken = ChatAppDispatcher.register(function(action) {

    switch (action.type) {

        case ActionTypes.CLICK_THREAD:
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();
            break;

        case ActionTypes.CREATE_MESSAGE:
            var message = ChatMessageUtils.getCreatedMessageData(
                action.text,
                action.currentThreadID
            );
            _messages[message.id] = message;
            MessageStore.emitChange();
            break;

        case ActionTypes.RECEIVE_RAW_MESSAGES:
            _addMessages(action.rawMessages);
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();
            break;
        case ActionTypes.RECEIVE_RAW_CREATED_MESSAGE:
            _addMessage(JSON.parse(action.rawMessage));
            ChatAppDispatcher.waitFor([ThreadStore.dispatchToken]);
            _markAllInThreadRead(ThreadStore.getCurrentID());
            MessageStore.emitChange();
            break;
        default:
            // do nothing
    }

});

module.exports = MessageStore;