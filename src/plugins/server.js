'use strict'

import Vue from 'vue'
import axios from 'axios'

const axiosConfig = {
  timeout: 15 * 1000
  // withCredentials: true, // Check cross-site Access-Control
}
const _axios = axios.create(axiosConfig)

// Holds the connection to the server

const server = new Vue({
  _address: '',
  _ws: null,
  _serverAddress: null,
  _username: null,
  _password: null,

  data () {
    return {
      connected: false,
      players: {},
      activePlayerId: null,
      syncStatus: [],
      tokenInfo: {}
    }
  },
  methods: {

    async login (serverAddress, username, password, port = 8095, ssl = false) {
      // Connect to the server by logging in
      if (!serverAddress.startsWith('http') && ssl) {
        serverAddress = 'https://' + serverAddress + ':' + port
      }
      if (!serverAddress.startsWith('http') && !ssl) {
        serverAddress = 'http://' + serverAddress + ':' + port
      }
      if (!serverAddress.endsWith('/')) {
        serverAddress = serverAddress + '/'
      }
      const url = serverAddress + 'login'
      const data = JSON.stringify({ username: username, password: password })
      try {
        Vue.$log.info('Connecting to ' + serverAddress)
        const result = await _axios.post(url, data)
        this.tokenInfo = result.data
      } catch {
        Vue.$log.error('login failed for ' + serverAddress)
        return false
      }
      _axios.defaults.headers.common.Authorization =
        'Bearer ' + this.tokenInfo.token
      this._serverAddress = serverAddress
      this.wsConnect()
      return true
    },

    async toggleLibrary (item) {
      /// triggered when user clicks the library (heart) button
      if (item.in_library.length === 0) {
        // add to library
        await this.putData('library', item)
        item.in_library = [item.provider]
      } else {
        // remove from library
        await this.deleteData('library', item)
        item.in_library = []
      }
    },

    getImageUrl (mediaItem, imageType = 'image', size = 0) {
      // format the image url
      if (!mediaItem || !mediaItem.media_type) return ''
      if (size > 0 && imageType === 'image') {
        return `${this._serverAddress}api/images/thumb?provider=${mediaItem.provider}&item_id=${mediaItem.item_id}&media_type=${mediaItem.media_type}&size=${size}`
      } else if (mediaItem.metadata && mediaItem.metadata[imageType]) {
        return mediaItem.metadata[imageType]
      } else if (
        mediaItem.album &&
        mediaItem.album.metadata &&
        mediaItem.album.metadata[imageType]
      ) {
        return mediaItem.album.metadata[imageType]
      } else if (
        mediaItem.artist &&
        mediaItem.artist.metadata &&
        mediaItem.artist.metadata[imageType]
      ) {
        return mediaItem.artist.metadata[imageType]
      } else if (
        mediaItem.album &&
        mediaItem.album.artist &&
        mediaItem.album.artist.metadata &&
        mediaItem.album.artist.metadata[imageType]
      ) {
        return mediaItem.album.artist.metadata[imageType]
      } else if (
        mediaItem.artists &&
        mediaItem.artists[0].metadata &&
        mediaItem.artists[0].metadata[imageType]
      ) {
        return mediaItem.artists[0].metadata[imageType]
      } else if (imageType === 'fanart') {
        // fallback to normal image instead of fanart
        return this.getImageUrl(mediaItem, 'image')
      } else return ''
    },

    getProviderIconUrl (providerId) {
      return `${this._serverAddress}api/images/provider-icon/${providerId}`
    },

    async getData (endpoint, params = {}) {
      // get data from the server
      const url = this._serverAddress + 'api/' + endpoint
      const result = await _axios.get(url, { params: params })
      Vue.$log.debug('getData', endpoint, result)
      return result.data
    },

    async postData (endpoint, data) {
      // post data to the server
      const url = this._serverAddress + 'api/' + endpoint
      data = JSON.stringify(data)
      const result = await _axios.post(url, data)
      Vue.$log.debug('postData', endpoint, result)
      return result.data
    },

    async putData (endpoint, data) {
      // put data to the server
      const url = this._serverAddress + 'api/' + endpoint
      data = JSON.stringify(data)
      const result = await _axios.put(url, data)
      Vue.$log.debug('putData', endpoint, result)
      return result.data
    },

    async deleteData (endpoint, dataObj) {
      // delete data on the server
      const url = this._serverAddress + 'api/' + endpoint
      dataObj = JSON.stringify(dataObj)
      const result = await _axios.delete(url, { data: dataObj })
      Vue.$log.debug('deleteData', endpoint, result)
      return result.data
    },

    playerCommand (cmd, cmd_opt = '', playerId = this.activePlayerId) {
      const endpoint = 'players/' + playerId + '/cmd/' + cmd
      this.postData(endpoint, cmd_opt)
    },

    async playItem (item, queueOpt) {
      this.$store.loading = true
      const endpoint =
        'players/' + this.activePlayerId + '/play_media/' + queueOpt
      await this.postData(endpoint, item)
      this.$store.loading = false
    },

    switchPlayer (newPlayerId) {
      if (newPlayerId !== this.activePlayerId) {
        this.activePlayerId = newPlayerId
        localStorage.setItem('activePlayerId', newPlayerId)
        this.$emit('new player selected', newPlayerId)
      }
    },

    async wsConnect () {
      // Connect websockets
      const wsAddress = this._serverAddress.replace('http', 'ws') + 'ws'
      this._ws = new WebSocket(wsAddress)
      this._ws.onopen = this._onWsConnect
      this._ws.onmessage = this._onWsMessage
      this._ws.onerror = () => {
        this._ws.close()
      }
    },

    sendWsMessage (message, messageDetails) {
      // emit a message to the server through websocket connection
      this._ws.send(
        JSON.stringify({
          message: message,
          message_details: messageDetails
        })
      )
    },

    async _onWsConnect () {
      // Websockets connection established

      clearInterval(this.timerId)

      this._ws.onclose = (e) => {
        // make sure we're auto reconnecting
        Vue.$log.error(
          'Socket is closed. Reconnect will be attempted in 10 seconds.',
          e.reason
        )
        this.timerId = setInterval(() => {
          this.wsConnect()
        }, 10000)
      }
      this.sendWsMessage('login', this.tokenInfo.token)

      // retrieve all players once through api on connect
      const players = await this.getData('players')
      for (const player of players) {
        Vue.set(this.players, player.player_id, player)
      }
      this._selectActivePlayer()
      this.$emit('players changed')
    },

    async _onWsMessage (e) {
      // Message retrieved on the websocket
      var msg = JSON.parse(e.data)
      if (msg.message === 'error') {
        if (msg.message_details.includes('authorization')) {
          this._ws.close()
          this.$store.showLoginForm()
        } else {
          Vue.$log.error(msg.message_details)
        }
      } else if (msg.message === 'login') {
        // login was successfull
        Vue.$log.info('Connected to websocket ' + this._serverAddress)
        this.connected = true
        this.$emit('connected')
        // register callbacks
        this.sendWsMessage('add_event_listener', null)
        // register audio player
        this.$mediaPlayer.registerAudioPlayer()
      } else if (msg.message === 'player changed') {
        Vue.set(
          this.players,
          msg.message_details.player_id,
          msg.message_details
        )
      } else if (msg.message === 'player added') {
        Vue.set(
          this.players,
          msg.message_details.player_id,
          msg.message_details
        )
        this._selectActivePlayer()
        this.$emit('players changed')
      } else if (msg.message === 'player removed') {
        Vue.delete(this.players, msg.message_details.player_id)
        this._selectActivePlayer()
        this.$emit('players changed')
      } else if (msg.message === 'music sync status') {
        this.syncStatus = msg.message_details
      } else {
        this.$emit(msg.message, msg.message_details)
      }
    },

    _selectActivePlayer () {
      // auto select new active player if we have none
      if (!this.activePlayer || !this.activePlayer.available) {
        // prefer last selected player
        const lastPlayerId = localStorage.getItem('activePlayerId')
        if (
          lastPlayerId &&
          this.players[lastPlayerId] &&
          this.players[lastPlayerId].available
        ) {
          this.switchPlayer(lastPlayerId)
        } else {
          // prefer the first playing player
          for (const playerId in this.players) {
            if (
              this.players[playerId].state === 'playing' &&
              this.players[playerId].available
            ) {
              this.switchPlayer(playerId)
              break
            }
          }
          // fallback to just the first player
          if (!this.activePlayer || !this.activePlayer.enabled) {
            for (const playerId in this.players) {
              if (this.players[playerId].available) {
                this.switchPlayer(playerId)
                break
              }
            }
          }
        }
      }
    }
  },
  computed: {
    activePlayer () {
      if (!this.activePlayerId) {
        return null
      } else {
        return this.players[this.activePlayerId]
      }
    }
  }
})

// install as plugin
export default {
  server,
  // we can add objects to the Vue prototype in the install() hook:
  install (Vue, options) {
    Vue.prototype.$server = server
  }
}
