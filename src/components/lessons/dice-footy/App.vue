<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Dice Footy (AFL)</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Dice Footy (AFL)</app-top-nav> 
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-play-a-game v-if="selectedOption === 1"></app-play-a-game>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-play-many-games v-if="selectedOption === 2"></app-play-many-games>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-goal-distribution v-if="selectedOption === 3"></app-goal-distribution>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-point-distribution v-if="selectedOption === 4"></app-point-distribution>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-chance-of-draw v-if="selectedOption === 5"></app-chance-of-draw>
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
import PlayAGame from './PlayAGame.vue';
import PlayManyGames from './PlayManyGames.vue';
import GoalDistribution from './GoalDistribution.vue';
import PointDistribution from './PointDistribution.vue';
import ChanceOfDraw from './ChanceOfDraw.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		// appBottomNav: BottomNav,
		appPlayManyGames: PlayManyGames,
		appGoalDistribution: GoalDistribution,
		appPointDistribution: PointDistribution,
		appChanceOfDraw: ChanceOfDraw,
		appPlayAGame: PlayAGame,
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Play a game of football'},
				{id: 2, title: 'Play many games'},
				{id: 3, title: 'Goal distribution'},
				{id: 4, title: 'Point distribution'},
				{id: 5, title: 'Chance of a draw'}
			],
			selectedOption: -1
		}
	}
}
</script>

<style>
</style>
