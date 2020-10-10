import Vue from 'vue'

// Built-in mediaplayer

const mediaPlayer = new Vue({
  data () {
    return {
      playerDetails: null,
      mediaObj: null
    }
  },
  created () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
  },
  destroyed () {},
  methods: {
    onDeviceReady () {
      this.registerAudioPlayer()
    },
    registerAudioPlayer () {
      let audioPlayerId
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
      const devModel = device.model + ' ' + device.platform + ' ' + device.version // eslint-disable-line no-undef,no-unused-vars
      this.playerDetails = {
        player_id: audioPlayerId,
        name: device.platform + ' ' + audioPlayerId, // eslint-disable-line no-undef,no-unused-vars
        state: 'stopped',
        powered: true,
        volume_level: 100,
        muted: false,
        current_uri: '',
        elapsed_time: 0,
        device_info: {
          manufacturer: 'Music Assistant',
          model: devModel
        }
      }
      Vue.$log.info(this.playerDetails)
      this.$server.sendWsMessage('webplayer register', this.playerDetails)
      this.$server.$on('webplayer command', this.processPlayerCommand)
      // Update media position every second
      setInterval(function () {
        // get media position
        if (this.mediaObj) {
          this.mediaObj.getCurrentPosition(
            function (position) {
              if (position > -1) {
                this.playerDetails.elapsed_time = position
                this.updatePlayerState()
              }
            }.bind(this),
            // error callback
            function (e) {
              Vue.$log.info('Error getting pos=' + e)
            }
          )
        } else this.updatePlayerState()
      }.bind(this), 1000)
    },
    processPlayerCommand (messageDetails) {
      if (messageDetails.player_id === this.playerDetails.player_id) {
        const cmd = messageDetails.cmd
        if (cmd === 'play') this.mediaObj.play()
        if (cmd === 'pause') this.mediaObj.pause()
        if (cmd === 'stop') this.mediaObj.stop()
        if (cmd === 'volume_set') this.mediaObj.setVolume(messageDetails.volume_level / 100)
        if (cmd === 'play_uri') this.playMedia(messageDetails.uri)
      }
    },
    updatePlayerState () {
      // send current player state to the server
      this.$server.sendWsMessage('webplayer state', this.playerDetails)
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
