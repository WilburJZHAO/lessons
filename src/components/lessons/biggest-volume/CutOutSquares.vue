<template>
	<div class="container mt-4 mb-5">
		<div class="app--form-title" v-if="isInputting">
			<h3 class="lesson-subheading">Cut out squares</h3>
	    <hr class="subheading-separator">
			<h4 class="text-center mb-4">Paper size</h4>
			<form @submit.prevent="handleInput">
				<div class="form-group row">
					<label for="length-input" class="col-sm-3">Enter the length</label>
					<div class="col-sm-9">
						<input
							type="number"
							id="length-input"
							class="form-control"
							min="4"
							max="30"
							required
							v-model="length"
							@focus="displayLengthInputPrompt"
							@blur="hideLengthInputPrompt">
						<div class="badge badge-secondary mt-2" v-bind:style="{visibility: lengthInputPrompt ? 'visible' : 'hidden' }">
							Enter the length of the paper (4-30)
						</div>
					</div>
				</div>
				<div class="form-group row">
					<label for="width-input" class="col-sm-3">Enter the width</label>
					<div class="col-sm-9">
						<input
							type="number"
							id="width-input"
							class="form-control"
							min="4"
							max="30"
							required
							v-model="width"
							@focus="displayWidthInputPrompt"
							@blur="hideWidthInputPrompt">
						<div class="badge badge-secondary mt-2" v-bind:style="{visibility: widthInputPrompt ? 'visible' : 'hidden' }">
							Enter the width of the paper (4-30)
						</div>
					</div>
				</div>
				<div class="form-action text-center">
					<button class="btn btn-outline-success" type="submit">OK</button>
				</div>
			</form>
		</div>
		<div v-else>
			<app-cut-out :width="width" :length="length"></app-cut-out>
		</div>
	</div>
</template>

<script>
import CutOut from './CutOut.vue'
export default {
	components: {
		appCutOut: CutOut
	},
	data: function() {
		return {
			length: null,
			width: null,
			isInputting: true,
			lengthInputPrompt: false,
			widthInputPrompt: false
		}
	},
	methods: {
		handleInput() {
			this.isInputting = false;
		},
		displayLengthInputPrompt() {
			this.lengthInputPrompt = true;
		},
		displayWidthInputPrompt() {
			this.widthInputPrompt = true;
		},
		hideLengthInputPrompt() {
			this.lengthInputPrompt = false;
		},
		hideWidthInputPrompt() {
			this.widthInputPrompt = false;
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