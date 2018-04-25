import Vue from 'vue'
import Vuex from 'vuex'
// import Page from '@/utils/page.json'
// import Components from '@/utils/components.json'
// import Modules from '@/utils/modules.json'
// import Templs from '@/utils/templs.json'
import { treeTravel, treeTravelById, moduleSelect, copyElorTempl } from '@/utils/transformTree'
import { guid, getInit, mobiles } from '@/utils/help'

Vue.use(Vuex)

const state = {
  info: null, // id & name
  list: [], // 页面-(组件列表)
  moduleInfo: null,
  moduleList: [], // 模块-(组件列表)
  currentComp: null, // preview页-当前组件
  current: null, //  当前选中组件的idx
  isDraging: false,
  isModuleEdit: false, // 编辑的是否是模块
  components: [],
  modules: [],
  templs: [],
  device: {...mobiles[0], percent: 100}
}

const actions = {
  changeCurrent ({ state, commit }, data) {
    let info = {}
    let list = []
    const isModuleEdit = data.id ? 0 : 1
    // 页面编辑的状态下
    if (!isModuleEdit) {
      info = { id: data.id, name: data.name, projectId: data.projectId, background: data.background }
      list = JSON.parse(data.elements).elements
      const modules = data.modules
      commit('changeCurrent', { info, list, isModuleEdit, modules })
    } else {
      // 模块编辑的状态下,data为idx
      const tree = JSON.parse(JSON.stringify(state.list))
      const mod = state.modules[data]
      const ids = mod.elements.toString()
      info = {
        id: mod.id,
        name: mod.name,
        idx: data,
        developer: mod.developer,
        components: mod.components
      }
      moduleSelect(tree, ids).then(list => {
        commit('changeCurrent', { info, list, isModuleEdit })
      })
    }
  },

  updateStyle ({ state, commit }, style) {
    if (!state.current) return
    let { list, current } = JSON.parse(JSON.stringify(state))
    treeTravelById(list, current.id).then(item => {
      item.style = style
      commit('update', list)
    })
  },

  /**
   * 更新链接
   */
  updateLink ({ state, commit }, link) {
    if (!state.current) return
    let { list, current } = JSON.parse(JSON.stringify(state))
    treeTravelById(list, current.id).then(item => {
      if (!link) {
        delete item['link']
      } else {
        item['link'] = link
      }
      commit('update', list)
    })
  },

  changeClassName ({state, commit}, {id, className}) {
    let list = JSON.parse(JSON.stringify(state.list))
    if (state.isModuleEdit) {
      list = JSON.parse(JSON.stringify(state.moduleList))
      const idx = state.moduleInfo.idx
      commit('classId', { idx, id, className })
    }
    treeTravelById(list, id).then(item => {
      item.className = className
      console.log(item)
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
    const { type, pid, idx, compConfig } = payload
    let id = guid()
    let attr = getInit(type)
    let list = JSON.parse(JSON.stringify(state.list))
    let config = null
    if (compConfig) {
      config = compConfig
    }
    treeTravel(list, pid).then(item => {
      item.splice(idx, 0, {
        id, pid, ...attr, type, label: `${type}/${id}`, children: [], config
      })
      commit('update', list)
    })
  },

  /**
   * 复制元素
   */
  copyEle ({ state, commit }) {
    if (!state.current) return
    let { list, current } = JSON.parse(JSON.stringify(state))
    treeTravelById(list, current.id).then(item => {
      let newItem = JSON.parse(JSON.stringify(item))
      // 改变所有child的id
      copyElorTempl(newItem, 'root')
      list.push(newItem)
      commit('update', list)
    })
  },

  /**
   * 复制模版
   * @param {组件的id} type
   * @param {拖入的父元素id} pid
   * @param {拖入的父元素index} idx
   */
  addTempl ({ state, commit }, payload) {
    const { type, pid, idx } = payload
    console.log(payload)
    let list = JSON.parse(JSON.stringify(state.list))
    const newCompIdx = state.templs.findIndex(c => c.id.toString() === type)
    let newComp = state.templs[newCompIdx]
    treeTravel(list, pid).then(item => {
      newComp.elements.map((el, i) => {
        // 改变所有child的id
        copyElorTempl(el, pid)
        item.splice((idx + i), 0, el)
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
    let id = guid()
    let list = JSON.parse(JSON.stringify(state.list))
    const newCompIdx = state.components.findIndex(c => c.id === type)
    let newComp = state.components[newCompIdx]
    treeTravel(list, pid).then(item => {
      item.splice(idx, 0, {
        ...newComp, pid, label: `${newComp.type}/${id}`
      })
      commit('update', list)
    })
  },

  /**
   * 删除元素
   * @param {*} pid
   * @param {*} idx
   */
  // delEle ({ state, commit }, payload) {
  //   let { pid, idx, id } = payload
  //   if (id) {
  //     commit('changeCurrentEl', null)
  //   }
  //   let list = JSON.parse(JSON.stringify(state.list))
  //   treeTravel(list, pid).then(item => {
  //     idx = idx || item.findIndex(c => c.id === id)
  //     item.splice(idx, 1)
  //     commit('update', list)
  //   })
  // }
  delEle ({ state, commit }, payload) {
    let { pid, id } = state.current
    let list = JSON.parse(JSON.stringify(state.list))
    treeTravel(list, pid).then(item => {
      let idx = item.findIndex(c => c.id === id)
      item.splice(idx, 1)
      commit('update', list)
    })
  }
}

const mutations = {
  update (state, list) {
    Vue.set(state, 'list', list)
  },
  clear (state) {
    Vue.set(state, 'list', [])
  },
  changeCurrentEl (state, ele) {
    Vue.set(state, 'current', ele)
  },
  changeDevice (state, device) {
    Vue.set(state, 'device', device)
  },
  changeCurrent (state, { info, list, isModuleEdit, modules }) {
    Vue.set(state, 'isModuleEdit', isModuleEdit)
    if (isModuleEdit) {
      Vue.set(state, 'moduleInfo', info)
      Vue.set(state, 'moduleList', list)
    } else {
      Vue.set(state, 'info', info)
      Vue.set(state, 'list', list)
      Vue.set(state, 'modules', modules)
    }
  },
  // 切换到页面编辑状态
  changeToPage (state) {
    Vue.set(state, 'isModuleEdit', false)
  },
  // 模块 class-id 的映射
  classId (state, { idx, id, className }) {
    let classId = state.modules[idx].classId
    let newClassId = {}
    Vue.set(newClassId, id, className)
    classId = Object.assign(classId, newClassId)
    Vue.set(state.modules[idx], 'classId', classId)
  },
  // 删除模块
  delMod (state, idx) {
    state.modules.splice(idx, 1)
  },
  // 添加组件
  addComp (state, comp) {
    state.components.push(comp)
  },
  // 删除组件
  delComp (state, idx) {
    state.components.splice(idx, 1)
  },
  // 添加模版
  addTempl (state, templ) {
    state.templs.push(templ)
  },
  // 删除模版
  delTempl (state, idx) {
    state.templs.splice(idx, 1)
  },
  // 发布模块
  publishMod (state, mod) {
    state.modules.push(mod)
  },
  // 改变page infp
  changeInfo (state, info) {
    Vue.set(state, 'info', info)
  }
}

const getters = {
  current: state => {
    return state.current
  },
  page: state => {
    return state.isModuleEdit ? state.moduleList : state.list
  },
  pageInfo: state => {
    return state.isModuleEdit ? state.moduleInfo : state.info
  },
  info: state => {
    return state.info
  },
  device: state => {
    return state.device
  },
  components: state => {
    return state.components
  },
  templs: state => {
    return state.templs
  },
  modules: state => {
    return state.modules
  },
  isModuleEdit: state => {
    return state.isModuleEdit
  },
  // 用到的组件列表
  useComps: state => {
    if (state.moduleInfo) {
      const stateNew = JSON.parse(JSON.stringify(state))
      return stateNew.moduleInfo.components
    } else {
      return null
    }
  }
}

export default new Vuex.Store({
  mutations, actions, state, getters
})
