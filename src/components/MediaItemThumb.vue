<template>
  <img :src="imgData" />
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  props: {
    item: Object,
    size: Number
  },
  data () {
    return {
      imgData: null
    }
  },
  created () {
    // TODO: should we cache results to browser cache ?
    const url = this.getImageUrl(this.item)
    if (url && !this.size) {
      // simply use the fullsize url
      this.imgData = url
    } else if (url && this.size) {
      // resized image by url
      this.getImageThumb(null, url)
    } else if (this.item.media_type === 'track') {
      // prefer album for track
      this.getImageThumb(this.item.album)
    } else {
      this.getImageThumb(this.item)
    }
  },
  methods: {
    getImageUrl (mediaItem) {
      // get imageurl for mediaItem
      if (!mediaItem || !mediaItem.media_type) return ''
      if (mediaItem.metadata && mediaItem.metadata.image) return mediaItem.metadata.image
      if (mediaItem.album && mediaItem.album.metadata && mediaItem.album.metadata.image) return mediaItem.album.metadata.image
      if (mediaItem.artist && mediaItem.artist.metadata && mediaItem.artist.metadata.image) return mediaItem.artist.metadata.image
    },
    getImageThumb (item = null, url = null) {
      // get image(thumb) for mediaItem
      const data = {
        url: url,
        item: item,
        size: this.size
      }
      this.$server.sendWsCommand('images/thumb', data, function (res) {
        this.imgData = res
      }.bind(this))
    }
  }
})
</script>
