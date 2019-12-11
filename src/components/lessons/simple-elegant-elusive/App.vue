<template>
    <div>
        <div v-if="selectedOption === -1">
            <app-title-static>
                Simple Elegant Elusive
            </app-title-static>
            <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
                <app-options :options="options" @selectOption="selectedOption=$event"></app-options>
            </transition>
        </div>
        <div class="container-fluid" v-else>
            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-top-nav @backToMenu="selectedOption = $event">Simple Elegant Elusive</app-top-nav>
            </transition>

            <transition appear appear-class="lesson-appear" appear-active-class="lesson-appear-active">
                <app-simple-elegant-elusive v-if="selectedOption === 1"></app-simple-elegant-elusive>
            </transition>
        </div>
    </div>
</template>

<script>
    import TitleStatic from '../../layout/TitleStatic.vue';
    import TopNav from '../../layout/TopNav.vue';
    import Options from '../../layout/Options.vue';
    import SimpleElegantElusive from './SimpleElegantElusive.vue'

    export default {
        components: {
            appTitleStatic: TitleStatic,
            appTopNav: TopNav,
            appOptions: Options,
            appSimpleElegantElusive: SimpleElegantElusive,
        },
        data: function() {
            return {
                options: [
                    { id: 1, title: 'Simple, Elegant, Elusive' },
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
