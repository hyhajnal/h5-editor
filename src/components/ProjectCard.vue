<template>
  <div class="card" @click="goDetail" v-if="project">
    <figure class="card-image">
    </figure>
    <section class="card-body">
      <h3 class="title">{{project.name}}</h3>
      <card-bottom
        :visitCount="project.visitCount"
        :useCount="project.useCount"
        :collectCount="project.collectCount"
      />
    </section>
    <span class="tag" v-if="tag">{{tag}}</span>
  </div>
</template>

<script>
import CardBottom from './Bottom'
export default {
  name: 'ProjectCard',
  data () {
    return {
      tag: ''
    }
  },
  mounted () {
    this.tag = (this.project.tag.charCodeAt() === 39) ? '' : this.project.tag
  },
  props: {
    project: Object
  },
  components: {
    CardBottom
  },
  methods: {
    goDetail () {
      this.$router.push({name: 'ProjectDetail', query: {id: this.project.id}})
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
  height: 270px;
  border-radius: 4px;
}
.card-image {
  background-image: url('/static/hua.jpg');
  height: 200px;
  background-size: cover;
  position: relative;
}
.title {
  text-align: center;
}
.shadow {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.13);
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
