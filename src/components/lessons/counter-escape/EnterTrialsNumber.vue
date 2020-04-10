<template>
	<div>
		<div class="app--enter-number form-group row mt-5">
			<label for="trial-numbers" class="col-form-label col-sm-6">
				Enter the number of trials (1 to 10000):
			</label>
			<div class="col-sm-6">
				<input type="number" class="form-control" v-model="trialNumber" required>
			</div>
			<div class="form-action col-6 offset-sm-6 offset-4 mt-3">
				<button
					:disabled="!isValidInput"
					class="btn btn-outline-success btn-lg"
					@click="handleAcceptTrialNumber"
				>OK</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				trialNumber: null
			}
		},
		computed: {
			isValidInput() {
				if( !this.trialNumber ||
					isNaN(Number(this.trialNumber)) ||
					this.trialNumber < 1 ||
					this.trialNumber > 10000 ) {
						return false;
					}
				return true;
			}
		},
		methods: {
			handleAcceptTrialNumber() {
				this.$emit('acceptTrialNumber', this.trialNumber);
			}
		}
	}
</script>

<style scoped>
	.app--enter-number {
		max-width: 700px;
		margin: 0 auto;
	}
</style>