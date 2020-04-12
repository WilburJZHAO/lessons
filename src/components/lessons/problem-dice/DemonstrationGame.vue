<template>
	<div class="mt-3">
		<h3 class="lesson-subheading">Demonstration game</h3>
		<hr class="subheading-separator">
		<app-game :gameType="1"></app-game>
	</div>
</template>

<script>
import Game from './Game.vue';

export default {
	components: {
		appGame: Game
	},
}
</script>

<style scoped>

</style>
