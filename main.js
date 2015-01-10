var arDrone = require('ar-drone');
var client = arDrone.createClient();
var http = require('http');
var sockjs = require('sockjs');
var movement_factor = 0.7;
var echo = sockjs.createServer();
client.config('control:altitude_max', 3000);

var currently_down = [];
echo.on('connection', function(conn) {
	console.log('conne');
    conn.on('data', function(message) {
		var msg = JSON.parse(message);
		if(msg.command == "function"){
			handle_func(msg.data.keycode);	
		}else{
			handle_input(msg.command, msg.data);
		}
	
    });
    conn.on('close', function() {
	});
});
function handle_input(command,data){
	var index = currently_down.indexOf(data.keycode);
	if (index > -1) {
		currently_down.splice(index, 1);
	}
	currently_down.push(data.keycode);
	switch_input(command,data);
}
function handle_func(func){
	switch(func){
		case "flip":
			console.log('flipped here1');
			client.animate('flipAhead', 500);
			break;
		case "turnaround":
			console.log('ma');
			client.animate('turnaround', 1000);
			break;
		
	}
}
function switch_input(command,data){

	switch(command){
			case "stop":
				stop(data);
				break
			case "left":
				client.left(movement_factor);
				break;
			case "right":
				client.right(movement_factor);
				break;
			case "forward":
				client.front(movement_factor);
				break;
			case "back":
				client.back(movement_factor);
				break;
			case "up":
				client.up(movement_factor);
				break;
			case "down":
				client.down(movement_factor);
				break;
			case "rotleft":
				client.counterClockwise(movement_factor);
				break;
			case "rotright":
				client.clockwise(movement_factor); 
				break;
			case "land":
				client.land();	
				break;
			case "takeoff":
				client.disableEmergency();
				client.takeoff();
				break;
			case "flip":		   
		 		
				break;
			case "turnaround":
				client.animate('turnaround',500);
					var index = currently_down.indexOf('turnaround');
					if (index > -1) {
						currently_down.splice(index, 1);
					}

				break;

		}	
	
}
function stop(data){
				var index = currently_down.indexOf(data.keycode);
				if (index > -1) {
					currently_down.splice(index, 1);
				}
				client.stop();
				handle_up();
}
function handle_up(){
	currently_down.forEach(function(entry) {
		switch_input(entry);
	});
	
}
var server = http.createServer(function(req,res){});
echo.installHandlers(server, {prefix:'/parrot'});
server.listen(9999, '0.0.0.0');
var express = require('express')
  , app = express()
  , path = require('path')
  , server = require("http").createServer(app)
  ;
app.use(express.static(path.join(__dirname, 'client')));

/*
 * Important:
 *
 * pass in the server object to listen, not the express app
 * call 'listen' on the server, not the express app
 */
// should be require("dronestream").listen(server);
require("dronestream").listen(server);
server.listen(3000);