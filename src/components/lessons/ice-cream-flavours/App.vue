<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Ice Cream Flavours</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Ice Cream Flavours</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-make-ice-creams v-if="selectedOption === 1"></app-make-ice-creams>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-how-many-ice-creams v-if="selectedOption === 2"></app-how-many-ice-creams>
			</transition>
		</div>
    <!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
			<app-bottom-nav></app-bottom-nav>
		</transition> -->
	</div>
</template>

<script>
// import Title from '../../layout/Title.vue';
import TitleStatic from '../../layout/TitleStatic.vue';
import TopNav from '../../layout/TopNav.vue';
// import BottomNav from '../../layout/BottomNav.vue';
import Options from '../../layout/Options.vue';
import MakeIceCreams from './MakeIceCreams.vue';
import HowManyIceCreams from './HowManyIceCreams.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		// appBottomNav: BottomNav,
		appMakeIceCreams: MakeIceCreams,
		appHowManyIceCreams: HowManyIceCreams
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Make some ice creams'},
				{id: 2, title: 'How many ice creams can be made?'}
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
