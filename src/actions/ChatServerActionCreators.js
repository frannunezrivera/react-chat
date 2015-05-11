'use strict';

var ChatAppDispatcher = require('../dispatcher/ReactChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

var ChatServerActionCreators = {
    receiveAllMessages: function(rawMessages) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_MESSAGES,
            rawMessages: rawMessages
        });
    },

    receiveCreatedMessage: function(createdMessage) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
            rawMessage: createdMessage
        });
    },

    receiveAllUsers: function(users) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_USERS,
            users: users
        });
    },

    receiveCreatedUser: function(user) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_RAW_USER,
            user: user
        });
    }
};

module.exports = ChatServerActionCreators;