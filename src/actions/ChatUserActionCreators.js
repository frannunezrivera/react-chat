'use strict';

var ChatAppDispatcher = require('../dispatcher/ReactChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');

var ActionTypes = ChatConstants.ActionTypes;

var ChatUserActionCreators = {
    createUser: function(user) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.CREATE_USER,
            user: user
        });
    }
};

module.exports = ChatUserActionCreators;