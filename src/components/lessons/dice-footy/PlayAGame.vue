<template>
	<div>
		<div class="container mt-3 mb-5">
			<h3 class="lesson-subheading">Play a game of football</h3>
			<hr class="subheading-separator">
			<div class="row">
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label for="team-name-a">Enter team name</label>
						<input
							type="text"
							class="form-control"
							id="team-name-a"
							v-model="teamNameA"
							:disabled="isStart"
							required
						>
						<div class="badge badge-danger"
							:style="{visibility: teamAWinsTime > 0 ? 'visible' : 'hidden'}"
						>Wins: {{ teamAWinsTime }}</div>
					</div>
					<div class="app--scoretable">
						<table class="table">
							<tr>
								<th></th>
								<th>G</th>
								<th>B</th>
								<th>Pts</th>
							</tr>
							<tr v-for="(scoreLine, indexTeam) in teamAScore" :key="indexTeam">
								<th>Q{{indexTeam+1}}</th>
								<td v-for="(score, indexLine) in scoreLine" :key="indexLine">
									{{ score }}
								</td>
								<td class="table-primary text-center">
									{{ teamAScoreInQuarter[indexTeam]}}
								</td>
							</tr>
							<tr>
								<th class="table-warning">Total</th>
								<td class="table-warning"
									v-for="(number, indexBall) in teamANumberInEachBall"
									:key="indexBall">
									{{ number }}
								</td>
								<td class="table-danger text-center"> {{ teamATotalScore }}</td>
							</tr>
							<tr>
								<td></td>
								<td><app-dice :index="0" :number="teamADiceArr[0]" ></app-dice></td>
								<td><app-dice :index="1" :number="teamADiceArr[1]" ></app-dice></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label for="team-name-b">Enter team name</label>
						<input
							type="text"
							class="form-control"
							id="team-name-b"
							v-model="teamNameB"
							:disabled="isStart"
							required
						>
						<div class="badge badge-danger"
							:style="{visibility: teamBWinsTime > 0 ? 'visible' : 'hidden'}"
						>Wins: {{ teamBWinsTime }}</div>
					</div>
					<div class="app--scroetable">
						<table class="table">
							<tr>
								<th></th>
								<th>G</th>
								<th>B</th>
								<th>Pts</th>
							</tr>
							<tr v-for="(scoreLine, indexTeam) in teamBScore" :key="indexTeam">
								<th>Q{{indexTeam+1}}</th>
								<td v-for="(score, indexLine) in scoreLine" :key="indexLine">
									{{ score }}
								</td>
								<td class="table-primary text-center">
									{{ teamBScoreInQuarter[indexTeam]}}
								</td>
							</tr>
							<tr>
								<th class="table-warning">Total</th>
								<td class="table-warning"
									v-for="(number, indexBall) in teamBNumberInEachBall"
									:key="indexBall">
									{{ number }}
								</td>
								<td class="table-danger text-center"> {{ teamBTotalScore }}</td>
							</tr>
							<tr>
								<td></td>
								<td><app-dice :index="0" :number="teamBDiceArr[0]" ></app-dice></td>
								<td><app-dice :index="1" :number="teamBDiceArr[1]" ></app-dice></td>
							</tr>
						</table>
					</div>
				</div>
				<div class="col-12 app--action text-center mt-3">
					<button
						class="btn btn-outline-success"
						v-if="!isStart"
						@click="() => { this.isStart = true; }"
					>OK</button>
					<button
						class="btn btn-outline-success"
						v-if="isStart && !isEnd && demoAutoOption==='0'"
						@click="handleRollDice"
					>
						{{ isChangeRule ? "Roll both dice" : "Roll first dice for goals"}}
					</button>
					<button
						class="btn btn-outline-success"
						v-if="isStart && !isEnd && demoAutoOption === '1'"
						@click="handleToggleTimer"
					>
						{{ !isAutoStart ? "Start" : (timer ? "Pause" : "Resume") }}
					</button>
					<button
						class="btn btn-outline-success"
						v-if="isStart && isEnd"
						@click="handleReset"
					>Reset</button>
					<app-demo-auto-option class="mt-1" v-if="!isEnd" @changeOption="demoAutoOption=$event"></app-demo-auto-option>
				</div>
				<div class="col-12 text-danger text-center mt-2">
					<p v-if="isStart && !isEnd">{{ whoseTurn === 1 ? teamNameB+"'s turn"  : teamNameA+"'s turn" }}</p>
					<p v-if="isStart && isEnd">{{ winnerPrompt }}</p>
				</div>
				<div class="col-12 text-center">
					<app-change-rule @changeRule="isChangeRule=$event" :isDisable="isStart"></app-change-rule>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChangeRule from './ChangeRule.vue';
import DemoAutoOption from './DemoAutoOption.vue';
import Dice from './Dice.vue';
import { throwDiceOnce, throwDiceTwo, fillArray, sumArray } from './utils';
export default {
	components: {
		appChangeRule: ChangeRule,
		appDemoAutoOption: DemoAutoOption,
		appDice: Dice
	},
	data: function() {
		return {
			isStart: false,	// If class gets started(After input team's name and click OK )
			isEnd: false,
			teamNameA: 'Team A',
			teamNameB: 'Team B',
			isChangeRule: false,	// If "change dice rule" is selected, false - not selected, true - selected
			whoseTurn: 0,	// 0 - team A's turn, 1 - team B's turn
			demoAutoOption: "0",
			timer: null,
			isAutoStart: false,
			teamAScoreArr: [],
			teamBScoreArr: [],
			teamAScoreInQuarterArr: [],
			teamBScoreInQuarterArr: [],
			teamANumberInEachBallArr: [],
			teamBNumberInEachBallArr: [],
			teamAWinsTime: 0,
			teamBWinsTime: 0,
			shouldCalculateScore: true,
			teamADiceArr: [], // Array to hold dice number for each rolling(team A)
			teamBDiceArr: [], // Array to hold dice number for each rolling(team B)
		}
	},
	computed: {
		teamAScore() {
			const scoreArr = fillArray(this.teamAScoreArr, 8);
			return [
				[...scoreArr.slice(0, 2)],
				[...scoreArr.slice(2, 4)],
				[...scoreArr.slice(4, 6)],
				[...scoreArr.slice(6)]
			]
		},
		teamBScore() {
			const scoreArr = fillArray(this.teamBScoreArr, 8);
			return [
				[...scoreArr.slice(0, 2)],
				[...scoreArr.slice(2, 4)],
				[...scoreArr.slice(4, 6)],
				[...scoreArr.slice(6)]
			]
		},
		teamAScoreInQuarter() {	// Team A's total score in each quarter
			return fillArray(this.teamAScoreInQuarterArr, 4);
		},
		teamBScoreInQuarter() {	// Team B's total score in each quarter
			return fillArray(this.teamBScoreInQuarterArr, 4);
		},
		teamANumberInEachBall() {	// Team A's total number of balls in one quarter
			return fillArray(this.teamANumberInEachBallArr , 2);
		},
		teamBNumberInEachBall() {	// Team B's total number of balls in one quarter
			return fillArray(this.teamBNumberInEachBallArr, 2);
		},
		teamATotalScore() {	//
			return sumArray(this.teamAScoreInQuarterArr);
		},
		teamBTotalScore() {
			return sumArray(this.teamBScoreInQuarterArr);
		},
		winnerPrompt() {
			if( !this.teamATotalScore || !this.teamBTotalScore ) {
				return '';
			}
			if(this.teamATotalScore > this.teamBTotalScore ) {
				return this.teamNameA + ' is the winner';
			}
			if(this.teamBTotalScore > this.teamATotalScore ) {
				return this.teamNameB + ' is the winner';
			}
			if(this.teamBTotalScore === this.teamATotalScore ) {
				return 'Draw';
			}
			return '';
		}
	},
	watch: {
		demoAutoOption(value) {
			if(value === '0' && this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		isEnd(value) {
			if(value=== true && this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			}
		}
	},
	methods: {
		changeTurn() {		// Change turn
			if(this.whoseTurn === 0) {
				this.whoseTurn = 1;
				return;
			}
			if(this.whoseTurn === 1) {
				this.whoseTurn = 0;
				return;
			}
		},
		checkEndQuarter(arr) {	// Check if it is in the end of a quarter
			if(arr.length >0 && arr.length % 2 === 0) {
				return true;
			}
			return false;
		},
		checkWinner() {	 // Decide who is winner in a game, and increment wins time
			if(!this.teamATotalScore || !this.teamBTotalScore) {
				return;
			}
			if(this.teamATotalScore > this.teamBTotalScore) {
				this.teamAWinsTime++;
			}
			if(this.teamBTotalScore > this.teamATotalScore) {
				this.teamBWinsTime++;
			}
		},
		calculateScoreInQuarter() {	// Calculate score in each quarter
			if(this.whoseTurn == 0) {
				const scoreInQuarter =
					6*this.teamADiceArr[0] + this.teamADiceArr[1];
					this.teamAScoreInQuarterArr.push(scoreInQuarter);
			}
			if(this.whoseTurn == 1) {
				const scoreInQuarter =
					6*this.teamBDiceArr[0] + this.teamBDiceArr[1];
					this.teamBScoreInQuarterArr.push(scoreInQuarter);
			}
		},
		calculateScoreInEachBall() {	// Calculate total numberr of balls in a game
			if(this.whoseTurn == 0) {
				this.teamANumberInEachBallArr = [
					sumArray([this.teamAScore[0][0], this.teamAScore[1][0], this.teamAScore[2][0], this.teamAScore[3][0]]),
					sumArray([this.teamAScore[0][1], this.teamAScore[1][1], this.teamAScore[2][1], this.teamAScore[3][1]])
				];
			}
			if(this.whoseTurn == 1) {
				this.teamBNumberInEachBallArr = [
					sumArray([this.teamBScore[0][0], this.teamBScore[1][0], this.teamBScore[2][0], this.teamBScore[3][0]]),
					sumArray([this.teamBScore[0][1], this.teamBScore[1][1], this.teamBScore[2][1], this.teamBScore[3][1]])
				];
			}
		},
		handleRollDice() {
			let diceArr, diceNumber;
			if(this.isChangeRule) {	// If rule is changed
				diceArr = throwDiceTwo();
				if(this.whoseTurn === 0) {	// If it is team A's turn
					if(this.checkEndQuarter(this.teamAScoreArr) && this.shouldCalculateScore) {
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						this.changeTurn();
						this.shouldCalculateScore = false;
					} else {
						this.shouldCalculateScore = true;
						this.teamBDiceArr = [];
						this.teamADiceArr = [...diceArr];
						this.teamAScoreArr = [...this.teamAScoreArr, ...diceArr];
					}
				} else {	// If it is team B's turn
					if(this.teamBScoreArr.length === 8 && this.shouldCalculateScore) {	// Check if a game is ended
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						this.checkWinner();
						this.shouldCalculateScore = false;
						this.isEnd = true;
						return;
					}
					if(this.checkEndQuarter(this.teamBScoreArr) && this.shouldCalculateScore) {
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						this.changeTurn();
						this.shouldCalculateScore = false;
					} else {
						this.shouldCalculateScore = true;
						this.teamADiceArr = [];
						this.teamBDiceArr = diceArr;
						this.teamBScoreArr = [...this.teamBScoreArr, ...diceArr];
					}
				}
			} else {
				diceNumber = throwDiceOnce();
				if(this.whoseTurn === 0) {	// Team A's turn
					if(this.checkEndQuarter(this.teamAScoreArr) && this.shouldCalculateScore) {
						// console.log('Team A end quarter');
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						this.changeTurn();
						this.shouldCalculateScore = false;
					} else {
						this.shouldCalculateScore = true;
						if(this.teamBDiceArr.length>0) this.teamBDiceArr = [];
						this.teamADiceArr.push(diceNumber);
						this.teamAScoreArr.push(diceNumber);
					}
				} else {		// Team B's turn
					if(this.teamBScoreArr.length === 8 && this.shouldCalculateScore) {	// Handle Game end.
						// console.log('Game end');
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						// this.calculateTotalScore();
						this.checkWinner();
						this.shouldCalculateScore = false;
						this.isEnd = true;
						return;
					}
					if(this.checkEndQuarter(this.teamBScoreArr) && this.shouldCalculateScore) {
						// console.log('Team B end quarter');
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						this.changeTurn();
						this.shouldCalculateScore = false;
					} else {
						this.shouldCalculateScore = true;
						if(this.teamADiceArr.length>0) this.teamADiceArr = [];
						this.teamBDiceArr.push(diceNumber);
						this.teamBScoreArr.push(diceNumber);
					}
				}
			}
		},
		handleToggleTimer() {
			if(!this.isAutoStart) {
				this.isAutoStart = true;
			}
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.handleRollDice, 300);
			}
		},
		handleReset() {
			this.isEnd = false;
			this.whoseTurn = 0;
			this.demoAutoOption = "0";
			this.teamAScoreArr = [];
			this.teamBScoreArr = [];
			this.teamAScoreInQuarterArr = [];
			this.teamBScoreInQuarterArr = [];
			this.teamANumberInEachBallArr = [];
			this.teamBNumberInEachBallArr = [];
			this.shouldCalculateScore = true;
			this.teamADiceArr = [];
			this.teamBDiceArr = [];
			this.isAutoStart = false;
		}
	},
	destroyed() {
		if(this.timer) {
			clearInterval(this.timer);
		}
	}
}
</script>

<style scoped>

</style>
