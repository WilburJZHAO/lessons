<template>
	<div class="app--cover-shape mt-3">
		<div class="app--cover-shape-row"
			v-for="(row, rowIndex) in shapeData" :key="rowIndex"
		>
			<app-triangle
				v-for="(data, index) in row"
				:display="data.id>0"
				:key="index"
				:id="data.id"
				:data-id="data.id"
				:hasStyle="hasStyle[data.id]"
				:type="data.type"
				:posId="data.posId"
				ref="shapeEl"
				:class="{'app--triangle-drop': data.id>0}"
				class="app--square-drop"
			></app-triangle>
		</div>
	</div>
</template>

<script>
import interact from 'interactjs';
import Triangle from './Triangle.vue';

export default {
	props: ['shapeData', 'hasStyleIndex'],
	components: {
		appTriangle: Triangle
	},
	data: function() {
		return {
			tilesUsed: 0,
			hasStyle: []
		}
	},
	watch: {
		shapeData(value, oldValue) {
			if(value!==oldValue) {
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
				accept:'.app--shape-selected',
				overlap: 0.6,
				ondrop: this.handleOnDrop
			})
		},
		handleOnDrop(e) {
			let targetId = e.target.getAttribute('data-id');
			let droppedEl = this.$refs.shapeEl.find((el) => {
				return el.id == targetId;
			});
		//	console.log(droppedEl.type);
		//	console.log(e.relatedTarget.getAttribute('data-type'));
			if(!droppedEl.hasStyle && droppedEl.type === e.relatedTarget.getAttribute('data-type')) {
				// 只有当你移动的三角形和要放置的三角形是同一种形状时，才允许。
				this.tilesUsed += 1;
				this.hasStyle[targetId] = true;
				this.hasStyle = [...this.hasStyle];
				this.$emit('setTilesUsed', this.tilesUsed);
			}
			// console.log(this.$refs['shapeEl-'+targetId].$attrs['data-type']);
			// console.log(targetId);
			// console.log(e.relatedTarget);
			// console.log(e.relatedTarget.getAttribute('data-type'));
			// if(e.relatedTarget.getAttribute('data-type') === this.$refs['shapeEl-'+targetId].$attrs['data-type']
			// 	&& !this.$refs['shapeEl-'+targetId].hasStyle	) {
			// 	this.tilesUsed += 1;
			// 	this.hasStyle[targetId]=true;
			// 	this.hasStyle = [...this.hasStyle];
			// 	// 只有当你移动的三角形和要放置的三角形是同一种形状时，才允许。
			// 	this.$emit('setTilesUsed', this.tilesUsed);
			// }
			// this.$refs.shapeEl.hasStyle = true;
		},
		unsetDropZone() {
			interact('.app--square-drop').unset();
		},

	},
	created() {
		this.tilesUsed = 0;
		this.$emit('setTilesUsed', this.tilesUsed);
	},
	mounted() {
		this.setDropZone();
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
