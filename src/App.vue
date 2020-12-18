<template>
  <v-app>
    <Login v-if="$store.state.showLoginForm"/>
    <v-main v-else>
      <TopBar />
      <v-divider app />
      <NavigationMenu></NavigationMenu>
      <router-view app :key="$route.path"></router-view>
      <PlayerOSD :showPlayerSelect="showPlayerSelect" />
      <ContextMenu/>
      <PlayerSelect/>
      <v-overlay :value="!$server.connected">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-main>
    <NotificationsManager></NotificationsManager>
  </v-app>
</template>

<style>
  .body {
    background-color: black;
    overscroll-behavior-x: none;
  }
</style>

<script>
import Vue from 'vue'
import NavigationMenu from './components/NavigationMenu.vue'
import TopBar from './components/TopBar.vue'
import ContextMenu from './components/ContextMenu.vue'
import PlayerOSD from './components/PlayerOSD.vue'
import PlayerSelect from './components/PlayerSelect.vue'
import Login from './views/Login.vue'
import NotificationsManager from './components/NotificationsManager.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NavigationMenu,
    TopBar,
    ContextMenu,
    PlayerOSD,
    PlayerSelect,
    Login,
    NotificationsManager
  },
  data: () => ({
    showPlayerSelect: false
  }),
  created () {
    this.handleWindowOptions()
    window.addEventListener('resize', this.handleWindowOptions)
    // merge translations from server
    this.$server.sendWsCommand('config/translations', null, function (res) {
      for (const lang in res) {
        this.$i18n.mergeLocaleMessage(lang, res[lang])
      }
    }.bind(this))
    // detect browser dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.$vuetify.theme.dark = true
    }
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        if (event.matches) {
          this.$vuetify.theme.dark = true
        } else {
          this.$vuetify.theme.dark = false
        }
      })
  },
  destroyed () {
    window.removeEventListener('resize', this.handleWindowOptions)
  },
  methods: {
    handleWindowOptions () {
      this.$store.state.isMobile = (document.body.clientWidth < 700)
      this.$store.state.isInStandaloneMode = (window.navigator.standalone === true) || (window.matchMedia('(display-mode: standalone)').matches)
    }
  }
})
</script>
