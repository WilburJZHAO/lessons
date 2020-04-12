<template>
	<div>
		<transition appear appear-class="app-appear" appear-active-class="app-appear-active">
		<div class="container mt-3">
			<h3 class="lesson-subheading">How many buttons?</h3>
			<hr class="subheading-separator">
			<div class="row">
				<!-- Left part -->
				<div class="col-12 col-md-6 app--lesson-left">
					<form @submit.prevent="handleCheckAnswer">
						<h4 class="text-success">How many buttons in the picture?</h4>
						<div class="form-check">
							<input type="radio" class="form-check-input" name="level" value="1" id="check-level1" v-model="level" >
							<label for="check-level1" class="form-check-label">Level 1</label>
						</div>
						<div class="form-check mb-3">
							<input type="radio" class="form-check-input" name="level" value="2" id="check-level2" v-model="level" >
							<label for="check-level2" class="form-check-label">Level 2</label>
						</div>

						<div class="form-group">
							<input type="number" class="form-control" min="1" required :readonly="finishAnswer" v-model="answer">
						</div>
						<div class="app--lesson-action">
							<button
								type="submit"
								class="btn btn-outline-success btn-lg"
								:disabled="finishAnswer">Answer</button>
							<button
								type="button"
								class="btn btn-outline-dark btn-lg"
								@click="createQuestion(level)" >Next</button>
						</div>
						<div class="tt-prompt">
							<p v-show="answerResult.prompt"
								class="alert"
								:class="{'alert-danger': !answerResult.isRight ,'alert-success': answerResult.isRight}">
									{{ answerResult.prompt }}
								</p>
						</div>
					</form>
				</div>

				<!-- Right part -->
				<div class="col-12 col-md-6 app--lesson-right" style="overflow: visible;">
					<p class="tt--right-num1 mr-2 mt-1"><br><span class="badge badge-light">{{ this.number1 }} row{{ this.number1 > 1 ? 's' : ''}}</span> </p>
					<div class="tt--right-num2">
						<p class="ml-1 mb-1"><span class="badge badge-dark">{{ this.number2 }} in each row</span></p>
						<div class="tt--right-box">
							<div class="tt--right-row" v-for="num1 in number1ToArr" :key="num1">
								<div class="tt--right-circle" style="display: flex">
									<div v-for="num2 in number2ToArr" :key="num2">
										<app-circle />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import Circle from './Circle.vue';
import { pickRandomNumber, numberToArr } from './utils';

export default {
	components: {
		AppCircle: Circle
	},
	data: function() {
		return {
			level: 1,
			number1: 0,
			number2: 0,
			result: 0,
			answer: null,
			answerResult: {
				isRight: false,
				prompt: ''
			},
			finishAnswer: false
		}
	},
	methods: {
		/**
		 * Create a question based on the level and set this.number1, this.number2 and this.result
		 * @param String level = '1' or '2'
		 * @returns Null
		 */
		createQuestion(level) {
			this.answer = null;
			this.finishAnswer = false;
			this.answerResult.isRight = false;
			this.answerResult.prompt = '';
			if(parseInt(level) === 1) {
				this.number1 = pickRandomNumber(1, 6);
				this.number2 = pickRandomNumber(1, 6);
			} else {
				this.number1 = pickRandomNumber(6, 11);
				this.number2 = pickRandomNumber(6, 11);
			}
			this.result = this.number1 * this.number2;
		},

		/**
		 * Check input answer
		 */
		handleCheckAnswer() {
			const answer = parseInt(this.answer);
			if(answer === this.result ){
				this.answerResult.isRight = true;
				this.answerResult.prompt = 'Your answer is right. Well done!';
				this.finishAnswer = true;
			} else {
				this.finishAnswer = false;
				this.answerResult.isRight = false;
				if(answer < this.result ) {
					this.answerResult.prompt = `${answer} is too small`;
				} else if(answer > this.result) {
					this.answerResult.prompt = `${answer} is too big`;
				} else {
					this.answerResult.prompt = 'Your answer is invalid.';
				}
			}
		}

	},
	created() {
		this.createQuestion(this.level);
		window.addEventListener('keyup', (e) => {
			if(e.code=="Space") {
				this.createQuestion(this.level);
			}
		});
	},
	watch: {
		level: function(levelVal) {
			this.createQuestion(levelVal);
		}
	},
	computed: {
		number1ToArr: function() {
			return numberToArr(this.number1);
		},
		number2ToArr: function() {
			return numberToArr(this.number2);
		}
	}
}
</script>

<style scoped>

</style>
