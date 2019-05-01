console.log("Have a nice day");

var howManyDots = prompt("How many dots would you like")
var howManyMade = 0;
//console.log(howManyDots);


var xlocs = new Array();
var ylocs = new Array();
var dXSpeed = new Array();
var dYSpeed = new Array();
var dotColor = new Array();

var dotSize = 10;

var moveTheDots = false;

var colors = ["Cyan","Blue", "DarkBlue", "Azure", "Gold",
"GreenYellow", "Pink", "Red", "Maroon", "SeaGreen"];

var totalColors = colors.length;
console.log("The total num of colors is " + totalColors);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var rect = canvas.getBoundingClientRect();
var canvasW = rect.right - rect.left;
var canvasH = rect.bottom - rect.top;
//alert("rect.right is " + rect.right);
//alert("rect.left is " + rect.left);
var id
function moveEveryBody(){
	var id = setInterval(frame, 7);

}


function frame(){

	if(moveTheDots === false) {
		clearInterval(id);
	} else {
		for(var i = 0; i< xlocs.length; i++) {
			var theDX = dXSpeed[i];
			var theDY = dYSpeed[i];
			xlocs[i] += theDX;
			ylocs[i] += theDY;

			if(xlocs[i] < dotSize/2) {
				xlocs[i] = dotSize/2 +1
				dXSpeed[i] *= -1;
			}

			if(xlocs[i] > canvasW - (dotSize/2)) {
				xlocs[i] = canvasW - (dotSize/2) -1
				dXSpeed[i] *= -1;
			}

			if(ylocs[i] < dotSize/2) {
				ylocs[i] = dotSize/2 +1
				dYSpeed[i] *= -1;
				}

			if(ylocs[i] > canvasH - (dotSize/2)) {
				ylocs[i] = canvasH - (dotSize/2) -1
				dYSpeed[i] *= -1;
			}

	
		}
		redrawScene();
	}
}





function toggleDotMoving() {
	//alert("TDM");
	if(moveTheDots === false) {
		moveEveryBody();
		moveTheDots = true;
	} else {
		moveTheDots = false;
	}
} 

function getMousePosition(canvas, event) {

	var rect = canvas.getBoundingClientRect();
	var xL =  event.clientX - rect.left;
	var yL = event.clientY - rect.top;

	return{
		x: xL,
		y: yL
	};
}

function doReset(){
	//alert("I'm going to do a reset");
	howManyMade = 0;

		var xLocsLen = xlocs.length;
		var yLocsLen = ylocs.length;
		var dXSpeedLen = dXSpeed.lenght;
		var dYSpeedLen = dYSpeed.lenght;
		var dotColorLen = dotColor.lenght;

		for(var i = 0; i < xLocsLen; i++){
			xlocs.pop();
		}

		for(var i = 0; i < yLocsLen; i++){
			ylocs.pop();
		}

		for(var i = 0; i < dXSpeedLen; i++){
			dXSpeedLen.pop();
		}

		for(var i = 0; i < dYSpeedLen; i++){
			dYSpeedLen.pop();
		}

		for(var i = 0; i < dotColorLen; i++){
			dotColor.pop();
		}
		redrawScene


}


//canvas.addEventListner('mousedown', function(event)) {
	//alert("Hey you clicked the canvas"); 
//}


/*canvas.addEventListener('mousedown', doAlert) {
	//alert("Hey you called the anoymous function")
	var mousePos = getMousePosition(canvas, event);
	alert("You clicked at " + mousePos.x + "," +mousePos.y)
};
*/
function addClick(x,y) {
	//alert("Hi from addClick");
	xlocs.push(Math.floor(x- (dotSize/2.0)));
	ylocs.push(Math.floor(y- (dotSize/2.0)));

	var dColor = Math.floor( Math.random() * colors.length);
	dotColor.push(dColor);


	var randDX = 0;
	var randDY = 0;

	while(randDX === 0 && randDY ===0) {
		randDX = Math.floor(Math.random()*9)-4;
		randDY = Math.floor(Math.random()*9)-4;
	}
	dXSpeed.push(randDX)
	dYSpeed.push(randDY)

}

function redrawScene() {
	//alert("Hi from redrawScene ");
	context.clearRect(0,0, context.canvas.width, context.canvas.height);

	for(var i=0; i < xlocs.length; i++) {

		context.beginPath();
		context.ellipse(
			xlocs[i],
			ylocs[i],
			dotSize, 
			dotSize,
			0,0,
			Math.PI*2
			);
		var whichColorNum = dotColor[i];
		context.fillStyle = colors[whichColorNum];
		context.fill();
		context.closePath();

	}

function setup(){
	setTimout(function(){
		howManyDots = prompt("How many dots would you like");
	}, 1000);
}

}

canvas.addEventListener( 'mousedown', function(event){
	var mousePos = getMousePosition(canvas, event);
	//alert("You clicked at " + mousePos.x + ", " + mousePos.y);

	if(howManyMade < howManyDots) {
		addClick(mousePos.x, mousePos.y);
		howManyMade++;
		redrawScene();
	}
}

);





