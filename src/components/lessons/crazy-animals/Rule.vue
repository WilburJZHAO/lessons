<template>
	<div class="container app--container mt-3 mb-5">
		<h3 class="lesson-subheading">What is the rule?</h3>
		<hr class="subheading-separator">
		<div class="app--form mt-3">
			<div class="form-group row">
				<label for="how-many-animals" class="col-12 col-sm-4">How many animals</label>
				<div class="col-12 col-sm-6">
					<input type="number" class="form-control" min="1" max="9" v-model="numberOfAnimals">
				</div>
				<div class="col-12 col-sm-2">(Single digit)</div>
			</div>
			<div class="form-group row">
				<label for="how-many-animal-parts" class="col-12 col-sm-4">How many animal parts</label>
				<div class="col-12 col-sm-6">
					<input type="number" class="form-control" min="1" max="9" v-model="numberOfParts">
				</div>
				<div class="col-12 col-sm-2">(Single digit)</div>
			</div>
			<div class="form-group row">
				<label for="how-many-animals" class="col-12 col-sm-4">Predict the number of different animals</label>
				<div class="col-12 col-sm-6">
					<input type="number" class="form-control" v-model="predictNumber">
				</div>
			</div>
			<div class="text-center alert alert-danger" v-if="showAnswer">The answer is {{ this.answer }}</div>
			<div class="text-center alert alert-success" v-if="checkResult === true">Yes, you are right. Can you write down the rule?</div>
			<div class="text-center alert alert-danger" v-if="checkResult === false && !showAnswer">Incorrect. Try again or click for an answer</div>
			<div class="app--action" v-if="!isChecked">
				<button
					class="btn btn-outline-success"
					:disabled="!isValidInput || !isValidPredict"
					@click="handleClickOK">
					OK
				</button>
				<button
					class="btn btn-outline-dark"
					:disabled="!isValidInput"
					@click="handleClickAnswer">
					Show answer
				</button>
			</div>
			<div class="app--action" v-if="isChecked">
				<button
					class="btn btn-outline-success"
					@click="handleAgain"
				>Play again</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			numberOfAnimals: null,
			numberOfParts: null,
			predictNumber: null,
			isChecked: false,
			checkResult: null,
			showAnswer: false
		}
	},
	computed: {
		isValidInput() {
			return this.numberOfAnimals >= 1 &&
				this.numberOfAnimals <= 9 &&
				this.numberOfParts >= 1 &&
				this.numberOfParts <= 9
		},
		isValidPredict() {
			return this.predictNumber > 0;
		},
		answer() {
			if(!this.numberOfAnimals || !this.numberOfParts) {
				return null;
			}
			return Math.pow(this.numberOfAnimals, this.numberOfParts);
		}
	},
	methods: {
		handleClickOK() {
			this.checkResult = this.answer == this.predictNumber ? true : false ;
			if(this.checkResult === true) {
				this.isChecked = true;
			}
		},
		handleClickAnswer() {
			this.showAnswer = true;
			this.isChecked = true;
		},
		handleAgain() {
			this.isChecked = false;
			this.checkResult = null;
			this.showAnswer = false;
			this.predictNumber = null;
			this.numberOfAnimals = null;
			this.numberOfParts = null;
		}
	}

}
</script>

<style scoped>
.app--container {
	max-width: 750px;
	margin: 0 auto;
	padding: 0 20px;
}
.app--action {
	display: flex;
	justify-content: space-around;
}
</style>
