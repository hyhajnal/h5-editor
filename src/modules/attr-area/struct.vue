<template>
  <el-tree
    :data="data"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false">
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <!-- <span @dblclick="() => {data.edit = true}"
        v-clickoutside="clickOut"
        :arg="data"
      >
        <i class="iconfont icon-dir" v-if="!node.isLeaf"></i>
        <template v-if="!data.edit">{{ node.name }}</template>
        <el-input
          class="tree-input"
          v-else
          v-model="node.name"
          placeholder="请输入内容"
          size="mini"
        >
        </el-input>
      </span> -->
      <span>
        <i class="iconfont icon-dir" v-if="!node.isLeaf"></i>
        {{node.label}}
      </span>
      <span>
        <i class="iconfont icon-eye"
          v-show="data.show"
        />
        <!-- <i class="el-icon-circle-plus-outline" @click="() => append(data)"></i> -->
        <i class="el-icon-circle-close-outline" @click="() => remove(node, data)"></i>
      </span>
    </span>
  </el-tree>
</template>

<script>
  import DATA from '@/utils/page'
  let id = 1000

  export default {
    name: 'Struct',
    data () {
      return {
        data: DATA
      }
    },
    methods: {
      append (data) {
        const newChild = { id: id++, name: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      clickOut (data) {
        // data.edit = false
      }

    }
  }
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.el-icon-circle-plus-outline {
  margin: 0 5px;
}
.icon-dir {
  margin-right: 5px;
}
.tree-input {
  max-width: 120px;
}
</style>

<style>
.el-tree-node__content {
  margin-bottom: 5px !important;
}
</style>


