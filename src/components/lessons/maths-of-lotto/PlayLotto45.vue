<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play 45:6 lotto</h3>
    <hr class="subheading-separator">
    <div class="row">
      <div class="col-md-6">
        <!-- Selection area -->
        <div class="app--selection-area-box">
          <div class="app--selection-area">
            <div
              v-for="(el, index) in lottoNumbers"
              :key="index"
              @click="handleSelectNumber(el.number)"
            >
              <div
                class="app--selection-number"
                :class="el.selected ? 'app--selection-number-selected' : ''"
              >{{ el.number }}</div>
              <br v-if="el.number%8===0" style="clear:both" />
            </div>
          </div>
          <div
            class="text-center app--selection-message my-2"
            :style="{
              visibility: status === 0 || status === 1 ? 'visible' : 'hidden'
            }"
          >
            <span v-if="selectedNumbers.length < STANDARD_NUMBERS_TO_DRAW">
              Select {{ STANDARD_NUMBERS_TO_DRAW - selectedNumbers.length }}
              <span
                v-if="selectedNumbers.length > 0"
              >more</span> numbers
            </span>
            <span v-if="selectedNumbers.length === STANDARD_NUMBERS_TO_DRAW">Single game</span>
            <span
              v-if="selectedNumbers.length > STANDARD_NUMBERS_TO_DRAW"
            >System {{ selectedNumbers.length }}</span>
            <br />
            <span :style="{ visibility: status === 1 ? 'visible' : 'hidden' }">
              Play {{ lottoGames.length }} game{{
              lottoGames.length > 1 ? "s" : ""
              }}
              each week
            </span>
          </div>
          <div class="d-flex justify-content-around" v-if="status === 0 || status === 1">
            <button class="btn btn-outline-dark" @click="handleSlik">Slik 100</button>
            <button
              class="btn btn-outline-success"
              @click="handleAddPick"
              :disabled="selectedNumbers.length < STANDARD_NUMBERS_TO_DRAW"
            >Add pick</button>
          </div>
        </div>

        <!-- Lotto games & winners-->
        <div class="app--lotto-and-winner mt-3 d-flex">
          <div class="app--lotto-games mr-2" style="width: 50%;">
            <h6 class="text-primary text-center">Lotto Games</h6>
            <ul class="list-group" style="max-height: 400px; overflow: auto;">
              <li class="list-group-item" v-for="(item, gameIndex) in lottoGames" :key="gameIndex">
                <span v-for="(number, index) in item" :key="'num'+index">
                  <span
                    :class="{ 'text-danger': number.win, 'text-primary': number.winSupp }"
                  >{{ number.num }}</span>
                  <span v-if="index < item.length-1">,</span>
                </span>
              </li>
            </ul>
            <div class="text-center mt-3" v-if="status === 1">
              <button class="btn btn-outline-dark" @click="handleClear">Clear</button>
            </div>
          </div>
          <div class="app--winners" style="width: 50%;">
            <div v-if="status===2">
              <h6 class="text-primary text-center">Winners</h6>
              <ul class="list-group" style="max-height: 400px; overflow: auto;">
                <li
                  class="list-group-item"
                  v-for="(item, index) in winners"
                  :key="index"
                >{{ item.join(", ") }}</li>
              </ul>
            </div>
            <div v-else class="pl-2">
              <p>Click on the "Slik 100" button to randomly select 100 games.</p>
              <p>To select individual games click on the pink numbers</p>
              <p>After 6 numbers are selected you can add that game</p>
              <p>For 7 to 10 selections "System 7-10" is added</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <button class="btn btn-outline-dark mb-2" @click="handleToggleShowRule">
          <i class="fas fa-exclamation-circle"></i>
        </button>
        <div v-if="showRule">
          <p>45:6 Lotto is played every Saturday night</p>
          <p>There are five prizes</p>
          <p>Div 1: 6 numbers ($752,604.40)</p>
          <p>Div 2: 5 numbers plus 1 supplementary number ($14111.30)</p>
          <p>Div 3: 5 numbers ($1,440.80)</p>
          <p>Div 4: 4 numbers ($49.80)</p>
          <p>Div 5: 3 numbers plus 1 supplementary number($32.60)</p>
          <p>The cost of each game is $0.60</p>
          <p>Prize amounts approximate average payouts.</p>
        </div>
        <div v-if="status === 2">
          <table class="table table-striped table-bordered">
            <!-- Division and prize table -->
            <thead>
              <tr>
                <th>Div</th>
                <th>Prize</th>
                <th>Wins</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in divisionTable" :key="index">
                <td>{{ item.div }}</td>
                <td>&dollar; {{ separateFloating(item.prize) }}</td>
                <td>
                  <span v-if="item.wins>0">{{ item.wins }}</span>
                </td>
                <td>
                  <span v-if="item.amount>0">&dollar; {{ separateFloating(item.amount) }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="status === 2">
          <table class="table table-bordered" style="table-layout: fixed;">
            <tr>
              <th>Draw Date</th>
              <td class="text-danger">
                {{ formatDateTime }}
                <span style="visibility: hidden;">'</span>
              </td>
            </tr>
            <tr>
              <th class="text-danger">Cost:</th>
              <td>
                &dollar;
                {{
                separateFloating(
                Number((gamesPlayed * COST_PER_GAME).toFixed(2))
                )
                }}
              </td>
            </tr>
            <tr>
              <th class="text-primary">Winnings:</th>
              <td>
                <span v-if="totalWinningMoney > 0">&dollar; {{ separateFloating(totalWinningMoney) }}</span>
              </td>
            </tr>
          </table>

          <table class="table table-bordered text-center">
            <thead>
              <th>Lotto numbers</th>
              <th>Supp</th>
            </thead>
            <tbody>
              <tr>
                <td class="text-danger">
                  {{ winnerNumbers.join(", ") }}
                  <span style="visibility: hidden;">'</span>
                </td>
                <td class="text-primary">
                  {{ suppNumbers.join(", ") }}
                  <span style="visibility: hidden;">'</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <div v-if="status === 0 || status === 1">
        <div class="text-center text-danger">Pick your lotto numbers</div>
        <div class="text-center" v-if="status === 1">
          <button class="btn btn-outline-success" @click="handleSetTables">Set tables</button>
        </div>
      </div>
      <div v-if="status === 2">
        <div class="text-center">
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption == 0"
            @click="handlePlayOneGame"
          >Play a game</button>
          <button
            class="btn btn-outline-success"
            v-if="demoAutoOption == 1"
            @click="handleToggleTimer"
          >
            {{
            gamesPlayed === 0
            ? "Start"
            : timer
            ? "Pause"
            : "Resume"
            }}
          </button>
          <div class="mb-2"></div>
          <app-demo-auto-option @changeOption="demoAutoOption = $event" :option="demoAutoOption"></app-demo-auto-option>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Combinatorics from "js-combinatorics";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { initLottoNumbers } from "./utils";
import { pickNumber, separateNumber } from "../../common/utils";

export default {
  components: {
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      TOTAL_NUMBERS: 45,
      STANDARD_NUMBERS_TO_DRAW: 6,
      SUPP_NUMBERS_TO_DRAW: 2,
      MAX_NUMBERS_TO_DRAW: 10,
      SLIK_NUM: 100,
      COST_PER_GAME: 0.6,
      lottoNumbers: null,
      // selectedNumbers: [],
      demoAutoOption: "0",
      status: 0,
      // 0 - initial state
      // 1 - game picked
      // 2 - start playing
      lottoGames: [],
      winners: [],
      weeksPlayed: 0,
      timer: null,
      divisionTable: [
        { div: 1, prize: 752604.4, wins: 0, amount: 0 },
        { div: 2, prize: 14111.3, wins: 0, amount: 0 },
        { div: 3, prize: 1440.8, wins: 0, amount: 0 },
        { div: 4, prize: 49.8, wins: 0, amount: 0 },
        { div: 5, prize: 32.6, wins: 0, amount: 0 }
      ],
      drawDateTime: null,
      winnerNumbers: [],
      suppNumbers: [],
      totalWinningMoney: 0,
      winnerNumbersIndex: [],
      winnerSuppNumbersIndex: [],
      showRule: false
    };
  },
  computed: {
    selectedNumbers() {
      return this.lottoNumbers
        .filter(item => item.selected === true)
        .map(item => item.number);
    },
    formatDateTime() {
      if (!this.drawDateTime) {
        return "";
      }
      return this.drawDateTime.format("dddd, MMMM D, YYYY");
    },
    gamesPlayed() {
      return this.weeksPlayed * this.lottoGames.length;
    },
    lottoGamesNumbers() {
      const gamesNumbers = [];
      for (let i = 0; i < this.lottoGames.length; i++) {
        const oneGameNumbers = this.lottoGames[i].map(item => item.num);
        gamesNumbers.push(oneGameNumbers);
      }
      return gamesNumbers;
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value == "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    }
  },
  methods: {
    /** Select a number from 45 numbers */
    handleSelectNumber($e) {
      if (this.status === 2) return;
      const selectedNumber = $e;
      // this.selectedNumbers = this.lottoNumbers.filter(
      //   item => item.selected === true
      // );
      this.lottoNumbers = this.lottoNumbers.map(item => {
        if (item.number === selectedNumber && item.selected) {
          item.selected = false;
        } else if (
          item.number === selectedNumber &&
          !item.selected &&
          this.selectedNumbers.length < this.MAX_NUMBERS_TO_DRAW
        ) {
          item.selected = true;
        }
        return item;
      });
    },
    handleClear() {
      this.status = 0;
      this.lottoGames = [];
    },

    handleSetTables() {
      this.status = 2;
    },

    /** Randomly select 100 games */
    handleSlik() {
      if (this.status === 0) {
        this.status = 1;
      }
      const lottoNumbersArr = [];
      let lottoGame = [];
      let gameCount = 1;

      while (gameCount <= this.SLIK_NUM) {
        // Randomly generate 100 games
        for (let i = 0; i < this.lottoNumbers.length; i++) {
          // Create an array of numbers for selection [1, 2, 3, ... 45]
          lottoNumbersArr.push(this.lottoNumbers[i].number);
        }

        for (let i = 1; i <= this.STANDARD_NUMBERS_TO_DRAW; i++) {
          // Create a game
          let pickedIndex = pickNumber(0, this.STANDARD_NUMBERS_TO_DRAW - 1);
          lottoGame.push(lottoNumbersArr[pickedIndex]);
          lottoNumbersArr.splice(pickedIndex, 1);
        }
        lottoGame.sort((a, b) => a - b);
        let existLottoindex = this.lottoGames.findIndex(game => {
          // Check if the game newly created exists
          return (
            lottoGame.sort((a, b) => a - b).join() ==
            game.sort((a, b) => a - b).join()
          );
        });
        if (existLottoindex === -1) {
          // If it doesn't exist, push it to games array
          const lottoGameCheck = lottoGame.map(num => ({
            num,
            win: false,
            winSupp: false
          }));
          this.lottoGames.unshift(lottoGameCheck);
          gameCount++;
        }
        lottoGame = [];
      }
      this.lottoNumbers = initLottoNumbers(this.TOTAL_NUMBERS);
    },

    /** Add a customized game */
    handleAddPick() {
      if (this.status === 0) {
        this.status = 1;
      }
      const cmb = Combinatorics.combination(
        this.selectedNumbers,
        this.STANDARD_NUMBERS_TO_DRAW
      );
      let el;
      let index;
      while ((el = cmb.next())) {
        index = this.lottoGames.findIndex(game => {
          // console.log(el.sort().join());
          // console.log(game.sort().join());
          return (
            el.sort((a, b) => a - b).join() == game.sort((a, b) => a - b).join()
          );
        });
        // console.log(index);
        if (index === -1) {
          const lottoGameCheck = el.map(num => ({
            num,
            win: false,
            winSupp: false
          }));
          this.lottoGames.unshift(lottoGameCheck);
        }
      }

      this.lottoNumbers = initLottoNumbers(this.TOTAL_NUMBERS);
    },

    /** Make one draw and check games */
    handlePlayOneGame() {
      // Clear the mark
      for (let i = 0; i < this.lottoGames.length; i++) {
        let game = this.lottoGames[i];
        for (let j = 0; j < game.length; j++) {
          let number = game[j];
          if (number.win) {
            number.win = false;
          }
          if (number.winSupp) {
            number.winSupp = false;
          }
        }
      }
      this.winnerNumbers = [];
      this.suppNumbers = [];
      this.winners = [];
      this.winnerNumbersIndex = [];
      this.winnerSuppNumbersIndex = [];
      // Change week
      if (!this.drawDateTime) {
        this.drawDateTime = moment().day("Saturday");
      } else {
        this.drawDateTime = moment(this.drawDateTime.add(7, "days"));
      }
      // Increment the number of weeks
      this.weeksPlayed++;

      const lottoNumbersArr = [];
      for (let i = 0; i < this.lottoNumbers.length; i++) {
        // Create an array of numbers for drawing [1, 2, 3, ... 45]
        lottoNumbersArr.push(this.lottoNumbers[i].number);
      }

      for (let i = 1; i <= this.STANDARD_NUMBERS_TO_DRAW; i++) {
        // Draw 6 winning numbers
        let pickedIndex = pickNumber(0, lottoNumbersArr.length - 1);
        this.winnerNumbers.push(lottoNumbersArr[pickedIndex]);
        lottoNumbersArr.splice(pickedIndex, 1);
      }
      for (let i = 1; i <= this.SUPP_NUMBERS_TO_DRAW; i++) {
        // Draw 2 supp numbers
        let pickedIndex = pickNumber(0, lottoNumbersArr.length - 1);
        this.suppNumbers.push(lottoNumbersArr[pickedIndex]);
        lottoNumbersArr.splice(pickedIndex, 1);
      }

      // Check result of games
      for (let i = 0; i < this.lottoGamesNumbers.length; i++) {
        // Check game one by one
        const game = this.lottoGamesNumbers[i];
        let winnerCounts = 0;
        let winnerSuppCounts = 0;
        let winnerNumbersAllOneGame = [];
        this.winnerNumbersIndex = [];
        this.winnerSuppNumbersIndex = [];
        for (let j = 0; j < game.length; j++) {
          // Check the number of each game
          let number = game[j];
          if (this.winnerNumbers.indexOf(number) >= 0) {
            // Compute how many winning numbers
            winnerCounts++;
            winnerNumbersAllOneGame.push(number);
            this.winnerNumbersIndex.push([i, j]);
          } else if (this.suppNumbers.indexOf(number) >= 0) {
            // Compute how many supp winning numbers
            winnerSuppCounts++;
            winnerNumbersAllOneGame.push(number);
            this.winnerSuppNumbersIndex.push([i, j]);
          }
        }

        // Check which division you win
        // If 0, no win.
        let division = 0;
        if (winnerCounts === 6) {
          division = 1;
        } else if (winnerCounts === 5 && winnerSuppCounts >= 1) {
          division = 2;
        } else if (winnerCounts === 5) {
          division = 3;
        } else if (winnerCounts === 4) {
          division = 4;
        } else if (winnerCounts === 3 && winnerSuppCounts >= 1) {
          division = 5;
        }
        if (division > 0) {
          // If wins, calculate prize money for this draw
          this.divisionTable[division - 1].wins++;
          this.divisionTable[division - 1].amount = Number(
            (
              this.divisionTable[division - 1].prize +
              this.divisionTable[division - 1].amount
            ).toFixed(2)
          );
          // Calculate total money you win
          this.totalWinningMoney = Number(
            (
              this.totalWinningMoney + this.divisionTable[division - 1].prize
            ).toFixed(2)
          );
          this.winners.push(winnerNumbersAllOneGame);
          if (this.winnerNumbersIndex.length > 0) {
            // mark the number as winning number
            for (
              let index = 0;
              index < this.winnerNumbersIndex.length;
              index++
            ) {
              const gameIndex = this.winnerNumbersIndex[index][0];
              const numIndex = this.winnerNumbersIndex[index][1];
              this.lottoGames[gameIndex][numIndex].win = true;
            }
          }
          if (this.winnerSuppNumbersIndex.length > 0) {
            // mark the number as winning supp number
            for (
              let index = 0;
              index < this.winnerSuppNumbersIndex.length;
              index++
            ) {
              const gameIndex = this.winnerSuppNumbersIndex[index][0];
              const numIndex = this.winnerSuppNumbersIndex[index][1];
              this.lottoGames[gameIndex][numIndex].winSupp = true;
            }
          }
        }
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(this.handlePlayOneGame, 500);
      }
    },

    handleToggleShowRule() {
      this.showRule = !this.showRule;
    },

    separateFloating(number) {
      let strNumber = String(number);
      let strNumberArr = strNumber.split(".");
      let integerPart = strNumberArr[0];
      let decimalPart = strNumberArr[1];
      return decimalPart
        ? separateNumber(integerPart) + "." + decimalPart
        : separateNumber(integerPart);
    }
  },
  created() {
    this.lottoNumbers = initLottoNumbers(this.TOTAL_NUMBERS);
  },
  destroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped>
.app--selection-area {
  max-width: 300px;
  margin: 0 auto;
}
.app--selection-area::after {
  content: "";
  display: block;
  clear: both;
}
.app--selection-number {
  border: 1px solid #e23545;
  float: left;
  width: 30px;
  height: 30px;
  color: #e23545;
  margin: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.app--selection-number-selected {
  color: black;
  font-weight: bold;
}
.app--selection-message {
  color: #e23545;
  margin-left: 2px;
  margin-right: 2px;
}
</style>
