<template>
  <div class="tpl">
    <!-- <ul style="padding: 15px;"> -->
    <p class="tip">
      按
      <router-link :to="{name: 'Home', params: {type: 'comp'}}">
        <i class="el-icon-circle-plus-outline"></i>
      </router-link>
      从资源库中选取需要的组件
    </p>
    <draggable
      element="ul"
      :options="{group:{name:'resource1',pull:'clone',put:false}}"
      @end="onEnd"
    >
      <li v-for="item in components" :key="item.id" :data-id="item.id" class="component-item">
        <div style="padding: 4px 14px 14px 14px;">
          <div class="bottom clearfix">
            <span class="title">{{item.name}}-{{item.id}}</span>
            <i class="el-icon-info"></i>
            <i class="el-icon-error"></i>
          </div>
        </div>
      </li>
    <!-- </ul> -->
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomElement from '@/modules/preview-area/custom-element'
import draggable from 'vuedraggable'
export default {
  name: 'Tpl',
  data () {
    return {
      currentDate: new Date()
    }
  },
  components: {
    draggable,
    CustomElement
  },
  computed: {
    ...mapGetters({
      components: 'components'
    })
  },
  methods: {
    onEnd (obj) {
      const pid = obj.to.dataset.id || obj.to.children[0].dataset.pid || 'root'
      const p = document.getElementById('page')
      const el = p.getElementsByClassName('component-item')[0]
      el && el.remove()
      let nIdx = obj.to.classList[0] === 'col-container' ? parseInt(obj.to.dataset.index) : obj.newIndex
      console.log('[Edit]', `${pid}的${nIdx}新增模版${obj.item.dataset.id}`)
      this.$store.dispatch('addComp', {
        type: obj.item.dataset.id,
        pid: pid,
        idx: nIdx
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
    width: 240px;
  }
  .tip {
    font-size: 12px;
    background: #F6F7F8;
    color: #5b6b73;
    padding: 5px;
    margin: 15px;
  }
  .component-item {
    cursor: move;
  }
  .title {
    font-size: 14px;
    color: #555;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .component-preview {
    transform: scale(0.6);
    // position: absolute;
    // top: 0;
    // left: 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  li {
    border-bottom: 1px solid #eee;
    i {
      padding: 0;
      float: right;
      color: #666;
    }
    .el-icon-error {
      margin-right: 10px;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
