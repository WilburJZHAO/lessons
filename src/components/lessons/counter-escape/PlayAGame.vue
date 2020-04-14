<template>
	<div class="mt-3">
		<h3 class="lesson-subheading">Which arrangement is the best?</h3>
		<hr class="subheading-separator">
		<app-play-game :gameRule="gameRule" :numberOfGames="1"></app-play-game>
	</div>
</template>

<script>
import PlayGame from './PlayGame.vue';
export default {
	props: ['gameRule'],
	components: {
		appPlayGame: PlayGame
	}
}
</script>

<style scoped>
</style>
