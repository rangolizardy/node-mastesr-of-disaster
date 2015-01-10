var sock = new SockJS('http://127.0.0.1:9999/parrot');
 sock.onopen = function() {
     console.log('open');
	 //var data = {'command':'test',data:{'test':true}};
	 //sock.send(JSON.stringify(data));

 };
 sock.onmessage = function(e) {
     console.log('message', e.data);
 };
 sock.onclose = function() {
     console.log('close');
 };

document.addEventListener('keydown', function(event) {
		//left down
    if(event.keyCode == 65) {
		var data = {'command':'leftdown',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
		//forward down == w
    else if(event.keyCode == 87) {
        var data = {'command':'forwarddown',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
		//right down
    else if(event.keyCode == 68) {
        var data = {'command':'rightdown',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
		//back down
    else if(event.keyCode == 83) {
        var data = {'command':'backdown',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 38) {
        var data = {'command':'updown',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 40) {
        var data = {'command':'downdown',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 37) {
        var data = {'command':'left',data:{'test':true}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 39) {
        var data = {'command':'right',data:{'test':true}};
		sock.send(JSON.stringify(data));
	}		
}); 
document.addEventListener('keyup', function(event) {
	
        var data = {'command':'stop',data:{'test':true}};
		sock.send(JSON.stringify(data));

}); 