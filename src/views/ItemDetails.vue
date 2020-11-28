<template>
  <section>
    <InfoHeader :itemDetails="itemDetails" />
    <v-tabs dark show-arrows v-model="activeTab" grow hide-slider background-color="rgba(0,0,0,.45)">
      <v-tab v-for="tab in tabs" :key="tab.label">
        {{ $t(tab.label) }}</v-tab
      >
      <v-tab-item v-for="tab in tabs" :key="tab.label">
        <ItemsListing :items="tab.items" :media_type="tab.media_type" />
      </v-tab-item>
    </v-tabs>
  </section>
</template>

<style scoped>
.scroller {
  height: 100%;
}
</style>

<script>
// @ is an alias to /src
import ItemsListing from '@/components/ItemsListing.vue'
import InfoHeader from '@/components/InfoHeader.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    ItemsListing,
    InfoHeader
  },
  props: {
    item_id: String,
    provider: String,
    media_type: String
  },
  data () {
    return {
      activeTab: 0,
      tabs: []
    }
  },
  created () {
    // request itemdetails from server
    this.$server.sendWsCommand(`${this.media_type}/${this.provider}/${this.item_id}`, { refresh: true })

    if (this.media_type === 'artists') {
      // artist details
      this.tabs = [
        {
          label: 'artist_toptracks',
          endpoint: `artists/${this.provider}/${this.item_id}/tracks`,
          media_type: 'tracks',
          items: []
        },
        {
          label: 'artist_albums',
          endpoint: `artists/${this.provider}/${this.item_id}/albums`,
          media_type: 'albums',
          items: []
        }
      ]
    } else if (this.media_type === 'albums') {
      // album details
      this.tabs = [
        {
          label: 'album_tracks',
          endpoint: `albums/${this.provider}/${this.item_id}/tracks`,
          media_type: 'albumtracks',
          items: []
        },
        {
          label: 'album_versions',
          endpoint: `albums/${this.provider}/${this.item_id}/versions`,
          media_type: 'albums',
          items: []
        }
      ]
    } else if (this.media_type === 'tracks') {
      // track details
      this.tabs = [
        {
          label: 'track_versions',
          endpoint: `tracks/${this.provider}/${this.item_id}/versions`,
          media_type: 'tracks',
          items: []
        }
      ]
    } else if (this.media_type === 'playlists') {
      // playlist details
      this.tabs = [
        {
          label: 'playlist_tracks',
          endpoint: `playlists/${this.provider}/${this.item_id}/tracks`,
          media_type: 'playlisttracks',
          items: []
        }
      ]
    }
    for (const tab of this.tabs) {
      this.$server.sendWsCommand(tab.endpoint, null, function (res) {
        tab.items = res
      })
    }
  },
  computed: {
    ...mapGetters(['getArtist', 'getAlbum', 'getTrack', 'getPlaylist', 'getRadio']),
    itemDetails () {
      if (this.media_type === 'artists') { return this.getArtist(this.item_id, this.provider) }
      if (this.media_type === 'albums') { return this.getAlbum(this.item_id, this.provider) }
      if (this.media_type === 'tracks') { return this.getTrack(this.item_id, this.provider) }
      if (this.media_type === 'playlists') { return this.getPlaylist(this.item_id, this.provider) }
      if (this.media_type === 'radios') { return this.getRadio(this.item_id, this.provider) }
      return null
    }
  },
  methods: {
  }
}
</script>
