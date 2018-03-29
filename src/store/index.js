import Vue from 'vue'
import Vuex from 'vuex'
// import Page from '@/utils/page.json'
import Components from '@/utils/components.json'
import { treeTravel } from '@/utils/transformTree'
import { guid, getInit, mobiles } from '@/utils/help'

Vue.use(Vuex)

const state = {
  pageInfo: null,
  list: [], // 组件列表
  current: null, //  当前选中组件的idx
  isDraging: false,
  components: Components,
  device: {...mobiles[0], percent: 100}
}

const actions = {
  changeModule ({ state, commit }, mod) {
    const info = {
      id: mod.id,
      name: mod.name
    }
    const list = JSON.parse(mod.elements).elements
    commit('changeModule', { info, list })
  },
  updateStyle ({ state, commit }, style) {
    if (!state.current) return
    let { list, current } = JSON.parse(JSON.stringify(state))
    console.log(current.pid)
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
    })
    treeTravel(list, nPid).then(item => {
      tmp.pid = nPid
      item.splice(nIdx, 0, tmp)
      commit('update', list)
    })
  },
  addEle ({ state, commit }, payload) {
    const { type, pid, idx } = payload
    let id = guid()
    let attr = getInit(type)
    let list = JSON.parse(JSON.stringify(state.list))
    treeTravel(list, pid).then(item => {
      item.splice(idx, 0, {
        id, pid, ...attr, type, label: `${type}/${id}`, children: []
      })
      commit('update', list)
    })
  },

  /**
   * 复制组件
   * @param {组件的id} type
   * @param {拖入的父元素id} pid
   * @param {拖入的父元素index} idx
   */
  addComp ({ state, commit }, payload) {
    const { type, pid, idx } = payload
    console.log(payload)
    let list = JSON.parse(JSON.stringify(state.list))
    const newCompIdx = state.components.findIndex(c => c.id === type)
    treeTravel(list, pid).then(item => {
      item.splice(idx, 0, state.components[newCompIdx].content)
      commit('update', list)
    })
  },

  /**
   * 删除元素
   * @param {*} pid
   * @param {*} idx
   */
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
  },
  changeDevice (state, device) {
    Vue.set(state, 'device', device)
  },
  changeModule (state, { info, list }) {
    Vue.set(state, 'pageInfo', info)
    Vue.set(state, 'list', list)
  }
}

const getters = {
  current: state => {
    return state.current
  },
  page: state => {
    // return toTree(state.list)
    return state.list
  },
  pageInfo: state => {
    return state.pageInfo
  },
  device: state => {
    return state.device
  },
  components: state => {
    return state.components
  }
}

export default new Vuex.Store({
  mutations, actions, state, getters
})
