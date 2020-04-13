<template>
	<div>
		<div class="container mt-4 mb-5">
			<h3 class="lesson-subheading">Make your own using strategies</h3>
			<hr class="subheading-separator">
			<div class="row">
				<div class="col-12 col-md-6">
					<h4 class="text-success mb-3">Drag the number tiles to make a magic square</h4>
					<app-select-size @selectSize="selectedSize=$event"></app-select-size>
					<app-square
						:size="selectedSize"
						:step="step"
						:strategy="strategy"
						:lockRows="lockRows"
						:lockCols="lockCols"
						@watchSquare="squareMagicStatus=$event"
					></app-square>
				</div>
				<div class="col-12 col-md-6">
					<h4 class="mb-4">Strategy - to break a problem into manageable parts</h4>
					<div class="app--select-strategy mb-4">
						<div class="text-danger font-weight-bold">Start with</div>
						<div class="app--select-options">
							<div class="form-check">
								<input type="radio" name="strategy" class="form-check-input"
									id="rows-first" v-model="strategy" value="rowsFirst" :disabled="!squareMagicStatus || squareMagicStatus.reset===false">
								<label class="form-check-label" for="rows-first">Rows</label>
							</div>
							<div class="form-check">
								<input type="radio" name="strategy" class="form-check-input"
									id="cols-first" v-model="strategy" value="colsFirst" :disabled="!squareMagicStatus || squareMagicStatus.reset===false">
								<label class="form-check-label" for="cols-first">Columns</label>
							</div>
						</div>
					</div>
					<div class="app--select-prompt" v-if="strategy === 'rowsFirst'">
						<div v-if="!lockRows && !lockCols">
							<p class="text-danger">Firstly, focus just on the rows. Arrange rows so that each adds to {{magicSum}}</p>
						</div>
						<div v-if="lockRows && !lockCols">
							<p class="text-danger">Now, secondly, swap within rows until each column adds to {{ magicSum }}</p>
						</div>
						<div v-if="lockRows && lockCols">
							<p class="text-danger">Finally, swap whole rows or columns to make the diagnoals add to {{ magicSum }}</p>
						</div>
						<div class="mt-3">
							<div v-if="isAllRowMagic && step>=1 || lockRows" class="form-check">
								<input type="radio" class="form-check-input" id="lock-rows" v-model="lockRows" value=true>
								<label class="form-check-label" for="lock-rows">Lock rows</label>
							</div>
							<div v-if="isAllColMagic && step>=2 || lockCols" class="form-check">
								<input type="radio" class="form-check-input" id="lock-cols" v-model="lockCols" value=true>
								<label class="form-check-label" for="lock-cols">Lock columns</label>
							</div>
							<button class="btn btn-secondary mt-2" v-if="lockRows || lockCols" @click="handleUnlock">Unlock</button>
						</div>
					</div>

					<div class="app--select-prompt" v-if="strategy === 'colsFirst'">
						<div v-if="step===1">
							<p class="text-danger">Firstly, focus just on the columns. Arrange columns so that each adds to {{magicSum}}</p>
						</div>
						<div v-if="step===2">
							<p class="text-danger">Now, secondly, swap within rows until each column adds to {{ magicSum }}</p>
						</div>
						<div v-if="step===3">
							<p class="text-danger">Finally, swap whole rows or columns to make the diagnoals add to {{ magicSum }}</p>
						</div>
						<div class="mt-3">
							<div v-if="isAllColMagic && step >= 1" class="form-check">
								<input type="radio" class="form-check-input" id="lock-cols" v-model="lockCols" value=true>
								<label class="form-check-label" for="lock-cols">Lock columns</label>
							</div>
							<div v-if="isAllRowMagic && step >= 2" class="form-check">
								<input type="radio" class="form-check-input" id="lock-rows" v-model="lockRows" value=true>
								<label class="form-check-label" for="lock-rows">Lock rows</label>
							</div>
							<button class="btn btn-secondary mt-2" v-if="lockRows || lockCols" @click="handleUnlock">Unlock</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Square from './Square.vue';
import SelectSize from './SelectSize.vue';
export default {
	components: {
		appSquare: Square,
		appSelectSize: SelectSize
	},
	data: function() {
		return {
			selectedSize: '3',
			strategy: 'rowsFirst',
			squareMagicStatus: null,
			lockRows: false,
			lockCols: false,
		}
	},
	watch: {
		squareMagicStatus(value) {
			if(value && value.reset) {
				this.lockRows = false;
				this.lockCols = false;
			}
		}
	},
	computed: {
		step() {
			if(this.strategy === 'rowsFirst') {
				if(!this.lockRows && !this.lockCols) return 1;
				if(this.lockRows && !this.lockCols) return 2;
				if(this.lockRows && this.lockCols) return 3;
			}
			if(this.strategy === 'colsFirst') {
				if(!this.lockRows && !this.lockCols) return 1;
				if(this.lockCols && !this.lockRows) return 2;
				if(this.lockRows && this.lockCols) return 3;
			}
		},
		magicSum() {
			switch(this.selectedSize) {
				case '3':
					return 15;
				case '4':
					return 34;
				default:
					return 0;
			}
		},
		isAllRowMagic() {
			if(!this.squareMagicStatus) return false;
			const { isRowMagic } = this.squareMagicStatus;
			for(let i = 0; i < isRowMagic.length; i++) {
				if(!isRowMagic[i]) {
					return false;
				}
			}
			return true;
		},
		isAllColMagic() {
			if(!this.squareMagicStatus) return false;
			const { isColMagic } = this.squareMagicStatus;
			for(let i = 0; i < isColMagic.length; i++) {
				if(!isColMagic[i]) {
					return false;
				}
			}
			return true;
		}
	},
	methods: {
		handleUnlock() {
			this.lockRows = this.lockCols = false;
		}
	}
}
</script>

<style scoped>
.app--select-strategy {
	display: flex;
	justify-content: space-around;
}
</style>
