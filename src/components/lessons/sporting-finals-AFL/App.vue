<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Sporting Finals (AFL)
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>

        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Sporting Finals (AFL)</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-enter-teams v-if="selectedOption === 1"></app-enter-teams>
                <app-play-finals v-else-if="selectedOption === 2"></app-play-finals>
                <app-play-many-finals v-else-if="selectedOption === 3"></app-play-many-finals>
                <app-percentage-advantage v-else-if="selectedOption === 4"></app-percentage-advantage>
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
    import EnterTeams from "./EnterTeams";
    import PercentageAdvantage from "./PercentageAdvantage";
    import PlayManyFinals from "./PlayManyFinals";
    import PlayFinals from "./PlayFinals";

    export default {
        components: {
            // appTitle: Title,
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            // appBottomNav: BottomNav,
            appEnterTeams: EnterTeams,
            appPercentageAdvantage: PercentageAdvantage,
            appPlayManyFinals: PlayManyFinals,
            appPlayFinals:PlayFinals,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Enter teams and select final eight' },
                    { id: 2, title: 'Play finals' },
                    { id: 3, title: 'Play many finals'},
                    { id :4, title:'Percentage advantage'}
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
