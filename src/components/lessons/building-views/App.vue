<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Building views</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Building views</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-building-views v-if="selectedOption === 1"></app-building-views>
			</transition>
		</div>
    <!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
			<app-bottom-nav></app-bottom-nav>
		</transition> -->
	</div>
</template>

<script>
import TitleStatic from '../../layout/TitleStatic.vue';
// import Title from '../../layout/Title.vue';
import TopNav from '../../layout/TopNav.vue';
// import BottomNav from '../../layout/BottomNav.vue';
import Options from '../../layout/Options.vue';
import BuildingViews from './BuildingViews.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		// appBottomNav: BottomNav,
		appBuildingViews: BuildingViews,
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Building views'},
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
