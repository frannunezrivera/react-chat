'use strict';

var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var io = require('socket.io-client');
// var AuthUtils = require('../utils/AuthUtils');
var socket = io.connect('http://localhost:9000');
var request = require('superagent');
var Promise = require('es6-promise').Promise; // jshint ignore:line

var ChatWebAPIUtils = {

    init: function() {

        socket.on('message', function(data) {
            // if (data.message && AuthUtils.loggedIn()) {
            if (data.message) {
                console.log(data.message);
                //messages.push(data.message);
                ChatServerActionCreators.receiveCreatedMessage(JSON.stringify(data.message));
                // } else if (AuthUtils.loggedIn()) {
            } else {
                console.log("There is a problem:", data);
            }
        });

        // socket.on('newUser', function(data) {
        //     if (data.email) {


        //         socket.emit('send', {
        //             'message': createdMessage
        //         });
        //     } else {
        //         console.log("There is a problem:", data);
        //     }
        // });
    },

    getAllMessages: function() {
        this.get('http://localhost:9000/api/messages')
            .then(function(messages) {
                ChatServerActionCreators.receiveAllMessages(messages);
            });
    },

    createMessage: function(message, threadName) {
        // simulate writing to a database
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var threadID = message.threadID || ('t_' + Date.now());
        var createdMessage = {
            id: id,
            threadID: threadID,
            threadName: 'React Chat',
            authorName: message.authorName,
            text: message.text,
            timestamp: timestamp
        };
        socket.emit('send', {
            'message': createdMessage
        });
    },

    createUser: function(user, token) {
        socket.emit('user:join', {
            'user': user,
            'token': token
        });
    },

    get: function(url) {
        return new Promise(function(resolve, reject) {
            request
                .get(url)
                .end(function(res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },
    getWithParams: function(url, params) {
        return new Promise(function(resolve, reject) {
            request
                .get(url)
                .query(params)
                .end(function(err, res) {
                    if (res.status === 401) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },
    post: function(url, params) {
        return new Promise(function(resolve, reject) {
            request
                .post(url)
                .send(params)
                .end(function(res) {
                    if (res.status === 404) {
                        reject();
                    } else {
                        resolve(JSON.parse(res.text));
                    }
                });
        });
    },

    userJoined: function(email) {
        socket.emit('join', {
            'email': email
        });
    }

};

module.exports = ChatWebAPIUtils;