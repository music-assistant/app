<template>
  <v-navigation-drawer app clipped temporary v-model="$store.state.showNavigationMenu">
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" @click="$router.push(item.path)">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logOut()">
        <v-list-item-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ this.$t('login.logoff') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-switch inset :label="$t('dark_mode')" v-model="$vuetify.theme.dark"/>
      </v-list-item>
      <v-btn icon v-on:click="$store.state.showNavigationMenu=!$store.state.showNavigationMenu" />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {},
  data () {
    return {
      items: [
        { title: this.$t('home'), icon: 'home', path: '/' },
        { title: this.$t('artists'), icon: 'person', path: '/artists' },
        { title: this.$t('albums'), icon: 'album', path: '/albums' },
        { title: this.$t('tracks'), icon: 'audiotrack', path: '/tracks' },
        { title: this.$t('playlists'), icon: 'playlist_play', path: '/playlists' },
        { title: this.$t('radios'), icon: 'radio', path: '/radios' },
        { title: this.$t('search'), icon: 'search', path: '/search' },
        { title: this.$t('settings'), icon: 'settings', path: '/config' }
      ]
    }
  },
  mounted () { },
  methods: {
    logOut () {
      localStorage.clear()
      this.$router.go()
    }
  }
})
</script>
