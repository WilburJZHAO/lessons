<template>
  <transition appear appear-class="options-appear" appear-active-class="options-appear-active">
    <div class="container app--link-list">
      <div class="app--link-item" v-for="lesson in sortedLessons" :key="lesson.name">
        <router-link :to="lesson.link" class="btn btn-outline-success">{{ lesson.name }}</router-link>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data: function() {
    return {
      // Add a lesson object with name and link properties whenever a new lesson is created
      lessons: [
        { name: "Radioactivity", link: "/radioactivity" },
        { name: "Garden Beds", link: "/garden-beds" },
        { name: "Same or Different", link: "/same-or-different" },
        { name: "Tackling Times Tables", link: "/times-tables" },
        { name: "Trigonometry Walk", link: "/trigonometry" },
        { name: "Truth Tiles 1", link: "/truth-tiles-1" },
        { name: "Truth Tiles 2", link: "/truth-tiles-2" },
        { name: "Take Away Tiles", link: "/take-away-tiles" },
        { name: "Steps", link: "/steps" },
        { name: "Number Tiles", link: "/number-tiles" },
        { name: "Chess Queens", link: "/chess-queens" },
        { name: "Eight Queens", link: "/eight-queens" },
        { name: "Crosses", link: "/crosses" },
        { name: "Angle Estimation", link: "/angle-estimation" },
        { name: "Area of a Triangle", link: "/area-of-triangle" },
        { name: "Biggest Volume", link: "/biggest-volume" },
        { name: "Ice Cream Flavours", link: "/ice-cream-flavours" },
        { name: "Chances with Crosses", link: "/chances-with-crosses" },
        { name: "Fays' Nines", link: "/fays-nines" },
        { name: "Magic Squares", link: "/magic-squares" },
        { name: "Make a Million", link: "/make-a-million" },
        { name: "Sporting Finals (NRL)", link: "/sporting-finals-NRL" },
        { name: "Sporting Finals (AFL)", link: "/sporting-finals-AFL" },
        { name: "Dice Basketball", link: "/dice-basketball" },
        { name: "Dice Footy (AFL)", link: "/dice-footy" },
        { name: "Counter Escape", link: "/counter-escape" },
        { name: "Building Views", link: "/building-views" },
        { name: "Problem Dice", link: "/problem-dice" },
        { name: "Crazy Animals", link: "/crazy-animals" },
        { name: "Cat and Mouse", link: "/cat-and-mouse" },
        { name: "Dice Cricket", link: "/dice-cricket" },
        { name: "Have a Hexagon", link: "/have-a-hexagon" },
        { name: "Walk the Plank", link: "/walk-the-plank" },
        { name: "Nine and Over", link: "/nine-and-over" },
        { name: "What's It Worth?", link: "/whats-it-worth" },
        { name: "Doctor Dart", link: "/doctor-dart" },
        { name: "Dice Differences", link: "/dice-differences" },
        { name: "2 Litre Balloon", link: "/balloon" },
        { name: "Number Charts", link: "/number-charts" },
        { name: "Rectangle Fractions", link: "/rectangle-fractions" },
        { name: "Game Show", link: "/game-show" },
        { name: "Goldbach's Conjecture", link: "/goldbachs-conjecture" },
        { name: "Addo", link: "/addo" },
        { name: "Birth Month Paradox", link: "/birth-month-paradox" },
        { name: "Algebra Charts", link: "/algebra-charts" },
        { name: "Multo", link: "/multo" },
        { name: "Bob's Buttons", link: "/bobs-buttons" },
        { name: "Duelling Dice", link: "/duelling-dice" },
        { name: "Fraction Charts", link: "/fraction-charts" },
        { name: "Natalie's LCM Task", link: "/lcm" },
        { name: "Hunting for Stars", link: "/hunting-stars" },
        { name: "Cracked Tiles", link: "/cracked-tiles" },
        { name: "Billiard Ball Bounces", link: "/billiard-ball" },
        { name: "Palindromes", link: "/palindromes" },
        { name: "Chocolate Chip Cookies", link: "/chocolate-chip-cookies" },
        { name: "Beetle Game", link: "/beetle-game" },
        { name: "Chart Strategies", link: "/chart-strategies" },
        { name: "Goods and Bads", link: "/goods-and-bads" },
        { name: "Simple, Elegant, Elusive", link: "/simple-elegant-elusive" },
        { name: "Odds and Evens", link: "/odds-and-evens" },
        { name: "Number Partitions", link: "/number-partitions" },
        { name: "Cylinder Volumes", link: "/cylinder-volumes" },
        { name: "First Down the Mountain", link: "/first-down-mountain" },
        { name: "Heads and Legs", link: "/heads-and-legs" },
        { name: "Cars in a Garage", link: "/cars-in-a-garage" },
        { name: "What's My Rule?", link: "/whats-my-rule" },
        { name: "Fraction Estimation", link: "/fraction-estimation" },
        { name: "Fractions to Decimals", link: "/fractions-to-decimals" },
        { name: "Maths of Lotto", link: "/maths-of-lotto" },
        { name: "Protons & Anti-Protons", link: "/protons" },
        { name: "Game of 31", link: "/game-of-31" },
        { name: "Win at the Fair", link: "/win-at-the-fair" },
        { name: "Snakes and Ladders", link: "/snakes-and-ladders" },
        { name: "Square Pairs", link: "/square-pairs" },
        { name: "Temperature Graphs", link: "/temperature-graphs" },
        { name: "Greedy Pig", link: "/greedy-pig" }
      ]
    };
  },
  computed: {
    sortedLessons: function() {
      // Sort lessons on alphabetical order
      const sorted = this.lessons.slice().sort(function(l1, l2) {
        if (l1.name.toLowerCase() <= l2.name.toLowerCase()) return -1;
        else return 1;
      });
      return sorted;
    }
  }
};
</script>

<style scoped>
.app--link-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  gap: 1.5rem;
}
.app--link-item a {
  display: block;
}

.options-appear {
  opacity: 0;
}
.options-appear-active {
  transition: all 1s;
  transition-delay: 0.7s;
}
</style>
