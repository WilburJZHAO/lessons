<template>
	<div>
		<h3 class="lesson-subheading mt-4">Expert challenge</h3>
		<hr class="subheading-separator">
		<div class="container mt-4 mb-5">
			<div class="row">
				<div class="app--action mt-3 col-6">
					<div class="row">
						<h4>Row of <strong>{{numPlants}}</strong> Plants</h4>
					</div>
					<div class="row">
						<form>
							<div class="form-group row">
								<label for="numTilesInput" class="col-sm-9 col-form-label"><b>Guess</b> final number of tiles:</label>
								<div class="col-sm-3">
									<input type="number"
										v-model="numTilesInput"
										class="form-control"
										id="numTilesInput"
										:disabled="isSubmitted">
								</div>
							</div>
						</form>
					</div>

					<button v-if="showStart" id="startButton" type="button" class="btn btn-outline-success" @click="start">Start</button>
					<div class="row" v-if="!showStart">
						<button type="button" class="btn btn-outline-dark mr-3" @click="reset" :disabled="!isFinished">Reset</button>
						<button type="button" class="btn btn-outline-success btn-lg mr-3" @click="submitInput" :disabled="isSubmitted">Submit guess</button>
					</div>
					<div class="row p-3 justify-content-center">
						<p v-bind:class="{'alert mr-3':true, 'alert-success':(isCorrect), 'alert-danger':(!isCorrect)}" v-if="isFinished"><b>{{guessRes}}</b></p>
						<p class="alert alert-info mr-3" v-if="isFinished">Garden bed built, click <b>Start</b> to make another.</p>
					</div>
				</div>
				<div class="col-6">
					<table class="table table-hover fixed-header">
						<thead class="thead-light">
							<tr>
								<th scope="col"># Plants</th>
								<th scope="col"># Tiles</th>
							</tr>
						</thead>
						<tbody id="tableBody">
							<tr v-for="entry in tableEntries" :key="entry.key">
								<th scope="row">{{entry.numPlants}}</th>
								<td>{{entry.numTiles}}</td>
							</tr>
							<tr v-bind:class="{'text-primary':(isCorrect), 'text-danger':(!isCorrect)}">
								<th scope="row">{{numPlants}}</th>
								<td>{{numTiles}}</td>
							</tr>
						</tbody>
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
	// getRandomNum
	addNextTile,
	drawNextCanvas,
	scrollToRecent
} from './utils';
import plant from "@/assets/plant.png";

export default {
	data: function() {
		return {
			plant: plant,
			numPlants: 0,
			numTiles: 0,

			//user input, and flags to show/hide buttons
			numTilesInput: 0,
			isSubmitted: false,
			showStart: true,

			//flag used for reset button
			isDisabled: true,
			edgeCounter: 0,

			//array used for storing past garden beds
			tableEntries: [],
			key: 1,

			//These values are used by random random generator to create the plant length
			minBedLength: 1,
			maxBedLength: 100,

			//this id is used to kill the timer interval
			intervalId: 0,
			intervalId2: 0
		}
	},
	computed: {
		//this value used by the timer, as to how fast the tiles should be added.
		timeDelay: function(){
			//allow 10, 15 and 17sec for all the tiles to be placed when numplants is in the range [0,40], [40, 80], [80, 100]
			if (this.numPlants < 40){
				return (10*1000)/this.expectedNumTiles;
			}
			else if (this.numPlants >= 80){
				return (17*1000)/this.expectedNumTiles;
			}
			else {
				return (15*1000)/this.expectedNumTiles;
			}
		},
		expectedNumTiles: function(){
			return this.numPlants*2+6;
		},
		isFinished: function(){
			if (this.numTiles === this.expectedNumTiles){
				this.isSubmitted = true;
				return true;
			}
			else{
				return false;
			}
		},
		isCorrect: function(){
			//compare for correct answer and provide the output to user.
			if (parseInt(this.numTilesInput) === this.expectedNumTiles){
				return true;
			}
			else {
				return false;
			}
		},

		guessRes: function(){
			//Provide correct text output based on isCorrect value
			if (this.isCorrect){
				return 'Correct!';
			}
			else {
				return 'Wrong!';
			}
		}
	},
	watch: {
		isCorrect: function() {
			if (this.isCorrect == true){
				//timer to delay the addition of next tile, using intervals of timeDelay
				this.intervalId2 = setInterval(() => {
					this.addTile("cyan");

					//continue adding tiles until all tiles added
					if ((this.isFinished)) {
						//Clear the interval addition timer.
						clearInterval(this.intervalId2);
					}
				}, this.timeDelay/2);
			}
		}
	},
	methods: {
		submitInput(){
			this.isSubmitted = true;
		},
		//This function adds another tile to the canvas, going around the plants.
		addTile(colour){
			const canvas = document.querySelector('#app-canvas');
			addNextTile(colour, canvas, this);
		},

		//This function resets the plant to a new value and removes all the tiles from the canvas.
		start(){
			scrollToRecent();
			//reset the variables
			this.showStart = false;
			//create random number of plants between 1 and 50
			this.numPlants = this.getRandomNum(this.minBedLength, this.maxBedLength);
			//draw the canvas based on the numPlants
			const canvas = document.querySelector('#app-canvas');
			drawNextCanvas(canvas, this);

			//timer to delay the addition of next tile, using intervals of timeDelay
			this.intervalId = setInterval(() => {
				this.addTile("yellow");

				//continue adding tiles until all tiles added or correct input is entered
				if ((this.isFinished)||(this.isCorrect)) {
					//Clear the interval addition timer.
					clearInterval(this.intervalId);
				}
			}, this.timeDelay);
		},
		reset(){
			//store the value in the table
			if ((this.numTiles != 0) && (this.isFinished)){
				this.tableEntries.push({numPlants: this.numPlants, numTiles: this.numTiles});
				this.key += 1;
			}
			//update the variables when finished
			this.showStart = true;
			this.isSubmitted = false;

			//reset the variables
			this.numTiles = 0;
			this.numPlants = 0;
			this.numTilesInput = 0;
			this.edgeCounter = 0;

			//clear the canvas
			const canvas = document.querySelector('#app-canvas');
			canvas.width = canvas.width;
		},

		//This function returns a random number between the given min and max
		getRandomNum(min, max){
			return Math.floor(Math.random() * (max-min)) + min;
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

	#canvas-container {
		height: 300px;
	}

	#canvas-container {
		height: 300px;
	}

	#app-canvas {
		width: 100%;
		height: 100%;
		border: none;
	}

	#app-canvas {
		width: 100%;
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
