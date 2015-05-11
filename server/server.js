var PORT = 9000;
var cors = require('cors');
var bodyParser = require('body-parser')

// var router = require('routes')();

// router.addRoute('/api/messages', function(req, res, params) {
//     res.setHeader('content-type', 'application/json');
//     res.write(JSON.stringify(_messages) || '');
//     res.end();
// });

// router.addRoute('/api/login?*', function(req, res, params) {
//     res.setHeader('content-type', 'application/json');
//     console.log('test');
//     console.log(req);

//     res.write(JSON.stringify(_messages) || '');
//     res.end();
// });

var express = require('express');
var app = express();
var router = express.Router();
var server = require('http').createServer(app).listen(PORT, function() {
        console.log('Express server listening on port ' + PORT);
    }),

    io = require('socket.io').listen(server);


app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/api/login', function(req, res, next) {


    var email = req.query.email;
    console.log(_users);
    if (email && (!_users.length || (_users.indexOf(email) === -1))) {
        _users.push(email);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify({
            authenticated: true,
            email: email,
            status: 200
        }));
    } else {
        res.writeHead(401, {
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify({
            error: true,
            errorMessage: 'Username already taken',
            authenticated: false
        }));
        console.log('Already logged:' + email);
    }

    res.end();

    // Handle the post for this route
});


var _messages = [];
var _users = [];
var _threads = [];

function userJoined(data) {

}

io.sockets.on('connection', function(socket) {

    socket.on('disconnect', function () {
        var userIndex = _users.indexOf(socket.name);
        _users.splice(userIndex,1);
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var createdMessage = {
            id: id,
            threadID: 't_1',
            threadName: 'React Chat',
            authorName: 'BOT',
            text: socket.name + ' left the conversation! Bye! (' + _users.length + ' users active)',
            timestamp: timestamp
        };
        io.sockets.emit('message', {
            'message': createdMessage
        });
    });

    // var timestamp = Date.now();
    // var id = 'm_' + timestamp;
    // var threadID = 't_2' || ('t_' + Date.now());
    // var createdMessage = {
    //     id: id,
    //     threadID: threadID,
    //     threadName: 'React Chat 2',
    //     authorName: 'BOT',
    //     text: 'Welcome to the Chat 2',
    //     timestamp: timestamp
    // };

    // socket.emit('message', {'message': createdMessage});


    socket.on('send', function(data) {
        io.sockets.emit('message', data);
        _messages.push(data);
    });

    socket.on('join', function(data) {
        socket.name = data.email;
        var timestamp = Date.now();
        var id = 'm_' + timestamp;
        var createdMessage = {
            id: id,
            threadID: 't_1',
            threadName: 'React Chat',
            authorName: 'BOT',
            text: 'Welcome to the Chat ' + data.email + '!!',
            timestamp: timestamp
        };
        if (_users.length > 1) {
            createdMessage.text = data.email + ' joined to the conversation! Welcome! (' + _users.length + ' users active)';
        }
        io.sockets.emit('message', {
            'message': createdMessage
        });
    });
});

exports = module.exports = server;
// delegates use() function
exports.use = function() {
    app.use.apply(app, arguments);
};