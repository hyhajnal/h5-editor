import Vue from 'vue'
import Vuex from 'vuex'
import DATA from '@/utils/page'
import { toTree, toList } from '@/utils/transformTree'
import { guid, getInitStyle } from '@/utils/help'

Vue.use(Vuex)

const state = {
  list: toList(DATA), // 组件列表
  current: null, //  当前选中组件的idx
  isDraging: false
}

const mutations = {
  updateStyle (state, style) {
    this.state.current.style = style
  },
  changeCurrent (state, ele) {
    this.state.current = ele
  },
  moveEle (state, { id, idx, pid }) {
    this.state.list.forEach(item => {
      if (item.id === id) {
        item.idx = idx
        item.pid = pid
        return true
      }
    })
  },
  addEle (state, { type, pid, idx }) {
    let id = guid()
    let style = getInitStyle(type)
    this.state.list.push({
      id, pid, style, type, idx
    })
  },
  delEle (state, id) {
    let idx
    this.state.list.forEach((item, index) => {
      if (item.id === id) {
        idx = index
        return true
      }
    })
    this.state.list.splice(idx, 1)
  }
}

const actions = {}

const getters = {
  current: state => {
    return state.current || state.list[0]
  },
  page: state => {
    return toTree(state.list)
  }
}

export default new Vuex.Store({
  mutations, actions, state, getters
})
