import Vue from 'vue'

// Built-in mediaplayer

const mediaPlayer = new Vue({
  data () {
    return {
      audioPlayerId: ''
    }
  },
  created () {
    document.addEventListener('deviceready', this.onDeviceReady, false)
    this.$server.$on('connected', this.getItems)
    if (localStorage.getItem('audio_player_id')) {
      // get player id from local storage
      this.audioPlayerId = localStorage.getItem('audio_player_id')
    } else {
      // generate a new (randomized) player id
      this.audioPlayerId = (
        Date.now().toString(36) +
        Math.random()
          .toString(36)
          .substr(2, 5)
      ).toUpperCase()
      localStorage.setItem('audio_player_id', this.audioPlayerId)
    }
  },
  destroyed () {},
  methods: {
    onDeviceReady () {
      console.log('yesss')
      console.log(device) // eslint-disable-line no-undef,no-unused-vars
      var myMedia = new Media( // eslint-disable-line no-undef
        '',
        // success callback
        function () {
          console.log('playAudio():Audio Success')
        },
        // error callback
        function (err) {
          console.log('playAudio():Audio Error: ' + err)
        },
        // status callback
        function (err) {
          console.log('playAudio():Audio Error: ' + err)
        }
      )
      console.log(myMedia)
    },
    createAudioPlayer () {
      const msgDetails = { // eslint-disable-line no-unused-vars
        player_id: this.audioPlayerId,
        name: this.audioPlayerName,
        state: 'stopped',
        powered: true,
        volume_level: 100,
        muted: false,
        cur_uri: ''
      }
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
