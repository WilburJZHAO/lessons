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
       { name: "Addo", link: "/addo" },
        { name: "Algebra Charts", link: "/algebra-charts" },
        { name: "Angle Estimation", link: "/angle-estimation" },
        { name: "Area Of Triangle", link: "/area-of-triangle" },
        { name: "Billard Ball Bounces", link: "/billard-ball" },
        { name: "Biggest Volume", link: "/biggest-volume" },
        { name: "Birth Month Paradox", link: "/birth-month-paradox" },
        { name: "Bobs Button", link: "/bobs-button" },
        { name: "Building Views", link: "/building-views" },
        { name: "Cat and mouse", link: "/cat-and-mouse" },
        { name: "Chances With Crosses", link: "/chances-with-crosses" },
        { name: "Charts Strategies", link: "/charts-strategies" },
        { name: "Counter Escape", link: "/counter-escape" },
        { name: "Cracked Tiles", link: "/cracked-tiles" },
        { name: "Crazy Animals", link: "/crazy-animals" },
        { name: "Chess Queens", link: "/chess-queens" },
        { name: "Chocolate Chip Cookies", link: "/chocolate-chip-cookies" },
        { name: "Counter Escape", link: "/counter-escape" },
        { name: "Crosses", link: "/crosses" },
        { name: "Dice Basketball", link: "/dice-basketball" },
        { name: "Dice Differences", link: "/dice-differences" },
        { name: "Dice Footy", link: "/dice-footy" },
        { name: "Duelling Dice", link: "/duelling-dice" },
        { name: "Eight Queens", link: "/eight-queens" },
        { name: "Fays' Nines", link: "/fays-nines" },
        { name: "Fraction Charts", link: "/fraction-charts" },
        { name: "Garden Beds", link: "/garden-beds" },
        { name: "Game Show", link: "/game-show" },
        { name: "Goldbach's Conjecture", link: "/goldbachs-conjecture" },
        { name: "Goods And Bads", link: "/goods-and-bads" },
        { name: "Have A Hexagon", link: "/have-a-hexagon" },
        { name: "Hunting For Stars", link: "/hunting-stars" },
        { name: "Ice Cream Flavours", link: "/ice-cream-flavours" },
        { name: "LCM: Natalie's Task", link: "/lcm" },
        { name: "Magic Squares", link: "/magic-squares" },
        { name: "Make A Million", link: "/make-a-million" },
        { name: "Multo", link: "/multo" },
        { name: "Nine And Over", link: "/nine-and-over" },
        { name: "Number Charts", link: "/number-charts" },
        { name: "Number Partitions", link: "/number-partitions" },
        { name: "Number Tiles", link: "/number-tiles" },
        { name: "Odds and Evens", link: "/odds-and-evens" },
        { name: "Palindromes", link: "/palindromes" },
        { name: "Radioactivity", link: "/radioactivity" },
        { name: "Rectangle Fraction", link: "/rectangle-fraction" },
        { name: "Same or Different", link: "/same-or-different" },
        { name: "Simple Elegant Elusive", link: "/simple-elegant-elusive" },
        { name: "Sporting Finals(NRL)", link: "/sporting-finals-NRL" },
        { name: "Sporting Finals(AFL)", link: "/sporting-finals-AFL" },
        { name: "Steps", link: "/steps" },
        { name: "Tackling Times Tables", link: "/times-tables" },
        { name: "Take Away Tiles", link: "/take-away-tiles" },
        { name: "Trigonometry Walking", link: "/trigonometry" },
        { name: "Truth Tiles 1", link: "/truth-tiles-1" },
        { name: "Truth Tiles 2", link: "/truth-tiles-2" },
        { name: "Problem Dice", link: "/problem-dice" },
        { name: "What's It Worth", link: "/whats-it-worth" },
        { name: "2 Litre Balloon", link: "/ballon" }, 
        { name: "First Down the Mountain", link: "/first-down-to-mountain" },
        { name: "Cars In A Garage", link: "/cars-in-a-garage" },
        { name: "Doctor Dart", link: "/doctor-dart" },
        { name: "Heads and Legs", link: "/heads-and-legs" },
        { name: "Cylinder Volumes", link: "/cylinder-volumes" }
      ]
    };
  },
  computed: {
    sortedLessons: function() {
      // Sort lessons on alphabetical order
      const sorted = this.lessons.slice().sort(function(l1, l2) {
        if (l1.name <= l2.name) return -1;
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
