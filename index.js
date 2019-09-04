//this is the server-side code
var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();

var server = app.listen(4000, function(){
    console.log("Listening to requests on port 4000");
})

//serving static files in the folder public
app.use(express.static('public'));

//how do actually set up socket.io?
//the socket takes a parameter of what server we're working with
var io = socket(server);
//when we make this connection we can use the callback function
io.on('connection', function(socket){
    //everytime we refresh or a different computer connects, we get our own unique socket id connection
    //if we have 10 different clients all making a connection they all have their own socket
    console.log('Server has made a Socket Connection', socket.id);


    //now we listen to the clients sending the messages
    socket.on('chat', function(data){
        //send message to everyone so that everyone on the chatroom can see the message
        io.sockets.emit('chat', data);
    });

    //we could also broadcast the message, where the server sends messages back to every socket except where it came from
    // socket.on('typing', function(data){
    //     socket.broadcast.emit('typing', data);
    // });
    
    //this also effectively works, receiving data and using it as a function
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });


});



