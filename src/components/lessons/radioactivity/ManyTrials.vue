<template>
	<div class="container mt-3">
		<h3 class="lesson-subheading">Many trials</h3>
		<hr class="subheading-separator">
		<app-many-trials-app v-if="validInput" :trialInputs="trialInputs"></app-many-trials-app>
		<app-many-trials-input @acceptTrialInputs="onValidInput" v-else></app-many-trials-input>
	</div>
</template>

<script>
import ManyTrialsInput from './ManyTrialsInput.vue';
import ManyTrialsApp from './ManyTrialsApp.vue';
export default {
	components: {
		appManyTrialsInput: ManyTrialsInput,
		appManyTrialsApp: ManyTrialsApp
	},
	data: function() {
		return {
			trialInputs: null,
			validInput: false
		};
	},
	methods: {
		//this method is triggered when the valid input is submitted from the child
		onValidInput(value){
			this.trialInputs = value;
			this.validInput = true;
		}
	}
}
</script>

<style scoped>

</style>
