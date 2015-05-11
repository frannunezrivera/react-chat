# React Chat

This project has been madre as a practice for using some techonologies alltogether.

I've used yeoman to start the project , using the generator-react-webpack to agilize the project/react components creation.
Then I have used flux example flux-chat as a starting point of I wanted to do. Basically is a kind of Fork but integrating it with webpack.

I have created a login system on top of the chart so the users can log in (just username/mail) needed. A node expressjs server is used as a backend. The users login is really simple for the moment and it just verify that the username/email is not already taken. This will be improved in the future.

## Summary of tech used
- React for the views
- React Router for routing
- Flux for React for the app architecture
- Grunt for building tasks
- Karma & PhamtomJS for testing
- Webpack for modules with dependencies
- Socket IO for Frond and the Back messages communication
- Node & ExpressJS for the backend

## Installation

Install git & node if you haven't done it already!
git clone git clone https://github.com/frannunezrivera/react-chat.git
cd react-chat
npm install

## Usage

grunt serve - for dev version
grunt serve:dist - for run distribution version

## TODO
- Some testing
- Remove user from the server users array when logged oout.
- User Store
- Add a Create new thread button
- Remove user from the 
- Add a database

## History

TODO: Write history
