//This function returns a random number between the given min and max
export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max-min)) + min;
}

//Function is used to remove the blur and make the rectangles crisp. Since using CSS width=100%, need to readjust the canvas height and width correspondingly
const removeBlur = (canvas) => {
	//create a style object that returns width and height of th canvas
	let style = {
		height() {
			return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
		},
		width() {
			return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
		}
	}
	//set the correct attributes
	const dpi = window.devicePixelRatio;
	canvas.setAttribute('width', style.width() * dpi);
	canvas.setAttribute('height', style.height() * dpi);
}

//this method draws the blank grid (5x20) of squares for the 100 atoms
export const drawGrid = (canvas, vueObjPtr) =>{
	//check if canvas exists
	if (!canvas || !canvas.getContext){
		return null;
	}
	//remove blur by adjusting the canvas size
	removeBlur(canvas);

	//get the width of the tile
	var width = Math.floor(canvas.height/5);
	//check to make sure that the width fits
	var count = 0;
	while (width*20 >= canvas.width){
		count += 1;
		width = Math.floor(canvas.height/(5 + count));
	}

	vueObjPtr.width = width;
	vueObjPtr.startXOffset = (canvas.width-(20*width))/2;

	//draw the grid
	const context = canvas.getContext("2d");
	const colour = "white";
	var xPos = vueObjPtr.startXOffset;
	var yPos = 0;

	for (var j=0; j<5; j++){
		for (var i=0; i<20; i++){
			//draw the tile and also add coordinates to the atoms array
			vueObjPtr.atoms.push({'xPos': xPos, 'yPos': yPos, 'randNum': 0});
			drawRect(colour, context, xPos, yPos, width, width);
			xPos += width;
		}
		xPos = vueObjPtr.startXOffset;
		yPos += width;
	}
}

//this function draws a rectangle and its border
const drawRect = (colour, context, xPos, yPos, width, height) => {
	xPos = parseInt(xPos) + 0.5;
	yPos = parseInt(yPos) + 0.5;

	//draw the border
	context.strokeStyle='black';
	context.strokeRect(xPos, yPos, width-4, height-4);

	//fill rectangle
	context.fillStyle = colour;
	context.fillRect(xPos, yPos, width-4, height-4);
}

export const drawGraph = (canvas, vueObjPtr) => {
	//check if canvas exists
	if (!canvas || !canvas.getContext){
		return null;
	}
	//remove blur by adjusting the canvas size
	removeBlur(canvas);

	const context = canvas.getContext("2d");
	const width = vueObjPtr.width;
	const axisArea = canvas.height-75;

	//draw the y axis
	context.strokeStyle = 'blue';
	context.moveTo(vueObjPtr.startXOffset-4,1);
	context.lineTo(vueObjPtr.startXOffset-4,axisArea);
	context.stroke();

	//draw x axis
	context.moveTo(vueObjPtr.startXOffset-4,axisArea);
	context.lineTo(canvas.width-vueObjPtr.startXOffset+width , axisArea);
	context.stroke();

	//draw the labels
	drawAxisLabels(canvas, vueObjPtr, true);

	//draw the initial atoms
	const xPos = vueObjPtr.startXOffset;
	const yPos = axisArea - vueObjPtr.atomLeft*2;
	drawRect('cyan', context, xPos, yPos, width, vueObjPtr.atomLeft*2);

	//draw the initial x axis labels
	xLabel(canvas, vueObjPtr, vueObjPtr.atomLeft);
	vueObjPtr.currentYear += 1;
	xLabel(canvas, vueObjPtr, "0");
}

const drawAxisLabels = (canvas, vueObjPtr, isDemo) => {
	const context = canvas.getContext("2d");
	const width = vueObjPtr.width;

	const fontSize = 20;
	context.font = fontSize + "px arial";
	context.fillStyle = "black";

	//draw the y axis label
	xPosText = width/2;

	//adjust the label position based on the startXOffset
	if (isDemo)
		xPosText = vueObjPtr.startXOffset - width/2
	yPosText = canvas.height/2 - 20;

	//rotation is required for the text, save context for restore and perform axis translation.
	context.save();
	context.translate(xPosText + 5, yPosText);
	context.rotate(-Math.PI/2);
	context.textAlign = "center";
	context.fillText("Number of Atoms", 0, fontSize/2 - 5);
	context.restore();

	//draw the x axis label
	var xPosText = canvas.width/2;
	var yPosText = canvas.height;
	context.fillText("Year", xPosText, yPosText);
}

//this helper function draws the x-axis label values
const xLabel = (canvas, vueObjPtr, numAtom) => {
	const context = canvas.getContext("2d");

	const axisArea = canvas.height-75;
	const width = vueObjPtr.width;

	//draw the text for number of atoms
	const fontSize = 25;
	const xPosText = vueObjPtr.startXOffset + width/2 + width*vueObjPtr.currentYear;
	const yPosText = axisArea + fontSize;

	//clear area before writing text
	context.clearRect(xPosText-width/2, yPosText-fontSize+2, width, fontSize*2);

	context.font = fontSize + "px arial";
	context.fillStyle = "blue";
	context.textAlign = "center";
	context.fillText(numAtom, xPosText, yPosText, width);

	//draw text for the year/round
	context.fillStyle = "darkred";
	context.fillText(vueObjPtr.currentYear, xPosText, yPosText+fontSize, width);
}

//this function generates random values for each undecayed atom in the atoms array
export const generateRandomValues = (canvasAtoms, canvasGraph, vueObjPtr) => {
	//variables used for drawing the progressive height of the remianing items
	const contextGraph = canvasGraph.getContext("2d");
	const xPos = vueObjPtr.startXOffset + vueObjPtr.width*vueObjPtr.currentYear;

	//the yPos and height changes at each iteration to incrementally get larger
	const axisArea = canvasGraph.height-75;
	var yPos = axisArea;
	var height = 2;

	//disable the button until all randNum for atoms generated
	vueObjPtr.disableButton = true;

	//shuffle the atom array to show random build up of atoms
	var atoms = shuffleAtoms(vueObjPtr.atoms);
	//set a delay to show incremental build up
	var i = 0;
	vueObjPtr.graphIntervalId = setInterval(() => {
		//generate the random number and then draw it on canvas
		var randNum = getRandomNumber(1,7);
		atoms[i].randNum = randNum;

		drawNumber(canvasAtoms, vueObjPtr, randNum, "red", atoms[i].xPos, atoms[i].yPos);

		//update the current height and yPos to iteratively reach the number of remaining atoms
		yPos = axisArea - height;
		drawRect('cyan', contextGraph, xPos, yPos, vueObjPtr.width, height);
		xLabel(canvasGraph, vueObjPtr, height/2);
		height += 2;

		i += 1;
		//condition to end the timer interval
		if (i >= vueObjPtr.atoms.length) {
			//Clear the interval addition timer.
			clearInterval(vueObjPtr.graphIntervalId);
			vueObjPtr.disableButton = false;
		}
	}, vueObjPtr.graphDelay);
}

//this function shuffles the input array of atoms
const shuffleAtoms = (array) => {
	var shuffledArray = array.slice();
	for (var i = shuffledArray.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = shuffledArray[i];
		shuffledArray[i] = shuffledArray[j];
		shuffledArray[j] = temp;
	}
	return shuffledArray;
}

//this function draws the number at the specified index of the atoms canvas
const drawNumber = (canvas, vueObjPtr, num, colour, xPos, yPos) => {
	const context = canvas.getContext("2d");
	const width = vueObjPtr.width;

	const fontSize = width-10;
	context.font = fontSize + "px arial";
	context.fillStyle = colour;
	context.textAlign = "center";
	const xPosText = xPos + width/2;
	const yPosText = yPos + fontSize;
	context.fillText(num, xPosText, yPosText, width);
}

//this function highlights the atoms with the dice roll (i.e. decayed atoms)
export const decayedAtoms = (canvasAtoms, canvasGraph, vueObjPtr, highlight) => {
	//variables used for drawing the progressive height of the remianing items
	const contextAtoms = canvasAtoms.getContext("2d");
	const contextGraph = canvasGraph.getContext("2d");
	const xPos = vueObjPtr.startXOffset + vueObjPtr.width*vueObjPtr.currentYear;

	//the yPos and height changes at each iteration to incrementally get larger
	const axisArea = canvasGraph.height-75;
	var yPos = axisArea + 2*vueObjPtr.atomLeft;
	var height = 2*vueObjPtr.atomLeft;

	//disable the button until interval is finished
	vueObjPtr.disableButton = true;

	//shuffle the atom array to show random build up of atoms
	var atoms = shuffleAtoms(vueObjPtr.atoms);

	//this means stage 2
	if (highlight){
		var decayed = [];
		for (var k=0; k<atoms.length; k++){
			if(atoms[k].randNum === vueObjPtr.diceRoll){
				decayed.push(atoms[k]);
			}
		}
		vueObjPtr.numDecayed = decayed.length;

		//set a delay to show incremental build up
		var timeDelay = 10;
		if (decayed.length != 0)
			timeDelay = vueObjPtr.timeDelay/decayed.length;

		var i = 0;
		if (decayed.length > 0){
			vueObjPtr.graphIntervalId = setInterval(() => {
				//update the decayed atoms
				drawRect("red", contextAtoms, decayed[i].xPos, decayed[i].yPos, vueObjPtr.width, vueObjPtr.width);
				drawNumber(canvasAtoms, vueObjPtr, decayed[i].randNum, "yellow", decayed[i].xPos, decayed[i].yPos);

				//update the current height and yPos to iteratively reach the number of remaining atoms on the graph canvas
				yPos = axisArea - height;
				contextGraph.clearRect(xPos, yPos-2, vueObjPtr.width, height);
				drawRect('cyan', contextGraph, xPos, yPos, vueObjPtr.width, height);

				height -= 2;
				xLabel(canvasGraph, vueObjPtr, height/2);

				i += 1;
				//condition to end the timer interval
				if (i >= decayed.length) {
					vueObjPtr.disableButton = false;
					//Clear the interval addition timer.
					clearInterval(vueObjPtr.graphIntervalId);
				}
			}, timeDelay);
		}
		else {
			vueObjPtr.disableButton = false;
		}
	}
	//this means stage 3
	else {
		for (var j=0; j<atoms.length; j++){
			if(atoms[j].randNum === vueObjPtr.diceRoll){
				drawRect("blue", contextAtoms, atoms[j].xPos, atoms[j].yPos, vueObjPtr.width, vueObjPtr.width);
				//remove the atom from the arrays
				vueObjPtr.atoms.splice( vueObjPtr.atoms.indexOf(atoms[j]), 1);
			}
			//this is also for stage 3, remove the numbers from the un-decayed atoms
			else {
				drawRect("white", contextAtoms, atoms[j].xPos, atoms[j].yPos, vueObjPtr.width, vueObjPtr.width);
			}
		}
		vueObjPtr.disableButton = false;
	}
}

//the following methods are used for the Many Trials module
export const drawInitialGraph = (canvas, vueObjPtr) => {
	//check if canvas exists
	if (!canvas || !canvas.getContext){
		return null;
	}
	//remove blur by adjusting the canvas size
	removeBlur(canvas);

	initialiseAtoms(vueObjPtr);

	//draw the initial atoms
	drawAtomLeft(canvas, vueObjPtr);

	//draw the 4 y-axis labels
	drawYLabels(canvas, vueObjPtr);

	//draw the axis labels
	drawAxisLabels(canvas, vueObjPtr, false);
}

//this function draws the input number of atoms scaled to the cavas heigh (i.e. percentage of the canvas height is the percentage of atom left undecayed)
const drawAtomLeft = (canvas, vueObjPtr) => {
	const context = canvas.getContext("2d");
	const width = vueObjPtr.width;
	const graphHeight = canvas.height - 50;

	//determine x and y coordinates to start the rectangle
	const xPos = vueObjPtr.startXOffset + vueObjPtr.currentYear*width;

	//determine the percentage of atoms left
	var percentAtomLeft = vueObjPtr.atomLeft/(vueObjPtr.trialInputs.numAtoms);
	// console.log("%AtomLeft = " + percentAtomLeft);

	var yPos = graphHeight - graphHeight*percentAtomLeft;
	var height = graphHeight*percentAtomLeft;

	//check for small percentage left, then keep it as smallest value to be drawn
	if (percentAtomLeft*100 <= 1){
		yPos = graphHeight - graphHeight*0.01;
		height = graphHeight*0.01;
	}
	drawRect(vueObjPtr.graphColour, context, xPos, yPos, width, height);
}

//this helper function draws the y axis labels
const drawYLabels = (canvas, vueObjPtr) => {
	const context = canvas.getContext("2d");
	//initialise the writing variables
	const fontSize = 25;
	context.font = fontSize + "px arial";
	context.fillStyle = "darkred";
	context.textAlign = "center";

	//get the width and y increment values based on the canvas height.
	const width = vueObjPtr.startXOffset;
	const ySpacer = (canvas.height-30)/4;
	const yIncrements = vueObjPtr.trialInputs.numAtoms/4;

	//draw the text for 5 different levels/numbers of atoms
	const xPosText = width/2+10;
	var yPosText = fontSize/2+5;
	context.fillText(Math.round(vueObjPtr.trialInputs.numAtoms), xPosText, yPosText, width);

	yPosText = ySpacer;
	context.fillText(Math.round(vueObjPtr.trialInputs.numAtoms - yIncrements), xPosText, yPosText, width);

	yPosText = 2*ySpacer;
	context.fillText(Math.round(vueObjPtr.trialInputs.numAtoms - 2*yIncrements), xPosText, yPosText, width);

	yPosText = 3*ySpacer;
	context.fillText(Math.round(vueObjPtr.trialInputs.numAtoms - 3*yIncrements), xPosText, yPosText, width);

	yPosText = canvas.height - fontSize -20;
	context.fillText(0, xPosText, yPosText, width);
}

//this function initialise random values for each of the atoms
const initialiseAtoms = (vueObjPtr) => {
	for (var i=0; i<vueObjPtr.trialInputs.numAtoms; i++){
		vueObjPtr.atoms.push(0);
	}
}

//this function rerolls the random values for each atom in the atoms array
export const rerollAtoms = (vueObjPtr) => {
	for (var i=0; i<vueObjPtr.atomLeft; i++){
		var randNum = getRandomNumber(0,vueObjPtr.trialInputs.probDecay);
		vueObjPtr.atoms[i] = randNum;
	}
}

//this function removes the decayed atoms from the atoms array and updates the graph
export const removeDecayedAtoms = (canvas, vueObjPtr) => {
	for (var j=0; j<vueObjPtr.atomLeft; j++){
		if(vueObjPtr.atoms[j] === vueObjPtr.diceRoll){
			//remove the atom from the arrays
			vueObjPtr.atoms.splice(j, 1);
		}
	}
	drawAtomLeft(canvas, vueObjPtr);
}

//this function draws the half life year at its corresponding position on the canvas
export const drawHalfLifeYear = (canvas, vueObjPtr) => {
	const context = canvas.getContext("2d");

	const fontSize = 25;
	context.font = fontSize + "px arial";
	context.fillStyle = "darkgreen";
	const xPosText = vueObjPtr.startXOffset + (vueObjPtr.currentYear+1)*vueObjPtr.width;
	const yPosText = canvas.height - fontSize;
	context.fillText("Year " + vueObjPtr.halfLifeYear, xPosText, yPosText);
}