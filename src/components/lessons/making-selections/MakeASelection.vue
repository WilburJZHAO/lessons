<template>
  <div class="container-fluid mt-3">
    <h3 class="lesson-subheading">Make a selection</h3>
    <hr class="subheading-speartor" />
    <app-game-rule :rule="rule"></app-game-rule>
    <div class="mb-4"></div>
    <div class="app--container">
      <app-game-stat :game="game" :win="win" :lose="lose"></app-game-stat>
    </div>
    <div class="app--cards-container">
      <div class="mt-4 d-flex justify-content-center">
        <div
          v-for="(num, index) in allCards"
          :key="`card${index}`"
          style="float: left; margin: 2px;"
          :style="{visibility: num===null ? 'hidden' : 'visible'}"
          class="app--card-img"
          :data-card="num"
        >
          <img :src="require(`@/assets/making-selections/back.jpg`)" alt="card" class="img-fluid" />
        </div>
      </div>
      <div
        class="container bg-success app--green-rect my-2 d-flex justify-content-center align-items-center"
        id="greenRect"
      >
        <div
          v-for="(card, index) in drawnCards"
          :key="`drawn${index}`"
          class="mx-1"
          style="border: 1px solid #333;"
        >
          <img
            :src=" status===2  ? require(`@/assets/making-selections/S${card}.jpg`) : require(`@/assets/making-selections/back.jpg`)"
            alt="card"
            class="img-fluid"
          />
        </div>
      </div>
      <div v-if="status ===0" class="text-center text-danger">
        Drag {{ rule.clinicPlayers }} card{{
        rule.clinicPlayers > 1 ? "s" : ""
        }}
        to the green rectangle
      </div>
      <div v-if="status === 1" class="text-center mt-4">
        <button class="btn btn-outline-success" @click="handleFlipCards">Reveal cards</button>
      </div>
      <div v-if="status === 2" class="text-center mt-4">
        <button class="btn btn-outline-dark" @click="handleReset">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import interact from "interactjs";
import { pickNumber } from "../../common/utils";
import { checkResult } from "./utils";
import GameRule from "./GameRule.vue";
import GameStat from "./GameStat.vue";

export default {
  components: {
    appGameRule: GameRule,
    appGameStat: GameStat
  },
  props: ["rule"],
  data: function() {
    return {
      game: 0,
      win: 0,
      lose: 0,
      drawnCards: [],
      status: 0, // 0 - to select cards, 1 - to flip cards, 2 - Reset
      allCards: [],
      selectedCard: null
    };
  },
  computed: {},
  watch: {
    status(value, prevValue) {
      if (prevValue === 0 && value === 1) {
        this.unsetImageDraggable();
      }
      if (value === 0 && prevValue === 2) {
        this.setImageDraggable();
      }
    }
  },
  methods: {
    handleFlipCards() {
      this.status = 2;
      this.game++;
      const result = checkResult(
        this.drawnCards,
        this.rule.winningCards,
        this.rule.allToWin
      );
      if (result) {
        this.win++;
      } else {
        this.lose++;
      }
    },
    handleReset() {
      this.allCards = [];
      this.status = 0;
      this.drawnCards = [];
      this.selectedCard = null;
      for (let i = 1; i <= this.rule.teamPlayers; i++) {
        this.allCards.push(i);
      }
    },
    drawOneCard() {
      let drawnCard;
      do {
        drawnCard = pickNumber(1, this.rule.teamPlayers);
      } while (this.drawnCards.indexOf(drawnCard) !== -1);
      return drawnCard;
    },

    /** Set up image drag and drop */
    setImageDraggable() {
      interact(".app--card-img").draggable({
        inertia: false,
        modifiers: [
          interact.modifiers.restrict({
            restriction: ".app--cards-container",
            endOnly: true
          })
        ],
        autoScroll: true,
        onstart: this.handleOnImageDragStart,
        onmove: this.handleOnImageDragMove,
        onend: this.handleOnImageDragEnd
      });
    },
    handleOnImageDragStart(e) {
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.target.classList.add("app--card-img-dragging");
      this.selectedCard = e.target.getAttribute("data-card");
    },
    handleOnImageDragMove(e) {
      let { target } = e;
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute("data-x")) || 0) + e.dx;
      var y = (parseFloat(target.getAttribute("data-y")) || 0) + e.dy;
      target.style.webkitTransform = target.style.transform =
        "translate(" + x + "px, " + y + "px)";
      // update the posiion attributes
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    handleOnImageDragEnd(e) {
      e.target.style.webkitTransform = e.target.style.transform =
        "translate(0, 0)";
      e.target.removeAttribute("data-x");
      e.target.removeAttribute("data-y");
      e.target.classList.remove("app--card-img-dragging");
    },
    unsetImageDraggable() {
      interact(".app--card-img").unset();
    },

    /** Set up drop zone */
    setDropzone() {
      interact("#greenRect").dropzone({
        accept: ".app--card-img-dragging",
        overlap: 0.5,
        ondrop: this.handleOnCardDrop
      });
    },
    unsetDropzone() {
      interact("#greenRect").unset();
    },
    handleOnCardDrop() {
      this.allCards[this.selectedCard - 1] = null;
      this.allCards = [...this.allCards];
      this.drawnCards.push(this.drawOneCard());
      if (this.drawnCards.length >= this.rule.clinicPlayers) {
        this.status = 1;
      }
    }
  },
  created() {
    const cardsNum = this.rule.teamPlayers;
    for (let i = 1; i <= cardsNum; i++) {
      this.allCards.push(i);
    }
  },
  mounted() {
    this.setImageDraggable();
    this.setDropzone();
  },
  destroyed() {
    this.unsetImageDraggable();
    this.unsetDropzone();
  }
};
</script>

<style scoped>
.app--container {
  max-width: 500px;
  margin: 0 auto;
}
.app--card-img {
  touch-action: none;
}
.app--green-rect {
  width: 100%;
  height: 160px;
}
</style>
