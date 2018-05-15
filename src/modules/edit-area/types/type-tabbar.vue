<template>
  <ul :style="ele.style">
    <li class="custom-wrap"
      v-for="(item, index) in list"
      :key="item.id"
      @click="() => onActive(index)"
    >
      <!-- <i v-if="item.icon"
        :class="['iconfont', item.icon]"
        :style="!props.active ? normalStyle: activeStyle">
      </i> -->
      <i v-if="item.icon"
        :class="['iconfont', item.icon]"
        :style="active === index ? activeStyle :normalStyle"
      />
      <div class="dot">{{item.info}}</div>
      <span
        v-if="item.label"
        :style="active === index ? activeStyle :normalStyle">
        {{item.label}}
      </span>
    </li>
  </ul>
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
  },
  methods: {
    onActive (index) {
      this.active = index
    }
  }
}
</script>

<style scoped>
ul {
  display: flex;
  height: 50px;
  width: 100%;
  position: absolute !important;
  bottom: 0;
  left: 0;
  border-top: 1px solid #f2f2f2;
}
.custom-wrap {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
}
span {
  font-size: 12px;
  margin-top: 5px;
  cursor: pointer;
}
i {
  cursor: pointer;
  font-size: 16px;
}
.dot {
  position: absolute;
  left: 50%;
  margin-left: 15px;
  top: 2px;
  color: #fff;
  border-radius: .6em;
  background: #f44;
  font-size: .5em;
  padding: 0 .3em;
}
</style>


