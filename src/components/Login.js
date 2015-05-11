'use strict';

var React = require('react/addons');
var AuthUtils = require('../utils/AuthUtils');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');

require('styles/Login.less');

var Login = React.createClass({
    mixins: [Router.Navigation],

    statics: {
        attemptedTransition: null
    },

    getInitialState: function() {
        return {
            error: false
        };
    },

    render: function() {
        //<label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
        return (
            <form onSubmit={this._onSubmit}>
            <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
            <button type="submit">login</button>
            {this.state.error && (
              <p>Bad login information</p>
            )}
        </form>
        );
    },

    _onSubmit: function(event) {
        event.preventDefault();
        var email = this.refs.email.getDOMNode().value;
        // var pass = this.refs.pass.getDOMNode().value;

        function loggedIn(result){
            /*jshint validthis:true */
            if (!result.authenticated) {
                return this.setState({
                    error: true
                });
            }

            AuthUtils.loggedIn = true;
            AuthUtils.userEmail = result.email;
            AuthUtils.onChange(true);


            if (this.attemptedTransition) {
                var transition = this.attemptedTransition;
                this.attemptedTransition = null;
                transition.retry();
            } else {
                this.replaceWith('/');
            }
        }

        AuthUtils.login(email, loggedIn.bind(this));
    }
});

module.exports = Login;