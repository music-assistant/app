import Vue from 'vue'
import { mapState, mapGetters, mapActions } from 'vuex'

// Holds the (websocket) connection to the MusicAssistant server

const server = new Vue({
  _ws: null,

  data () {
    return {
      connected: false,
      tokenInfo: {},
      serverAddress: {},
      wsQueueId: 0,
      wsQueueCallbacks: {}
    }
  },
  computed: {
    ...mapState([
      'selectedPlayerId'
    ]),
    ...mapGetters([
      'getPlayer',
      'getPlayers'
    ])
  },
  created () {
    // If we have connection details in storage, use them to connect
    const serverAddress = localStorage.getItem('serverAddress')
    const tokenInfo = localStorage.getItem('tokenInfo')
    if (serverAddress && tokenInfo) {
      this.serverAddress = serverAddress
      this.tokenInfo = JSON.parse(tokenInfo)
      this.wsConnect()
      setTimeout(() => {
        if (!this.connected) {
          // handle usecase where serveraddress changed
          this.dispatchShowLoginForm()
        }
      }, 3000)
    } else {
      // race condition: store is not yet available at this point so delay a bit
      setTimeout(() => {
        this.dispatchShowLoginForm()
      }, 500)
    }
  },
  methods: {
    ...mapActions([
      'dispatchShowLoginForm',
      'dispatchHideLoginForm',
      'switchSelectedPlayer'
    ]),

    async toggleLibrary (item) {
      /// triggered when user clicks the library (heart) button
      const data = { items: [item] }
      if (!item.in_library) {
        // add to library
        this.sendWsCommand('library/add', data)
        item.in_library = true
      } else {
        // remove from library
        this.sendWsCommand('library/remove', data)
        item.in_library = false
      }
    },

    playerCommand (cmd, cmdOpt = '', playerId = null) {
      if (!playerId) playerId = this.selectedPlayerId
      let endpoint = `players/${playerId}/cmd/${cmd}`
      if (cmdOpt) endpoint += '/' + cmdOpt
      this.sendWsCommand(endpoint)
    },

    async playMedia (item, queueOpt, playerId = null) {
      if (!playerId) playerId = this.selectedPlayerId
      const data = {
        items: item,
        queue_opt: queueOpt
      }
      this.sendWsCommand(`players/${playerId}/play_media`, data)
    },

    async wsConnect () {
      // Connect websockets
      this._ws = new WebSocket(this.serverAddress)
      this._ws.onopen = this._onWsConnect
      this._ws.onmessage = this._onWsMessage
      this._ws.onerror = (e) => {
        Vue.$log.error('Error in serverconnection', e)
        this._ws.close()
      }
    },

    sendWsCommand (command, data = null, cbFunc = null) {
      // emit a command to the server through websocket connection
      if (!this.connected) {
        setTimeout(() => {
          this.sendWsCommand(command, data, cbFunc)
        }, 1000)
        return
      }
      this.wsQueueId++
      if (typeof (cbFunc) === 'function') {
        this.wsQueueCallbacks[this.wsQueueId] = cbFunc
      }
      this._ws.send(
        JSON.stringify({
          command: command,
          data: data,
          id: this.wsQueueId
        })
      )
    },

    async _onWsConnect () {
      // Websockets connection established
      clearInterval(this.timerId)
      this._ws.onclose = (e) => {
        if (!this.connected) {
          // this is the first connection, no need for reconnect as this will be handled by login procedure
          return
        }
        // existing connection lost, start auto reconnect
        this.connected = false
        Vue.$log.error(
          'Socket is closed. Reconnect will be attempted in 10 seconds.',
          e.reason
        )
        this.timerId = setInterval(() => {
          this.wsConnect()
        }, 10000)
      }
      // send authentication request
      this._ws.send(
        JSON.stringify({
          command: 'auth',
          data: this.tokenInfo.token
        })
      )
    },

    async _onWsMessage (e) {
      // Message retrieved on the websocket
      var msg = JSON.parse(e.data)
      if (msg.error) {
        this._onServerError(msg)
      } else if (msg.result === 'auth') {
        // login was successfull
        this._onServerConnected()
      } else if (msg.event) {
        // event from server
        this._onServerEvent(msg)
      } else if (msg.result) {
        // result to direct requests
        this._onServerResult(msg)
      } else if (msg.command) {
        // command from server to this client
        Vue.$log.debug(msg)
        // for now, simply emit it on eventbus
        this.$emit(msg.command, msg.data)
      }
    },

    async _onServerConnected () {
      // Server connected and authenticated
      Vue.$log.info('Connected to server ' + this.serverAddress)
      this.connected = true
      this.dispatchHideLoginForm()
      // request all base listings
      this.sendWsCommand('info')
      this.sendWsCommand('players')
      this.sendWsCommand('players/queues')
      this.sendWsCommand('library/tracks')
      this.sendWsCommand('library/artists')
      this.sendWsCommand('library/albums')
      this.sendWsCommand('library/playlists')
      this.sendWsCommand('library/radios')
      this.sendWsCommand('images/provider-icons')
      this.sendWsCommand('config')
      // register audio player
      // this.$mediaPlayer.registerAudioPlayer()
    },

    async _onServerError (msg) {
      // Error received from server
      if (msg.result === 'auth') {
        // login error
        this._ws.close()
        this.dispatchShowLoginForm()
      } else {
        // simply log it for now
        Vue.$log.error(msg)
      }
    },

    async _onServerEvent (msg) {
      // Event received from server
      if (msg.event === 'player changed') {
        this.$store.commit('commitPlayer', msg.data)
      } else if (msg.event === 'player added') {
        this.$store.commit('commitPlayer', msg.data)
        this.selectPlayer()
      } else if (msg.event === 'player removed') {
        this.$store.commit('deletePlayer', msg.data.player_id)
        this.selectPlayer()
      } else if (msg.event === 'music sync status') {
        this.syncStatus = msg.data
      } else if (msg.event === 'artist added') {
        this.$store.commit('commitArtist', msg.data)
      } else if (msg.event === 'album added') {
        this.$store.commit('commitAlbum', msg.data)
      } else if (msg.event === 'queue time updated') {
        this.$store.commit('commitPlayerQueueTime', msg.data)
      } else if (msg.event === 'queue updated') {
        this.$store.commit('commitPlayerQueue', msg.data)
      } else if (msg.event === 'config changed') {
        // simply request latest config when we receive event that it changed
        this.sendWsCommand('config')
      } else {
        // unknown event, simply emit it on eventbus.
        Vue.$log.debug(msg)
        this.$emit(msg.event, msg.data)
      }
    },

    async _onServerResult (msg) {
      // Result received from server
      if (msg.result === 'library/tracks') {
        this.$store.commit('commitTracks', msg.data)
      } else if (msg.result.startsWith('tracks/' && !msg.result.includes('versions'))) {
        this.$store.commit('commitTrack', msg.data)
      } else if (msg.result === 'library/artists') {
        this.$store.commit('commitArtists', msg.data)
      } else if (msg.result.startsWith('artists/') && !msg.result.includes('tracks') && !msg.result.includes('albums')) {
        this.$store.commit('commitArtist', msg.data)
      } else if (msg.result === 'library/albums') {
        this.$store.commit('commitAlbums', msg.data)
      } else if (msg.result.startsWith('albums/') && !msg.result.includes('versions') && !msg.result.includes('tracks')) {
        this.$store.commit('commitAlbum', msg.data)
      } else if (msg.result === 'library/playlists') {
        this.$store.commit('commitPlaylists', msg.data)
      } else if (msg.result.startsWith('playlists/') && !msg.result.includes('tracks')) {
        this.$store.commit('commitPlaylist', msg.data)
      } else if (msg.result === 'library/radios') {
        this.$store.commit('commitRadios', msg.data)
      } else if (msg.result.startsWith('radios/')) {
        this.$store.commit('commitRadio', msg.data)
      } else if (msg.result === 'players') {
        this.$store.commit('commitPlayers', msg.data)
        this.selectPlayer()
      } else if (msg.result === 'players/queues') {
        this.$store.commit('commitPlayerQueues', msg.data)
      } else if (msg.result === 'images/provider-icons') {
        this.$store.commit('commitProviderIcons', msg.data)
      } else if (msg.result === 'info') {
        this.serverInfo = msg.data
        localStorage.setItem('serverInfo', JSON.stringify(this.serverInfo))
      } else if (msg.result === 'config') {
        this.$store.state.config = msg.data
      } else if (msg.id in this.wsQueueCallbacks) {
        // reponse to custom request with callback
        const callback = this.wsQueueCallbacks[msg.id]
        delete this.wsQueueCallbacks[msg.id]
        callback(msg.data)
      } else {
        // unknown result, simply emit it on the eventbus
        this.$emit(msg.result, msg.data)
      }
    },

    selectPlayer () {
      // auto select new active player if we have none
      if (!this.selectedPlayerId || !this.selectedPlayer.available) {
        // prefer last selected player
        const lastPlayerId = localStorage.getItem('selectedPlayerId')
        if (
          lastPlayerId &&
          this.getPlayer(lastPlayerId) &&
          this.getPlayer(lastPlayerId).available
        ) {
          this.switchSelectedPlayer(lastPlayerId)
        } else {
          // prefer the first playing player
          for (const player of this.getPlayers) {
            if (
              player.state === 'playing' &&
              player.available
            ) {
              this.switchSelectedPlayer(player.player_id)
              break
            }
          }
          // fallback to just the first player
          if (!this.selectedPlayerId || !this.selectedPlayerId.enabled) {
            for (const player of this.getPlayers) {
              if (player.available) {
                this.switchSelectedPlayer(player.player_id)
                break
              }
            }
          }
        }
      }
    }
  }
})

// install as plugin
export default {
  server,
  // we can add objects to the Vue prototype in the install() hook:
  install (vue, store) {
    server.$store = store
    Vue.prototype.$server = server
  }
}
