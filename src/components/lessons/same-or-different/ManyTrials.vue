<template>
	<div>
		<div class="container mt-3 mb-5">
			<h3 class="lesson-subheading">Many trials</h3>
			<hr class="subheading-separator">
			<div v-if="showInputs" class="row justify-content-center">
				<form>
					<div class="app--enter-number form-group row mt-5">
						<label for="trial-numbers" class="col-form-label col-sm-8" style="color: darkred">
							Enter the number of trials(1 - {{maxTrialInput}}):
						</label>
						<div class="col-sm-4">
							<input type="number" class="form-control" v-model="trialNumber" required>
						</div>
					</div>
					<div class="app--enter-number form-group row mt-3">
						<label for="numPlantsInput" class="col-sm-8 col-form-label" style="color: red">
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
						<label for="numTilesInput" class="col-sm-8 col-form-label" style="color: blue">
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
					<div class="form-action col-6 offset-sm-8 offset-4 mt-3">
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
					<div class="pb-5">
						<h5 id="trialNum">{{trialNumber}} trials</h5>
					</div>

					<div class="app--action mt-4">
						<div v-if="!trialComplete">
							<button v-if="!isAuto" type="button" class="btn btn-outline-success" @click="start">Next game</button>
							<div v-if="isAuto">
								<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="showPause">Pause</button>
								<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="!showPause">Resume</button>
							</div>
						</div>
						<button type="button" class="btn btn-outline-dark mr-3" @click="resetTrial" v-if="trialComplete">Reset</button>
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
	drawNextTwoBlocks,
	drawNextCanvas
} from './utils';

export default {
	data: function() {
		return {
			//if this reaches two then reset current round
			turn: 0,

			//variables used for getting input from user and input error msg
			showInputs: true,
			showInputError: false,

			//array used for storing the blocks
			blocks: [],
			takenBlocks: [],
			key: 1,
			width: 0,

			//input obtained from user
			trialNumber: 1,
			numRedBlocks: 1,
			numBlueBlocks: 1,

			minBlockInput: 1,
			maxBlockInput: 100,
			maxTrialInput: 10000,

			//this variable is used for for auto or demo mode
			mode: 'demo',
			//this id is used to kill the timer interval
			intervalId: 0,

			//used for auto mode buttons
			showPause: true,

			//variables used for storing the statistics
			numSame: 0,
			numDiff: 0
		}
	},
	computed: {
		//this value used by the timer, as to how fast the tiles should be added.
		//draw one block from the bag every 1s
		timeDelay: function(){
			//100ms per round for trial numbers less than 200, and others delayed using formulaes shown below.
			if (this.trialNumber < 200)
				return 100;
			else if ((this.trialNumber >= 200) && (this.trialNumber < 1000))
				return 10000/this.trialNumber;
			else
				return 2500/this.trialNumber;
		},
		//variables used for reset the trial
		trialComplete: function(){
			if (this.numTotal === this.trialNumber){
				clearInterval(this.intervalId);
				return true;
			}
			else
				return false;
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
				this.showPause = false;

			clearInterval(this.intervalId);
		},
		showPause: function(){
			if (!this.showPause)
				clearInterval(this.intervalId);
			else
				this.autoMode();
		}
	},
	methods: {
		//this function reset all the statistics
		resetTrial(){
			this.numDiff = 0;
			this.numSame = 0;

			this.showPause = false;

			this.blocks.splice(0, this.blocks.length);
			const canvas = document.querySelector('#app-canvas');
			drawNextCanvas(canvas, this);
		},
		//function used to run the auto mode
		autoMode(){
			if (this.isAuto){
				//check if running and show Pause button is true
				if (this.showPause == true){
					//timer to delay the addition of next tile, using intervals of timeDelay
					this.intervalId = setInterval(() => {
						//continue until all trials are completed
						this.start();
					}, this.timeDelay);
				}
			}
		},

		//this function changes the interface from inputs.
		checkInputs(){
			const inputRed = parseInt(this.numRedBlocks);
			const inputBlue = parseInt(this.numBlueBlocks);
			const inputTrials = parseInt(this.trialNumber);
			if ((inputRed >= this.minBlockInput) && (inputRed <= this.maxBlockInput) && (inputBlue >= this.minBlockInput) && (inputBlue <= this.maxBlockInput) && (inputTrials >= this.minBlockInput) && (inputTrials <= this.maxTrialInput)){
				//input obtained from user
				this.numRedBlocks = inputRed;
				this.numBlueBlocks = inputBlue;
				this.trialNumber = inputTrials;

				this.showInputs = false;
			}
			else {
				this.showInputError = true;
			}
		},

		//This function resets the plant to a new value and removes all the tiles from the canvas.
		start(){
			if (this.blocks.length == 0){
				const canvas = document.querySelector('#app-canvas');
				drawNextCanvas(canvas, this);
			}

			//draw two blocks
			drawNextTwoBlocks(this);

			//update the stats when finished the round
			if (this.takenBlocks[0].colour === this.takenBlocks[1].colour)
				this.numSame += 1;
			else
				this.numDiff += 1;

			//reset the variables
			this.reset();
		},
		reset(){
			//reset the variables
			this.turn = 0;
			this.takenBlocks.splice(0, this.takenBlocks.length);
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
	#trialNum {
		text-align: right;
		color: black;
		font-size: 2em;
	}
	.app--enter-number {
		max-width: 700px;
		margin: 0 auto;
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
