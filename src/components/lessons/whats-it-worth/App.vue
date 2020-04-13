<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>What's It Worth?</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">What's It Worth?</app-top-nav> 
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-cover-shape
					v-if="selectedOption === 1"
				></app-cover-shape>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-value-of-shape
					v-if="selectedOption === 2"
				></app-value-of-shape>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-value-of-tile
					v-if="selectedOption === 3"
				></app-value-of-tile>
			</transition>
		</div>
	</div>
</template>

<script>
import TitleStatic from '../../layout/TitleStatic.vue';
import TopNav from '../../layout/TopNav.vue';
import Options from '../../layout/Options.vue';
import CoverShape from './CoverShape.vue';
import ValueOfShape from './ValueOfShape.vue';
import ValueOfTile from './ValueOfTile.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		appCoverShape: CoverShape,
		appValueOfShape: ValueOfShape,
		appValueOfTile: ValueOfTile
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Cover the shape'},
				{id: 2, title: 'Find the value of the shape'},
				{id: 3, title: 'Find the value of the tile'},
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
