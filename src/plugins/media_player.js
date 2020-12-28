import Vue from 'vue'

// Built-in mediaplayer

const mediaPlayer = new Vue({
  data () {
    return {
      playerDetails: null,
      mediaObj: null,
      updatePlayerInterval: null
    }
  },
  destroyed () {},
  created () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  methods: {
    onDeviceReady () {
      this.$server.$on('connected', this.registerAudioPlayer)
      this.$server.$on('wsplayer command', this.processPlayerCommand)
      this.registerAudioPlayer()
    },
    registerAudioPlayer () {
      let audioPlayerId = device.uuid // eslint-disable-line no-undef
      if (!audioPlayerId) {
        if (localStorage.getItem('audio_player_id')) {
          // get player id from local storage
          audioPlayerId = localStorage.getItem('audio_player_id')
        } else {
          // generate a new (randomized) player id
          audioPlayerId = (
            Date.now().toString(36) +
            Math.random()
              .toString(36)
              .substr(2, 5)
          ).toUpperCase()
          localStorage.setItem('audio_player_id', audioPlayerId)
        }
      }

      const devModel = device.model + ' ' + device.platform + ' ' + device.version // eslint-disable-line no-undef,no-unused-vars
      const devName = device.platform + ' ' + audioPlayerId // eslint-disable-line no-undef,no-unused-vars

      this.playerDetails = {
        player_id: audioPlayerId,
        name: devName,
        state: 'stopped',
        powered: true,
        volume_level: 100,
        muted: false,
        current_uri: '',
        elapsed_time: 0,
        device_info: {
          manufacturer: device.manufacturer, // eslint-disable-line no-undef
          model: devModel
        }
      }
      Vue.$log.info(this.playerDetails)
      this.$server.sendWsCommand('wsplayer register', { player_id: audioPlayerId, details: this.playerDetails })
      // Update media position every second
      clearInterval(this.updatePlayerInterval)
      this.updatePlayerInterval = setInterval(function () {
        this.updatePlayerState()
      }.bind(this), 1000)
    },
    processPlayerCommand (messageDetails) {
      if (messageDetails.player_id === this.playerDetails.player_id) {
        const cmd = messageDetails.cmd
        if (cmd === 'play' && this.mediaObj) this.mediaObj.play()
        if (cmd === 'pause' && this.mediaObj) this.mediaObj.pause()
        if (cmd === 'stop' && this.mediaObj) this.mediaObj.stop()
        if (cmd === 'volume_set' && this.mediaObj) this.mediaObj.setVolume(messageDetails.volume_level / 100)
        if (cmd === 'play_uri') {
          this.playMedia(messageDetails.uri)
        }
      }
    },
    updatePlayerState () {
      // send current player state to the server
      this.$server.sendWsCommand('wsplayer state', { player_id: this.playerDetails.player_id, details: this.playerDetails })
    },

    playMedia (uri) {
      // create the mediaplayer object and start playing
      if (this.mediaObj) {
        this.mediaObj.stop()
        this.mediaObj.release()
      }
      this.mediaObj = new Media( // eslint-disable-line no-undef
        uri,
        // success callback
        function () {
          Vue.$log.info('playAudio():Audio Success')
        },
        // error callback
        function (err) {
          Vue.$log.info('playAudio():Audio Error: ' + err)
        },
        // status callback
        function (status) {
          if (status === 2) this.playerDetails.state = 'playing'
          else if (status === 3) this.playerDetails.state = 'paused'
          else this.playerDetails.state = 'stopped'
          this.updatePlayerState()
        }.bind(this)
      )
      this.playerDetails.current_uri = uri
      this.mediaObj.setVolume(this.playerDetails.volume_level / 100)
      this.mediaObj.play()
      setInterval(function () {
        // get media position
        if (this.mediaObj) {
          this.mediaObj.getCurrentPosition(
            function (position) {
              if (position > -1) {
                this.playerDetails.elapsed_time = position
              }
            }.bind(this)
          )
        }
      }.bind(this), 500)
    }
  },
  computed: {}
})

// install as plugin
export default {
  mediaPlayer,
  // we can add objects to the Vue prototype in the install() hook:
  install (Vue, options) {
    Vue.prototype.$mediaPlayer = mediaPlayer
  }
}
