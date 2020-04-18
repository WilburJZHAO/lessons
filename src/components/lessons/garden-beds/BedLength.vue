<template>
	<div>
		<h3 class="lesson-subheading mt-4">Enter your own bed length</h3>
		<hr class="subheading-separator">
		<div class="container mt-4 mb-5">
			<div class="row">
				<div class="col-6">
					<div class="row">
						<h4>Row of <strong>{{numPlants}}</strong> Plants</h4>
					</div>
					<div class="row">
						<form>
							<div class="form-group row">
								<label for="numPlantsInput" class="col-sm-9 col-form-label">Number of <b>plants</b>:</label>
								<div class="col-sm-3">
									<input type="number"
										v-model="numPlantsInput"
										class="form-control"
										min="1"
										max="50"
										id="numPlantsInput">
								</div>
							</div>
							<div class="form-group row">
								<label for="numTilesInput" class="col-sm-9 col-form-label">Number of <b>tiles</b>:</label>
								<div class="col-sm-3">
									<input type="number"
										v-model="numTiles"
										class="form-control"
										:disabled="isDisabled"
										id="numTilesInput">
								</div>
							</div>
						</form>
					</div>
					<div class="app--action mt-3">
						<div v-if="showStart">
							<p v-bind:class="{'alert mr-3':true, 'alert-info':(!showInputError), 'alert-danger':(showInputError)}">Please enter a whole number between {{minBedLength}} and {{maxBedLength}}.</p>
						</div>
						<button v-if="showStart" id="startButton" type="button" class="btn btn-outline-success" @click="start">Start</button>
						<div v-if="!showStart">
							<button type="button" class="btn btn-outline-dark mr-3" @click="reset" :disabled="!isFinished">Reset</button>
							<button type="button" class="btn btn-outline-success btn-lg mr-3" @click="addTile" :disabled="isFinished||isAuto">Add tile</button>
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
					<div class="row p-3 justify-content-center">
						<p class="alert alert-info mr-3" v-if="isFinished">Garden bed built, type <b>new</b> bed length and click <b>Reset</b> to make another.</p>
					</div>
				</div>
				<div class="col-6">
					<table class="table fixed-header table-hover">
						<thead class="thead-light">
							<tr>
								<th scope="col"># Plants</th>
								<th scope="col"># Tiles</th>
							</tr>
						</thead>
						<div>
							<tbody>
								<tr v-for="entry in tableEntries" :key="entry.key">
									<th scope="row">{{entry.numPlants}}</th>
									<td>{{entry.numTiles}}</td>
								</tr>
							</tbody>
						</div>
					</table>
				</div>
			</div>
			<div class="row justify-content-center" id="canvas-container">
				<canvas id="app-canvas"></canvas>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable */
import {
	addNextTile,
	drawNextCanvas
} from './utils';
import plant from "@/assets/plant.png";

export default {
	data: function() {
		return {
			//Used by the plant picture
			plant: plant,

			numPlants: 0,
			numTiles: 0,
			edgeCounter: 0,

			//flag used for reset button
			isDisabled: true,

			//variables used for showing start button and input error msg
			showInputError: false,
			showStart: true,

			//array used for storing past garden beds
			tableEntries: [],
			key: 1,

			//input obtained from user
			numPlantsInput: 0,

			minBedLength: 1,
			maxBedLength: 50,

			//this variable is used for for auto or demo mode
			mode: 'demo',
			//this id is used to kill the timer interval
			intervalId: 0
		}
	},
	computed: {
		//this value used by the timer, as to how fast the tiles should be added.
		timeDelay: function(){
			//allow 10sec for all the tiles to be placed
			return (10*1000)/this.expectedNumTiles;
		},
		expectedNumTiles: function(){
			return this.numPlants*2+6;
		},
		isFinished: function(){
			if (this.numTiles === this.expectedNumTiles){
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
		}
	},
	watch: {
		isAuto: function(){
			if (!this.showStart){
				if (this.isAuto){
					//timer to delay the addition of next tile, using intervals of timeDelay
					this.intervalId = setInterval(() => {
						this.addTile();

						//continue adding tiles until all tiles added
						if (this.isFinished) {
							//Clear the interval addition timer.
							clearInterval(this.intervalId);
						}
					}, this.timeDelay);
				}
				//else demo mode, adds tiles using addTile button
				else {
					clearInterval(this.intervalId);
				}
			}
		}
	},
	methods: {
		//This function adds another tile to the canvas, going around the plants.
		addTile(){
			const canvas = document.querySelector('#app-canvas');
			addNextTile("yellow", canvas, this);
		},

		//This function resets the plant to a new value and removes all the tiles from the canvas.
		start(){
			const input = parseInt(this.numPlantsInput);
			if ((input >= this.minBedLength) && (input <= this.maxBedLength)){
				//remove the Start button and input error msg on correct input
				this.showStart = false;
				//number of plants obtained from user
				this.numPlants = input;
				//draw the canvas based on the numPlants
				const canvas = document.querySelector('#app-canvas');
				drawNextCanvas(canvas, this);

				if (this.isAuto){
					//timer to delay the addition of next tile, using intervals of timeDelay
					this.intervalId = setInterval(() => {
						this.addTile();

						//continue adding tiles until all tiles added
						if (this.isFinished) {
							//Clear the interval addition timer.
							clearInterval(this.intervalId);
						}
					}, this.timeDelay);
				}
				//else demo mode, adds tiles using addTile button
			}
			else {
				this.showInputError = true;
			}
		},
		reset(){
			this.showInputError = false;
			this.showStart = true;
			//store the value in the table
			if ((this.numTiles != 0) && (this.isFinished)){
				this.tableEntries.push({numPlants: this.numPlants, numTiles: this.numTiles});
				this.key += 1;
			}
			//reset the variables
			this.numTiles = 0;
			this.numPlantsInput = 0;
			this.edgeCounter = 0;

			//clear the canvas
			const canvas = document.querySelector('#app-canvas');
			canvas.width = canvas.width;
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
	.app--action {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	#startButton {
		width: 60%;
	}

	.app--demo-auto-option input,	.app--demo-auto-option label  {
		cursor: pointer;
	}

	#canvas-container {
		height: 300px;
	}

	#app-canvas {
		width: 100%;
		height: 100%;
		border: none;
	}

	/*Keep height and header fixed and overflow using scroll*/
	.fixed-header tbody {
		display: block;
		overflow: auto;
		height: 150px;
		border: #e9ecef 1px solid;
	}
	.fixed-header thead tr {
		display: block;
	}
	.fixed-header th, .fixed-header td {
		width: 270px;
	}
</style>
