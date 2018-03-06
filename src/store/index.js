import Vue from 'vue'
import Vuex from 'vuex'
import DATA from '@/utils/page'
import { toTree, toList } from '@/utils/transformTree'

Vue.use(Vuex)

const state = {
  list: toList(DATA, 0, []), // 组件列表
  currentIdx: 0 //  当前选中组件的idx
}

const mutations = {
  updateStyle (state, style) {
    this.state.list[this.state.currentIdx].style = style
  },
  changeCurrent (state, idx) {
    this.currentIdx = idx
  },
  updateList (state, list) {
    this.state.list = list
  }
}

const actions = {}

const getters = {
  current: state => {
    return state.list[state.currentIdx]
  },
  page: state => {
    return toTree(state.list)
  }
}

export default new Vuex.Store({
  mutations, actions, state, getters
})
