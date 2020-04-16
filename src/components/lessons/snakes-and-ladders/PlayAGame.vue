<template>
  <div class="container mt-3">
    <h3 class="lesson-subheading">Play a game</h3>
    <hr class="subheading-separator">
    <div v-if="status === 0">
      <h5 class="text-primary text-center mt-5">A game for two players</h5>
      <div style="min-width: 200px; max-width: 30%; margin: 0 auto;">
        <div class="d-flex align-items-center">
          <label for="player1">Player1</label>
          <input type="text" class="form-control ml-2" v-model="player1" />
        </div>
        <div class="mb-3"></div>
        <div class="d-flex align-items-center">
          <label for="player2">Player2</label>
          <input type="text" class="form-control ml-2" v-model="player2" />
        </div>
        <div class="text-center mt-4">
          <button
            class="btn btn-outline-success"
            :disabled="!player1.trim() || !player2.trim()"
            @click="status = 1"
          >OK</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-8 mb-3">
          <app-board
            :boardSettings="boardSettings"
            :status="status"
            :whoIsTurn="whoIsTurn"
            :dice="dice"
            @stopMoving="status=4"
          ></app-board>
        </div>
        <div class="col-md-4 d-flex flex-column">
          <div style=" position: sticky; top: 0;">
            <h5 class="text-center">Game {{ gameCount }}</h5>
            <table class="table table-bordered text-center">
              <tr>
                <th></th>
                <th>Wins</th>
              </tr>
              <tr class="text-info">
                <td>
                  <span
                    class="bg-info"
                    style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; opacity: .5;"
                  ></span>
                  {{player1}}
                </td>
                <td>{{ player1Wins }}</td>
              </tr>
              <tr class="text-warning">
                <td>
                  <span
                    class="bg-warning"
                    style="width: 30px; height: 30px; border-radius: 50%; display: inline-block; opacity: .5;"
                  ></span>
                  {{player2}}
                </td>
                <td>{{ player2Wins }}</td>
              </tr>
            </table>
            <div class="text-primary" v-if="status >=3">Turn {{ turnCount }}</div>
            <div class="d-flex justify-content-center mb-3">
              <!-- dice area -->
              <app-dice :number="dice" :index="0"></app-dice>
            </div>
            <div class="text-center">
              <button
                class="btn btn-outline-success"
                v-if="status===1"
                @click="handleGoFirst"
              >See who goes first</button>
              <button
                class="btn btn-outline-success"
                v-if="status===2 && demoAutoOption==='0'"
                @click="handleFirstRoll"
              >Roll dice</button>
              <button
                class="btn btn-outline-success"
                v-if="(status===3 || status ===4) && demoAutoOption==='0'"
                @click="handleNextRoll"
                :disabled="status===3"
              >Roll dice</button>
              <button
                class="btn btn-outline-success"
                v-if="(status===3 || status ===4 || status === 2) && demoAutoOption==='1' && !timer"
                @click="handleToggleTimer"
                :disabled="status===3"
              >{{ status=== 2 ? 'Start' : 'Resume'}}</button>
              <button
                class="btn btn-outline-dark"
                v-if="(status===3 || status ===4 || status === 2) && demoAutoOption==='1' && timer"
                @click="handleToggleTimer"
              >Pause</button>
              <button class="btn btn-outline-dark" v-if="status===5" @click="handleReset">Reset</button>
            </div>
            <div class="text-center mt-2" v-if="status>=2">
              <app-demo-auto-option
                @changeOption="demoAutoOption = $event"
                :option="demoAutoOption"
              ></app-demo-auto-option>
            </div>
            <div class="text-center text-danger">
              <span v-if="status===2">{{ whoIsTurn === 1 ? player1 : player2 }} goes first</span>
              <span
                v-if="status===3 || status === 4"
              >{{ whoIsTurn === 1 ? player1 : player2 }}, throw dice for next move</span>
              <span v-if="status===5">{{ whoWins }} won in {{ turnCount }} moves</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Board from "./Board.vue";
import Dice from "../../common/Dice.vue";
import DemoAutoOption from "../../common/DemoAutoOption.vue";
import { pickNumber } from "../../common/utils";
export default {
  props: ["boardSettings"],
  components: {
    appBoard: Board,
    appDice: Dice,
    appDemoAutoOption: DemoAutoOption
  },
  data: function() {
    return {
      status: 0,
      // 0 - enter player names
      // 1 - ready to play and ready to roll for who is first
      // 2 - who is first decided, ready to start.
      // 3 - started, ready to tap for roll and move
      // 4 - moving button
      // 5 - game is over
      player1: "Player 1",
      player2: "Player 2",
      player1Number: 0,
      player2Number: 0,
      gameCount: 0,
      turnCount: 0,
      player1Wins: 0,
      player2Wins: 0,
      dice: 0,
      whoIsTurn: 0, // 1 - player1's turn , 2 - player2's turn
      whoWins: 0, // 1 - player1 wins , 2 - player2 wins
      demoAutoOption: "0",
      timer: null
    };
  },
  methods: {
    throwDice() {
      return pickNumber(1, 6);
    },
    changeTurn() {
      if (this.whoIsTurn === 1) {
        this.whoIsTurn = 2;
      } else {
        this.whoIsTurn = 1;
      }
    },
    handleGoFirst() {
      this.dice = this.throwDice();
      if (this.dice >= 1 && this.dice <= 3) {
        this.whoIsTurn = 1;
      } else {
        this.whoIsTurn = 2;
      }
      this.status = 2;
    },
    handleFirstRoll() {
      this.gameCount++;
      this.handleNextRoll();
    },
    handleNextRoll() {
      this.status = 3;
      if (this.demoAutoOption === "0") {
        this.dice = this.throwDice();
        this.turnCount++;
        if (this.whoIsTurn === 1) {
          this.player1Number += this.dice;
          this.boardSettings.snakes.forEach(snake => {
            if (this.player1Number === snake.from) {
              this.player1Number = snake.to;
            }
          });
          this.boardSettings.ladders.forEach(ladder => {
            if (this.player1Number === ladder.from) {
              this.player1Number = ladder.to;
            }
          });
        }
        if (this.whoIsTurn === 2) {
          this.player2Number += this.dice;
          this.boardSettings.snakes.forEach(snake => {
            if (this.player2Number === snake.from) {
              this.player2Number = snake.to;
            }
          });
          this.boardSettings.ladders.forEach(ladder => {
            if (this.player2Number === ladder.from) {
              this.player2Number = ladder.to;
            }
          });
        }
      }
    },
    handleToggleTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(() => {
          if (this.status === 2) {
            this.handleFirstRoll();
          } else {
            this.handleNextRoll();
          }
        }, 800);
      }
    },
    handleReset() {
      this.status = 1;
      this.player1Number = 0;
      this.player2Number = 0;
      this.turnCount = 0;
      this.dice = 0;
      this.whoIsTurn = 0;
      this.whoWins = 0;
      this.demoAutoOption = "0";
    }
  },
  watch: {
    demoAutoOption(value) {
      if (value === "0") {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    status(value) {
      if (this.demoAutoOption === "1" && value === 3) {
        this.dice = this.throwDice();
        this.turnCount++;
        if (this.whoIsTurn === 1) {
          this.player1Number += this.dice;
          this.boardSettings.snakes.forEach(snake => {
            if (this.player1Number === snake.from) {
              this.player1Number = snake.to;
            }
          });
          this.boardSettings.ladders.forEach(ladder => {
            if (this.player1Number === ladder.from) {
              this.player1Number = ladder.to;
            }
          });
        }
        if (this.whoIsTurn === 2) {
          this.player2Number += this.dice;
          this.boardSettings.snakes.forEach(snake => {
            if (this.player2Number === snake.from) {
              this.player2Number = snake.to;
            }
          });
          this.boardSettings.ladders.forEach(ladder => {
            if (this.player2Number === ladder.from) {
              this.player2Number = ladder.to;
            }
          });
        }
      }
      if (value === 4 /*&& demoAutoOption === "0"*/) {
        if (
          this.player1Number >=
          this.boardSettings.columns * this.boardSettings.rows
        ) {
          this.player1Wins++;
          this.whoWins = this.player1;
          this.status = 5;
        } else if (
          this.player2Number >=
          this.boardSettings.columns * this.boardSettings.rows
        ) {
          this.player2Wins++;
          this.whoWins = this.player2;
          this.status = 5;
        } else {
          this.changeTurn();
        }
      }

      if (value === 5) {
        clearInterval(this.timer);
        this.timer = null;
        this.demoAutoOption = "0";
      }
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped></style>
