<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Garden Beds</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Garden Beds</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-garden-bed v-if="selectedOption === 1"></app-garden-bed>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-bed-length v-if="selectedOption === 2"></app-bed-length>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-challenge v-if="selectedOption === 3"></app-challenge>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-expert-challenge v-if="selectedOption === 4"></app-expert-challenge>
			</transition>
		</div>
	</div>
</template>

<script>
import TitleStatic from '../../layout/TitleStatic.vue';
import TopNav from '../../layout/TopNav.vue';
import Options from '../../layout/Options.vue';
import GardenBed from './GardenBed.vue';
import BedLength from './BedLength.vue';
import Challenge from './Challenge.vue';
import ExpertChallenge from './ExpertChallenge';

import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		appGardenBed: GardenBed,
		appBedLength: BedLength,
		appChallenge: Challenge,
		appExpertChallenge: ExpertChallenge
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Demonstration'},
				{id: 2, title: 'Enter your own bed length'},
				{id: 3, title: 'Challenge'},
				{id: 4, title: 'Expert Challenge'}
			],
			selectedOption: -1
		}
	}
}
</script>

<style scoped>
/* */
</style>
