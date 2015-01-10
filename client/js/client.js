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
		var data = {'command':'left',data:{'keycode':"left"}};
		sock.send(JSON.stringify(data));
    }
		//forward down == w
    else if(event.keyCode == 87) {
        var data = {'command':'forward',data:{'keycode':"forward"}};
		sock.send(JSON.stringify(data));
    }
		//right down
    else if(event.keyCode == 68) {
        var data = {'command':'right',data:{'keycode':"right"}};
		sock.send(JSON.stringify(data));
    }
		//back down
    else if(event.keyCode == 83) {
        var data = {'command':'back',data:{'keycode':"back"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 38) {
        var data = {'command':'up',data:{'keycode':"up"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 40) {
        var data = {'command':'down',data:{'keycode':"down"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 37) {
        var data = {'command':'rotleft',data:{'keycode':"rotleft"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 39) {
        var data = {'command':'rotright',data:{'keycode':"rotright"}};
		sock.send(JSON.stringify(data));
	}	
    else if(event.keyCode == 80) {
        var data = {'command':'takeoff',data:{'keycode':"takeoff"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 76) {
        var data = {'command':'land',data:{'keycode':"land"}};
		sock.send(JSON.stringify(data));
	}		
}); 
document.addEventListener('keyup', function(event) {
	
			//left down
    if(event.keyCode == 65) {
		var data = {'command':'stop',data:{'keycode':"left"}};
		sock.send(JSON.stringify(data));
    }
		//forward down == w
    else if(event.keyCode == 87) {
        var data = {'command':'stop',data:{'keycode':"forward"}};
		sock.send(JSON.stringify(data));
    }
		//right down
    else if(event.keyCode == 68) {
        var data = {'command':'stop',data:{'keycode':"right"}};
		sock.send(JSON.stringify(data));
    }
		//back down
    else if(event.keyCode == 83) {
        var data = {'command':'stop',data:{'keycode':"back"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 38) {
        var data = {'command':'stop',data:{'keycode':"up"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 40) {
        var data = {'command':'stop',data:{'keycode':"down"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 37) {
        var data = {'command':'stop',data:{'keycode':"rotleft"}};
		sock.send(JSON.stringify(data));
    }
    else if(event.keyCode == 39) {
        var data = {'command':'stop',data:{'keycode':"rotright"}};
		sock.send(JSON.stringify(data));
	}
}); 