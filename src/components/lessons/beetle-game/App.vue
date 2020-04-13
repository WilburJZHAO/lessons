<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Beetle Game
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Beetle Game</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-make-a-beetle v-if="selectedOption === 1"></app-make-a-beetle>
                <app-make-many-beetles v-else-if="selectedOption === 2"></app-make-many-beetles>
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
    import MakeABeetle from './MakeABeetle.vue';
    import MakeManyBeetles from './MakeManyBeetlesApp.vue';
    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appMakeABeetle: MakeABeetle,
            appMakeManyBeetles: MakeManyBeetles,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Make a beetle' },
                    { id: 2, title: 'Make many beetles' },
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
