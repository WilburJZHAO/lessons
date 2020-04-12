<template>
	<div>
		<div class="container mt-3 mb-5">
			<h3 class="lesson-subheading">Estimate trig ratios from a given angle</h3>
			<hr class="subheading-separator">
			<div class="row">
				<!-- Left part -->
				<div class="col-12 col-md-6">
					<h5 class="text-success">Click on the circle</h5>
					<canvas id="app-canvas" width="600" height="600"></canvas>
					<h5 v-if="degree!==null"> A = {{ degree }} degrees</h5>
				</div>
				<!-- Right part -->
				<div class="col-12 col-md-6">
					<h4 class="text-success mb-4">
						Use the unit circle to estimate both trigonometric ratios
						<small>(0.03 accuracy)</small> for the following angles.
					</h4>
					<div class="tri--rfa-table">
						<table class="table">
							<thead>
								<tr>
									<th>A(Degrees)</th>
									<th>sinA</th>
									<th>cosA</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="q in questions" :key="q.degree">
									<td>
										{{ q.degree }}
									</td>
									<td class="tri--rfa-input">
										<input type="number" class="form-control" v-model="q['sin'+q.degree+'answer']">
										<span class="badge badge-info tri--rfa-answer" v-show="q.seeSinAnswer === true">{{ q.sinDegree }}</span>
										<span class="tri--rfa-result">
											<i class="fas fa-check text-success" v-if="q.sinResult === true"></i>
											<i class="fas fa-times text-danger" v-if="q.sinResult === false"></i>
										</span>
									</td>
									<td class="tri--rfa-input">
										<input type="number" class="form-control" v-model="q['cos'+q.degree+'answer']">
										<span class="badge badge-info tri--rfa-answer" v-show="q.seeCosAnswer === true">{{ q.cosDegree }}</span>
										<span class="tri--rfa-result">
											<i class="fas fa-check text-success" v-if="q.cosResult === true"></i>
											<i class="fas fa-times text-danger" v-if="q.cosResult === false"></i>
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
import { pickRandomNumberWithExcept, drawCircle, drawPosition } from './utils';
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
		 * Create one question, with degree and sin, cos
		 */
		createOneQuestion(exceptArr = []) {
			const degree = pickRandomNumberWithExcept(1, 360, exceptArr);
			const question = {
				degree,		// The degree given
				sinDegree: Number(Math.sin(degree*Math.PI/180).toFixed(2)),	// The value of sin degree
				cosDegree: Number(Math.cos(degree*Math.PI/180).toFixed(2)),	// The value of cos degree
				sinResult: null,		// If the answer of sin input is correct
				cosResult: null,		// If the answer of cos input is correct
				seeSinAnswer: false,	// If show the answer of sin
				seeCosAnswer: false		// If show the answer of cos
			}
			question['sin'+degree+'answer'] = null;		// The user input
			question['cos'+degree+'answer'] = null;		// The user input
			// question['sin'+degree+'result'] = null;
			// question['cos'+degree+'result'] = null;
			return question;
		},
		/**
		 * Create n different questions
		 */
		createQuestions(n=1) {
			const usedDegree = [];	// The used degree(s)
			const questions = [];	// All questions
			for(let i = 1; i <= n; i++) {
				const question = this.createOneQuestion(usedDegree);
				usedDegree.push(question.degree);
				questions.push(question);
			}
			// console.log(questions);
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
					this.isDrawing = false;
					this.degree = drawPosition(canvas, e.clientX, e.clientY);
				});

				canvas.addEventListener('touchstart', (e) => {
					this.degree = drawPosition(canvas, e.touches[0].clientX, e.touches[0].clientY);
					this.isDrawing = true;
					// this.degree = degree;
				});
				canvas.addEventListener('touchmove', (e) => {
          e.preventDefault();
					// console.log(e);
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
			// const questionsToCheck = this.questions;
			for(let i in this.questions) {
				const question = this.questions[i];
				const degree = question.degree;
				if(question['sin'+degree+'answer']) {
					// console.log('has sin answer', question['sin'+degree+'answer']);
					question.sinResult =
						Number(Math.abs(Number(question['sin'+degree+'answer'])-question.sinDegree).toFixed(2)) <= 0.03 ?
						true :
						false;
				} else {
					question.sinResult = null;
					question.seeSinAnswer = false;
				}
				if(question['cos'+degree+'answer']) {
					// console.log('has cos answer', question['cos'+degree+'answer']);
					question.cosResult =
						Number(Math.abs(Number(question['cos'+degree+'answer'])-question.cosDegree).toFixed(2)) <= 0.03 ?
						true :
						false;
				} else {
					question.cosResult = null;
					question.seeCosAnswer = false;
				}
			}
			// console.log('check answer!', this.questions);
		},
		seeAnswer() {
			for(let i in this.questions) {
				const question = this.questions[i];
				const degree = question.degree;
				if(question['sin'+degree+'answer']) {
					question.seeSinAnswer = true;
				} else {
					question.seeSinAnswer = false;
					question.sinResult = null;
				}
				if(question['cos'+degree+'answer']) {
					question.seeCosAnswer = true;
				} else {
					question.seeCosAnswer = false;
					question.cosResult = null;
				}
			}
			// console.log(this.questions);
		}
	},
	created() {
		this.questions = this.createQuestions(5);
		// this.drawCircle();
		// console.log(this.questions);
	},
	mounted() {
		this.drawCanvas();
	}
}
</script>

<style scoped>
.tri--rfa-input {
	position: relative;
}
.tri--rfa-result {
	position: absolute;
	top: 35%;
	left: 0;
}
.tri--rfa-answer {
	position: absolute;
}
</style>
