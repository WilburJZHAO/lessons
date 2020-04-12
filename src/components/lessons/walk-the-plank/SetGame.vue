<template>
	<div>
		<div class="app--enter-number form-group row mt-5">
			<label for="trial-numbers" class="col-form-label col-sm-6">
				Enter the number of trials (1 to 10000):
			</label>
			<div class="col-sm-6">
				<input type="number" class="form-control" v-model="trialNumber" required>
			</div>
			<br><br><br>
			<label for="plank-length" class="col-form-label col-sm-6">
				Enter the plank length (1 to 50):
			</label>
			<div class="col-sm-6">
				<input type="number" class="form-control" v-model="plankLength" required>
			</div>
			<div class="form-action col-6 offset-sm-6 offset-4 mt-3">
				<button
					:disabled="!isValidInput"
					class="btn btn-outline-success btn-lg"
					@click="handleSetGame"
				>OK</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				trialNumber: null,
				plankLength: null
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
				if(!this.plankLength ||
					isNaN(Number(this.plankLength)) ||
					this.plankLength < 1 ||
					this.plankLength > 50
				) {
					return false;
				}
				return true;
			}
		},
		methods: {
			handleSetGame() {
				this.$emit(
					'acceptGameSetting',
					{ trialNumber: this.trialNumber, plankLength: this.plankLength});
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