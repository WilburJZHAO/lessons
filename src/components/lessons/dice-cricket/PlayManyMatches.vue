<template>
	<div class="container mt-3 mb-5">
		<h3 class="lesson-subheading">Play many matches</h3>
		<hr class="subheading-separator">
		<app-play-many-matches-app v-if="trialNumber" :trialNumber="trialNumber"></app-play-many-matches-app>
		<app-enter-trials-Number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
	</div>
</template>

<script>
import EnterTrialsNumber from '../../common/EnterTrialsNumber.vue';
import PlayManyMatchesApp from './PlayManyMatchesApp.vue';
export default {
	components: {
		appEnterTrialsNumber: EnterTrialsNumber,
		appPlayManyMatchesApp: PlayManyMatchesApp
	},
	data: function() {
		return {
			trialNumber: null,
		}
	}
}
</script>

<style scoped>

</style>
