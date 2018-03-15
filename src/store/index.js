import Vue from 'vue'
import Vuex from 'vuex'
import { DATA } from '@/utils/page'
import { treeTravel } from '@/utils/transformTree'
import { guid, getInit } from '@/utils/help'

Vue.use(Vuex)

const state = {
  list: DATA, // 组件列表
  current: null, //  当前选中组件的idx
  isDraging: false
}

const actions = {
  updateStyle ({ state, commit }, style) {
    if (!state.current) return
    let { list, current } = JSON.parse(JSON.stringify(state))
    treeTravel(list, current.pid).then(item => {
      const idx = item.findIndex(d => d.id === current.id)
      item[idx].style = style
      commit('update', list)
    })
  },
  updateConfig ({ state, commit }, config) {
    if (!state.current) return
    let { list, current } = JSON.parse(JSON.stringify(state))
    treeTravel(list, current.pid).then(item => {
      const idx = item.findIndex(d => d.id === current.id)
      item[idx].config = config
      commit('update', list)
    })
  },
  moveEle ({ state, commit }, payload) {
    const { oIdx, oPid, nIdx, nPid } = payload
    let tmp = null
    let list = JSON.parse(JSON.stringify(state.list))
    treeTravel(list, oPid).then(item => {
      tmp = item[oIdx]
      item.splice(oIdx, 1)
      treeTravel(list, nPid).then(item => {
        tmp.pid = nPid
        item.splice(nIdx, 0, tmp)
        commit('update', list)
      })
    })
  },
  addEle ({ state, commit }, payload) {
    const { type, pid, idx } = payload
    let id = guid()
    let attr = getInit(type)
    let list = JSON.parse(JSON.stringify(state.list))
    treeTravel(list, pid).then(item => {
      item.splice(idx, 0, {
        id, pid, ...attr, type, label: `${type}/${id}`
      })
      commit('update', list)
    })
  },
  delEle ({ state, commit }, payload) {
    const { pid, idx } = payload
    let list = JSON.parse(JSON.stringify(state.list))
    treeTravel(list, pid).then(item => {
      item.splice(idx, 1)
      commit('update', list)
    })
  }
}

const mutations = {
  update (state, list) {
    Vue.set(state, 'list', list)
  },
  changeCurrent (state, ele) {
    Vue.set(state, 'current', ele)
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
