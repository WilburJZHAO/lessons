<template>
	<div>
		<transition appear appear-class="app-appear" appear-active-class="app-appear-active">
		<div class="container mt-3">
			<h3 class="lesson-subheading">How many rows?</h3>
			<hr class="subheading-separator">
			<div class="row">
				<!-- Left part -->
				<div class="col-12 col-md-6 app--lesson-left">
					<form @submit.prevent="handleCheckAnswer">
						<h4 class="text-success">Fill out a number to make the sentence true.</h4>
						<div class="form-group container">
							<div class="row">
								<input type="number" class="form-control col-4" min="1" max="10" v-model="answer" required :readonly="finishAnswer" >
								<div class="col-8" style="display: flex; align-items: center;">
									<label style="font-size: 1.3rem; margin: 0; font-weight: 500">rows of {{ number2 }} = {{ result }}</label>
								</div>
							</div>
						</div>
						<div class="form-check">
							<input type="radio" class="form-check-input" name="level" value="1" id="check-level1" v-model="level">
							<label for="check-level1" class="form-check-label">Level 1</label>
						</div>
						<div class="form-check">
							<input type="radio" class="form-check-input" name="level" value="2" id="check-level2" v-model="level">
							<label for="check-level2" class="form-check-label">Level 2</label>
						</div>
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="check-see-count" v-model="seeCountGrow">
							<label for="check-see-count">Do you want to see the count grow?</label>
						</div>
						<div class="app--lesson-action">
							<button
								type="submit"
								class="btn btn-outline-success btn-lg"
								:disabled="finishAnswer">Answer</button>
							<button
								type="button"
								class="btn btn-outline-dark btn-lg"
								@click="createQuestion(level)">Next</button>
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
				<div class="col-12 col-md-6 app--lesson-right">
					<div class="tt--right-box" v-show="answer && answer>=1 && answer<=10">
						<div class="tt--right-row" v-for="val in answerArr" :key="val">
							<div class="tt--right-circle col-10" style="display: flex">
								<div v-for="number2Val in number2Arr" :key="number2Val">
									<app-circle />
								</div>
							</div>
							<transition name="count-fade">
								<div class="tt--right-count col-2" v-show="seeCountGrow">{{ val*number2 }}</div>
							</transition>
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
import { pickRandomNumber } from './utils';

export default {
	components: {
		AppCircle: Circle
	},
	data: function() {
		return {
			level: 1,
			seeCountGrow: false,
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
			this.number1 = pickRandomNumber(1, 10);
			if(parseInt(level) === 1) {
				this.number2 = pickRandomNumber(1, 5);
			} else {
				this.number2 = pickRandomNumber(6, 10);
			}
			this.result = this.number1 * this.number2;
		},

		/**
		 * Check input answer
		 */
		handleCheckAnswer() {
			const answer = parseInt(this.answer);
			if(answer === this.number1) {
				this.answerResult.isRight = true;
				this.answerResult.prompt = 'Your answer is right. Well done!';
				this.finishAnswer = true;
			} else {
				this.finishAnswer = false;
				this.answerResult.isRight = false;
				if(answer < this.number1) {
					this.answerResult.prompt = 'Your answer is too small.';
				} else if(answer > this.number1 ) {
					this.answerResult.prompt = 'Your answer is too big.';
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
		/**
		Convert answer(number) to an array. e.g. 4 => [1, 2, 3, 4]
		 */
		answerArr: function() {
			// const answer = parseInt(this.answer);
			if(!this.answer) {
				return [];
			}
			const answerArrReturned = [];
			let val = 1;
			while(val <= this.answer) {
				answerArrReturned.push(val);
				val++;
			}
			return answerArrReturned;
		},
		/**
		Convert number2 to an array, same functionality as 'answerArr'
		 */
		number2Arr: function() {
			const myNumber2 = parseInt(this.number2);
			if(!this.number2) {
				return [];
			}
			const number2ArrReturned = [];
			let val = 1;
			while(val <= myNumber2) {
				number2ArrReturned.push(val);
				val++;
			}
			return number2ArrReturned;
		}
	}

}
</script>

<style scoped>
	.count-fade-enter-active, .count-fade-leave-active {
		transition: opacity .5s;
	}
	.count-fade-enter, .count-fade-leave-to {
		opacity: 0;
	}
</style>
