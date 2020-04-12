<template>
	<div class="container mt-4 mb-5">
		<h3 class="lesson-subheading">Play many games</h3>
		<hr class="subheading-separator">
		<app-play-many-games-app v-if="trialNumber" :trialNumber="trialNumber"></app-play-many-games-app>
		<app-enter-trials-number @acceptTrialNumber="trialNumber=$event" v-else></app-enter-trials-number>
	</div>
</template>

<script>
import EnterTrialsNumber from '../../common/EnterTrialsNumber.vue';
import PlayManyGamesApp from './PlayManyGamesApp.vue';
export default {
	components: {
		appEnterTrialsNumber: EnterTrialsNumber,
		appPlayManyGamesApp: PlayManyGamesApp
	},
	data: function() {
		return {
			trialNumber: null
		};
	}
}
</script>

<style scoped>

</style>
