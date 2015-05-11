'use strict';

var React = require('react/addons');
var MessageComposer = require('./MessageComposer');
var MessageListItem = require('./MessageListItem');
var MessageStore = require('../stores/MessageStore');
var ThreadStore = require('../stores/ThreadStore');

require('styles/MessageSection.less');

function getStateFromStores() {
    return {
        messages: MessageStore.getAllForCurrentThread(),
        thread: ThreadStore.getCurrent()
    };
}

function getMessageListItem(message) {
    return (
        <MessageListItem
          key={message.id}
          message={message}
        />
    );
}

var MessageSection = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        this._scrollToBottom();
        MessageStore.addChangeListener(this._onChange);
        ThreadStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        MessageStore.removeChangeListener(this._onChange);
        ThreadStore.removeChangeListener(this._onChange);
    },

    render: function() {
        if (!this.state.messages.length){
            return (
                <div className="message-section">
                    <h3 className="message-thread-heading">Waiting for welcome message...</h3>
                    <ul className="message-list" ref="messageList">
                    </ul>
                    <MessageComposer threadID="t_1" />
                  </div>
            );
        }
        var messageListItems = this.state.messages.map(getMessageListItem);

        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>
                <ul className="message-list" ref="messageList">
                  {messageListItems}
                </ul>
                <MessageComposer threadID={this.state.thread.id}/>
              </div>
        );
    },

    componentDidUpdate: function() {
        this._scrollToBottom();
    },

    _scrollToBottom: function() {
        var ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    },

    /**
     * Event handler for 'change' events coming from the MessageStore
     */
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = MessageSection;