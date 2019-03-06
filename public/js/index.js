$( document ).ready(function() {

    const socket = io();
    $("#login").submit( e =>{
        e.preventDefault();
        socket.emit("login","example message");
    });

});