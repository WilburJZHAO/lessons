<template>
	<div>
			<div v-if="selectedOption === -1">
				<app-title-static>
					Tackling Times Tables
				</app-title-static>
				<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
					<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
				</transition>
			</div>

			<div class="container-fluid" v-else>
				<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
					<app-top-nav @backToMenu="selectedOption = $event">Tackling Times Tables</app-top-nav>
				</transition>

				<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
					<app-how-many-rows v-if="selectedOption === 1"></app-how-many-rows>
					<app-how-many-buttons v-else-if="selectedOption === 2"></app-how-many-buttons>
					<app-all-solutions v-else-if="selectedOption === 3"></app-all-solutions>
				</transition>
			</div>
		<!-- <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
			<app-bottom-nav></app-bottom-nav>
		</transition>
    -->
	</div>
</template>

<script>
	// import Title from '../../layout/Title.vue';
	import TitleStatic from '../../layout/TitleStatic.vue';
	import TopNav from '../../layout/TopNav.vue';
	import Options from '../../layout/Options.vue';
	import HowManyRows from './HowManyRows.vue';
	import HowManyButtons from './HowManyButtons.vue';
	import AllSolutions from './AllSolutions.vue';

	export default {
		components: {
			// appTitle: Title,
			appTitleStatic: TitleStatic,
			appTopNav: TopNav,
			appOptions: Options,
			// appBottomNav: BottomNav,
			appHowManyRows: HowManyRows,
			appHowManyButtons: HowManyButtons,
			appAllSolutions: AllSolutions
		},
		data: function() {
			return {
				options: [
					{ id: 1, title: 'How many rows?' },
					{ id: 2, title: 'How many buttons?' },
					{ id: 3, title: 'Can you find all solutions?'}
				],
				selectedOption: -1,
			}
		}
	}
</script>

<style>
.tt--right-box {
	margin-bottom: 3rem;
}
.tt--right-row {
	display: flex;
}


</style>
