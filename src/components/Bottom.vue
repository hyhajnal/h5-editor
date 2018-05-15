<template>
  <el-row type="flex" justify="space-between" align="middle" class="bottom-wrap">
    <el-row type="flex" justify="space-between" align="middle" class="owner">
      <img src="/static/avatar.jpeg" alt="avatar" width="20" height="20">
      <span>{{owner || '发布者'}}</span>
    </el-row>
    <div class="social-bar">
      <span v-if="visitCount !== undefined">
        <i class="iconfont icon-eye"></i>{{visitCount}}
      </span>
      <span v-if="useCount !== undefined">
        <i class="iconfont icon-like"></i>{{useCount}}
      </span>
      <span v-if="collectCount !== undefined">
        <i class="iconfont icon-favor"></i>{{collectCount}}
      </span>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'CardBottom',
  props: {
    visitCount: Number,
    useCount: Number,
    collectCount: Number,
    owner: String
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.bottom-wrap {
  width: 100%;
}
.owner {
  img {
    border-radius: 100%;
    margin-right: 5px;
  }
  span {
    font-size: 13px;
  }
}
.social-bar {
  font-size: 13px;
  color: #555;
  margin-top: 5px;
  span {
    margin-right: 4px;
  }
  margin-right: -4px;
  i {
    margin-right: 2px;
  }
}
</style>
