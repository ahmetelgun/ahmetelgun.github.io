var a = 1;
window.onload = function(){
	canvas = document.getElementById('game');
	context = canvas.getContext('2d');
	document.addEventListener('keydown', function(e){
		e.preventDefault();
		if(window.a == 1){
			window.a = 0;
			onKeyPress(e);
		}
	});
	init();
}

function init(){
	positionX = positionY = 10;
	appleX = appleY = 5;
	gridSize = 20;
	tileCountX = canvas.width / gridSize;
	tileCountY = canvas.height / gridSize;
	trail = [];
	tailSize = 5;
	velocityX = velocityY = 0;
	timer = setInterval(loop.bind(this), 1000/15);
}

function reset(){
	clearInterval(timer);
	init();
}

function loop(){
	update();
	draw();
	window.a = 1;
}

function update(){
	positionX += velocityX;
	positionY += velocityY;

	if(positionX < 0){
			trail.reverse();
			if((trail[trail.length-1].positionX-trail[trail.length-2].positionX)==1){
					positionX = trail[trail.length -1].positionX+1;
					positionY = trail[trail.length -1].positionY;
					velocityX = 1;
					velocityY = 0;
			}
			if((trail[trail.length-2].positionX-trail[trail.length-1].positionX)==1){
					positionX = trail[trail.length -1].positionX-1;
					positionY = trail[trail.length -1].positionY;
					velocityY = 0;
					velocityX = -1;
			}
			if((trail[trail.length-1].positionY-trail[trail.length-2].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY+1;
					velocityY = 1;
					velocityX = 0;
			}
			if((trail[trail.length-2].positionY-trail[trail.length-1].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY-1;
					velocityY = -1;
					velocityX = 0;
			}
	}
	if(positionX > tileCountX - 1){
			trail.reverse();
			if((trail[trail.length-1].positionX-trail[trail.length-2].positionX)==1){
					positionX = trail[trail.length -1].positionX+1;
					positionY = trail[trail.length -1].positionY;
					velocityX = 1;
					velocityY = 0;
			}
			if((trail[trail.length-2].positionX-trail[trail.length-1].positionX)==1){
					positionX = trail[trail.length -1].positionX-1;
					positionY = trail[trail.length -1].positionY;
					velocityY = 0;
					velocityX = -1;
			}
			if((trail[trail.length-1].positionY-trail[trail.length-2].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY+1;
					velocityY = 1;
					velocityX = 0;
			}
			if((trail[trail.length-2].positionY-trail[trail.length-1].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY-1;
					velocityY = -1;
					velocityX = 0;
			}
	}
	if(positionY < 0){
			trail.reverse();
			if((trail[trail.length-1].positionX-trail[trail.length-2].positionX)==1){
					positionX = trail[trail.length -1].positionX+1;
					positionY = trail[trail.length -1].positionY;
					velocityX = 1;
					velocityY = 0;
			}
			if((trail[trail.length-2].positionX-trail[trail.length-1].positionX)==1){
					positionX = trail[trail.length -1].positionX-1;
					positionY = trail[trail.length -1].positionY;
					velocityY = 0;
					velocityX = -1;
			}
			if((trail[trail.length-1].positionY-trail[trail.length-2].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY+1;
					velocityY = 1;
					velocityX = 0;
			}
			if((trail[trail.length-2].positionY-trail[trail.length-1].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY-1;
					velocityY = -1;
					velocityX = 0;
			}
	}
	if(positionY > tileCountY - 1){
			trail.reverse();
			if((trail[trail.length-1].positionX-trail[trail.length-2].positionX)==1){
					positionX = trail[trail.length -1].positionX+1;
					positionY = trail[trail.length -1].positionY;
					velocityX = 1;
					velocityY = 0;
			}
			if((trail[trail.length-2].positionX-trail[trail.length-1].positionX)==1){
					positionX = trail[trail.length -1].positionX-1;
					positionY = trail[trail.length -1].positionY;
					velocityY = 0;
					velocityX = -1;
			}
			if((trail[trail.length-1].positionY-trail[trail.length-2].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY+1;
					velocityY = 1;
					velocityX = 0;
			}
			if((trail[trail.length-2].positionY-trail[trail.length-1].positionY)==1){
					positionX = trail[trail.length -1].positionX;
					positionY = trail[trail.length -1].positionY-1;
					velocityY = -1;
					velocityX = 0;
			}
	}

	trail.forEach(t => {
		if(positionX === t.positionX && positionY === t.positionY){
			reset();
		}
	});

	trail.push({positionX: positionX, positionY: positionY});

	while(trail.length > tailSize){
		trail.shift();
	}

	if(appleX === positionX && appleY === positionY){
		tailSize++;
		appleX = Math.floor(Math.random() * tileCountX);
		appleY = Math.floor(Math.random() * tileCountY);
	}
}

function draw(){
	context.fillStyle='black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle='white';
	context.font='20px Arial';
	context.fillText(tailSize - 5, 20, 40);

	context.fillStyle='pink';
	context.fillRect(appleX * gridSize, appleY * gridSize, gridSize -5, gridSize -5);

	context.fillStyle='green';


	context.fillStyle='red';
	trail.forEach((t, i, array)=> {
		if(i == array.length -1){
			drawHead(t);
		}
		else{
			context.fillRect(t.positionX * gridSize + 3, t.positionY * gridSize + 3, gridSize -6, gridSize -6);
		}
	});
	
}

function onKeyPress(e){
	e.preventDefault();
	if(e.keyCode === 37 && velocityX !== 1){
		velocityX = -1;
		velocityY = 0;
	}
	if(e.keyCode === 38 && velocityY !== 1){
		velocityX = 0;
		velocityY = -1;
	}
	if(e.keyCode === 39 && velocityX !== -1){
		velocityX = 1;
		velocityY = 0;
	}
	if(e.keyCode === 40 && velocityY !== -1){
		velocityX = 0;
		velocityY = 1;
	}
}

function drawHead(t) {

	let s = gridSize;
	let x = t.positionX * gridSize;
	let y = t.positionY * gridSize;

	context.save();

	if(velocityX === -1) {
		context.translate(x,y+s);
		context.rotate(- Math.PI / 2);
	}
	else if(velocityX === 1) {
		context.translate(x+s,y);
		context.rotate(Math.PI / 2);
	}
	else if(velocityY === 1) {
		context.translate(x+s,y+s);
		context.rotate(Math.PI);
	}
	else {
		context.translate(x,y);
	}

	context.fillStyle = 'Green';

	context.beginPath();
	context.moveTo(9, 0);
	context.lineTo(11, 0);
	context.lineTo(14, 1);
	context.lineTo(s -2, 10);
	context.lineTo(s -2, 14);
	context.lineTo(17, s -2);
	context.lineTo(3, s -2);
	context.lineTo(2, 14);
	context.lineTo(2, 10);
	context.lineTo(6, 1);
	context.fill();

	context.restore();
}
