<template>
	<div>
			<div v-if="selectedOption === -1">
				<app-title-static>
					Trigonometry Walk
				</app-title-static>
				<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
					<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
				</transition>
			</div>

			<div class="container-fluid" v-else>
				<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
					<app-top-nav @backToMenu="selectedOption = $event">Trigonometry Walk</app-top-nav>
				</transition>

				<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
					<app-ratio-from-angle v-if="selectedOption === 1"></app-ratio-from-angle>
					<app-angle-from-ratio v-else-if="selectedOption === 2"></app-angle-from-ratio>
					<app-radian-play v-else-if="selectedOption === 3"></app-radian-play>
				</transition>
			</div>
		<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
			<app-bottom-nav></app-bottom-nav>
		</transition>
	</div>
</template>

<script>
	// import Title from '../../layout/Title.vue';
	import TitleStatic from '../../layout/TitleStatic.vue';
	import TopNav from '../../layout/TopNav.vue';
	import BottomNav from '../../layout/BottomNav.vue';
	import Options from '../../layout/Options.vue';
	import AngleFromRatio from './AngleFromRatio.vue';
	import RatioFromAngle from './RatioFromAngle.vue';
	import RadianPlay from './RadianPlay.vue';

	export default {
		components: {
			// appTitle: Title,
			appTitleStatic: TitleStatic,
			appTopNav: TopNav,
			appOptions: Options,
			appBottomNav: BottomNav,
			appAngleFromRatio: AngleFromRatio,
			appRatioFromAngle: RatioFromAngle,
			appRadianPlay: RadianPlay
		},
		data: function() {
			return {
				options: [
					{ id: 1, title: 'Estimate trig ratios from a given angle' },
					{ id: 2, title: 'Estimate angles from a given trig ratio' },
					{ id: 3, title: 'Radian play'}
				],
				selectedOption: -1,
			}
		}
	}
</script>

<style>
.table td {
	vertical-align: baseline;
}

#app-canvas {
	width: 100%;
	border: 1px solid #eee;
}


</style>

