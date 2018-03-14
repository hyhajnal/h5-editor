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
    let { list, current } = JSON.parse(JSON.stringify(state))
    treeTravel(list, current.id).then(item => {
      item.style = style
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
    let style = getInitStyle(type)
    let list = JSON.parse(JSON.stringify(state.list))
    treeTravel(list, pid).then(item => {
      item.splice(idx, 0, {
        id, pid, style, type, label: `${type}/${id}`
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
    this.state.current = ele
  }
  // moveEle (state, payload) {
  //   const { oIdx, oPid, nIdx, nPid } = payload
  //   let tmp = null
  //   treeTravel(this.state.list, oPid).then(item => {
  //     tmp = item[oIdx]
  //     item.splice(oIdx, 1)
  //   })
  //   treeTravel(this.state.list, nPid).then(item => {
  //     tmp.pid = nPid
  //     item.splice(nIdx, 0, tmp)
  //   })
  // }
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
