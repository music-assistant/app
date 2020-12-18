const getters = {

  notification: (state) => state.notification,

  showPlayersMenu: (state) => state.showPlayersMenu,

  getPlayers: (state) => state.players,

  getPlayer: (state) => (playerId) => {
    const filteredItems = state.players.filter(item => item.player_id === playerId)
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
  },

  getPlayerQueues: (state) => state.playerQueues,

  getPlayerQueue: (state) => (queueId) => {
    const filteredItems = state.playerQueues.filter(item => item.queue_id === queueId)
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
  },

  getSelectedPlayerId: (state) => {
    return state.selectedPlayerId
  },

  getSelectedPlayer: (state) => {
    const filteredItems = state.players.filter(item => item.player_id === state.selectedPlayerId)
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
    return null
  },

  getSelectedPlayerQueue: (state) => {
    const filteredPlayers = state.players.filter(item => item.player_id === state.selectedPlayerId)
    if (filteredPlayers.length > 0) {
      const selectedPlayer = { ...filteredPlayers[0] }
      if (selectedPlayer) {
        const filteredQueues = state.playerQueues.filter(item => item.queue_id === selectedPlayer.active_queue)
        if (filteredQueues.length > 0) {
          const playerQueue = { ...filteredQueues[0] }
          if (playerQueue) return playerQueue
        }
      }
    }
    return null
  },

  getAvailablePlayers: (state) => {
    return state.players.filter(item => item.available === true)
  },

  getLibraryTracks: (state) => {
    return state.tracks.filter(item => item.in_library === true)
  },

  getTrack: (state) => (itemId, provider) => {
    const filteredItems = state.tracks.filter(item => (item.item_id === itemId && item.provider === provider))
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
    // retry with provider ids
    for (const item of state.tracks) {
      for (const prov of item.provider_ids) {
        if (prov.item_id === itemId && prov.provider === provider) {
          return item
        }
      }
    }
  },

  getLibraryAlbums: (state) => {
    return state.albums.filter(item => item.in_library === true)
  },

  getAlbum: (state) => (itemId, provider) => {
    const filteredItems = state.albums.filter(item => item.item_id === itemId && item.provider === provider)
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
    // retry with provider ids
    for (const item of state.albums) {
      for (const prov of item.provider_ids) {
        if (prov.item_id === itemId && prov.provider === provider) {
          return item
        }
      }
    }
  },

  getLibraryArtists: (state) => {
    return state.artists.filter(item => item.in_library === true)
  },

  getArtist: (state) => (itemId, provider) => {
    const filteredItems = state.artists.filter(item => (item.item_id === itemId && item.provider === provider))
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
    // retry with provider ids
    for (const item of state.artists) {
      for (const prov of item.provider_ids) {
        if (prov.item_id === itemId && prov.provider === provider) {
          return item
        }
      }
    }
  },

  getLibraryPlaylists: (state) => {
    return state.playlists.filter(item => item.in_library === true)
  },

  getPlaylist: (state) => (itemId, provider) => {
    const filteredItems = state.playlists.filter(item => item.item_id === itemId && item.provider === provider)
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
    // retry with provider ids
    for (const item of state.playlists) {
      for (const prov of item.provider_ids) {
        if (prov.item_id === itemId && prov.provider === provider) {
          return item
        }
      }
    }
  },

  getLibraryRadios: (state) => {
    return state.radios.filter(item => item.in_library === true)
  },

  getRadio: (state) => (itemId, provider) => {
    const filteredItems = state.radios.filter(item => item.item_id === itemId && item.provider === provider)
    if (filteredItems.length > 0) {
      return { ...filteredItems[0] }
    }
    // retry with provider ids
    for (const item of state.radios) {
      for (const prov of item.provider_ids) {
        if (prov.item_id === itemId && prov.provider === provider) {
          return item
        }
      }
    }
  },

  getProviderIcon: (state) => (providerId) => {
    return state.providerIcons[providerId]
  }
}
export default getters
