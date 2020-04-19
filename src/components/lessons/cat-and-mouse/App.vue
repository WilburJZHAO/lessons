<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Cat and Mouse</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Cat and Mouse</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-play-a-game
					v-if="selectedOption === 1"
					:rule="currentRule"
					:currentGameboardIndex="currentGameboardIndex"
					@nextGameboard="currentGameboardIndex=$event"
				></app-play-a-game>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-play-many-games
					v-if="selectedOption === 2"
					:rule="currentRule"
					:currentGameboardIndex="currentGameboardIndex"
					@nextGameboard="currentGameboardIndex=$event"
				></app-play-many-games>
			</transition>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-change-rules
					v-if="selectedOption === 3"
					:currentRule="currentRule"
					:currentGameboardIndex="currentGameboardIndex"
					@changeRule="currentRule = $event"
					@nextGameboard="currentGameboardIndex=$event"
					@backToMenu="selectedOption = $event"
				>
				</app-change-rules>
			</transition>
		</div>
	</div>
</template>

<script>
import TitleStatic from '../../layout/TitleStatic.vue';
import TopNav from '../../layout/TopNav.vue';
import Options from '../../layout/Options.vue';
import PlayAGame from './PlayAGame.vue';
import PlayManyGames from './PlayManyGames.vue';
import ChangeRules from './ChangeRules.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		appPlayAGame: PlayAGame,
		appPlayManyGames: PlayManyGames,
		appChangeRules: ChangeRules
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Play a game'},
				{id: 2, title: 'Play many games'},
				{id: 3, title: 'Change the rules'},
			],
			selectedOption: -1,
			currentGameboardIndex: 0,
			currentRule: {
				type: 'dice',
				moveLeft: [1, 3, 5]
			}
		}
	}
}
</script>

<style>
</style>
