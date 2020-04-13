<template>
    <div>
        <div v-if="selectedOption===-1">
            <app-title-static>Doctor Dart</app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>
        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Doctor Dart</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-play-a-game v-if="selectedOption === 1"></app-play-a-game>
            </transition>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-design-your-own v-if="selectedOption === 2"></app-design-your-own>
            </transition>
        </div>

    </div>
</template>

<script>
    import TitleStatic from '../../layout/TitleStatic.vue';
    import TopNav from '../../layout/TopNav.vue';
    import Options from '../../layout/Options.vue';
    import PlayAGame from './PlayAGame';
    import DesignYourOwn from './DesignYourOwn';
    import 'bootstrap/dist/css/bootstrap.min.css';

    export default {
        components: {
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appPlayAGame: PlayAGame,
            appDesignYourOwn: DesignYourOwn,
        },
        data: function() {
            return {
                options: [
                    {id: 1, title: 'Play one game'},
                    {id: 2, title: 'Design your own'}
                ],
                selectedOption: -1
            }
        }
    }
</script>

<style>
</style>
