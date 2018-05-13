<template>
  <van-tabbar v-model="active" :style="ele.style">
    <van-tabbar-item
      v-for="item in list"
      :key="item.id"
      :dot="item.dot"
      :info="item.info"
    >
      <!-- <span :style="!props.active ? normalStyle: activeStyle">{{item.label}}</span> -->
      <template slot="icon" slot-scope="props">
        <div class="custom-wrap">
          <i v-if="item.icon"
            :class="['iconfont', item.icon]"
            :style="!props.active ? normalStyle: activeStyle">
          </i>
          <br />
          <span
            v-if="item.label"
            :style="!props.active ? normalStyle: activeStyle">
            {{item.label}}
          </span>
        </div>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    ele: Object
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    list () {
      return this.ele && this.ele.config[0].data
    },
    normalStyle () {
      return `color: ${this.ele.config[1].data};`
    },
    activeStyle () {
      return `color: ${this.ele.config[2].data};`
    }
  }
}
</script>

<style scoped>
.custom-wrap {
  text-align: center;
}
span {
  font-size: 12px;
}
</style>

<style>
.van-tabbar-item__icon {
  margin-bottom: 0px;
  width: 100%;
}
</style>


