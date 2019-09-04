//From the front end we have to make a connection now.

var frontendSocket = io.connect('http://localhost:4000');

//Query DOM
//creating four variables, and each one of these is getElementById from the index.html page
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

//Emit Event
//vanilla javascript listening for a click event
btn.addEventListener('click', function(){
    frontendSocket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

//when keypress in the message field, the message to the server will happen
message.addEventListener('keypress', function(){
    frontendSocket.emit("typing", handle.value);
});

//listening for events
frontendSocket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

frontendSocket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});