<template>
	<div>
		<h3 class="text-success text-center">Demonstration</h3>
		<div class="container mt-4 mb-5">
			<div class="row">
				<div class="col-6">
					<div class="row">
						<h4>Row of <strong>{{numPlants}}</strong> Plants</h4>
					</div>
					<div class="row">
						<form>
							<div class="form-group row">
								<label for="numTilesInput" class="col-sm-9 col-form-label"><b>Current</b> number of tiles:</label>
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
					<div class="row">
						<div class="form-action">
							<button type="button" class="btn btn-outline-dark mr-3" @click="reset" :disabled="!isFinished">Reset</button>
							<button type="button" class="btn btn-outline-success mr-3 btn-lg" @click="addTile" :disabled="isFinished">Add tile</button>
						</div>
					</div>
					<div class="row p-3 justify-content-center">
						<p class="alert alert-info mr-3" v-if="isFinished">Garden bed built, click <b>reset</b> to make another.</p>
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
		// getRandomNum
		addNextTile,
		drawNextCanvas
	} from './utils';
	import plant from "@/assets/plant.png";

	export default {
		data: function() {
			return {
				plant: plant,
				numPlants: 0,
				numTiles: 0,
				//flag used for reset button
				isDisabled: true,
				edgeCounter: 0,
				//array used for storing past garden beds
				tableEntries: [],
				key: 1,

				//These values are used by random random generator to create the plant length
				minBedLength: 1,
				maxBedLength: 10
			}
		},
		computed: {
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
			}
		},
		methods: {
			//This function adds another tile to the canvas, going around the plants.
			addTile(){
				const canvas = document.querySelector('#app-canvas');
				addNextTile("yellow", canvas, this);
			},

			//This function resets the plant to a new value and removes all the tiles from the canvas.
			reset(){
				//store the value in the table
				if (this.numTiles != 0){
					this.tableEntries.push({key: this.key, numPlants: this.numPlants, numTiles: this.numTiles});
					this.key += 1;
				}
				//reset the variables
				this.numTiles = 0;
				this.edgeCounter = 0;
				//create random number of plants between 1 and 50
				//NOTE: for testing purposes set the inputs to desired number of plants
				this.numPlants = this.getRandomNum(this.minBedLength, this.maxBedLength);
				//draw the canvas based on the numPlants
				const canvas = document.querySelector('#app-canvas');

				drawNextCanvas(canvas, this);
			},

			//This function returns a random number between the given min and max
			getRandomNum(min, max){
				return Math.floor(Math.random() * (max-min)) + min;
			}
		},
		created() {
		},
		mounted() {
			this.reset();
		}
	}
</script>

<style scoped>
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
