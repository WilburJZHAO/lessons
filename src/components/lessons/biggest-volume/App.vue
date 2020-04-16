<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Biggest Volume</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Biggest Volume</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-cut-out-squares v-if="selectedOption === 1"></app-cut-out-squares>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-calculate-and-display v-if="selectedOption === 2"></app-calculate-and-display>
			</transition>
		</div>
    <!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
			<app-bottom-nav></app-bottom-nav>
		</transition> -->
	</div>
</template>

<script>
import TitleStatic from '../../layout/TitleStatic.vue';
import TopNav from '../../layout/TopNav.vue';
// import BottomNav from '../../layout/BottomNav.vue';
import Options from '../../layout/Options.vue';
import CutOutSquares from './CutOutSquares.vue';
import CalculateAndDisplay from './CalculateAndDisplay.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		// appBottomNav: BottomNav,
		appCutOutSquares: CutOutSquares,
		appCalculateAndDisplay: CalculateAndDisplay
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Cut out squares'},
				{id: 2, title: 'Calculate and display a range of up to eleven volumes'}
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
