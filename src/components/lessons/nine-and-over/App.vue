<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Nine and Over</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Nine and Over</app-top-nav> 
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-show-the-number
					v-if="selectedOption === 1"
				></app-show-the-number>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-you-count
					v-if="selectedOption === 2"
				></app-you-count>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-computer-count
					v-if="selectedOption === 3"
				></app-computer-count>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-addition-0-to-100
					v-if="selectedOption === 4"
				></app-addition-0-to-100>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-any-addition
					v-if="selectedOption === 5"
				></app-any-addition>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-subtraction-100-to-0
					v-if="selectedOption === 6"
				></app-subtraction-100-to-0>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-any-subtraction
					v-if="selectedOption === 7"
				></app-any-subtraction>
			</transition>
		</div>
	</div>
</template>

<script>
import TitleStatic from '../../layout/TitleStatic.vue';
import TopNav from '../../layout/TopNav.vue';
import Options from '../../layout/Options.vue';
import ShowTheNumber from './ShowTheNumber.vue';
import YouCount from './YouCount.vue';
import ComputerCount from './ComputerCount.vue';
import Addition0To100 from './Addition0To100.vue';
import AnyAddition from './AnyAddition.vue';
import Subtraction100To0 from './Subtraction100To0.vue';
import AnySubtraction from './AnySubtraction.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		appShowTheNumber: ShowTheNumber,
		appYouCount: YouCount,
		appComputerCount: ComputerCount,
		appAddition0To100: Addition0To100,
		appAnyAddition: AnyAddition,
		appSubtraction100To0: Subtraction100To0,
		appAnySubtraction: AnySubtraction
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Show the number'},
				{id: 2, title: 'You count'},
				{id: 3, title: 'Computer counts'},
				{id: 4, title: 'Addition 0 to 100'},
				{id: 5, title: 'Any addition'},
				{id: 6, title: 'Subtraction 100 to 0'},
				{id: 7, title: 'Any subtraction'},
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
