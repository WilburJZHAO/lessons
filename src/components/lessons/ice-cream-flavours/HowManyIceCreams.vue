<template>
	<div class="container mt-4 mb-5">
		<div class="app--form-title" v-if="!finishInput">
			<h4 class="text-success text-center mb-4">
				How many ice creams can be made?
			</h4>
			<form @submit.prevent="handleNumberInput">
				<div class="form-group row">
					<label for="flavour-input" class="col-sm-6">
						Enter the number of flavours(2-6)
					</label>
					<div class="col-sm-6">
						<input type="number"
							id="flavour-input"
							class="form-control"
							required
							v-model="numberOfFlavours"
							min="2"
							max="6"
						>
						<div class="badge badge-danger mt-2"
							v-bind:style="{visibility: isValidNumberOfFlavours ? 'hidden' : 'visible' }">
							Invalid input
						</div>
					</div>
				</div>

				<div class="form-group row">
					<label for="scoop-input" class="col-sm-6">
						Enter the number of scoops(2-6)
					</label>
					<div class="col-sm-6">
						<input type="number"
							id="flavour-input"
							class="form-control"
							required
							v-model="numberOfScoops"
							min="2"
							max="6"
						>
						<div class="badge badge-danger mt-2"
							v-bind:style="{visibility: isValidNumberOfScoops ? 'hidden' : 'visible' }">
							Invalid input
						</div>
					</div>
				</div>

				<div class="form-group form-check">
					<input type="checkbox" class="form-check-input" id="allowRepeat" v-model="allowRepeat">
					<label for="allowRepeat" class="form-check-label">Repeat allowed</label>
				</div>

				<div class="form-action text-center">
					<button class="btn btn-outline-success" type="submit">OK</button>
				</div>
			</form>
		</div>
		<div v-else>
			<app-how-many-ice-creams-app
				:numberOfFlavours="numberOfFlavours"
				:numberOfScoops="numberOfScoops"
				:allowRepeat="allowRepeat"
			></app-how-many-ice-creams-app>
		</div>
	</div>
</template>

<script>
import HowManyIceCreamsApp from './HowManyIceCreamsApp.vue';
export default {
	components: {
		appHowManyIceCreamsApp: HowManyIceCreamsApp
	},
	data: function() {
		return {
			numberOfFlavours: null,
			numberOfScoops: null,
			allowRepeat: false,
			finishInput: false,
			isValidNumberOfFlavours: true,
			isValidNumberOfScoops: true
		}
	},
	watch: {
		numberOfFlavours: function(value) {	// Validate numberOfFlavours
			let numberToTest = Number(value);
			if(!value ||
				(Number.isInteger(numberToTest) &&
				numberToTest >= 2 &&
				numberToTest <= 6) ) {
					return this.isValidNumberOfFlavours = true;
				} else {
					return this.isValidNumberOfFlavours = false;
				}
		},
		numberOfScoops: function(value) {	// Validate numberOfScoops
			let numberToTest = Number(value);
			if(!value ||
				(Number.isInteger(numberToTest) &&
				numberToTest >= 2 &&
				numberToTest <= 6) ) {
					return this.isValidNumberOfScoops = true;
				} else {
					return this.isValidNumberOfScoops = false;
				}
		}
	},
	methods: {
		handleNumberInput() {
			if(this.numberOfFlavours &&
				this.numberOfScoops &&
				this.isValidNumberOfScoops &&
				this.isValidNumberOfFlavours )
			this.finishInput = true;
		}
	}
}
</script>

<style scoped>
	.app--form-title {
		max-width: 650px;
		margin: 0 auto;
	}
</style>
