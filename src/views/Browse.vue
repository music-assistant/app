<template>
  <section>
    <ItemsListing :mediatype="mediatype" :items="items" />
  </section>
</template>

<script>
// @ is an alias to /src
import ItemsListing from '@/components/ItemsListing.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'browse',
  components: {
    ItemsListing
  },
  props: {
    mediatype: String,
    provider: String
  },
  data () {
    return { }
  },
  created () {
    this.$store.state.windowTitle = this.$t(this.mediatype)
  },
  computed: {
    ...mapGetters(['getLibraryTracks', 'getLibraryAlbums', 'getLibraryArtists', 'getLibraryPlaylists', 'getLibraryRadios']),
    items () {
      if (this.mediatype === 'tracks') { return this.getLibraryTracks }
      if (this.mediatype === 'albums') { return this.getLibraryAlbums }
      if (this.mediatype === 'artists') { return this.getLibraryArtists }
      if (this.mediatype === 'playlists') { return this.getLibraryPlaylists }
      if (this.mediatype === 'radios') { return this.getLibraryRadios }
      return []
    }
  },
  methods: { }
}
</script>
