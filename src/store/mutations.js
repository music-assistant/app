import Vue from 'vue'
const mutations = {

  commitNotification (state, payload) {
    state.notification = payload
  },

  commitPlayers (state, players) {
    state.players = players
  },
  commitPlayer (state, player) {
    const items = state.players.filter(
      (i) => i.player_id !== player.player_id
    )
    items.push(player)
    state.players = items
  },
  commitPlayerQueues (state, playerQueues) {
    state.playerQueues = playerQueues
  },
  commitPlayerQueue (state, playerQueue) {
    const items = state.playerQueues.filter(
      (i) => i.queue_id !== playerQueue.queue_id
    )
    items.push(playerQueue)
    state.playerQueues = items
  },
  commitPlayerQueueTime (state, queueTimeDetails) {
    for (const playerQueue of state.playerQueues) {
      if (playerQueue.queue_id === queueTimeDetails.queue_id) {
        Vue.set(playerQueue, 'cur_item_time', queueTimeDetails.cur_item_time)
        break
      }
    }
  },
  deletePlayer (state, playerId) {
    const items = state.players.filter((item) => item.player_id !== playerId)
    state.players = items
  },
  commitTracks (state, items) {
    state.tracks = items
  },
  commitTrack (state, item) {
    const items = state.tracks.filter(
      (i) => !(i.item_id === item.item_id && i.provider === item.provider)
    )
    items.push(item)
    state.tracks = items
    // cleanup provider objects once we receive a (full) database version
    if (item.provider === 'database') {
      for (const prov of item.provider_ids) {
        const items = state.tracks.filter(
          (i) => !(i.item_id === prov.item_id && i.provider === prov.provider)
        )
        state.tracks = items
      }
    }
  },
  commitArtists (state, items) {
    state.artists = items
  },
  commitArtist (state, item) {
    const items = state.artists.filter(
      (i) => !(i.item_id === item.item_id && i.provider === item.provider)
    )
    items.push(item)
    state.artists = items
    // cleanup provider objects once we receive a (full) database version
    if (item.provider === 'database') {
      for (const prov of item.provider_ids) {
        const items = state.artists.filter(
          (i) => !(i.item_id === prov.item_id && i.provider === prov.provider)
        )
        state.artists = items
      }
    }
  },
  commitAlbums (state, items) {
    state.albums = items
  },
  commitAlbum (state, item) {
    const items = state.albums.filter(
      (i) => !(i.item_id === item.item_id && i.provider === item.provider)
    )
    items.push(item)
    state.albums = items
    // cleanup provider objects once we receive a (full) database version
    if (item.provider === 'database') {
      for (const prov of item.provider_ids) {
        const items = state.albums.filter(
          (i) => !(i.item_id === prov.item_id && i.provider === prov.provider)
        )
        state.albums = items
      }
    }
  },
  commitPlaylists (state, items) {
    state.playlists = items
  },
  commitPlaylist (state, item) {
    const items = state.playlists.filter(
      (i) => !(i.item_id === item.item_id && i.provider === item.provider)
    )
    items.push(item)
    state.playlists = items
  },
  commitRadios (state, items) {
    state.radios = items
  },
  commitRadio (state, item) {
    const items = state.radios.filter(
      (i) => !(i.item_id === item.item_id && i.provider === item.provider)
    )
    items.push(item)
    state.radios = items
  },
  commitProviderIcons (state, iconData) {
    state.providerIcons = iconData
  },
  commitShowLoginForm (state, show) {
    state.showLoginForm = show
  },
  commitSelectedPlayerId (state, playerId) {
    state.selectedPlayerId = playerId
  }
}
export default mutations
