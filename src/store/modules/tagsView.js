import Cookies from 'js-cookie'

const tagsView = {
  namespaced: true,
  state: {
    tagsList: [],
    isCollapse: 1,
    device: 'desktop',
    sidebar: {
      opened: false,
      withoutAnimation: false
    },
    size: Cookies.get('size') || 'medium'
  },
  mutations: {
    SET_TAGS(state, { route }) {
      //
      const isExist = state.tagsList.some(item => {
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (state.tagsList.length >= 8) {
          state.tagsList.shift()
        }
        state.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      }
    },
    DELIVERY_TAGS_LIST(state, tagslist) {
      //
      const arr = []
      if (tagslist && tagslist.length > 1) {
        alert(tagslist.length)
        for (let i = 0, len = tagslist.length; i < len; i++) {
          tagslist[i].name && arr.push(tagslist[i].name)
        }
        state.tagsList = arr
      } else {
        state.tagsList = tagslist
      }
    },
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      // state.isCollapse = !state.isCollapse
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    setTags({ commit }, route) {
      commit('SET_TAGS', route)
    },
    deliveryTagsList({ commit }, tagslist) {
      let arr
      if (tagslist && tagslist.length > 1) {
        for (var i in tagslist) {
          arr.push(tagslist[i])
        }
        commit('DELIVERY_TAGS_LIST', arr)
      } else {
        commit('DELIVERY_TAGS_LIST', tagslist)
      }
    },
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    }
  }
}

export default tagsView
