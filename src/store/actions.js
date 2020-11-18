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
  }
}
export default actions
