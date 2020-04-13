<template>
	<div>
		<div class="container mt-3 mb-5">
			<h3 class="lesson-subheading">Radian play</h3>
			<hr class="subheading-separator">
			<div class="row">
				<div class="col-12">
					<h5 class="text-success">Click and drag on the circle</h5>
				</div>
			</div>
			<div class="row">
				<!-- Left part -->
				<div class="col-12 col-md-4">
					<canvas id="app-canvas" width="600" height="600"></canvas>
					<div class="tri--radian-data mt-4 mb-2" v-if="degree !== null">
						<div>
							<div class="form-check">
								<input type="radio" class="form-check-input" name="operator" value="sin" id="check-operator-sin" v-model="operator">
								<label for="check-operator-sin" class="form-check-label">sinX</label>
							</div>
							<div class="form-check">
								<input type="radio" class="form-check-input" name="operator" value="cos" id="check-operator-cos" v-model="operator">
								<label for="check-operator-cos" class="form-check-label">cosX</label>
							</div>
						</div>
						<div class="text-success">
							<div>X = {{ degree }} degrees</div>
							<div>X = {{ radian}} radians</div>
							<div>{{operator}}X = {{ ratio }} </div>
						</div>
					</div>
				</div>
				<!-- Right part -->
				<div class="col-12 col-md-8">
					<canvas id="app-coord-canvas" width="640" height="300"></canvas>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { drawCircle, drawPosition, drawCoord, drawSinWave, drawCosWave } from './utils';
export default {
	data: function() {
		return {
			degree: null,
			operator: 'sin',
			isDrawing: false
		}
	},
	watch: {
		// isDrawing(value) {
		// 	if(value===true) {
		// 		document.querySelector('body').setAttribute('style', 'overflow: hidden');
		// 	} else {
		// 		document.querySelector('body').removeAttribute('style');
		// 	}
		// }
	},
	methods: {
		drawCanvas() {
			const canvas = document.querySelector('#app-canvas');
			const coordCanvas = document.querySelector('#app-coord-canvas');
			//canvas.height = canvas.width;	// Make the canvas a square(responsive)
			// console.log(canvas);
			if(canvas.getContext) {
				drawCircle(canvas);
				// let isDrawing = false;
				canvas.addEventListener('mousedown', (e) => {
					this.degree = drawPosition(canvas, e.clientX, e.clientY);
					if(this.operator === 'sin') drawSinWave(coordCanvas, this.degree);
					if(this.operator === 'cos') drawCosWave(coordCanvas, this.degree);
					this.isDrawing = true;
					// this.degree = degree;
				});
				canvas.addEventListener('mousemove', (e) => {
					// console.log(e);
					if(this.isDrawing) {
						this.degree = drawPosition(canvas, e.clientX, e.clientY);
						if(this.operator === 'sin') drawSinWave(coordCanvas, this.degree);
						if(this.operator === 'cos') drawCosWave(coordCanvas, this.degree);
					}
				});
				canvas.addEventListener('mouseup', (e) => {
					this.degree = drawPosition(canvas, e.clientX, e.clientY);
					if(this.operator === 'sin') drawSinWave(coordCanvas, this.degree);
					if(this.operator === 'cos') drawCosWave(coordCanvas, this.degree);
					this.isDrawing = false;
				});

				canvas.addEventListener('touchstart', (e) => {
					this.isDrawing = true;
					this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
					if(this.operator === 'sin') drawSinWave(coordCanvas, this.degree);
					if(this.operator === 'cos') drawCosWave(coordCanvas, this.degree);
					// this.degree = degree;
				});
				canvas.addEventListener('touchmove', (e) => {
          e.preventDefault();
					// console.touches[0].log(e);
					if(this.isDrawing) {
						this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
						if(this.operator === 'sin') drawSinWave(coordCanvas, this.degree);
						if(this.operator === 'cos') drawCosWave(coordCanvas, this.degree);
					}
				});
				canvas.addEventListener('touchend', (e) => {
					this.isDrawing = false;
					this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
					if(this.operator === 'sin') drawSinWave(coordCanvas, this.degree);
					if(this.operator === 'cos') drawCosWave(coordCanvas, this.degree);
				});
			}
		},
		drawCanvasCoord() {
			const canvas = document.querySelector('#app-coord-canvas');
			canvas.height = canvas.width *.5;
			if(canvas.getContext) {
				drawCoord(canvas);
			}
		}
	},
	mounted() {
		this.drawCanvas();
		this.drawCanvasCoord();
	},
	computed: {
		radian() {
			if(this.degree === null) {
				return null;
			}
			return (this.degree * Math.PI/180).toFixed(2);
		},
		ratio() {
			if(this.operator === 'sin') {
				return Math.sin(this.radian).toFixed(2);
			}
			if(this.operator === 'cos') {
				return Math.cos(this.radian).toFixed(2);
			}
			return null;
		}
	}
}
</script>

<style scoped>
	.tri--radian-data {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	#app-coord-canvas {
		width: 100%;
		/* border: 1px solid #eee; */
	}
</style>
