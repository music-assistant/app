const actions = {

  dispatchShowLoginForm ({ commit }) {
    commit('commitShowLoginForm', true)
  },
  dispatchHideLoginForm ({ commit }) {
    commit('commitShowLoginForm', false)
  },
  switchSelectedPlayer ({ commit }, playerId) {
    commit('commitSelectedPlayerId', playerId)
    localStorage.setItem('selectedPlayerId', playerId)
  },
  dispatchNotification ({ commit }, payload) {
    commit('commitNotification', payload)
  }
}
export default actions
