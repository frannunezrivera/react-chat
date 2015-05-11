'use strict';

var AppWrapper = require('./AppWrapper');
var ReactChatApp = require('./ReactChatApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Login = require('./Login');
var Logout = require('./Logout');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');

var content = document.getElementById('content');

//ChatExampleData.init(); // load example data into localstorage
ChatWebAPIUtils.init();
//ChatWebAPIUtils.getAllMessages();

var Routes = (
    <Route handler={AppWrapper}>
    	<Route name="/" handler={ReactChatApp}/>
    	<Route name="login" handler={Login}/>
    	<Route name="logout" handler={Logout}/>
  	</Route>
);

Router.run(Routes, function(Handler) {
    React.render(<Handler/>, content);
});