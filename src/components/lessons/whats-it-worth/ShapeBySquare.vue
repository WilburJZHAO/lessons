<template>
	<div class="app--cover-shape mt-3">
		<div class="app--cover-shape-row" v-for="(row, index) in shapeData" :key="index">
			<app-square
				v-for="(data, index) in row"
				:display="data>0"
				:key="index"
				:id="data"
				:data-id="data"
				:hasStyle="hasStyle[data] ? hasStyle[data] : false"
				ref="shapeEl"
				:class="{'app--square-drop': data>0}"
			></app-square>
		</div>
	</div>
</template>

<script>
import interact from 'interactjs';
import Square from './Square.vue';

export default {
	props: ['shapeData', 'hasStyleIndex'],
	components: {
		appSquare: Square,
	},
	data: function() {
		return {
			tilesUsed: 0,
			hasStyle: []
		}
	},
	watch: {
		shapeData(value, oldValue) {
			if(value !== oldValue) {
				// console.log('value');
				this.hasStyle = [];
				this.tilesUsed = 0;
				this.$emit('setTilesUsed', this.tilesUsed);
			}
		},
		hasStyleIndex(value) {
			if(value===0) {
				this.hasStyle = [];
			} else {
				this.hasStyle[value] = 1;
				this.hasStyle = [...this.hasStyle];
			}
		}
	},
	methods: {
		setDropZone() {
			interact('.app--square-drop').dropzone({
				accept: '.app--shape-selected',
				overlap: 0.6,
				ondropactivate: this.handleOnDropActivate,
				ondragenter: this.handleOnDragEnter,
				ondragleave: this.handleOnDragLeave,
				ondrop: this.handleOnDrop,
				ondropdeactivate: this.handleOndropdeactivate
			})
		},
		handleOnDrop(e) {
			// console.log('handleOnDrop');
			// let dropped = e.target;
			let targetId = e.target.getAttribute('data-id');
			// console.log(targetId);
			// console.log(this.$refs.shapeEl);
			let droppedEl = this.$refs.shapeEl.find((el) => {
				// console.log(el.id);
				return el.id == targetId;
			});
			if(!droppedEl.hasStyle) {
				this.tilesUsed += 1;
				this.hasStyle[targetId] = true;
				this.hasStyle = [...this.hasStyle];
				this.$emit('setTilesUsed', this.tilesUsed)
			}
			// console.log(droppedEl);
		},
		unsetDropZone() {
			interact('.app--square-drop').unset();
		},
	},
	mounted() {
		this.setDropZone();
	},
	created() {
		this.tilesUsed = 0;
		this.$emit('setTilesUsed', this.tilesUsed);
	},
	destroyed() {
		this.unsetDropZone();
	}
}
</script>

<style scoped>
.app--cover-shape-row {
	display: flex;
}
</style>
