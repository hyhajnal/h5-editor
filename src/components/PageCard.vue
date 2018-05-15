<template>
  <div class="card" @click="goDetail" v-if="page">
    <figure class="card-image" :style="bgImg">
      <el-row class="shadow" type="flex" justify="space-around" align="middle">
        <i class="el-icon-circle-plus"></i>
        <i class="el-icon-search"></i>
        <i class="el-icon-menu" @click.stop="open"></i>
      </el-row>
    </figure>
    <section class="card-body">
      <h3 class="title">{{page.name}}</h3>
      <card-bottom
        :visitCount="page.visitCount"
        :collectCount="page.collectCount"
      />
    </section>
    <!-- <span class="tag">页面</span> -->

    <el-dialog
      title="二维码"
      :visible.sync="dialogVisible"
      width="30%"
      @close.stop="close">
      <span>这是一段信息</span>
    </el-dialog>

  </div>
</template>

<script>
// import Config from '@/utils/config'
import CardBottom from './Bottom'

export default {
  name: 'PageCard',
  data () {
    return {
      dialogVisible: false,
      img: this.page.img.charCodeAt() !== 39 ? this.page.img : 'none.png'
    }
  },
  props: {
    page: Object
  },
  computed: {
    bgImg () {
      return `background-image: url(http://localhost/static/${this.img});`
    }
  },
  components: { CardBottom },
  methods: {
    goDetail () {
      // this.$router.push({name: 'PageDetail'})
      this.$router.push({
        name: 'Edit',
        query: {
          id: this.page.id
        }
      })
    },
    open () {
      this.dialogVisible = true
    },
    close () {
      this.dialogVisible = false
      // e.stopPropagation()
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 487px;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
}
.card-image {
  height: 417px;
  background-size: 100% 100%;
  // background-size: cover;
  position: relative;
  box-shadow: #ddd 0px 2px 5px;
  background: #fff;
}
.shadow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  position: absolute;
  display: none;
  i {
    color: #fff;
    font-size: 42px;
  }
}
.card-image:hover {
  .shadow {
    display: flex;
  }
}
.card-body {
  padding: 10px;
  background: #fff;
}
h3 {
  font-size: 14px;
  margin-bottom: 5px;
}
.tag {
  position: absolute;
  top: 20px;
  right: 0;
  background: #4ED7EC;
  color: #fff;
  font-size: 13px;
  padding: 2px 10px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-right: -2px;
}
</style>
