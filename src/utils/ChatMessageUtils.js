'use strict';

var AuthUtils = require('../utils/AuthUtils');

var ChatMessageUtils = {

    convertRawMessage: function(rawMessage, currentThreadID) {
        return {
            id: rawMessage.id,
            threadID: rawMessage.threadID,
            authorName: rawMessage.authorName,
            date: new Date(rawMessage.timestamp),
            text: rawMessage.text,
            isRead: rawMessage.threadID === currentThreadID
        };
    },

    getCreatedMessageData: function(text, currentThreadID) {
        var timestamp = Date.now();
        return {
            id: 'm_' + timestamp,
            threadID: currentThreadID,
            authorName: AuthUtils.userEmail, // hard coded for the example
            date: new Date(timestamp),
            text: text,
            isRead: true
        };
    }

};

module.exports = ChatMessageUtils;