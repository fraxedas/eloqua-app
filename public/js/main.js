
var socket = io.connect();

socket.on("showThis", function(msg){
	alert(msg);
});
		
		