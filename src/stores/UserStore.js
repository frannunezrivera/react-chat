// 'use strict';

// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');
// var ReactChatAppDispatcher = require('../dispatcher/ReactChatAppDispatcher');
// var ChatConstants = require('../constants/ChatConstants');

// var ActionTypes = ChatConstants.ActionTypes;
// var CHANGE_EVENT = 'change';

// var _users = {};

// function _addUsers(users) {
//     users.forEach(function(user) {
//         if (!_users[user.id]) {
//             _users[user.id] = user;
//         }
//     });
// }

// function _addUser(user) {
//     if (!_users[user.id]) {
//         _users[user.id] = user;
//     }
// }

// var UserStore = assign({}, EventEmitter.prototype, {
// 	emitChange: function() {
//         this.emit(CHANGE_EVENT);
//     },

//     /**
//      * @param {function} callback
//      */
//     addChangeListener: function(callback) {
//         this.on(CHANGE_EVENT, callback);
//     },

//     removeChangeListener: function(callback) {
//         this.removeListener(CHANGE_EVENT, callback);
//     },

//     get: function(id) {
//         return _users[id];
//     },

//     getAll: function() {
//         return _users;
//     }
// });

// UserStore.dispatchToken = ReactChatAppDispatcher.register(function(action) {

//   switch (action.type) {

//         case ActionTypes.USER_JOIN:
//             UserStore.emitChange();
//             break;

//         case ActionTypes.USER_QUIT:
//             var message = ChatMessageUtils.getCreatedMessageData(
//                 action.text,
//                 action.currentThreadID
//             );
//             _messages[message.id] = message;
//             UserStore.emitChange();
//             break;

//         case ActionTypes.RECEIVE_USERS:
//             _addUsers(action.rawMessages);
//             UserStore.emitChange();
//             break;
//         case ActionTypes.RECEIVE_USER:
//             _addUser(JSON.parse(action.rawMessage));
//             UserStore.emitChange();
//             break;
//         default:
//             // do nothing
//     }

// });

// module.exports = UserStore; 
