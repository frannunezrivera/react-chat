'use strict';

var React = require('react/addons');
var AuthUtils = require('../utils/AuthUtils');

require('styles/Logout.less');

var Logout = React.createClass({
    componentDidMount: function() {
        AuthUtils.logout();
    },

    render: function() {
        return <p>You are now logged out</p>;
    }
});

module.exports = Logout;