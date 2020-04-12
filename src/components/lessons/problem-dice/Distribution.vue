<template>
	<div class="mt-3">
		<h3 class="lesson-subheading">Experminental distribution of dice differences</h3>
		<hr class="subheading-separator">
		<app-distribution-app v-if="trialNumber" :trialNumber="trialNumber" :gameType="2"></app-distribution-app>
		<app-enter-trials-number v-else @acceptTrialNumber="trialNumber=$event"></app-enter-trials-number>
	</div>
</template>

<script>
import EnterTrialsNumber from '../../common/EnterTrialsNumber.vue';
import DistributionApp from './DistributionApp.vue';

export default {
	components: {
		appEnterTrialsNumber: EnterTrialsNumber,
		appDistributionApp: DistributionApp
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