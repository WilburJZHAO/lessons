<template>
	<div>
		<div class="container mt-4 mb-5">
			<h3 class="lesson-subheading">Play a game of basketball</h3>
			<hr class="subheading-separator">
			<div class="row">
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label for="team-name-1">Enter team name</label>
						<input
							type="text"
							class="form-control"
							id="team-name-1"
							v-model="teamNameA"
							:disabled="isStart"
							required>
						<div class="badge badge-danger" :style="{visibility: teamAWinsTime > 0 ? 'visible' : 'hidden'} ">Wins: {{ teamAWinsTime }}</div>
					</div>
					<div class="app--teamA-scoretable">
						<table class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>3P</th>
									<th>2P</th>
									<th>1P</th>
									<th class="table-primary text-center">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(scoreLine, indexTeam) in teamAScore" :key="indexTeam">
									<th>Q{{indexTeam+1}}</th>
									<td v-for="(score, indexLine) in scoreLine" :key="indexLine">
										{{score}}
									</td>
									<td class="table-primary text-center">{{ teamAScoreInQuarter[indexTeam] }}</td>
								</tr>
								<tr>
									<th class="table-warning">Total</th>
									<td class="table-warning" v-for="(number, indexBall) in teamANumberInEachBall" :key="indexBall">
										{{ number }}
									</td>
									<td class="table-danger text-center">{{ teamATotalScore }}</td>
								</tr>
								<tr>
									<td></td>
									<td><app-dice :index="0" :number="teamADiceArr[0]" ></app-dice></td>
									<td><app-dice :index="1" :number="teamADiceArr[1]" ></app-dice></td>
									<td><app-dice :index="2" :number="teamADiceArr[2]" ></app-dice></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="form-group">
						<label for="team-name-2">Enter team name</label>
						<input
							type="text"
							class="form-control"
							id="team-name-2"
							v-model="teamNameB"
							:disabled="isStart"
							required>
						<div class="badge badge-danger" :style="{visibility: teamBWinsTime > 0 ? 'visible' : 'hidden'} ">Wins: {{ teamBWinsTime }}</div>
					</div>
					<div class="app--teamA-scoretable">
						<table class="table">
							<thead>
								<tr>
									<th>#</th>
									<th>3P</th>
									<th>2P</th>
									<th>1P</th>
									<th class="table-primary text-center">Total</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(scoreLine, indexTeam) in teamBScore" :key="indexTeam">
									<th>Q{{indexTeam+1}}</th>
									<td v-for="(score, indexLine) in scoreLine" :key="indexLine">
										{{score}}
									</td>
									<td class="table-primary text-center">{{ teamBScoreInQuarter[indexTeam] }}</td>
								</tr>
								<tr>
									<th class="table-warning">Total</th>
									<td class="table-warning" v-for="(number, indexBall) in teamBNumberInEachBall" :key="indexBall">
										{{ number }}
									</td>
									<td class="table-danger text-center">{{ teamBTotalScore }}</td>
								</tr>
								<tr>
									<td></td>
									<td><app-dice :index="0" :number="teamBDiceArr[0]" ></app-dice></td>
									<td><app-dice :index="1" :number="teamBDiceArr[1]" ></app-dice></td>
									<td><app-dice :index="2" :number="teamBDiceArr[2]" ></app-dice></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="col-12 app--action text-center mt-3">
					<button class="btn btn-outline-success" v-if="!isStart" @click="()=>{this.isStart=true;}">Start game</button>
					<button class="btn btn-outline-success" v-if="isStart && !isEnd && demoAutoOption==='0'" @click="handleRollDice">
						{{ getButtonLabel() }}
					</button>
					<button
						class="btn btn-outline-success"
						v-if="isStart && !isEnd && demoAutoOption==='1'"
						@click="handleToggleTimer"
					>
						{{ !isAutoStart ? "Start" : (timer ? "Pause" : "Resume") }}
					</button>
					<button class="btn btn-outline-dark" v-if="isStart && isEnd" @click="handleReset">Reset</button>
					<app-demo-auto-option class="mt-1" v-if="!isEnd" @changeOption="demoAutoOption=$event"></app-demo-auto-option>
				</div>
				<div class="col-12 text-danger text-center mt-2">
					<p v-if="isStart && !isEnd">{{ whoseTurn === 1 ? teamNameB+"'s turn"  : teamNameA+"'s turn" }}</p>
					<p v-if="isStart && isEnd">{{ winnerPrompt }}</p>
				</div>
				<div class="col-12">
					<app-change-rule @changeRule="isChangeRule=$event" :isStart="isStart"></app-change-rule>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ChangeRule from './ChangeRule.vue';
import DemoAutoOption from './DemoAutoOption.vue';
import Dice from './Dice.vue';
import { throwDiceOnce, throwDiceThree, fillArray, sumArray } from './utils';
export default {
	components: {
		appChangeRule: ChangeRule,
		appDemoAutoOption: DemoAutoOption,
		appDice: Dice
	},
	data: function() {
		return {
			isStart: false,	// If the lesson has started
			isEnd: false,	// If a game is end
			teamNameA: 'Team A',
			teamNameB: 'Team B',
			isChangeRule: false, // If "Change dice rule" is selected, false - not selected, true - selected
			whoseTurn: 0,	// 0 - Team A's turn, 1 - Team B's turn
			demoAutoOption: "0",		// "0" - demo, "1" - auto
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
			timer: null,
			isAutoStart: false
		}
	},
	computed: {
		teamAScore() {
			const scoreArr = fillArray(this.teamAScoreArr, 12);
			return [
				[...scoreArr.slice(0, 3)],
				[...scoreArr.slice(3, 6)],
				[...scoreArr.slice(6, 9)],
				[...scoreArr.slice(9)],
			];
		},
		teamBScore() {
			const scoreArr = fillArray(this.teamBScoreArr, 12);
			return [
				[...scoreArr.slice(0, 3)],
				[...scoreArr.slice(3, 6)],
				[...scoreArr.slice(6, 9)],
				[...scoreArr.slice(9)],
			];
		},
		teamAScoreInQuarter() {	// TeamA's total score in each quarter
			const tempArr = fillArray(this.teamAScoreInQuarterArr, 4);
			return [...tempArr];
		},
		teamBScoreInQuarter() {	// TeamB's total score in each quarter
			const tempArr = fillArray(this.teamBScoreInQuarterArr, 4);
			return [...tempArr];
		},
		teamANumberInEachBall() {	// TeamA's total number of balls
			const tempArr = fillArray(this.teamANumberInEachBallArr, 3);
			return [...tempArr];
		},
		teamBNumberInEachBall() {	// TeamB's total number of balls
			const tempArr = fillArray(this.teamBNumberInEachBallArr, 3);
			return [...tempArr];
		},
		teamATotalScore() {	// TeamA's total score
			return sumArray(this.teamAScoreInQuarterArr);
		},
		teamBTotalScore() {		// TeamB's total score
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
		getButtonLabel() {
			if(this.isChangeRule) {
				return (!(this.shouldCalculateScore) || this.teamAScoreArr.length === 0) ? "Roll all three dice" : "Calculate totals";
			}

			if(this.whoseTurn === 0) {	// Team A's turn
				if(this.teamAScoreArr.length % 3 === 0) {
					return (!(this.shouldCalculateScore) || this.teamAScoreArr.length === 0) ? "Roll the first dice for 3 points" : "Calculate totals";
				}
				else if (this.teamAScoreArr.length % 3 === 1) {
					return "Roll the second dice for 2 points";
				}
				else if (this.teamAScoreArr.length % 3 === 2) {
					return "Roll the third dice for 1 point";
				}
			}
			else if(this.whoseTurn === 1) {	// Team B's turn
				if(this.teamBScoreArr.length % 3 === 0) {
					return !(this.shouldCalculateScore) ? "Roll the first dice for 3 points" : "Calculate totals";
				}
				else if (this.teamBScoreArr.length % 3 === 1) {
					return "Roll the second dice for 2 points";
				}
				else if (this.teamBScoreArr.length % 3 === 2) {
					return "Roll the third dice for 1 point";
				}
			}

		},

		changeTurn() {		// Change turn.
			if(this.whoseTurn === 0) {
				this.whoseTurn = 1;
				return;
			}
			if(this.whoseTurn === 1) {
				this.whoseTurn = 0;
				return;
			}
		},
		checkEndQuarter(arr) {		// Check if it is in the end of a quarter
			if(arr.length >0 && arr.length % 3 === 0) {
				return true;
			}
			return false;
		},
		checkWinnder() {		// Decide who is winner in a game, and increment wins time
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
				// console.log(this.teamADiceArr);
				const scoreInQuarter =
					3*this.teamADiceArr[0] + 2*this.teamADiceArr[1] + this.teamADiceArr[2];
				this.teamAScoreInQuarterArr.push(scoreInQuarter);
				return;
			}
			if(this.whoseTurn == 1) {
				// console.log(this.teamBDiceArr);
				const scoreInQuarter =
					3*this.teamBDiceArr[0] + 2*this.teamBDiceArr[1] + this.teamBDiceArr[2];
				this.teamBScoreInQuarterArr.push(scoreInQuarter);
				return;
			}
		},
		calculateScoreInEachBall() {
			if(this.whoseTurn == 0) {
				this.teamANumberInEachBallArr = [
					sumArray([this.teamAScore[0][0], this.teamAScore[1][0], this.teamAScore[2][0], this.teamAScore[3][0]]),
					sumArray([this.teamAScore[0][1], this.teamAScore[1][1], this.teamAScore[2][1], this.teamAScore[3][1]]),
					sumArray([this.teamAScore[0][2], this.teamAScore[1][2], this.teamAScore[2][2], this.teamAScore[3][2]])
				];
			}
			if(this.whoseTurn == 1) {
				this.teamBNumberInEachBallArr = [
					sumArray([this.teamBScore[0][0], this.teamBScore[1][0], this.teamBScore[2][0], this.teamBScore[3][0]]),
					sumArray([this.teamBScore[0][1], this.teamBScore[1][1], this.teamBScore[2][1], this.teamBScore[3][1]]),
					sumArray([this.teamBScore[0][2], this.teamBScore[1][2], this.teamBScore[2][2], this.teamBScore[3][2]])
				];
			}
		},

		handleReset() {		// Reset and start a new game
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
		},

		handleToggleTimer() {
			if(!this.isAutoStart) this.isAutoStart = true;
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(this.handleRollDice, 300);
			}
		},

		handleRollDice() {
			let diceArr, diceNumber;
			if(this.isChangeRule) {	 	// Handle rolling dice if 'change dice rule' is selected
				diceArr = throwDiceThree();
				// console.log(diceArr);

				if(this.whoseTurn === 0) {	// Team A's turn
					if(this.checkEndQuarter(this.teamAScoreArr) && this.shouldCalculateScore) {
						//	console.log('Team A end quarter');
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
				} else {	// Team B's turn
					if(this.teamBScoreArr.length === 12 && this.shouldCalculateScore) {	// Handle Game end.
						// console.log('Game end');
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						// this.calculateTotalScore();
						this.checkWinnder();
						this.shouldCalculateScore = false;
						this.isEnd = true;
						return;
					}
					if(this.checkEndQuarter(this.teamBScoreArr) && this.shouldCalculateScore) {
						//	console.log('Team B end quarter');
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						this.changeTurn();
						this.shouldCalculateScore = false;
					} else {
						this.shouldCalculateScore = true;
						this.teamADiceArr = [];
						this.teamBDiceArr = [...diceArr];
						this.teamBScoreArr = [...this.teamBScoreArr, ...diceArr];
					}
				}

			} else { 	// Handle rolling dice if 'change dice rule' is not selected
				diceNumber = throwDiceOnce();
				// console.log(diceNumber);

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
					if(this.teamBScoreArr.length === 12 && this.shouldCalculateScore) {	// Handle Game end.
						// console.log('Game end');
						this.calculateScoreInQuarter();
						this.calculateScoreInEachBall();
						// this.calculateTotalScore();
						this.checkWinnder();
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

			// 	this.whoseTurn === 0 ?
			// 		this.teamAScore[this.currentQForTeamA][this.currentPForTeamA++] = diceNumber :
			// 		this.teamBScore[this.currentQForTeamB][this.currentPForTeamB++] = diceNumber;
			// 		this.teamAScore[this.currentQForTeamA] = [...this.teamAScore[this.currentQForTeamA]];
			// 		this.teamAScore[this.currentQForTeamB] = [...this.teamAScore[this.currentQForTeamB]];
			}
		}
	}
}
</script>

<style scoped>
.app--dice-area {
	height: 150px;
	display: flex;
}
</style>
