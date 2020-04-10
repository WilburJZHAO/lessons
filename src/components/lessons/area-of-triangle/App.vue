<template>
	<div>
		<div v-if="selectedOption===-1">
			<app-title-static>Area of a Triangle</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>
		<div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Area of a Triangle</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-area-of-triangle v-if="selectedOption === 1"></app-area-of-triangle>
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
import AreaOfTriangle from './AreaOfTriangle.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
	components: {
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
		// appBottomNav: BottomNav,
		appAreaOfTriangle: AreaOfTriangle
	},
	data: function() {
		return {
			options: [
				{id: 1, title: 'Area of a Triangle'}
			],
			selectedOption: -1
		}
	}
}
</script>

<style scoped>
/* .container-fluid {
	padding: 0;
}
.lesson-appear {
	opacity: 0;
}
.lesson-appear-active {
	transition: all .5s;
}
.options-appear {
	opacity: 0;
}
.options-appear-active {
	transition: all 1s;
	transition-delay: .7s;
}
.app--lesson-action {
	display: flex;
	justify-content: space-around;
	padding: 1.5rem 1rem;
}

#app-canvas {
	width: 100%;
	border: 1px solid #eee;
}
@media only screen and (max-width: 768px) {
	.display-4 {
		font-size: 2.5rem;
	}
	.tt--left form {
		width: 100%;
	}
}
@media only screen and (max-width: 576px) {
	.display-4 {
		font-size: 2rem;
	}
}
@media only screen and (max-width: 425px) {
	.display-4 {
		font-size: 1.8rem;
	}
} */
</style>
