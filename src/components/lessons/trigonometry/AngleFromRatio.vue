<template>
	<div>
		<div class="container mt-3 mb-5">
			<h3 class="lesson-subheading">Estimate angles from a given trig ratio</h3>
			<hr class="subheading-separator">
			<div class="row">
				<!-- Left part -->
				<div class="col-12 col-md-6">
					<h5 class="text-success">Click on the circle</h5>
					<canvas id="app-canvas" width='600' height='600'></canvas>
					<h5 v-if="degree!==null">A = {{ degree }} degrees</h5>
				</div>
				<!-- Right part -->
				<div class="col-12 col-md-6">
					<h4 class="text-success mb-4">
						Use the unit circle to estimate both angles <small>(within 1 degree accuracy)</small> for the following trigonometric ratios
					</h4>
					<div>
						<table class="table">
							<thead>
								<tr>
									<th>Ratio</th>
									<th>angle 1</th>
									<th>angle 2</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="q in questions" :key="q.angle1">
									<td>{{q.operator}}A={{q.ratio}}</td>
									<td class="tri--afr-input">
										<input type="number" class="form-control" v-model="q['angle1' + q.degree + 'answer']">
										<span class="badge badge-info tri--afr-answer" v-show="q.seeAngle1Answer === true">{{q.angle1}}</span>
										<span class="tri--afr-result">
											<i class="fas fa-check text-success" v-if="q.angle1Result === true"></i>
											<i class="fas fa-times text-danger" v-if="q.angle1Result === false"></i>
										</span>
									</td>
									<td class="tri--afr-input">
										<input type="number" class="form-control" v-model="q['angle2' + q.degree + 'answer']">
										<span class="badge badge-info tri--afr-answer" v-show="q.seeAngle2Answer === true">{{q.angle2}}</span>
										<span class="tri--afr-result">
											<i class="fas fa-check text-success" v-if="q.angle2Result === true"></i>
											<i class="fas fa-times text-danger" v-if="q.angle2Result === false"></i>
										</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="app--lesson-action">
						<button class="btn btn-outline-success" @click="checkAnswer">Check</button>
						<button class="btn btn-outline-dark" @click="seeAnswer">Show answers</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { pickRandomNumberWithExcept, pickRandomElementFromArray, drawCircle, drawPosition } from './utils';
export default {
	data: function() {
		return {
			questions: [],
			degree: null,
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
		/**
		 * Create one question
		 */
		createOneQuestion(exceptArr = []) {
			let degree = pickRandomNumberWithExcept(0, 359, exceptArr);
			const operator = pickRandomElementFromArray(['sin', 'cos', 'tan']);
			const question = {
				degree,	// A random number between 0 - 359
				operator,	// 'sin', 'cos' or 'tan'
				ratio: null,
				angle1: null,
				angle2: null,
				seeAngle1Answer: false,
				seeAngle2Answer: false,
				angle1Result: null,
				angle2Result: null,
				isDrawing: false
			};
			question['angle1' + degree + 'answer'] = null;	// The user's input in angle1
			question['angle2' + degree + 'answer'] = null;	// The user's input in angle2
			switch(operator) {
				case 'sin':
					question.ratio = Number(Math.sin(degree*Math.PI/180).toFixed(2));
					if(question.ratio >= 0) {
						question.angle1 = Math.round(Math.asin(question.ratio)*180/Math.PI);
						question.angle2 = 180 - question.angle1;
					} else {
						question.angle1 = Math.round(Math.asin(Math.abs(question.ratio))*180/Math.PI) + 180;
						question.angle2 = (180 - question.angle1) + 360;
					}
					break;
				case 'cos':
					question.ratio = Number(Math.cos(degree*Math.PI/180).toFixed(2));
					question.angle1 = Math.round(Math.acos(question.ratio)*180/Math.PI);
					question.angle2 = 360 - question.angle1;
					break;
				case 'tan':
					if(question.degree===90 || question.degree===270) question.degree++;
					// Because the result of tan90 and tan270 is infinity, add it by one.
					question.ratio = Number(Math.tan(degree*Math.PI/180).toFixed(2));
					if(question.ratio >= 0) {
						question.angle1 = Math.round(Math.atan(question.ratio)*180/Math.PI);
					} else {
						question.angle1 = 180 - Math.round(Math.atan(Math.abs(question.ratio))*180/Math.PI);
					}
					question.angle2 = 180 + question.angle1;
					break;
				default:
					break;
			}
			return question;
		},
		/**
		 * Create n different questions
		 */
		createQuestions(n=1) {
			const usedDegree = [];
			const questions = [];
			for(let i = 1; i <= n; i++) {
				const question = this.createOneQuestion(usedDegree);
				usedDegree.push(question.degree);
				questions.push(question);
			}
			return questions;
		},
		drawCanvas() {
			const canvas = document.querySelector('#app-canvas');
			//canvas.height = canvas.width;	// Make the canvas a square(responsive)
			// console.log(canvas);
			if(canvas.getContext) {
				drawCircle(canvas);
				// let isDrawing = false;
				canvas.addEventListener('mousedown', (e) => {
					this.degree = drawPosition(canvas, e.clientX, e.clientY);
					this.isDrawing = true;
					// this.degree = degree;
				});
				canvas.addEventListener('mousemove', (e) => {
					// console.log(e);
					if(this.isDrawing) {
						this.degree = drawPosition(canvas, e.clientX, e.clientY);
					}
				});
				canvas.addEventListener('mouseup', (e) => {
					this.degree = drawPosition(canvas, e.clientX, e.clientY);
					this.isDrawing = false;
				});

				canvas.addEventListener('touchstart', (e) => {
					this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
					this.isDrawing = true;
					// this.degree = degree;
				});
				canvas.addEventListener('touchmove', (e) => {
          e.preventDefault();
					// console.touches[0].log(e);
					if(this.isDrawing) {
						this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
					}
				});
				canvas.addEventListener('touchend', (e) => {
					this.isDrawing = false;
					this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
				});
			}
		},
		checkAnswer() {
			for(let i in this.questions) {
				const question = this.questions[i];
				const degree = question.degree;
				if(question['angle1' + degree + 'answer']) {
					question.angle1Result =
						Math.abs(Number(question['angle1'+degree+'answer']) - question.angle1) <= 1 ?
						true :
						false;
				} else {
					question.angle1Result = null;
					question.seeAngle1Answer = false;
				}
				if(question['angle2' + degree + 'answer']) {
					question.angle2Result =
						Math.abs(Number(question['angle2'+degree+'answer']) - question.angle2) <= 1 ?
						true :
						false;
				} else {
					question.angle2Result = null;
					question.seeAngle2Answer = false;
				}
			}
		},
		seeAnswer() {
			for(let i in this.questions) {
				const question = this.questions[i];
				const degree = question.degree;
				if(question['angle1'+degree+'answer']) {
					question.seeAngle1Answer = true;
				} else {
					question.seeAngle1Answer = false;
					question.angle1Result = null;
				}
				if(question['angle2'+degree+'answer']) {
					question.seeAngle2Answer = true;
				} else {
					question.seeAngle2Answer = false;
					question.angle2Result = null;
				}
			}
		}
	},
	created() {
		this.questions = this.createQuestions(5);
		// console.log(this.questions);
	},
	mounted() {
		this.drawCanvas();
	}
}
</script>

<style>
#app-canvas {
	width: 100%;
	border: 1px solid #eee;
}
.tri--afr-input {
	position: relative;
}
.tri--afr-result {
	position: absolute;
	top: 35%;
	left: 0;
}
.tri--afr-answer {
	position: absolute;
}
</style>
