'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var AuthUtils = require('../utils/AuthUtils');

require('styles/AppWrapper.less');

var AppWrapper = React.createClass({

    getInitialState: function() {
        return {
            loggedIn: AuthUtils.loggedIn
        };
    },

    setStateOnAuth: function(loggedIn) {
        this.setState({
            loggedIn: loggedIn
        });
    },

    componentWillMount: function() {
        AuthUtils.onChange = this.setStateOnAuth;
    },

    render: function() {
        var loginOrOut = this.state.loggedIn ?
            <Link to="logout">Log out</Link> :
            <Link to="login">Sign in</Link>;
		        return (
                    <div>
        		        <ul>
        		          <li>{loginOrOut}</li>
        		        </ul>
        		        <RouteHandler/>
                    </div>
        );
    }
});

module.exports = AppWrapper;