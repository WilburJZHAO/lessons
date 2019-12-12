<template>
	<div>
		<h2 class="text-success text-center">Demonstration</h2>
		<div class="container mt-4 mb-5">
			<div class="row justify-content-center" id="canvas-container-atoms">
				<canvas id="app-canvas-atoms"></canvas>
			</div>
			<div class="row justify-content-center" id="canvas-container-graph">
				<canvas id="app-canvas-graph"></canvas>
			</div>
			<div class="row p-3 m-auto">
				<div class="col-sm-2"></div>
				<div class="col-sm-3 app--action">
					<p class="alert alert-danger" v-if="stage==3">There are {{numDecayed}} {{diceRollText}}</p>
					<p class="alert alert-danger" v-else>There are {{atomLeft}} atoms</p>
				</div>
				<div class="col-sm-3 app--action">
					<button v-if="showStart" id="startButton" type="button" class="btn btn-outline-success" @click="start">Tap here to start</button>
					<div v-if="!showStart">
						<div v-if="!isFinished">
							<div v-if="isAuto">
								<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="showPause">Tap here to pause</button>
								<button type="button" class="btn btn-outline-success mr-3" @click="showPause=!showPause" v-if="!showPause">Tap here to resume</button>
							</div>
							<div v-else>
								<button type="button" class="btn btn-outline-success" @click="nextStage" :disabled="disableButton" v-if="stage==1">Tap here to throw dice</button>
								<button type="button" class="btn btn-outline-success" @click="nextStage" :disabled="disableButton" v-else>Tap here to continue</button>
							</div>
						</div>
						<div v-else><button type="button" class="btn btn-outline-dark" @click="reset" v-if="isFinished">Tap here to reset</button></div>
					</div>
					<div class="form-check form-check-inline">
						<input type="radio" class="form-check-input" id="demo" name="demoOption" value= "demo" v-model="mode">
						<label class="form-check-label" for="demo">Demo</label>
						<input type="radio" class="ml-2 form-check-input" id="auto" name="autoOption" value= "auto" v-model="mode">
						<label class="form-check-label" for="auto">Auto</label>
					</div>
				</div>
				<div class="app--demo-auto-option col-sm-2 app--action" v-if="stage==2 || stage==3">
					<app-dice :number="diceRoll" ></app-dice>
				</div>
				<div class="col-2"></div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import Dice from './Dice.vue';
import { 
	drawGrid,
	drawGraph,
	generateRandomValues,
	getRandomNumber,
	decayedAtoms
} from './utils';

export default {
	components: {
		appDice: Dice
	},
	data: function() {
		return {
			//variables used for showing start button
			showStart: true,

			disableButton: false,

			//variable used by the canvas
			width: 0,
			startXOffset: 0,

			//array used for storing all the atoms
			atoms: [],
			key: 1,

			//variables for current round/year
			stage: 0,
			currentYear: 0,
			diceRoll: 0,
			numDecayed: 0,

			//this variable is used for for auto or demo mode
			mode: 'demo',

			//used for auto mode buttons
			showPause: false,
			//this id is used to kill the timer interval
			intervalId: 0,
			timeDelay: 1350,
			//used for the graph drawing
			graphIntervalId: 0
		}
	},
	computed: {
		graphDelay: function(){
			if (this.atomLeft != 0)
				return (this.timeDelay-100)/this.atoms.length;
			return 10;
		},
		isFinished: function(){
			if (this.atomLeft === 0 || this.currentYear > 20){
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
		diceRollText: function(){
			if (this.diceRoll === 1)
				return 'ones';
			else if (this.diceRoll === 2)
				return 'twos';
			else if (this.diceRoll === 3)
				return 'threes';
			else if (this.diceRoll === 4)
				return 'fours';
			else if (this.diceRoll === 5)
				return 'fives';
			else if (this.diceRoll === 6)
				return 'sixes';
			else
				return 'N/A';
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
			else{
				this.autoMode();
			}
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
						//continue until 2 blocks taken
						if (this.isFinished){
							//Clear the interval addition timer.
							clearInterval(this.intervalId);
						}
						else{
							if (!this.disableButton)
								this.nextStage();
						}
					}, this.timeDelay);
				}
			}
		},

		//this method runs the function based on current stage of the decay process
		nextStage(){
			const canvasAtoms = document.querySelector('#app-canvas-atoms');
			const canvasGraph = document.querySelector('#app-canvas-graph');
			//there are 4 different stages for each year, 
			//stage 0 for generating rand number for atoms
			if (this.stage == 0){
				//generate the random values for the atoms
				generateRandomValues(canvasAtoms, canvasGraph, this);
			}
			//stage 1 for generating the dice roll
			else if (this.stage == 1){
				this.diceRoll = getRandomNumber(1,7);
			}
			//stage 2 is for highlighting the atoms with the dice roll (i.e. decayed atoms)
			else if (this.stage == 2){
				decayedAtoms(canvasAtoms, canvasGraph, this, true);
			}
			//stage 3, removes all the rolls for the atoms and sets decayed atoms to blue and removes them from atoms array
			else if (this.stage == 3){
				decayedAtoms(canvasAtoms, canvasGraph, this, false);
			}

			//update the stage
			this.stage += 1;
			if (this.stage === 4){
				//reset variables for current round/year
				this.numDecayed = 0;
				this.stage = 0;
				this.currentYear += 1;
			}
		},
		//This function initialises random numbers for all the 100 
		start(){
			//remove the Start button
			this.showStart = false;
			
			//generate the random values for the atoms
			const canvasAtoms = document.querySelector('#app-canvas-atoms');
			const canvasGraph = document.querySelector('#app-canvas-graph');
			generateRandomValues(canvasAtoms, canvasGraph, this);

			this.stage += 1;

			if (this.isAuto)
				this.showPause = true;
			//else demo mode
		},
		reset(){
			this.showStart = true;
			this.currentYear = 0;
			this.showPause = false;
			
			//reset the variables
			this.atoms.splice(0,this.atoms.length);

			//reset the canvas
			this.initialiseCanvases();
		},
		initialiseCanvases(){
			//reset the canvas
			const canvas1 = document.querySelector('#app-canvas-atoms');
			canvas1.width = canvas1.width;
			drawGrid(canvas1, this);

			const canvas2 = document.querySelector('#app-canvas-graph');
			canvas2.width = canvas2.width;
			drawGraph(canvas2, this);
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
		clearInterval(this.graphIntervalId);
	}
}
</script>

<style scoped>
	.app--action {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.app--demo-auto-option input {
		cursor: pointer;
	}

	/*CSS for the atoms and graph canvases*/
	#canvas-container-atoms {
		height: 200px;
	}

	#app-canvas-atoms {
		width: 100%;
		height: 100%;
		border: none;
	}
	#canvas-container-graph {
		height: 250px;
	}

	#app-canvas-graph {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
