<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Make a Million</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Make a Million</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-make-a-million v-if="selectedOption === 1"></app-make-a-million>
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
import MakeAMillion from './MakeAMillion.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		appMakeAMillion: MakeAMillion,
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Make a Million'}, 
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
