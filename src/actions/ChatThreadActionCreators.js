'use strict';

var ChatAppDispatcher = require('../dispatcher/ReactChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');

var ActionTypes = ChatConstants.ActionTypes;

var ChatThreadActionCreators = {
    clickThread: function(threadID) {
        ChatAppDispatcher.dispatch({
            type: ActionTypes.CLICK_THREAD,
            threadID: threadID
        });
    }
};

module.exports = ChatThreadActionCreators;