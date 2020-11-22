<template>
  <v-app>
    <TopBar />
    <NavigationMenu></NavigationMenu>
    <v-main>
      <router-view app :key="$route.path"></router-view>
    </v-main>
    <PlayerOSD :showPlayerSelect="showPlayerSelect" />
    <ContextMenu/>
    <PlayerSelect/>
    <v-overlay :value="!$server.connected">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <Login v-if="$store.state.showLoginForm"/>
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
import Login from './components/Login.vue'

export default Vue.extend({
  name: 'App',
  components: {
    NavigationMenu,
    TopBar,
    ContextMenu,
    PlayerOSD,
    PlayerSelect,
    Login
  },
  data: () => ({
    showPlayerSelect: false
  }),
  created () {
    this.handleWindowOptions()
    window.addEventListener('resize', this.handleWindowOptions)
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
