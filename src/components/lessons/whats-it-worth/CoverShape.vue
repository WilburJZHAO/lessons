<template>
	<div class="container mt-3 mb-5">
		<h3 class="lesson-subheading">Cover the shape</h3>
		<hr class="subheading-separator">
		<div class="row">
			<div class="col-sm-6 text-center mb-4">
				<h5>Select Shape</h5>
				<div class="form-check">
					<input type="radio"
						class="form-check-input"
						name="shape"
						id="shape-square"
						:value="0"
						v-model="shape"
						:disabled="shapeSelected"
					>
					<label for="shape-square" class="form-check-label">
						Square
					</label>
				</div>
				<div class="form-check">
					<input type="radio"
						class="form-check-input"
						name="shape"
						id="shape-triangle"
						:value="1"
						v-model="shape"
						:disabled="shapeSelected"
					>
					<label for="shape-triangle" class="form-check-label">
						Triangle
					</label>
				</div>
				<div class="text-center mt-4">
					<button
						class="btn btn-outline-success"
						v-if="!shapeSelected"
						@click="handleStartCreateNewShape">
						Create a new shape
					</button>
					<button
						class="btn btn-outline-dark"
						v-if="shapeSelected"
						@click="handleClear">
						Clear
					</button>
				</div>
			</div>
			<div class="col-sm-6 app--shape">
				<div class="app--available-shape">
					<app-square class="shape-to-move" v-if="shape==0" :id="1" :hasStyle="true" :display="1"></app-square>
					<app-triangle class="shape-to-move" v-if="shape==1" :hasStyle="true" :type="'up'" :display="1"></app-triangle>
					<app-triangle class="shape-to-move" v-if="shape==1" :hasStyle="true" :type="'down'" :display="1"></app-triangle>
				</div>
				<div class="app--cover-shape-container">
					<app-shape-by-triangle
						v-if="shape=='1' && shapeSelected===true"
						:shapeData="shapeData.shape"
						@setTilesUsed="tilesUsed=$event"
					></app-shape-by-triangle>
					<app-shape-by-square
						v-if="shape=='0' && shapeSelected===true"
						:shapeData="shapeData.shape"
						@setTilesUsed="tilesUsed=$event" >
					</app-shape-by-square>
				</div>
				<br>
				<div class="alert alert-danger" v-if="shapeSelected && tilesUsed===0">
					Drag tiles to cover the shape
				</div>
				<div v-if="shapeSelected && tilesUsed > 0 && tilesUsed < shapeData.totalTiles" class="alert alert-danger">
					{{tilesUsed}} tile{{tilesUsed > 1 ? 's' : ''}} used
				</div>
				<div v-if="shapeSelected && tilesUsed > 0 && tilesUsed === shapeData.totalTiles" class="text-center">
					<div class="alert alert-success">
						Correct! {{ shapeData.totalTiles }} tiles needed to cover the shape
					</div>
					<button class="btn btn-outline-success" @click="handleCreateNewShape">
						Create a new shape
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import interact from 'interactjs';
import Square from './Square.vue';
import Triangle from './Triangle.vue';
import ShapeByTriangle from './ShapeByTriangle.vue';
import ShapeBySquare from './ShapeBySquare.vue';
import squareData from './data/square';
import triangleData from './data/triangle';
import { pickRandomNumber } from './utils';

export default {
	components: {
		appSquare: Square,
		appTriangle: Triangle,
		appShapeByTriangle: ShapeByTriangle,
		appShapeBySquare: ShapeBySquare
	},
	data: function() {
		return {
			shape: 0,	// Shape slected, 0 - square, 1 - triangle
			row: 3,
			shapeSelected: false,
			shapeData: null,
			tilesUsed: 0
		}
	},
	computed: {
	},
	methods: {
		setDraggable() {
			interact('.shape-to-move').draggable({
				inertia: false,
				modifiers: [	// keep the element within the area of its parent
					interact.modifiers.restrict({
						restriction: '.app--shape',
						endOnly: true
					})
				],
				autoScroll: true,
				onstart: this.handleOnDragStart,
				onmove: this.handleOnDragMove,
				onend: this.handleOnDragEnd
			});
		},
		unsetDraggable() {
			interact('.shape-to-move').unset();
		},
		handleOnDragStart(e) {
			e.target.style.webkitTransform =
			e.target.style.transform =
					'translate(0, 0)';
			e.target.removeAttribute('data-x');
			e.target.removeAttribute('data-y');
			e.target.classList.add('app--shape-selected');
		},
		handleOnDragMove(e) {
			var target = e.target;
			// keep the dragged position in the data-x/data-y attributes
			var x = (parseFloat(target.getAttribute('data-x')) || 0) + e.dx;
			var y = (parseFloat(target.getAttribute('data-y')) || 0) + e.dy;
			// console.log(e.dx, ':' ,e.dy);
			// translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)'
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);
		},
		handleOnDragEnd(e) {
			e.target.classList.remove('app--shape-selected');
			e.target.style.webkitTransform =
				e.target.style.transform =
						'translate(0, 0)';
				e.target.removeAttribute('data-x');
				e.target.removeAttribute('data-y');
		},
		handleClear() {
			this.shapeSelected = false;
			this.unsetDraggable();
			this.shapeData = {};
			this.tileUsed = 0;
			// this.shapeData.totalTiles = 0;
		},

		handleStartCreateNewShape() {
			this.createShape();
			this.shapeSelected = true;
			this.setDraggable();
		},
		handleCreateNewShape() {
			this.createShape();
			this.shapeSelected = true;
			// this.tilesUsed = 0;
		},
		createShape() {
			let randomNumber;
			if(this.shape === 0) {
				randomNumber = pickRandomNumber(0, squareData.length);
				this.shapeData = squareData[randomNumber];
			}
			if(this.shape === 1) {
				randomNumber = pickRandomNumber(0, triangleData.length);
				// console.log(randomNumber);
				this.shapeData = triangleData[randomNumber];
			}
		}
	},
	mounted() {
	}
}
</script>

<style scoped>
.app--available-shape {
	display: flex;
}
.app--cover-shape-container {
	min-height: 200px;
	display: flex;
	align-items: center;
}
.app--cover-shape-row {
	display: flex;
}
.shape-to-move {
	touch-action: none;
	z-index: 100;
}
@media only screen and (max-width: 576px) {
	.app--available-shape {
		justify-content: center;
	}
	.app--cover-shape-container {
		justify-content: center;
	}
}
</style>
