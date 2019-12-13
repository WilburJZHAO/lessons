<template>
  <div class="app--table-container">
    <table class="table table-bordered table-striped text-center app--table">
      <thead>
        <th>Number</th>
        <th># Additions</th>
      </thead>
      <tbody class="text-primary">
        <tr
          :class="{
            'table-primary':
              selectedIndex === k - 1 && selectedIndex < tableData.length
          }"
          v-for="k in 8"
          :key="k - 1"
          @click="
            () => {
              handleEmitData(k - 1);
            }
          "
        >
          <!-- index from 0 - 7 -->
          <td>{{ tableData && tableData[k - 1] && tableData[k - 1].number }}</td>
          <td>
            {{
            tableData && tableData[k - 1] && tableData[k - 1].additionNumber
            }}
          </td>
        </tr>
        <tr
          v-for="(data, index) in remainTableData"
          :class="{ 'table-primary': selectedIndex === index + 8 }"
          :key="index + 8"
          @click="
            () => {
              handleEmitData(index + 8);
            }
          "
        >
          <td>{{ data.number }}</td>
          <td>{{ data.additionNumber > 175 ? "> 175" : data.additionNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["tableData", "selectedIndex"],
  computed: {
    remainTableData() {
      if (!this.tableData || this.tableData.length <= 8) {
        return [];
      } else {
        let arr = [];
        for (let i = 8; i < this.tableData.length; i++) {
          arr.push(this.tableData[i]);
        }
        return arr;
      }
    }
  },
  methods: {
    handleEmitData(index) {
      this.$emit("selectData", index);
    }
  }
};
</script>

<style scoped>
.app--table-container {
  max-height: 333px;
  overflow-y: auto;
}
.app--table th {
  padding: 5px !important;
}

.app--table td {
  height: 35px;
  padding: 5px !important;
}
</style>
