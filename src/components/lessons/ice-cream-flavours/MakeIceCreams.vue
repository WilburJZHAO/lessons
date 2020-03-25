<template>
	<div class="container mt-4 mb-5">
		<div class="app--form-title" v-if="!numberOfFlavours || !isNumberValid">
			<h4 class="text-success text-center mb-4">
				Number of flavours
			</h4>
			<form @submit.prevent="handleNumberInput">
				<div class="form-group row">
					<label for="number-input" class="col-sm-4">
						Enter an integer (2-4)
					</label>
					<div class="col-sm-8">
						<input
							type="number"
							id="number-input"
							class="form-control"
							required
							v-model="numberOfFlavours"
							min="2"
							max="4"
							@focus="()=>{ this.isNumberChecked = false; }"
							>
						<div class="badge badge-danger mt-2"
							v-bind:style="{visibility: (isNumberChecked && !isNumberValid && numberOfFlavours) ? 'visible' : 'hidden' }">
							Invalid input
						</div>
					</div>
				</div>
				<div class="form-action text-center">
					<button class="btn btn-outline-success" type="submit">OK</button>
				</div>
			</form>
		</div>
		<div v-else>
			<app-make-ice-creams-app :numberOfFlavours = "numberOfFlavours"></app-make-ice-creams-app>
		</div>
	</div>
</template>

<script>
import MakeIceCreamsApp from './MakeIceCreamsApp.vue';
export default {
	components: {
		appMakeIceCreamsApp: MakeIceCreamsApp
	},
	data: function() {
		return {
			numberOfFlavours: null,
			isNumberValid: false,
			isNumberChecked: false
		}
	},
	methods: {
		handleNumberInput() {
			this.isNumberChecked = true;
			// console.log('ok', this.isNumberChecked);
			if( Number.isInteger( Number(this.numberOfFlavours) ) && 
				this.numberOfFlavours <= 4 &&
				this.numberOfFlavours >= 2 ) {
					this.isNumberValid = true;
				}
		}
	}
}
</script>

<style scoped>
	.app--form-title {
		max-width: 600px;
		margin: 0 auto;
	}
</style>
