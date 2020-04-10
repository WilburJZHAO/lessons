<template>
	<div>
		<h3 class="text-success text-center">Many trials</h3>
		<div class="container mt-4 mb-5">
			<div class="row justify-content-center" id="canvas-container-graph">
				<canvas id="app-canvas-graph"></canvas>
			</div>
			<div class="row p-3 m-auto">
				<div class="col-sm-6 app--action">
					<div v-if="showStart">
						<button v-if="isAuto" id="startButton" type="button" class="btn btn-outline-success" @click="start">Tap here to begin</button>
						<button v-else id="startButton" type="button" class="btn btn-outline-success" @click="start">Tap here for Year 1</button>
					</div>
					<div v-if="!showStart">
						<div v-if="!isFinished">
							<div v-if="isAuto">
								<div v-if="showHalfWay">
									<button type="button" class="btn btn-outline-success" @click="showHalfWay=!showHalfWay">Just over half-way. Tap here to continue</button>
								</div>
								<div v-else>
									<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="showPause">Tap here to pause</button>
									<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="!showPause">Tap here to resume</button>
								</div>
							</div>
							<div v-else>
								<button type="button" class="btn btn-outline-success" @click="showHalfWay=!showHalfWay" v-if="showHalfWay">Just over half-way. Tap here to continue</button>
								<button type="button" class="btn btn-outline-success" @click="nextStage" v-else>Tap here for next game</button>
							</div>
						</div>
						<div v-else>
							<button type="button" class="btn btn-outline-dark" @click="reset">Tap here to reset</button>
						</div>
					</div>
					<div class="form-check form-check-inline">
						<input type="radio" class="form-check-input" id="demo" name="demoOption" value= "demo" v-model="mode">
						<label class="form-check-label" for="demo">Demo</label>
						<input type="radio" class="ml-2 form-check-input" id="auto" name="autoOption" value= "auto" v-model="mode">
						<label class="form-check-label" for="auto">Auto</label>
					</div>
					<div v-if="isFinished">
						<p class="alert alert-info mt-1">Finished</p>
					</div>
				</div>

				<div class="col-sm-6 table-container">
					<table class="table">
						<tr>
							<td class="entryDesc">Initial number of atoms:</td>
							<td class="entryData">{{trialInputs.numAtoms}}</td>
						</tr>
						<tr>
							<td class="entryDesc">Prob of decay is 1 in {{trialInputs.probDecay}}</td>
							<td class="entryData">{{probDecay}}</td>
						</tr>
						<tr>
							<td class="entryDesc">Year:</td>
							<td class="entryData">{{currentYear}}</td>
						</tr>
						<tr>
							<td class="entryDesc">Atoms left:</td>
							<td class="entryData">{{atomLeft}}</td>
						</tr>
						<tr>
							<td class="entryDesc">Percentage left:</td>
							<td class="entryData">{{percentLeft}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import Dice from './Dice.vue';
import {
	drawInitialGraph,
	rerollAtoms,
	getRandomNumber,
	removeDecayedAtoms,
	drawHalfLifeYear
} from './utils';

export default {
	props: {trialInputs: Object},
	components: {
		appDice: Dice
	},
	data: function() {
		return {
			//variables used for showing start button and half way button
			showStart: true,
			showHalfWay: false,

			//variable used by the canvas
			startXOffset: 100,

			//array used for storing all the atoms
			atoms: [],
			key: 1,

			//variables for current round/year
			currentYear: 0,
			diceRoll: 0,

			//this variable is used for for auto or demo mode
			mode: 'auto',

			//used for auto mode buttons
			showPause: true,
			//this id is used to kill the timer interval
			intervalId: 0,

			//time delay is updated based on every half life cycle of the atoms
			timeDelay: 200,

			//used for the graph drawing
			halfLifeYear: -1,
			graphColour: 'red'
		}
	},
	computed: {
		//adjust the width to fit the graph in the canvas
		width: function(){
			if (this.trialInputs.probDecay <=20)
				return 15;
			else if (this.trialInputs.probDecay >20 && this.trialInputs.probDecay <=50)
				return 10;
			else if (this.trialInputs.probDecay >50 && this.trialInputs.probDecay <80)
				return 8;
			else
				return 6;
		},
		fractionLeft: function(){
			//calculate the time delay based on percentage of atoms left delay
			var percentLeft = this.atomLeft/this.trialInputs.numAtoms;
			return percentLeft;
		},
		isFinished: function(){
			if (this.atoms.length === 0){
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
		atomLeft: function(){
			return this.atoms.length;
		},
		percentLeft: function(){
			if (this.trialInputs.numAtoms == 0)
				return 0 + '%';
			var res = parseFloat(((this.atomLeft/this.trialInputs.numAtoms)*100).toFixed(2));
			return res + '%';
		},
		probDecay: function(){
			if (this.trialInputs.probDecay == 0)
				return 0 + '%';
			var res = parseFloat((1/this.trialInputs.probDecay).toFixed(2));
			return res;
		},
		overHalfWay: function(){
			if (this.atomLeft < this.trialInputs.numAtoms/2)
				return true;
			else
				return false;
		}
	},
	watch: {
		isAuto: function(){
			if (this.isAuto)
				this.showPause = false;
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
		overHalfWay: function(){
			//check for half decayed atoms
			if (this.overHalfWay == true){
				//update the required variables
				this.showHalfWay = true;
				this.halfLifeYear = this.currentYear;
				this.graphColour = 'blue';

				//draw the half-life year on the canvas
				const canvasGraph = document.querySelector('#app-canvas-graph');
				drawHalfLifeYear(canvasGraph, this);

				//clear the interval if auto mode
				if (this.isAuto){
					clearInterval(this.intervalId);
					this.showPause = false;
				}
			}
		},
		fractionLeft: function(){
			//observe the percentage of atom left and update time delay at every half life (i.e. restart the auto process)
			if ((this.fractionLeft*200) <= this.timeDelay/2){
				this.timeDelay = this.fractionLeft*200;

				if (this.isAuto){
					//clear the previous timer and restart the new timer with new delay
					clearInterval(this.intervalId);
					this.autoMode();
				}
			}
		},
		showHalfWay: function(){
			//update the showPause to start after the showHalfWay button is clicked
			if (!this.showHalfWay)
				this.showPause = true;
		}
	},
	methods: {
		//function used to run the auto mode
		autoMode(){
			if (this.isAuto && !this.showStart){
				//check if running and show Pause button is true
				if (this.showPause == true){
					//timer to delay the execution of next stage
					this.intervalId = setInterval(() => {
						if (this.isFinished){
							//Clear the interval addition timer.
							clearInterval(this.intervalId);
						}
						else{
							this.nextStage();
						}
					}, this.timeDelay);
				}
			}
		},

		//this method runs the function based on current stage of the decay process
		nextStage(){
			//update variables for current round/year
			this.currentYear += 1;

			//generate the random values for the atoms
			rerollAtoms(this);

			//generating the dice roll
			this.diceRoll = getRandomNumber(0,this.trialInputs.probDecay);

			//removes all the rolls for the atoms with the dice roll above
			const canvasGraph = document.querySelector('#app-canvas-graph');
			removeDecayedAtoms(canvasGraph, this);
		},
		//This function initialises random numbers for all the 100
		start(){
			//remove the Start button
			this.showStart = false;

			if (this.isAuto)
				this.autoMode();
			//else demo mode
			else
				this.nextStage();
		},
		reset(){
			//reset the variables
			this.atoms.splice(0,this.atoms.length);
			this.showStart = true;
			this.currentYear = 0;
			this.halfLifeYear = -1;
			this.graphColour = 'red';
			this.timeDelay = 200;

			//reset the canvas
			this.initialiseCanvases();
		},
		initialiseCanvases(){
			//reset the canvas
			const canvas = document.querySelector('#app-canvas-graph');
			canvas.width = canvas.width;
			drawInitialGraph(canvas, this);
		}
	},
	created() {
	},
	mounted() {
		this.initialiseCanvases();
	},
	beforeDestroy(){
		//Clear the interval addition timer.
		clearInterval(this.intervalId);
	}
}
</script>

<style scoped>
	td {
		padding: 2px;
		border: 1px solid black;
		border-radius: 5px;
		text-align: right;
	}
	table {
		table-layout: auto;
		border-collapse: separate;
		border-spacing: 5px;
	}
	.entryDesc {
		color: blue;
		border: none;
		width: auto;
	}
	.entryData {
		width: 70px;
	}
	.app--action {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.app--demo-auto-option input {
		cursor: pointer;
	}

	/*CSS for the atoms and graph canvases*/
	#canvas-container-graph {
		height: 300px;
	}

	#app-canvas-graph {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
