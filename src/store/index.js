import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notification: { content: '' },
    windowTitle: 'Home',
    showNavigationMenu: false,
    showPlayersMenu: false,
    topBarTransparent: false,
    topBarContextItem: null,
    isMobile: false,
    isInStandaloneMode: false,
    showLoginForm: false,
    selectedPlayerId: null,
    players: [],
    playerQueues: [],
    artists: [],
    albums: [],
    tracks: [],
    playlists: [],
    radios: [],
    providerIcons: {},
    config: {}
  },
  actions,
  getters,
  mutations
})
