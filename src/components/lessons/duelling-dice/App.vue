<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Duelling Dice
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Duelling Dice</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-demonstration :gameRule="gameRule" v-if="selectedOption === 1"></app-demonstration>
                <app-many-trials :gameRule="gameRule" v-else-if="selectedOption === 2"></app-many-trials>
                <app-change-the-dice-faces :gameRule="gameRule" v-else-if="selectedOption === 3"></app-change-the-dice-faces>
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
    import Demonstration from './Demonstration.vue';
    import ManyTrials from './ManyTrials.vue';
    import ChangeTheDiceFaces from './ChangeTheDiceFaces.vue';
    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appDemonstration: Demonstration,
            appManyTrials: ManyTrials,
            appChangeTheDiceFaces: ChangeTheDiceFaces,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Demonstration' },
                    { id: 2, title: 'Many trials' },
                    { id: 3, title: 'Change the dice faces' },
                ],
                selectedOption: -1,
                gameRule: {
                    redDiceFace: [0, 0, 1, 7, 8, 8, 9],
                    blueDiceFace: [0, 5, 5, 6, 6, 7, 7],
                    greenDiceFace: [0, 1, 2, 3, 9, 10, 11],
                    blackDiceFace: [0, 3, 4, 4, 5, 11, 12],
                    diceFaces: 6,
                }
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
