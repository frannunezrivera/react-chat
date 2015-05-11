'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var MessageSection = require('./MessageSection');
var ThreadSection = require('./ThreadSection');
var AuthUtils = require('../utils/AuthUtils');
var Login = require('./Login');

// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');


var Authentication = {
    statics: {
        willTransitionTo: function(transition) {
            if (!AuthUtils.loggedIn) {
                Login.attemptedTransition = transition;
                transition.redirect('/login');
            }
        }
    }
};

var ReactChatApp = React.createClass({
    mixins: [Authentication],

    render: function() {
        return (
            <div className="chatapp">
		        <ThreadSection />
		        <MessageSection />
		    </div>
        );
    }

});

module.exports = ReactChatApp;