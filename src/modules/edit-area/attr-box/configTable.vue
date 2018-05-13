<template>
  <div class="table-wrap">
    <span class="tip">数据源配置</span>
    <table border="1" bordercolor="#f2f2f2" style="border-collapse:collapse;">
      <thead>
        <tr>
          <th>操作</th>
          <th v-for="(item, i) in tableData[0]" :key="item">{{i}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in tableData" :key="i">
          <th><i class="el-icon-delete" @click="i => delRow(i)"></i></th>
          <th
            v-for="(key, j) in item"
            :key="j"
          >
            <input type="text" v-model="tableData[i][j]" v-if="typeof(tableData[i][j]) === 'string'">
            <el-input-number size="small" v-model="tableData[i][j]" v-if="typeof(tableData[i][j]) === 'number'" />
            <van-switch v-model="tableData[i][j]" size="small" v-if="typeof(tableData[i][j]) === 'boolean'" />
          </th>
        </tr>
      </tbody>
    </table>
    <el-button size="mini" @click="addRow" style="margin: 10px 0;">
      新增行
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'ConfigTable',
    props: {
      value: Array
    },
    data () {
      return {
        tableData: this.value
      }
    },
    watch: {
      tableData: {
        handler () {
          this.$emit('input', this.tableData)
          this.$emit('change', this.tableData)
        },
        deep: true
      }
    },
    methods: {
      addRow () {
        this.tableData.push(this.tableData[0])
      },
      delRow (i) {
        if (this.tableData.length > 1) {
          this.tableData.splice(i, 1)
        }
      }
    }
  }
</script>

<style scoped>
.table-wrap {
  overflow: auto;
}
input {
  border: none;
  color: #5b6b73;
  padding: 4px;
}
i {
  cursor: pointer;
}
th {
  min-width: 50px;
  font-weight: normal;
}
span {
  font-size: 14px;
  background: #F6F7F8;
  color: #5b6b73;
  padding: 5px;
  display: inline-block;
  margin-bottom: 15px;
}
</style>

<style lang="scss">
.table-wrap {
  ::-webkit-scrollbar{
    display:none;
  }
} 
</style>


