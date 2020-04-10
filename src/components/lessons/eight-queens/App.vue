<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Eight Queens
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Eight Queens</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-play-eight-queens v-if="selectedOption === 1"></app-play-eight-queens>
                <app-marching-queens v-if="selectedOption === 2"></app-marching-queens>
                <app-fast-computer-search v-if="selectedOption === 3"></app-fast-computer-search>
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
    import PlayEightQueens from "./PlayEightQueens";
    import FastComputerSearch from "./FastComputerSearch";
    import MarchingQueens from "./MarchingQueens";


    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appPlayEightQueens: PlayEightQueens,
            appMarchingQueens: MarchingQueens,
            appFastComputerSearch:FastComputerSearch

        },
        data: function() {
            return {
                options: [
                    { id: 1, title: "Play 'Eight Queens'" },
                    { id: 2,title:'Marching queens'},
                    { id: 3,title:"Fast computer search"}

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
