<template>
	<div>
		<div class="container mt-4 mb-5">
			<div class="row">
				<div class="col-12 col-md-7">
					<div class="app--counting-table-container mb-5">
						<div class="app--counting-label">
							<div class="app--counting-label-line1">
								<div>{{legify(1000000)}}s</div>
								<div style="transform: translateX(-30%);">{{legify(10000)}}s</div>
								<div style="transform: translateX(-80%);">{{legify(100)}}s</div>
								<div style="transform: translateX(-50%);">{{legify(1)}}s</div>
							</div>
							<div class="app--counting-label-line2">
								<div>{{legify(100000)}}s</div>
								<div style="transform: translateX(-30%);">{{legify(1000)}}s</div>
								<div>{{legify(10)}}s</div>
							</div>
						</div>
						<div class="app--counting-table">
							<div v-for="i in 11" v-bind:key="i" class="app--counting-table-row mb-3">
								<div v-for="j in 8" v-bind:key="j" class="app--counting-table-el">
									<div v-if="i<11" class="app--counting-table-circle" :data-i="i" :data-j="j"
										v-bind:class="{'app--counting-table-circle-active': countArr[j-2] === 10-i }"
										v-bind:style="{
											border: j===1 ? '1px solid #000' : 'none',
											backgroundColor: j===1 ? 'red' : ''
											}">
									</div>
									<div v-if="i===11" class="app--counting-table-colnum"
										v-bind:style="{
											visibility: j===1 ? 'hidden' : 'visible',
										}" >
										{{ countArr[j-2] }}
									</div>
								</div>
								<div
									v-bind:style="{
										visibility: i===11 ? 'hidden' : 'visible',
									}"
									class="app--counting-table-rownum">
									{{ 10-i }}
								</div>
							</div>
						</div>
						<!-- <div class="app--counting-table-colnum-row">
							<div v-for="j in 8" v-bind:key="j" class="app--counting-table-colnum">
								0
							</div>
						</div> -->
					</div>

				</div>
				<div class="col-12 col-md-5">
					<div class="app--calculator-container">	<!-- Counting calculator -->
						<div class="app--calculator">
							<div class="app--calculator-inner">
								<div class="app--calculator-input">
									{{ legify(count) }}
								</div>
								<div class="app--calculator-panel">
									<div class="app--calculator-row">
										<div class="app--calculator-button">
											C
										</div>
										<div class="app--calculator-button">
											-
										</div>
										<div class="app--calculator-button">
											+
										</div>
									</div>
									<div class="app--calculator-row">
										<div class="app--calculator-button">
											7
										</div>
										<div class="app--calculator-button">
											8
										</div>
										<div class="app--calculator-button">
											9
										</div>
									</div>
									<div class="app--calculator-row">
										<div class="app--calculator-button">
											4
										</div>
										<div class="app--calculator-button">
											5
										</div>
										<div class="app--calculator-button">
											6
										</div>
									</div>
									<div class="app--calculator-row">
										<div class="app--calculator-button">
											1
										</div>
										<div class="app--calculator-button">
											2
										</div>
										<div class="app--calculator-button">
											3
										</div>
									</div>
									<div class="app--calculator-row">
										<div class="app--calculator-button">
											0
										</div>
										<div class="app--calculator-button" style="visibility: hidden;">

										</div>
										<div class="app--calculator-button">
											=
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="app--counting-word">	<!-- Counting word -->
						{{ countWords }}
					</div>
					<div class="app--option">	<!-- Options -->
						<div class="form-group form-check">
							<input type="checkbox" id="counting-style" class="form-check-input" v-model="isUsaStyle">
							<label for="counting-style" class="form-check-label">USA style of counting</label>
						</div>
						<div class="form-check">
							<input
								type="radio"
								class="form-check-input"
								id="counting-speed-1"
								name="counting-speed"
								value="1"
								v-model="countingSpeed">
							<label for="counting-speed-1" class="form-check-label">
								One count per second
							</label>
						</div>
						<div class="form-check">
							<input
								type="radio"
								class="form-check-input"
								id="counting-speed-2"
								name="counting-speed"
								value="2"
								v-model="countingSpeed">
							<label for="counting-speed-2" class="form-check-label">
								Faster counting
							</label>
						</div>
					</div>
					<div class="app--action mt-3">
						<button class="btn btn-outline-success"
							v-if="demoAutoOption==0"
							@click="()=> { if(!this.isStart) this.isStart=true; this.count++;}">
							{{ isStart ? "Next counter" : "Start"  }}
						</button>
						<button class="btn btn-outline-success"
							v-if="demoAutoOption==1"
							@click="handleToggleTimer"
						>
							{{ isStart ? ( timer ? "Pause" : "Resume" ) : "Start" }}
						</button>
						<div class="app--demo-auto-option mt-2">
							<div class="form-check form-check-inline">
								<input type="radio" name="demoAutoOption" value="0" class="form-check-input" id="radio-demo" v-model="demoAutoOption">
								<label for="radio-demo" class="form-check-label">Demo</label>
								<input type="radio" name="demoAutoOption" value="1" class="ml-2 form-check-input" id="radio-auto" v-model="demoAutoOption">
								<label for="radio-auto" class="form-check-label">Auto</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import converter from 'number-to-words';
import { legify } from "../../common/utils.js";

export default {
	data: function() {
		return {
			count: 0,
			demoAutoOption: 0,	// 0 - demo, 1 - option
			isUsaStyle: false,
			countingSpeed: "1",
			timer: null,
			isStart: false
		}
	},
	computed: {
		speed() {
			switch (this.countingSpeed) {
				case '1':
					return 1000;
				case '2':
					return 200;
				default:
					return null;
			}
		},
		countWords() {
			let words = converter.toWords(this.count);
			if(this.isUsaStyle) {
				return words;
			}
			return words.replace('hundred', 'hundred and');
		},
		countArr() {
			const countArrToReturn = [0, 0, 0, 0, 0, 0, 0];
			const countArrTemp = this.count.toString().split('').reverse();
			for(let i = 0; i < countArrTemp.length; i++) {
				countArrToReturn[i] = Number(countArrTemp[i]);
			}
			return countArrToReturn.reverse();
		}
	},
	watch: {
		demoAutoOption(value) {
			if(value == 0) {
				clearInterval(this.timer);
				this.timer = null;
			}
		},
		speed(value, oldValue) {
			if(value != oldValue && this.timer) {
				clearInterval(this.timer);
				this.timer = setInterval(() => { this.count++ } , this.speed);
			}
		}
	},
	methods: {
		legify,
		handleToggleTimer() {
			if(!this.isStart) {
				this.isStart = true;
			}
			if(this.timer) {
				clearInterval(this.timer);
				this.timer = null;
			} else {
				this.timer = setInterval(() => { this.count++ } , this.speed);
			}
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
	.app--action {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.app--action button {
		width: 60%;
	}
	.app--demo-auto-option input,	.app--demo-auto-option label  {
		cursor: pointer;
	}
	.app--calculator {
		height: 20rem;
		width: 12rem;
		margin: 0 auto;
		background-color: #4FCCFC;
		border-radius: 1rem;
		border: 1px solid #333;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.app--calculator-inner {
		width: 80%;
		height: 90%;
	}
	.app--calculator-input {
		font-size: 1.5rem;
		font-weight: 500;
		text-align: right;
		padding: 0 .5rem;
		background-color: #FCEAEC;
		cursor: default;
	}
	.app--calculator-panel {
		margin-top: 9px;
	}
	.app--calculator-row {
		display: flex;
		justify-content: space-between;
		margin: 5px 0;
	}
	.app--calculator-button {
		cursor: default;
		font-size: 1.6rem;
		font-weight: 800;
		background-color: #FFEF42;
		color: #808080;
		width: 30%;
		height: 0;
		padding-bottom: 30%;
		display: flex;
		justify-content: center;
		align-items: baseline;

	}

	.app--counting-word {
		width: 100%;
		height: auto;
		min-height: 3rem;
		border: 1px solid #ddd;
		margin: 1rem 0;
		padding: .5rem;
		font-weight: 500;
	}

	/* .app--counting-table-container {
	} */
	.app--counting-label-line1 {
		width: 80%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.app--counting-label-line2 {
		width: 52%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.app--counting-table {
		padding: .6rem;
		background-color: red;
		border-radius: 10px;
	}
	.app--counting-table-row {
		display: flex;
		justify-content: space-between;
	}
	.app--counting-table-el {
		display: flex;
		justify-content: space-between;
	}
	.app--counting-table-circle {
		background-color: white;
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	.app--counting-table-circle-active {
		background-color: #FF0;
	}
	.app--counting-table-rownum {
		color: #000E64;
		background-color: #eee;
		padding: 0 .5rem;
		display: flex;
		align-items: center;
	}
	.app--counting-table-colnum-row {
		display: flex;
		justify-content: space-between;
	}
	.app--counting-table-colnum {
		width: 40px;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #000E64;
		background-color: #eee;
		transform: translate(8%, -30%);
		border: 1px solid #000;
	}
	@media only screen and (max-width: 424px) {
		.app--counting-table-circle {
			width: 26px;
			height: 26px;
		}
		.app--counting-table-colnum  {
			width: 26px;
			height: 26px;
		}
	}
</style>
