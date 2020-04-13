<template>
	<div class="mt-3">
		<h3 class="lesson-subheading">Play many games</h3>
		<hr class="subheading-separator">
		<app-game v-if="trialNumber" :trialNumber="trialNumber" :gameType="2"></app-game>
		<app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
	</div>
</template>

<script>
import EnterTrialsNumber from '../../common/EnterTrialsNumber.vue';
import Game from './Game.vue';

export default {
	components: {
		appGame: Game,
		appEnterTrialsNumber: EnterTrialsNumber
	},
	data: function() {
		return {
			trialNumber: null
		}
	}
}
</script>

<style scoped>

</style>
