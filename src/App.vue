<template>
  <div id="app">
    <app-title v-if="$route.name === 'Home'">Find Your Lesson</app-title>
    <router-view></router-view>
    <app-bottom-nav></app-bottom-nav>
  </div>
</template>

<script>
import BottomNav from "./components/layout/BottomNav.vue";
import Title from "./components/layout/Title.vue";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  data: function() {
    return {
      title: "Title"
    };
  },
  components: {
    appTitle: Title,
    appBottomNav: BottomNav
  }
};
</script>


<style>
/** Global styling is put here... */
/**
  light green: #77BD43
	dark green: #43494B
  Break point: 576px - 768px - 992px - 1200px
*/

@font-face {
    font-family: 'Primer';
    src: url('assets/fonts/Primer.ttf');
}
@font-face {
    font-family: 'Primer-bold';
    src: url('assets/fonts/Primer-bold.ttf');
}

.lesson-subheading {
  color: rgba(20, 130, 115, 1);
  margin-bottom: 1rem;
  font-size: 2em;
  text-align: center;
  font-family: Primer, monospace;
}

.subheading-separator {
  border: 1px solid rgba(150, 150, 150, 0.2);
  margin-bottom: 1.5rem;
}

.container-fluid {
  padding: 0;
  margin-bottom: 5rem;
}
.container {
  margin-bottom: 5rem;
}
.app--link-list {
  margin-bottom: 5rem;
}
div.form-check label {
  cursor: pointer;
}

.lesson-appear {
  opacity: 0;
}
.lesson-appear-active {
  transition: all 0.5s;
}
.options-appear {
  opacity: 0;
}
.options-appear-active {
  transition: all 1s;
  /* transition-delay: .7s; */
}

.app--lesson-action {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 1rem;
}

.app--lesson-left {
  display: flex;
  justify-content: space-between;
}

.app--lesson-right {
  display: flex;
  height: auto;
  overflow-y: auto;
  margin-bottom: 3rem;
}
table {
  table-layout: fixed;
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
  .hand-icon {
    display: none;
  }
}
</style>
