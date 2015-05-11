'use strict';

var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');

var AuthUtils = {
    //This shouldn't be there, but it'll work while I develop the userStore
    loggedIn: false,
    //This shouldn't be there, but it'll work while I develop the userStore
    userEmail: false,

    login: function(email, callback) {

        ChatWebAPIUtils.getWithParams('http://localhost:9000/api/login', {
            'email': email
        }).then(function(result){
            callback(result);
            ChatWebAPIUtils.userJoined(result.email);
        });
    },

    getToken: function() {
        return localStorage.token;
    },

    logout: function() {
        this.loggedIn = false;
        this.onChange(false);
    },

    onChange: function() {}
};

module.exports = AuthUtils;