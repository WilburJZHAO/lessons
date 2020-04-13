<template>
	<div>
		<div class="container mt-4 mb-4" style="max-width: 700px;">
			<h3 class="lesson-subheading">Make your own</h3>
			<hr class="subheading-separator">
			<div class="row">
				<div class="col-12 mb-5">
					<h5 class="text-success text-center mb-2">Drag the number tiles to make a magic square</h5>
					<app-select-size @selectSize="selectedSize=$event"></app-select-size>
					<app-square :size="selectedSize"></app-square>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Square from './Square.vue';
import SelectSize from './SelectSize.vue';
export default {
	components: {
		appSquare: Square,
		appSelectSize: SelectSize
	},
	data: function() {
		return {
			selectedSize: '3'
		};
	}
}
</script>

<style scoped>

</style>
