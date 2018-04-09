<template>
  <div class="tpl" v-if="components">
    <ul style="padding: 15px;">
      <li v-for="(item, id) in components" :key="id" :data-id="id" class="component-item">
        <div style="padding: 4px 14px 14px 14px;">
          <div class="bottom clearfix">
            <span class="title">{{item.name}}</span>
            <i class="el-icon-info"></i>
            <i class="el-icon-error"></i>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CompUse',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      components: 'useComps'
    })
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
  .tpl {
    background: #fff;
    width: 240px;
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

  i {
    padding: 0;
    float: right;
    color: #666;
  }
  .el-icon-error {
    margin-right: 10px;
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
  }
  li:last-child {
    margin-bottom: 0;
  }
</style>
