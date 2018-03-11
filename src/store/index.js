import Vue from 'vue'
import Vuex from 'vuex'
import { DATA } from '@/utils/page'
import { treeTravel } from '@/utils/transformTree'
import { guid, getInitStyle } from '@/utils/help'

Vue.use(Vuex)

const state = {
  list: DATA, // 组件列表
  current: null, //  当前选中组件的idx
  isDraging: false
}

const actions = {
  updateStyle ({ state, commit }, {style}) {
    if (!state.current) return
    treeTravel(state.list, state.current.id).then(item => {
      item.style = style
      commit('update', state.list)
    })
  },
  moveEle ({ state, commit }, payload) {
    const { oIdx, oPid, nIdx, nPid } = payload
    let tmp = null
    treeTravel(state.list, oPid).then(item => {
      tmp = item[oIdx]
      item.splice(oIdx, 1)
    })
    treeTravel(state.list, nPid).then(item => {
      tmp.pid = nPid
      item.splice(nIdx, 0, tmp)
      commit('update', state.list)
    })
  },
  addEle ({ state, commit }, payload) {
    const { type, pid, idx } = payload
    let id = guid()
    let style = getInitStyle(type)
    treeTravel(state.list, pid).then(item => {
      item.splice(idx, 0, {
        id, pid, style, type, label: `${type}/${id}`
      })
      commit('update', state.list)
    })
  },
  delEle ({ state, commit }, payload) {
    const { pid, idx } = payload
    treeTravel(state.list, pid).then(item => {
      item.splice(idx, 1)
      commit('update', state.list)
    })
  }
}

const mutations = {
  update (state, list) {
    state = list
  },
  changeCurrent (state, ele) {
    this.state.current = ele
  }
}

const getters = {
  current: state => {
    return state.current || state.list[0]
  },
  page: state => {
    // return toTree(state.list)
    return state.list
  }
}

export default new Vuex.Store({
  mutations, actions, state, getters
})
