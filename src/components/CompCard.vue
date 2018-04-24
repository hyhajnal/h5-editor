
<!-- 组件卡片 -->

<template>
  <div class="component">
    <h1 class="title">{{comp.name}}</h1>
    <p class="desc">{{comp.desc}}</p>
    <card-bottom class="bottom" />
    <el-row class="shadow" type="flex" justify="space-around" align="middle">
      <i class="el-icon-circle-plus" @click.stop="addComp" v-if="!isAdd"></i>
      <i class="el-icon-success" v-else></i>
      <i class="el-icon-info" @click="openInfo"></i>
    </el-row>
    <el-dialog title="组件信息" :visible.sync="show">
      <ul>
        <li><strong>组件名：</strong><span>{{comp.name}}</span></li>
        <li><strong>组件类型：</strong><span>{{comp.tag}}</span></li>
        <li><strong>组件标签：</strong><span>{{comp.type}}</span></li>
        <li><strong>组件描述：</strong><span>{{comp.desc}}</span></li>
        <li>
          <strong>组件属性：</strong>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="date"
              label="属性名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="属性类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="默认值">
            </el-table-column>
          </el-table>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import CardBottom from './Bottom'
export default {
  name: 'CompCard',
  data () {
    return {
      isAdd: false,
      editor: null,
      show: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }]
    }
  },
  mounted () {
    const components = this.$store.state.components
    components.forEach(item => {
      if (item.id === this.comp.id) {
        this.isAdd = true
        return false
      }
    })
  },
  props: {
    comp: Object
  },
  components: {
    CardBottom
  },
  methods: {
    addComp () {
      this.$store.commit('addComp', this.comp)
      this.isAdd = true
      this.$notify({
        title: '成功',
        message: '已添加至组件库',
        type: 'success'
      })
    },
    openInfo () {
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  padding: 14px;
  background: #ffff;
  border-radius: 4px;
  height: 100px;
  position: relative;
}
.title {
  font-size: 14px;
  color: #555;
}
.desc {
  font-size: 12px;
  color: #909090;
  margin: 4px 0 14px 0;
}
.shadow {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100;
  position: absolute;
  display: none;
  top: 0;
  left: 0;
  i {
    color: #fff;
    font-size: 28px;
    cursor: pointer;
  }
}
.component:hover {
  .shadow {
    display: flex;
  }
}
li {
  margin-bottom: 10px;
  display: flex;
}
ul {
  span {
    background: #F6F7F8;
    padding: 4px 10px;
    flex: 1;
    display: block;
  }
  strong {
    margin-right: 10px;
    width: 100px;
    display: inline-block;
    padding: 4px 0;
  }
}
</style>
