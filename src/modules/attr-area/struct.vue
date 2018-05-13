<template>
  <el-tree
    :data="tree"
    node-key="id"
    default-expand-all
    :expand-on-click-node="false">
    <span class="custom-tree-node" slot-scope="{ node, data }"
      @mouseover.stop="() => onHover(node,data)"
      @mouseout.stop="() => noHover(node,data)"
    >
      <span @click.stop="() => onActive(data)">
        <i :class="'icontype iconfont icon-' + data.type" />
        {{node.label}}
        <el-tag size="mini" v-if="data.className">{{data.className}}</el-tag>
      </span>
      <span>
        <i class="iconfont icon-eye"
          v-show="data.show"
        />
        <i class="el-icon-circle-close-outline" @click="() => remove(node, data)"></i>
      </span>
    </span>
  </el-tree>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Bus from '@/utils/Bus'
  import { treeTravelById } from '@/utils/transformTree'

  export default {
    name: 'Struct',
    computed: {
      ...mapGetters({
        tree: 'page'
      })
    },
    methods: {

      remove (node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const idx = children.findIndex(d => d.id === data.id)
        // children.splice(index, 1)
        console.log(idx)
        this.$store.dispatch('delEle', { pid: data.pid, idx })
      },

      onHover (node, data) {
        let el = document.getElementById(data.id)
        el && el.classList.add('selected')
      },

      noHover (node, data) {
        let el = document.getElementById(data.id)
        el && el.classList.remove('selected')
      },

      onActive (data) {
        treeTravelById(this.tree, data.id).then(ele => {
          this.$store.commit('changeCurrentEl', ele)
          Bus.$emit('changeCurrentEl')
        })
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
.icontype {
  margin-right: 5px;
  font-size: 14px;
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


