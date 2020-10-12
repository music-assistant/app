import Vue from 'vue'

// Built-in mediaplayer

const mediaPlayer = new Vue({
  data () {
    return {
      playerDetails: null,
      mediaObj: null
    }
  },
  destroyed () {},
  methods: {
    isCordova () {
      return navigator.userAgent.match('/(iPhone|iPod|iPad|Android|BlackBerry)/')
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

      let devModel = navigator.userAgent.split(')').pop()
      let devName = 'Browser ' + audioPlayerId
      if (this.isCordova()) {
        devModel = device.model + ' ' + device.platform + ' ' + device.version // eslint-disable-line no-undef,no-unused-vars
        devName = device.platform + ' ' + audioPlayerId // eslint-disable-line no-undef,no-unused-vars
      }

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
          manufacturer: 'Music Assistant',
          model: devModel
        }
      }
      Vue.$log.info(this.playerDetails)
      this.$server.sendWsMessage('webplayer register', this.playerDetails)
      this.$server.$on('webplayer command', this.processPlayerCommand)
      // Update media position every second
      setInterval(function () {
        this.updatePlayerState()
      }.bind(this), 1000)
    },
    processPlayerCommand (messageDetails) {
      if (messageDetails.player_id === this.playerDetails.player_id) {
        const cmd = messageDetails.cmd
        if (cmd === 'play') this.mediaObj.play()
        if (cmd === 'pause') this.mediaObj.pause()
        if (cmd === 'stop') {
          this.mediaObj.pause()
          this.mediaObj = new Audio('invalidate')
        }
        if (cmd === 'volume_set') this.mediaObj.volume = messageDetails.volume_level / 100
        if (cmd === 'play_uri') {
          if (this.isCordova()) this.playMediaCordova(messageDetails.uri)
          else this.playMediaBrowser(messageDetails.uri)
        }
      }
    },
    updatePlayerState () {
      // send current player state to the server
      this.$server.sendWsMessage('webplayer state', this.playerDetails)
    },
    playMediaBrowser (uri) {
      if (this.mediaObj) {
        this.mediaObj.load()
      }
      this.mediaObj = new Audio(uri)
      this.mediaObj.autoplay = true
      this.mediaObj.addEventListener('play', () => {
        this.playerDetails.state = 'playing'
      })
      this.mediaObj.addEventListener('pause', () => {
        this.playerDetails.state = 'paused'
      })
      this.mediaObj.addEventListener('ended', () => {
        this.playerDetails.state = 'stopped'
      })
      this.mediaObj.addEventListener('timeupdate', () => {
        this.playerDetails.elapsed_time = this.mediaObj.currentTime
      })
      this.mediaObj.addEventListener('volumechange', () => {
        this.playerDetails.volume_level = this.mediaObj.volume * 100
        this.playerDetails.muted = this.mediaObj.muted
      })
      this.playerDetails.current_uri = uri
      this.mediaObj.volume = this.playerDetails.volume_level / 100
    },
    playMediaCordova (uri) {
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
