<template>
  <div>
    <div v-if="selectedOption === -1">
			<app-title-static>
				Angle Estimation
			</app-title-static>
			<transition appear appear-class="options-appear" appear-active-class="options-appear-active">
				<app-options :options="options" @selectOption="selectedOption=$event"></app-options>
			</transition>
		</div>

    <div class="container-fluid" v-else>
			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-top-nav @backToMenu="selectedOption = $event">Angle Estimation</app-top-nav>
			</transition>

			<transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
				<app-angle-est-5-to-90 v-if="selectedOption === 1"></app-angle-est-5-to-90>
        <app-angle-est-5-to-360 v-if="selectedOption === 2"></app-angle-est-5-to-360>
        <app-draw-angle-5-to-90 v-if="selectedOption === 3"></app-draw-angle-5-to-90>
        <app-draw-angle-5-to-360 v-if="selectedOption === 4"></app-draw-angle-5-to-360>
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
import AngleEst5To90 from './AngleEst5To90.vue';
import AngleEst5To360 from './AngleEst5To360.vue';
import DrawAngle5to90 from './DrawAngle5To90.vue';
import DrawAngle5to360 from './DrawAngle5To360.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  components: {
		// appTitle: Title,
		appTitleStatic: TitleStatic,
		appTopNav: TopNav,
		appOptions: Options,
    // appBottomNav: BottomNav,
    appAngleEst5To90: AngleEst5To90,
    appAngleEst5To360: AngleEst5To360,
    appDrawAngle5To90: DrawAngle5to90,
    appDrawAngle5To360: DrawAngle5to360
  },
  data: function() {
    return {
      options: [
        {id: 1, title: 'Angle estimation (5 to 90 degrees)'},
        {id: 2, title: 'Angle estimation (5 to 360 degrees)'},
        {id: 3, title: 'Draw an angle (5 to 90 degrees)'},
        {id: 4, title: 'Draw an angle (5 to 360 degrees)'}
      ],
      selectedOption: -1
    }
  }
}
</script>

<style>
</style>
