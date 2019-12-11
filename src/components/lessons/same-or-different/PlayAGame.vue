<template>
	<div>
		<h2 class="text-success text-center">Play a game</h2>
		<div class="container mt-4 mb-5">
			<div v-if="showInputs" class="row justify-content-center">
				<form>
					<div class="app--enter-number form-group row mt-3">
						<label for="numPlantsInput" class="col-sm-9 col-form-label" style="color: red">
							Enter number of red blocks(1-{{maxBlockInput}}):
						</label>
						<div class="col-sm-3">
							<input type="number" 
								v-model="numRedBlocks"
								class="form-control"
								min="1"
								max="100" 
								id="numRedBlocks">
						</div>
					</div>
					<div class="app--enter-number form-group row mt-3">
						<label for="numTilesInput" class="col-sm-9 col-form-label" style="color: blue">
							Enter number of blue blocks(1-{{maxBlockInput}}):
						</label>
						<div class="col-sm-3">
							<input type="number" 
								v-model="numBlueBlocks"
								class="form-control"
								min="1"
								max="100" 
								id="numBlueBlocks">
						</div>
					</div>
					<p v-if="showInputError" class="alert mt-3 alert-danger">Please enter a whole number between {{minBlockInput}} to {{maxBlockInput}} for number of blocks and {{minBlockInput}} to {{maxTrialInput}} for number of trials.</p>
					<div class="form-action col-6 offset-sm-9 offset-4 mt-3">
						<button 
							class="btn btn-outline-success btn-lg"
							@click="checkInputs"
						>OK</button>
					</div>
				</form>
			</div>
			<div v-else class="row">
				<div class="col-6">
					<div class="row">
						<h4>Bag contains <strong style="color:red">{{numRedBlocks}} red</strong> and <strong style="color:blue">{{numBlueBlocks}} blue</strong>.</h4>
						<h5>Player A wins if the colours are the same.</h5>
						<h5>Player B wins if the colours are different.</h5>
					</div>

					<div class="row pt-3">
						<table>
							<tr>
								<td><h5 class="statLabel"></h5></td>
								<td><h5 class="statLabel">Same (A)</h5></td>
								<td><h5 class="statLabel">Different (B)</h5></td>
								<td><h5 class="statLabel">Total</h5></td>
							</tr>
							<tr>
								<td><h5 class="statLabel">Number of wins:</h5></td>
								<td><h4 class="stat">{{numSame}}</h4></td>
								<td><h4 class="stat">{{numDiff}}</h4></td>
								<td><h4 class="stat">{{numTotal}}</h4></td>
							</tr>
							<tr>
								<td><h4 class="statLabel"></h4></td>
								<td><h4 class="stat">{{statSame}}</h4></td>
								<td><h4 class="stat">{{statDiff}}</h4></td>
							</tr>
						</table>
					</div>
					<div class="row pt-5">
						<h4 class="drawText text-right col-10">First draw (A)</h4>
						<div id="blockA"></div>
					</div>
					<div class="row pt-2">
						<h4 class="drawText text-right col-10">Second draw (B)</h4>
						<div id="blockB"></div>
					</div>

					<div class="app--action mt-4">
						<button v-if="showStart" id="startButton" type="button" class="btn btn-outline-success" @click="start">Tap here to begin</button>
						<div v-if="!showStart">
							<div v-if="!isAuto">
								<button type="button" class="btn btn-outline-dark mr-3" @click="reset" v-if="isFinished">Tap here to reset</button>
								<button type="button" class="btn btn-outline-success mr-3" @click="drawBlock" v-if="!isFinished">Tap here for Player {{player}} to draw a block at random</button>
							</div>
							<div v-if="isAuto">
								<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="showPause">Tap here to pause</button>
								<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="!showPause">Tap here to resume</button>
							</div>
						</div>
						<div class="app--demo-auto-option mt-2">
							<div class="form-check form-check-inline">
								<input type="radio" class="form-check-input" id="demo" name="demoOption" value= "demo" v-model="mode">
								<label class="form-check-label" for="demo">Demo</label>
								<input type="radio" class="ml-2 form-check-input" id="auto" name="autoOption" value= "auto" v-model="mode">
								<label class="form-check-label" for="auto">Auto</label>
							</div>
						</div>
					</div>
				</div>
				<div class="col-6">
					<div class="row justify-content-center" id="canvas-container">
						<canvas id="app-canvas"></canvas>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import { 
	drawNextBlock,
	drawNextCanvas
} from './utils';

export default {
	data: function() {
		return {
			//player turn
			player: 'A',
			turn: 0,

			//variables used for getting input from user and input error msg
			showInputs: true,
			showInputError: false,
			showStart: true,

			//array used for storing the blocks
			blocks: [],
			takenBlocks: [],
			key: 1,
			width: 0,

			//input obtained from user
			numRedBlocks: 1,
			numBlueBlocks: 1,

			minBlockInput: 1,
			maxBlockInput: 100,

			//this variable is used for for auto or demo mode
			mode: 'demo',
			//this id is used to kill the timer interval
			intervalId: 0,
			//this value used by the timer, as to how fast the tiles should be added.
			//draw one block from the bag every 1s
			timeDelay: 1000,

			//used for auto mode buttons
			showPause: false,

			//variables used for storing the statistics
			numSame: 0,
			numDiff: 0
		}
	},
	computed: {
		
		isFinished: function(){
			if (this.turn === 2){
				return true;
			}
			else{
				return false;
			}
		},
		isAuto: function(){
			if (this.mode == "auto"){
				return true;
			}
			else {
				return false;
			}
		},
		//calculate the total and statistics for each player for each
		numTotal: function(){
			return this.numSame+this.numDiff;
		},
		statSame: function(){
			if (this.numTotal == 0)
				return 0 + '%';
			var res = parseFloat(((this.numSame/this.numTotal)*100).toFixed(2));
			return res + '%';
		},
		statDiff: function(){
			if (this.numTotal == 0)
				return 0 + '%';
			var res = parseFloat(((this.numDiff/this.numTotal)*100).toFixed(2));
			return  res + '%';
		}
	},
	watch: {
		isAuto: function(){
			if (this.isAuto)
				this.showPause = true;
			else{
				this.showPause = false;
				clearInterval(this.intervalId);
			}
		},
		showPause: function(){
			if (!this.showPause)
				clearInterval(this.intervalId);
			else
				this.autoMode();
		},
		isFinished: function(){
			if (this.isFinished === true){
				//update the stats when finished the round
				if (this.takenBlocks[0].colour === this.takenBlocks[1].colour)
					this.numSame += 1;
				else
					this.numDiff += 1;
			}
		}
	},
	methods: {
		//function used to run the auto mode
		autoMode(){
			if (this.isAuto && !this.showStart){
				//check if running and show Pause button is true
				if (this.showPause == true){
					//timer to delay the addition of next tile, using intervals of timeDelay
					this.intervalId = setInterval(() => {
						//continue until 2 blocks taken
						if (this.isFinished){
							//Clear the interval addition timer.
							this.reset();
							
							//draw new canvas
							const canvas = document.querySelector('#app-canvas');
							drawNextCanvas(canvas, this);
						}
						else{
							this.drawBlock();
						}
					}, this.timeDelay);
				}
			}
		},

		//this function changes the interface from inputs.
		checkInputs(){
			const inputRed = parseInt(this.numRedBlocks);
			const inputBlue = parseInt(this.numBlueBlocks);
			if ((inputRed >= this.minBlockInput) && (inputRed <= this.maxBlockInput) && (inputBlue >= this.minBlockInput) && (inputBlue <= this.maxBlockInput)){
				//input obtained from user
				this.numRedBlocks = inputRed;
				this.numBlueBlocks = inputBlue;

				this.showInputs = false;
			}
			else {
				this.showInputError = true;
			}
		},

		//This function draws a block from the canvas.
		drawBlock(){
			const canvas = document.querySelector('#app-canvas');
			drawNextBlock(canvas, this);

			//update player and turn
			if (this.player === 'A'){
				//update the players block
				const b = document.getElementById('blockA');
				b.style.background = this.takenBlocks[0].colour;
				b.style.border = 'black solid 1px';

				this.player = 'B';
			}
			else{
				//update the players block
				const b = document.getElementById('blockB');
				b.style.background = this.takenBlocks[1].colour;
				b.style.border = 'black solid 1px';

				this.player = 'A';
			}
			this.turn += 1;
		},

		//This function resets the plant to a new value and removes all the tiles from the canvas. 
		start(){
			//remove the Start button and input error msg on correct input
			this.showStart = false;

			const canvas = document.querySelector('#app-canvas');
			drawNextCanvas(canvas, this);

			if (this.isAuto)
				this.autoMode();
			//else demo mode, adds tiles using drawBlock button
		},
		reset(){
			//if demo mode show start button
			if (!this.isAuto)
				this.showStart = true;

			//reset the variables
			this.player = 'A';
			this.turn = 0;
			this.blocks.splice(0, this.blocks.length);
			this.takenBlocks.splice(0, this.takenBlocks.length);

			//draw the canvas based on the user inputs
			const canvas = document.querySelector('#app-canvas');
			canvas.width = canvas.width;

			//remove the player blocks
			const b1 = document.getElementById('blockA');
			b1.style.background = "transparent";
			b1.style.border = 'none';
			const b2 = document.getElementById('blockB');
			b2.style.background = "transparent";
			b2.style.border = 'none';
		}
	},
	created() {
	},
	mounted() {
	},
	beforeDestroy(){
		//Clear the interval addition timer.
		clearInterval(this.intervalId);
	}
}
</script>

<style scoped>
	.app--enter-number {
		max-width: 700px;
		margin: 0 auto;
	}
	.drawText{
		line-height: 40px
	}
	#blockA, #blockB {
		height: 50px;
		width: 50px;
	}
	.statLabel {
		color: darkred;
		text-align: center;
	}
	.stat {
		color: blue;
		text-align: center;
		height: 40px;
		margin-right: 2px;
		border: #7f8c8d 1px solid;
		border-radius: 0.4vw ;
	}
	td {
		width: 150px;
		height: 40px;
	}

	h5 {
		color: green;
	}
	.app--action {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.app--demo-auto-option input,	.app--demo-auto-option label  {
		cursor: pointer;
	}

	#canvas-container {
		height: 500px;
	}

	#app-canvas {
		width: 100%;
		height: 100%;
		border:1px solid #000000;
		background-color: #F5F85B;
	}
</style>
